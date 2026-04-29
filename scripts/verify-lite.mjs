#!/usr/bin/env node
/**
 * verify-lite.mjs — zero-dep sanity check for shipped HTML.
 *
 * Does NOT launch a browser. Pure static scan. Covers the 80% failure cases
 * the agent actually ships:
 *   - unresolved brace placeholders   `{ something }`
 *   - unresolved date tokens           YYYY / MM / DD / <year>
 *   - empty `data-ifq-year|month|day`  (attributes the runtime should fill)
 *   - obvious template leakage         e.g. literal `TODO:` in body text,
 *                                      lorem ipsum, `Your headline here`
 *
 * Use the heavier `scripts/verify.py` (Playwright) when you additionally need:
 *   - rendered-text scans (post JS execution)
 *   - console error capture
 *   - headless multi-viewport screenshots
 *
 * Usage:
 *   node scripts/verify-lite.mjs path/to/design.html [more.html ...]
 *   npm run verify:lite -- path/to/design.html
 *
 * Exit codes:
 *   0  clean
 *   1  one or more findings (or file error)
 */

import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { PATTERNS, EMPTY_DATE_ATTR, stripScriptsAndStyles, stripTags, clip } from './lib/lite-scanner.mjs';

const files = process.argv.slice(2).filter(a => !a.startsWith('--'));
if (!files.length) {
  console.error('Usage: node scripts/verify-lite.mjs <file.html> [more.html ...]');
  process.exit(1);
}

const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', RESET = '\x1b[0m', YELLOW = '\x1b[33m';

let totalFindings = 0;

for (const rel of files) {
  const abs = resolve(process.cwd(), rel);
  if (!existsSync(abs)) {
    console.error(`${RED}✗${RESET} file not found: ${abs}`);
    totalFindings++;
    continue;
  }
  const raw = await readFile(abs, 'utf8');
  const noScripts = stripScriptsAndStyles(raw);
  const bodyText = stripTags(noScripts);

  const findings = [];
  for (const [name, pattern] of PATTERNS) {
    pattern.lastIndex = 0;
    for (const m of bodyText.matchAll(pattern)) {
      const token = m[2] || m[0];
      const offset = m.index + (m[1] ? m[1].length : 0);
      findings.push({ kind: name, token, ctx: clip(bodyText, offset, offset + token.length) });
    }
  }
  for (const m of raw.matchAll(EMPTY_DATE_ATTR)) {
    findings.push({ kind: 'empty-ifq-date-attr', token: m[0].slice(0, 60), ctx: '(attr rendered empty — did runtime forget to stamp the date?)' });
  }

  console.log(`\n${DIM}→${RESET} ${basename(abs)}`);
  if (!findings.length) {
    console.log(`  ${GREEN}✓${RESET} clean (no placeholder leaks)`);
    continue;
  }
  totalFindings += findings.length;
  for (const f of findings.slice(0, 30)) {
    console.log(`  ${YELLOW}·${RESET} [${f.kind}] ${RED}${f.token}${RESET}  ${DIM}← ${f.ctx}${RESET}`);
  }
  if (findings.length > 30) console.log(`  ${DIM}... and ${findings.length - 30} more${RESET}`);
}

console.log('');
if (totalFindings === 0) {
  console.log(`${GREEN}✓ verify-lite: all clean${RESET}`);
  process.exit(0);
} else {
  console.log(`${RED}✗ verify-lite: ${totalFindings} findings — fix before shipping${RESET}`);
  console.log(`${DIM}Hint: run \`npm run preview -- <file.html>\` to eyeball the actual render.${RESET}`);
  process.exit(1);
}
