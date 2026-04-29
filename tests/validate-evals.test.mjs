import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

describe('validate-evals', () => {
  it('exits 0 when evals are valid', () => {
    assert.doesNotThrow(() => {
      execSync('node scripts/validate-evals.mjs', { cwd: ROOT, encoding: 'utf8' });
    });
  });

  it('confirms all modes covered', () => {
    const out = execSync('node scripts/validate-evals.mjs', { cwd: ROOT, encoding: 'utf8' });
    assert.ok(out.includes('validated') || out.includes('covered'));
  });
});
