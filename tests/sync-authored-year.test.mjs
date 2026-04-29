import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

describe('sync-authored-year', () => {
  it('exits 0 when year is already synced (--check mode)', () => {
    assert.doesNotThrow(() => {
      execSync('node scripts/sync-authored-year.mjs --check', { cwd: ROOT, encoding: 'utf8' });
    });
  });

  it('outputs confirmation message in --check mode', () => {
    const out = execSync('node scripts/sync-authored-year.mjs --check', { cwd: ROOT, encoding: 'utf8' });
    assert.ok(out.includes('synced') || out.includes('already') || out.includes('2026'));
  });
});
