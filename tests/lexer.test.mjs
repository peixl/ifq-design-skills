import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { checkJsLexical, checkPythonLexical } from '../scripts/lib/lexer.mjs';

describe('checkJsLexical', () => {
  it('accepts valid JS code', () => {
    const code = `
      const x = 1;
      function hello(name) {
        return \`Hello, \${name}!\`;
      }
      const arr = [1, 2, 3];
      const obj = { a: 1, b: 2 };
      // comment
      /* block comment */
      const regex = /test/gi;
    `;
    assert.deepStrictEqual(checkJsLexical(code), { ok: true });
  });

  it('accepts empty source', () => {
    assert.deepStrictEqual(checkJsLexical(''), { ok: true });
    assert.deepStrictEqual(checkJsLexical('   \n  \n  '), { ok: true });
  });

  it('accepts shebang lines', () => {
    assert.deepStrictEqual(checkJsLexical('#!/usr/bin/node\nconst x = 1;'), { ok: true });
  });

  it('detects unterminated single-quoted string', () => {
    const result = checkJsLexical("const x = 'unterminated");
    assert.equal(result.ok, false);
    assert.match(result.message, /unterminated.*single/i);
  });

  it('detects unterminated double-quoted string', () => {
    const result = checkJsLexical('const x = "unterminated');
    assert.equal(result.ok, false);
    assert.match(result.message, /unterminated.*double/i);
  });

  it('detects unterminated template literal', () => {
    const result = checkJsLexical('const x = `unterminated');
    assert.equal(result.ok, false);
    assert.match(result.message, /unterminated.*template/i);
  });

  it('detects unterminated block comment', () => {
    const result = checkJsLexical('/* unterminated comment');
    assert.equal(result.ok, false);
    assert.match(result.message, /unterminated.*block/i);
  });

  it('detects unbalanced parentheses', () => {
    const result = checkJsLexical('const x = (1 + 2;');
    assert.equal(result.ok, false);
    assert.match(result.message, /unclosed delimiter/i);
  });

  it('detects unbalanced brackets', () => {
    const result = checkJsLexical('const x = [1, 2, 3;');
    assert.equal(result.ok, false);
    assert.match(result.message, /unclosed delimiter/i);
  });

  it('detects unbalanced braces', () => {
    const result = checkJsLexical('const x = { a: 1;');
    assert.equal(result.ok, false);
    assert.match(result.message, /unclosed delimiter/i);
  });

  it('detects mismatched closing delimiter', () => {
    const result = checkJsLexical('const x = (1 + 2];');
    assert.equal(result.ok, false);
    assert.match(result.message, /unbalanced delimiter/i);
  });

  it('handles template literals with expressions', () => {
    assert.deepStrictEqual(
      checkJsLexical('const x = `hello ${name} world`;'),
      { ok: true }
    );
  });

  it('handles nested template expressions', () => {
    assert.deepStrictEqual(
      checkJsLexical('const x = `outer ${`inner ${x}`} end`;'),
      { ok: true }
    );
  });

  it('handles regex vs division disambiguation', () => {
    // After number, / is division
    assert.deepStrictEqual(checkJsLexical('const x = 10 / 2;'), { ok: true });
    // After operator, / starts regex
    assert.deepStrictEqual(checkJsLexical('const x = a / test/g;'), { ok: true });
    // After = , / starts regex
    assert.deepStrictEqual(checkJsLexical('const x = /test/gi;'), { ok: true });
  });

  it('handles regex with character classes', () => {
    assert.deepStrictEqual(checkJsLexical('const x = /[a-z]+/gi;'), { ok: true });
  });

  it('handles escaped quotes in strings', () => {
    assert.deepStrictEqual(checkJsLexical("const x = 'it\\'s fine';"), { ok: true });
    assert.deepStrictEqual(checkJsLexical('const x = "say \\"hello\\"";'), { ok: true });
  });

  it('handles multi-line code with mixed constructs', () => {
    const code = `
      import { readFile } from 'node:fs';
      const x = 42;
      const s = \`template \${x}\`;
      const r = /pattern/gi;
      function f(a, b) {
        return [a, { c: b }];
      }
      /* comment */
      // line comment
    `;
    assert.deepStrictEqual(checkJsLexical(code), { ok: true });
  });

  it('handles increment/decrement operators', () => {
    assert.deepStrictEqual(checkJsLexical('i++; j--;'), { ok: true });
  });

  it('handles arrow functions', () => {
    assert.deepStrictEqual(checkJsLexical('const f = (x) => x + 1;'), { ok: true });
  });

  it('handles ternary operator', () => {
    assert.deepStrictEqual(checkJsLexical('const x = a ? b : c;'), { ok: true });
  });

  it('handles keywords that affect regex detection', () => {
    assert.deepStrictEqual(checkJsLexical('return /test/;'), { ok: true });
    assert.deepStrictEqual(checkJsLexical('throw /test/;'), { ok: true });
    assert.deepStrictEqual(checkJsLexical('typeof /test/;'), { ok: true });
    assert.deepStrictEqual(checkJsLexical('yield /test/;'), { ok: true });
  });
});

