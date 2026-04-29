/**
 * lexer.mjs — Lightweight lexical sanity checks for JS and Python.
 *
 * Zero-dependency parsers that catch the most common syntax errors
 * without invoking a full AST parser. Used by smoke-test.mjs and tests.
 *
 * Design rationale:
 *   - JS lexer: hand-rolled state machine covering strings, template literals,
 *     regex literals, comments, and delimiter balancing. ~250 lines.
 *   - Python lexer: bracket balancing + triple-quote detection. ~30 lines.
 *   - Neither claims to be a full parser — they catch 95% of shipped bugs
 *     (unclosed strings, mismatched brackets) at zero dependency cost.
 */

function isIdentifierStart(char) {
  return /[A-Za-z_$]/.test(char);
}

function isIdentifierPart(char) {
  return /[A-Za-z0-9_$]/.test(char);
}

function isDigit(char) {
  return /[0-9]/.test(char);
}

function shouldStartRegex(lastToken) {
  return !new Set([
    'word',
    'number',
    'string',
    'template',
    'regex',
    'close-paren',
    'close-bracket',
    'close-brace',
    'plusplus',
    'minusminus',
  ]).has(lastToken);
}

/**
 * Check JS/ESM source for lexical sanity.
 * Returns { ok: true } or { ok: false, message: string }.
 */
