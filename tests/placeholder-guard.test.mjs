import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { findPlaceholderFindings } from '../scripts/placeholder-guard.mjs';

describe('findPlaceholderFindings', () => {
  it('returns empty for clean text', () => {
    const blocks = [{ label: 'body', text: 'Hello world, no placeholders here.' }];
    assert.deepStrictEqual(findPlaceholderFindings(blocks), []);
  });

  it('returns empty for empty blocks', () => {
    assert.deepStrictEqual(findPlaceholderFindings([]), []);
    assert.deepStrictEqual(findPlaceholderFindings([{ label: 'body', text: '' }]), []);
    assert.deepStrictEqual(findPlaceholderFindings([{ label: 'body', text: '   ' }]), []);
  });

  it('detects brace placeholders', () => {
    const blocks = [{ label: 'body', text: 'Welcome to { BRAND } the future.' }];
    const findings = findPlaceholderFindings(blocks);
    assert.equal(findings.length, 1);
    assert.equal(findings[0].pattern, 'brace-placeholder');
    assert.equal(findings[0].token, '{ BRAND }');
  });

  it('detects YYYY year tokens', () => {
    const blocks = [{ label: 'body', text: 'Copyright YYYY by us.' }];
    const findings = findPlaceholderFindings(blocks);
    assert.equal(findings.length, 1);
    assert.equal(findings[0].pattern, 'year-token');
    assert.equal(findings[0].token, 'YYYY');
  });

  it('detects <year> tokens', () => {
    const blocks = [{ label: 'body', text: 'Copyright <year> by us.' }];
    const findings = findPlaceholderFindings(blocks);
    assert.equal(findings.length, 1);
    assert.equal(findings[0].pattern, 'year-token');
    assert.equal(findings[0].token, '<year>');
  });

  it('detects MM and DD tokens', () => {
    const blocks = [{ label: 'body', text: 'Date: MM/DD/YYYY' }];
    const findings = findPlaceholderFindings(blocks);
    assert.equal(findings.length, 3);
    const patterns = findings.map(f => f.pattern);
    assert.ok(patterns.includes('month-day-token'));
    assert.ok(patterns.includes('year-token'));
  });

  it('ignores patterns matching ignore list', () => {
    const blocks = [{ label: 'body', text: 'Copyright YYYY by us.' }];
    const ignore = [/YYYY/];
    const findings = findPlaceholderFindings(blocks, ignore);
    assert.equal(findings.length, 0);
  });

  it('handles multiple blocks', () => {
    const blocks = [
      { label: 'title', text: '{ TITLE }' },
      { label: 'body', text: 'Clean text here.' },
      { label: 'footer', text: 'YYYY' },
    ];
    const findings = findPlaceholderFindings(blocks);
    assert.equal(findings.length, 2);
  });

  it('does not false-positive on YYYY in words', () => {
    const blocks = [{ label: 'body', text: 'MyYYYYThing is cool.' }];
    // YYYY surrounded by letters should be ignored by the regex boundary check
    const findings = findPlaceholderFindings(blocks);
    assert.equal(findings.length, 0);
  });

  it('detects YYYY at start of text', () => {
    const blocks = [{ label: 'body', text: 'YYYY is the year.' }];
    const findings = findPlaceholderFindings(blocks);
    assert.equal(findings.length, 1);
    assert.equal(findings[0].token, 'YYYY');
  });

  it('handles null/undefined text gracefully', () => {
    const blocks = [
      { label: 'body', text: null },
      { label: 'body', text: undefined },
      { label: 'body', text: 'Clean.' },
    ];
    // null/undefined text should be skipped
    const findings = findPlaceholderFindings(blocks);
    assert.equal(findings.length, 0);
  });

  it('returns context snippet around findings', () => {
    const blocks = [{ label: 'body', text: 'The brand { BRAND } name is important for our identity.' }];
    const findings = findPlaceholderFindings(blocks);
    assert.equal(findings.length, 1);
    assert.ok(findings[0].context.length > 0);
    assert.ok(findings[0].context.includes('{ BRAND }'));
  });
});
