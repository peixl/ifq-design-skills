const PLACEHOLDER_PATTERNS = [
  ['brace-placeholder', /\{[^{}\n]{1,120}\}/g],
  ['year-token', /(^|[^A-Za-z0-9_])(YYYY|<year>)(?=$|[^A-Za-z0-9_])/g],
  ['month-day-token', /(^|[^A-Za-z0-9_])(MM|DD)(?=$|[^A-Za-z0-9_])/g],
];

const IGNORE_SELECTOR = [
  'script',
  'style',
  'pre',
  'code',
  '[data-placeholder-scan="ignore"]',
  '[class*="code"]',
  '[class*="snippet"]',
  '[class*="terminal"]',
  '[class*="example"]',
].join(', ');

const TEMPORAL_PLACEHOLDERS = [
  { selector: '[data-ifq-year]', token: 'data-ifq-year', validator: /^\d{4}$/ },
  { selector: '[data-ifq-month]', token: 'data-ifq-month', validator: /^(0[1-9]|1[0-2])$/ },
  { selector: '[data-ifq-day]', token: 'data-ifq-day', validator: /^(0[1-9]|[12][0-9]|3[01])$/ },
];

function clipContext(text, start, end, radius = 36) {
  return text
    .slice(Math.max(0, start - radius), Math.min(text.length, end + radius))
    .replace(/\s+/g, ' ')
    .trim();
}

function compileIgnorePatterns(rawPatterns = []) {
  return rawPatterns.map((raw) => new RegExp(raw));
}

function findPlaceholderFindings(textBlocks, ignorePatterns = []) {
  const findings = [];

  for (const block of textBlocks) {
    const label = block.label || 'body';
    const text = typeof block.text === 'string' ? block.text : '';
    if (!text.trim()) {
      continue;
    }

    for (const [patternName, pattern] of PLACEHOLDER_PATTERNS) {
      pattern.lastIndex = 0;
      for (const match of text.matchAll(pattern)) {
        const token = match[2] || match[0];
        if (ignorePatterns.some((ignore) => ignore.test(token))) {
          continue;
        }

        const start = match.index + (match[1] ? match[1].length : 0);
        findings.push({
          label,
          pattern: patternName,
          token,
          context: clipContext(text, start, start + token.length),
        });
      }
    }
  }

  return findings;
}

async function collectRenderedTextBlocks(page) {
  return page.evaluate((ignoreSelector) => {
    const blocks = [];
    const push = (label, text) => {
      if (typeof text === 'string' && text.trim()) {
        blocks.push({ label, text });
      }
    };

    push('title', document.title || '');

    if (document.body) {
      const clone = document.body.cloneNode(true);
      clone.querySelectorAll(ignoreSelector).forEach((node) => node.remove());
      push('body', clone.innerText || clone.textContent || '');
    }

    return blocks;
  }, IGNORE_SELECTOR);
}

async function collectTemporalPlaceholderStates(page) {
  return page.evaluate((placeholderDefs) => {
    return placeholderDefs.flatMap((definition) => {
      return Array.from(document.querySelectorAll(definition.selector)).map((node) => ({
        token: definition.token,
        value: (node.textContent || '').trim(),
        context: ((node.parentElement && (node.parentElement.innerText || node.parentElement.textContent)) || node.outerHTML || '')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 160),
      }));
    });
  }, TEMPORAL_PLACEHOLDERS.map(({ selector, token }) => ({ selector, token })));
}

function findTemporalResolutionIssues(states) {
  const findings = [];

  for (const state of states) {
    const definition = TEMPORAL_PLACEHOLDERS.find((item) => item.token === state.token);
    if (!definition) {
      continue;
    }
    if (definition.validator.test(state.value)) {
      continue;
    }

    findings.push({
      label: 'rendered-dom',
      pattern: 'unresolved-ifq-date-token',
      token: `[${state.token}]`,
      context: state.context || '(empty)',
    });
  }

  return findings;
}

function buildErrorMessage(label, findings) {
  const lines = findings.slice(0, 10)
    .map((finding) => `  - [${finding.label}] ${finding.token}  ← ${finding.context}`)
    .join('\n');
  const suffix = findings.length > 10 ? `\n  ... 还有 ${findings.length - 10} 条` : '';
  return `${label}: unresolved placeholders found before export:\n${lines}${suffix}\nPass --allow-placeholders to override if this is intentional.`;
}

async function assertNoPlaceholderLeaksInPage(page, options = {}) {
  const {
    label = 'page',
    allowPlaceholders = false,
    ignorePatterns = [],
  } = options;

  if (allowPlaceholders) {
    return;
  }

  const findings = findPlaceholderFindings(
    await collectRenderedTextBlocks(page),
    compileIgnorePatterns(ignorePatterns),
  );

  findings.push(...findTemporalResolutionIssues(await collectTemporalPlaceholderStates(page)));

  if (findings.length > 0) {
    throw new Error(buildErrorMessage(label, findings));
  }
}

module.exports = {
  assertNoPlaceholderLeaksInPage,
  findPlaceholderFindings,
};