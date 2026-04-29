import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const pkg = JSON.parse(readFileSync(path.join(ROOT, 'package.json'), 'utf8'));

describe('quality-score', () => {
  it('produces valid JSON with all dimensions', () => {
    const out = execSync('node scripts/quality-score.mjs --json', { cwd: ROOT, encoding: 'utf8' });
    const report = JSON.parse(out);
    assert.equal(report.version, pkg.version);
    assert.ok(report.total);
    assert.ok(report.dimensions.Discovery);
    assert.ok(report.dimensions.Implementation);
    assert.ok(report.dimensions.Structure);
    assert.ok(report.dimensions.Expertise);
    assert.ok(report.dimensions.Security);
    for (const dim of Object.values(report.dimensions)) {
      assert.ok(typeof dim.score === 'number');
      assert.ok(typeof dim.max === 'number');
      assert.ok(typeof dim.percent === 'number');
      assert.ok(Array.isArray(dim.checks));
      assert.ok(dim.checks.length > 0);
    }
  });

  it('exits 0 when all checks pass', () => {
    assert.doesNotThrow(() => {
      execSync('node scripts/quality-score.mjs --json', { cwd: ROOT, encoding: 'utf8' });
    });
  });
});