export function checkJsLexical(source) {
  const text = source.replace(/^#![^\n]*\n?/, '');
  const delimiterStack = [];
  const modeStack = [{ type: 'code' }];
  let i = 0;
  let line = 1;
  let lastToken = 'start';

  const topMode = () => modeStack[modeStack.length - 1];
  const advance = (count = 1) => {
    for (let step = 0; step < count && i < text.length; step += 1) {
      if (text[i] === '\n') {
        line += 1;
      }
      i += 1;
    }
  };

  while (i < text.length) {
    const mode = topMode();
    const char = text[i];
    const next = text[i + 1];

    if (mode.type === 'line-comment') {
      if (char === '\n') {
        modeStack.pop();
      }
      advance();
      continue;
    }

    if (mode.type === 'block-comment') {
      if (char === '*' && next === '/') {
        modeStack.pop();
        advance(2);
        continue;
      }
      advance();
      continue;
    }

    if (mode.type === 'single-quote' || mode.type === 'double-quote') {
      if (char === '\\') {
        advance(Math.min(2, text.length - i));
        continue;
      }
      if ((mode.type === 'single-quote' && char === '\'') || (mode.type === 'double-quote' && char === '"')) {
        modeStack.pop();
        lastToken = 'string';
      }
      advance();
      continue;
    }

    if (mode.type === 'template') {
      if (char === '\\') {
        advance(Math.min(2, text.length - i));
        continue;
      }
      if (char === '`') {
        modeStack.pop();
        lastToken = 'template';
        advance();
        continue;
      }
      if (char === '$' && next === '{') {
        delimiterStack.push({ closer: '}', line, kind: 'template-expr' });
        modeStack.push({ type: 'code' });
        lastToken = 'start';
        advance(2);
        continue;
      }
      advance();
      continue;
    }

    if (mode.type === 'regex') {
      if (char === '\\') {
        advance(Math.min(2, text.length - i));
        continue;
      }
      if (char === '[') {
        modeStack.push({ type: 'regex-class', line });
        advance();
        continue;
      }
      if (char === '/') {
        advance();
        while (/[A-Za-z]/.test(text[i] || '')) {
          advance();
        }
        modeStack.pop();
        lastToken = 'regex';
        continue;
      }
      if (char === '\n') {
        return { ok: false, message: `unterminated regex literal near line ${line}` };
      }
      advance();
      continue;
    }

    if (mode.type === 'regex-class') {
      if (char === '\\') {
        advance(Math.min(2, text.length - i));
        continue;
      }
      if (char === ']') {
        modeStack.pop();
        advance();
        continue;
      }
      if (char === '\n') {
        return { ok: false, message: `unterminated regex character class near line ${line}` };
      }
      advance();
      continue;
    }

    if (/\s/.test(char)) {
      advance();
      continue;
    }

    if (char === '/' && next === '/') {
      modeStack.push({ type: 'line-comment', line });
      advance(2);
      continue;
    }

    if (char === '/' && next === '*') {
      modeStack.push({ type: 'block-comment', line });
      advance(2);
      continue;
    }

    if (char === '\'') {
      modeStack.push({ type: 'single-quote', line });
      advance();
      continue;
    }

    if (char === '"') {
      modeStack.push({ type: 'double-quote', line });
      advance();
      continue;
    }

    if (char === '`') {
      modeStack.push({ type: 'template', line });
      advance();
      continue;
    }

    if (char === '/' && shouldStartRegex(lastToken)) {
      modeStack.push({ type: 'regex', line });
      advance();
      continue;
    }

    if (char === '(') {
      delimiterStack.push({ closer: ')', line, kind: 'code' });
      lastToken = 'open-paren';
      advance();
      continue;
    }

    if (char === '[') {
      delimiterStack.push({ closer: ']', line, kind: 'code' });
      lastToken = 'open-bracket';
      advance();
      continue;
    }

    if (char === '{') {
      delimiterStack.push({ closer: '}', line, kind: 'code' });
      lastToken = 'open-brace';
      advance();
      continue;
    }

    if (char === ')' || char === ']' || char === '}') {
      const expected = delimiterStack.pop();
      if (!expected || expected.closer !== char) {
        return { ok: false, message: `unbalanced delimiter '${char}' near line ${line}` };
      }
      if (expected.kind === 'template-expr') {
        modeStack.pop();
        lastToken = 'template';
      } else {
        lastToken = char === ')' ? 'close-paren' : char === ']' ? 'close-bracket' : 'close-brace';
      }
      advance();
      continue;
    }

    if (char === '+' && next === '+') {
      lastToken = 'plusplus';
      advance(2);
      continue;
    }

    if (char === '-' && next === '-') {
      lastToken = 'minusminus';
      advance(2);
      continue;
    }

    if (isIdentifierStart(char)) {
      const start = i;
      advance();
      while (isIdentifierPart(text[i] || '')) {
        advance();
      }
      const word = text.slice(start, i);
      lastToken = new Set(['await', 'case', 'delete', 'else', 'in', 'instanceof', 'new', 'of', 'return', 'throw', 'typeof', 'void', 'yield']).has(word)
        ? word
        : 'word';
      continue;
    }

    if (isDigit(char)) {
      advance();
      while (/[0-9A-Fa-f_xXobOBn.eE]/.test(text[i] || '')) {
        advance();
      }
      lastToken = 'number';
      continue;
    }

    if (char === ',') {
      lastToken = 'comma';
      advance();
      continue;
    }

    if (char === ';') {
      lastToken = 'semi';
      advance();
      continue;
    }

    if (char === ':') {
      lastToken = 'colon';
      advance();
      continue;
    }

    if (char === '?') {
      lastToken = 'question';
      advance();
      continue;
    }

    lastToken = 'operator';
    advance();
  }

  while (topMode().type === 'line-comment') {
    modeStack.pop();
  }

  if (modeStack.length > 1) {
    const mode = topMode();
    const labels = {
      'block-comment': 'block comment',
      'single-quote': 'single-quoted string',
      'double-quote': 'double-quoted string',
      template: 'template literal',
      regex: 'regex literal',
      'regex-class': 'regex character class',
    };
    return { ok: false, message: `unterminated ${labels[mode.type] || mode.type} near line ${mode.line || line}` };
  }

  if (delimiterStack.length > 0) {
    const expected = delimiterStack[delimiterStack.length - 1];
    return { ok: false, message: `unclosed delimiter '${expected.closer}' opened near line ${expected.line}` };
  }

  return { ok: true };
}

/**
 * Lightweight Python lexical sanity: balanced triple-quotes and brackets.
 * Returns { ok: true } or { ok: false, message: string }.
 */
export function checkPythonLexical(source) {
  const triple = (source.match(/"""|'''/g) || []).length;
  if (triple % 2 !== 0) return { ok: false, message: 'unbalanced triple-quoted string' };
  const stack = [];
  const open = { '(': ')', '[': ']', '{': '}' };
  let inStr = null;
  for (let i = 0; i < source.length; i += 1) {
    const c = source[i];
    if (inStr) {
      if (c === '\\') { i += 1; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '#') {
      const nl = source.indexOf('\n', i);
      i = nl === -1 ? source.length : nl;
      continue;
    }
    if (c === '"' || c === "'") {
      if (source.startsWith(c.repeat(3), i)) { i += 2; const end = source.indexOf(c.repeat(3), i + 1); i = end === -1 ? source.length : end + 2; continue; }
      inStr = c;
      continue;
    }
    if (open[c]) { stack.push(open[c]); continue; }
    if (c === ')' || c === ']' || c === '}') {
      if (stack.pop() !== c) return { ok: false, message: `unbalanced bracket near offset ${i}` };
    }
  }
  if (stack.length) return { ok: false, message: 'unclosed bracket' };
  return { ok: true };
}
