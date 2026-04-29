import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  stripScriptsAndStyles,
  stripTags,
  scanForPlaceholders,
  scanForEmptyDateAttrs,
  scanHtml,
} from '../scripts/lib/lite-scanner.mjs';

describe('stripScriptsAndStyles', () => {
  it('removes script tags', () => {
    const html = '<p>Hello</p><script>alert("xss")</script><p>World</p>';
    const result = stripScriptsAndStyles(html);
    assert.ok(!result.includes('alert'));
    assert.ok(result.includes('Hello'));
    assert.ok(result.includes('World'));
  });

  it('removes style tags', () => {
    const html = '<p>Hello</p><style>body { color: red; }</style><p>World</p>';
    const result = stripScriptsAndStyles(html);
    assert.ok(!result.includes('color'));
    assert.ok(result.includes('Hello'));
  });

  it('removes HTML comments', () => {
    const html = '<p>Hello</p><!-- comment --><p>World</p>';
    const result = stripScriptsAndStyles(html);
    assert.ok(!result.includes('comment'));
    assert.ok(result.includes('Hello'));
  });

  it('handles multiline scripts', () => {
    const html = '<script>\nconst x = 1;\nconsole.log(x);\n</script>';
    const result = stripScriptsAndStyles(html);
    assert.ok(!result.includes('console'));
  });

  it('handles case-insensitive tags', () => {
    const html = '<SCRIPT>alert(1)</SCRIPT><STYLE>.x{}</STYLE>';
    const result = stripScriptsAndStyles(html);
    assert.ok(!result.includes('alert'));
    assert.ok(!result.includes('.x'));
  });
});

describe('stripTags', () => {
  it('removes HTML tags', () => {
    assert.equal(stripTags('<p>Hello</p>'), ' Hello ');
    assert.equal(stripTags('<div class="x">Text</div>'), ' Text ');
  });

  it('handles self-closing tags', () => {
    assert.equal(stripTags('A<br/>B'), 'A B');
  });

  it('handles nested tags', () => {
    assert.equal(stripTags('<div><span>Deep</span></div>'), '  Deep  ');
  });
});

describe('scanForPlaceholders', () => {
  it('detects brace placeholders in text', () => {
    const findings = scanForPlaceholders('Welcome to { BRAND } our site.');
    assert.equal(findings.length, 1);
    assert.equal(findings[0].kind, 'brace-placeholder');
    assert.equal(findings[0].token, '{ BRAND }');
  });

  it('detects YYYY year token', () => {
    const findings = scanForPlaceholders('Copyright YYYY');
    assert.equal(findings.length, 1);
    assert.equal(findings[0].kind, 'year-token');
  });

  it('detects MM and DD tokens', () => {
    const findings = scanForPlaceholders('MM/DD/YYYY');
    assert.equal(findings.length, 3);
  });

  it('detects lorem ipsum', () => {
    const findings = scanForPlaceholders('Lorem ipsum dolor sit amet.');
    assert.equal(findings.length, 1);
    assert.equal(findings[0].kind, 'lorem-ipsum');
  });

  it('detects template stubs', () => {
    assert.equal(scanForPlaceholders('Your headline here').length, 1);
    assert.equal(scanForPlaceholders('Replace me').length, 1);
    assert.equal(scanForPlaceholders('TODO: fix this').length, 1);
  });

  it('detects IFQ taxonomy leaks', () => {
    const findings = scanForPlaceholders('This uses SIGNAL SPARK as a mark.');
    assert.equal(findings.length, 1);
    assert.equal(findings[0].kind, 'ifq-taxonomy-leak');
  });

  it('returns empty for clean text', () => {
    assert.deepStrictEqual(scanForPlaceholders('This is clean text with no issues.'), []);
  });

  it('handles multiple findings in one text', () => {
    const findings = scanForPlaceholders('{ BRAND } YYYY Lorem ipsum');
    assert.ok(findings.length >= 3);
  });
});

describe('scanForEmptyDateAttrs', () => {
  it('detects empty data-ifq-year', () => {
    const html = '<span data-ifq-year></span>';
    const findings = scanForEmptyDateAttrs(html);
    assert.equal(findings.length, 1);
    assert.equal(findings[0].kind, 'empty-ifq-date-attr');
  });

  it('detects empty data-ifq-year with whitespace', () => {
    const html = '<span data-ifq-year>  </span>';
    const findings = scanForEmptyDateAttrs(html);
    assert.equal(findings.length, 1);
  });

  it('ignores filled date attrs', () => {
    const html = '<span data-ifq-year>2026</span>';
    const findings = scanForEmptyDateAttrs(html);
    assert.equal(findings.length, 0);
  });

  it('detects multiple empty date attrs', () => {
    const html = '<span data-ifq-year></span><span data-ifq-month></span><span data-ifq-day></span>';
    const findings = scanForEmptyDateAttrs(html);
    assert.equal(findings.length, 3);
  });
});

describe('scanHtml', () => {
  it('combines all scans on raw HTML', () => {
    const html = `
      <!doctype html>
      <html lang="zh-CN">
      <head><meta charset="utf-8"/></head>
      <body>
        <h1>{ BRAND }</h1>
        <p>Lorem ipsum dolor sit amet.</p>
        <span data-ifq-year></span>
      </body>
      </html>
    `;
    const findings = scanHtml(html);
    const kinds = new Set(findings.map(f => f.kind));
    assert.ok(kinds.has('brace-placeholder'));
    assert.ok(kinds.has('lorem-ipsum'));
    assert.ok(kinds.has('empty-ifq-date-attr'));
  });

  it('returns empty for clean HTML', () => {
    const html = `
      <!doctype html>
      <html lang="zh-CN">
      <head><meta charset="utf-8"/></head>
      <body>
        <h1>Welcome</h1>
        <p>This is a clean page with no placeholders.</p>
        <span data-ifq-year>2026</span>
      </body>
      </html>
    `;
    assert.deepStrictEqual(scanHtml(html), []);
  });
});
