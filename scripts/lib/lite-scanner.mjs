/**
 * lite-scanner.mjs — Static HTML placeholder and quality scanner.
 *
 * Pure functions extracted from verify-lite.mjs for testability.
 * No file I/O, no process.exit, no console output — just scanning logic.
 */

/** Patterns that indicate unresolved placeholders in visible text. */
export const PATTERNS = [
  ['brace-placeholder', /\{[^{}\n<>]{1,120}\}/g],
  ['year-token',        /(^|[^A-Za-z0-9_])(YYYY|<year>)(?=$|[^A-Za-z0-9_])/g],
  ['month-day-token',   /(^|[^A-Za-z0-9_])(MM|DD)(?=$|[^A-Za-z0-9_])/g],
  ['lorem-ipsum',       /\blorem\s+ipsum\b/gi],
  ['template-stub',     /\b(your\s+(headline|title|name|cta)\s+here|replace\s+me|TODO:)/gi],
  ['ifq-taxonomy-leak', /(^|[^A-Za-z0-9_])(FIELD\s+NOTE|SIGNAL\s+SPARK|RUST\s+LEDGER|MONO\s+FIELD\s+NOTE|QUIET\s+URL|EDITORIAL\s+CONTRAST)(?=$|[^A-Za-z0-9_])/g],
];

/** Pattern for empty data-ifq-* date attributes. */
export const EMPTY_DATE_ATTR = /<[^>]+\sdata-ifq-(year|month|day)[^>]*>\s*<\/[^>]+>/gi;

/**
 * Strip <script>, <style>, and HTML comments from source.
 */
export function stripScriptsAndStyles(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');
}

/**
 * Strip all HTML tags from source, leaving visible text.
 */
export function stripTags(html) {
  return html.replace(/<[^>]+>/g, ' ');
}

/**
 * Extract a context snippet around a match position.
 */
export function clip(text, start, end, radius = 36) {
  return text.slice(Math.max(0, start - radius), Math.min(text.length, end + radius))
    .replace(/\s+/g, ' ').trim();
}

/**
 * Scan visible text for placeholder patterns.
 * Returns an array of { kind, token, ctx } findings.
 */
export function scanForPlaceholders(bodyText) {
  const findings = [];
  for (const [name, pattern] of PATTERNS) {
    pattern.lastIndex = 0;
    for (const m of bodyText.matchAll(pattern)) {
      const token = m[2] || m[0];
      const offset = m.index + (m[1] ? m[1].length : 0);
      findings.push({ kind: name, token, ctx: clip(bodyText, offset, offset + token.length) });
    }
  }
  return findings;
}

/**
 * Scan raw HTML for empty data-ifq-* date attributes.
 * Returns an array of { kind, token, ctx } findings.
 */
export function scanForEmptyDateAttrs(rawHtml) {
  const findings = [];
  for (const m of rawHtml.matchAll(EMPTY_DATE_ATTR)) {
    findings.push({
      kind: 'empty-ifq-date-attr',
      token: m[0].slice(0, 60),
      ctx: '(attr rendered empty — did runtime forget to stamp the date?)',
    });
  }
  return findings;
}

/**
 * Full lite scan: strip scripts/styles, scan for placeholders and empty date attrs.
 * Returns an array of all findings.
 */
export function scanHtml(rawHtml) {
  const noScripts = stripScriptsAndStyles(rawHtml);
  const bodyText = stripTags(noScripts);
  return [
    ...scanForPlaceholders(bodyText),
    ...scanForEmptyDateAttrs(rawHtml),
  ];
}