describe('checkPythonLexical', () => {
  it('accepts valid Python code', () => {
    const code = `
import os

def hello(name):
    """Say hello."""
    return f"Hello, {name}!"

x = [1, 2, 3]
y = {"a": 1, "b": 2}
# comment
`;
    assert.deepStrictEqual(checkPythonLexical(code), { ok: true });
  });

  it('accepts empty source', () => {
    assert.deepStrictEqual(checkPythonLexical(''), { ok: true });
  });

  it('detects unbalanced parentheses', () => {
    const result = checkPythonLexical('x = (1 + 2');
    assert.equal(result.ok, false);
    assert.match(result.message, /unclosed bracket/i);
  });

  it('detects unbalanced brackets', () => {
    const result = checkPythonLexical('x = [1, 2, 3');
    assert.equal(result.ok, false);
    assert.match(result.message, /unclosed bracket/i);
  });

  it('detects unbalanced braces', () => {
    const result = checkPythonLexical('x = {"a": 1');
    assert.equal(result.ok, false);
    assert.match(result.message, /unclosed bracket/i);
  });

  it('detects mismatched closing bracket', () => {
    const result = checkPythonLexical('x = (1 + 2]');
    assert.equal(result.ok, false);
    assert.match(result.message, /unbalanced bracket/i);
  });

  it('detects unbalanced triple-quoted strings', () => {
    const result = checkPythonLexical('x = """unterminated');
    assert.equal(result.ok, false);
    assert.match(result.message, /unbalanced triple/i);
  });

  it('handles triple double-quoted strings', () => {
    assert.deepStrictEqual(
      checkPythonLexical('x = """hello"""'),
      { ok: true }
    );
  });

  it('handles triple single-quoted strings', () => {
    assert.deepStrictEqual(
      checkPythonLexical("x = '''hello'''"),
      { ok: true }
    );
  });

  it('handles comments with brackets', () => {
    // Brackets in comments should be ignored
    assert.deepStrictEqual(checkPythonLexical('# ( [ {'), { ok: true });
  });

  it('handles strings with brackets', () => {
    assert.deepStrictEqual(checkPythonLexical('x = "([{"'), { ok: true });
    assert.deepStrictEqual(checkPythonLexical("x = '([{'"), { ok: true });
  });

  it('handles escaped quotes in strings', () => {
    assert.deepStrictEqual(checkPythonLexical("x = 'it\\'s'"), { ok: true });
  });

  it('handles nested brackets', () => {
    assert.deepStrictEqual(checkPythonLexical('x = {("a"): [1, 2]}'), { ok: true });
  });

  it('handles complex real-world Python', () => {
    const code = `
import json

def process(data: dict) -> list:
    """Process input data and return results."""
    results = []
    for key, value in data.items():
        if isinstance(value, dict):
            results.append({key: process(value)})
        else:
            results.append([key, value])
    return results

# This has brackets in a comment: (see docs)
`;
    assert.deepStrictEqual(checkPythonLexical(code), { ok: true });
  });
});
