#!/usr/bin/env node
// IFQ Design Skills · smoke-test.mjs
// 60-second sanity check: template index, identity toolkit, icon sprite, references, script syntax, skills.sh publish spec.
// Usage: npm run smoke   (or: node scripts/smoke-test.mjs)

import { promises as fs } from 'node:fs';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', RESET = '\x1b[0m', BOLD = '\x1b[1m';
const ok = (msg) => console.log(`${GREEN}✓${RESET} ${msg}`);
const bad = (msg) => console.log(`${RED}✗${RESET} ${msg}`);
const info = (msg) => console.log(`${DIM}·${RESET} ${msg}`);

let failures = 0;
function fail(msg) { failures++; bad(msg); }

async function readJson(p) {
  return JSON.parse(await fs.readFile(p, 'utf8'));
}
async function readText(p) {
  return fs.readFile(p, 'utf8');
}

async function check1_TemplateIndex() {
  console.log(`\n${BOLD}[1/6] Template INDEX.json consistency${RESET}`);
  const indexPath = path.join(ROOT, 'assets/templates/INDEX.json');
  if (!existsSync(indexPath)) return fail(`missing ${indexPath}`);
  const index = await readJson(indexPath);
  if (!Array.isArray(index.templates)) return fail('INDEX.json.templates is not an array');
  let missing = 0;
  for (const t of index.templates) {
    const p = path.join(ROOT, t.file);
    if (!existsSync(p)) { fail(`  template file missing: ${t.file} (${t.id})`); missing++; }
  }
  if (missing === 0) ok(`all ${index.templates.length} templates present`);
}

async function check2_IdentityToolkit() {
  console.log(`\n${BOLD}[2/6] IFQ identity toolkit${RESET}`);
  const required = [
    'assets/ifq-brand/logo.svg',
    'assets/ifq-brand/logo-white.svg',
    'assets/ifq-brand/mark.svg',
    'assets/ifq-brand/ifq_brand.jsx',
    'assets/ifq-brand/icons/hand-drawn-icons.svg',
    'assets/ifq-brand/BRAND-DNA.md',
    'assets/ifq-brand/ifq-tokens.css',
    'references/ifq-brand-spec.md',
  ];
  let missing = 0;
  for (const f of required) {
    if (!existsSync(path.join(ROOT, f))) { fail(`  missing: ${f}`); missing++; }
  }
  if (missing === 0) ok(`all ${required.length} identity toolkit files present`);
}

async function check3_IconSprite() {
  console.log(`\n${BOLD}[3/6] Hand-drawn icon sprite${RESET}`);
  const spritePath = path.join(ROOT, 'assets/ifq-brand/icons/hand-drawn-icons.svg');
  if (!existsSync(spritePath)) return fail('sprite missing');
  const svg = await readText(spritePath);
  const ids = [...svg.matchAll(/<symbol[^>]+id="([^"]+)"/g)].map((m) => m[1]);
  if (ids.length < 24) return fail(`expected ≥ 24 symbols, found ${ids.length}`);
  ok(`${ids.length} symbols parsed (${ids.slice(0, 6).join(', ')}…)`);
}

async function check4_References() {
  console.log(`\n${BOLD}[4/6] References router targets${RESET}`);
  const skillMd = await readText(path.join(ROOT, 'SKILL.md'));
  const refs = new Set();
  for (const m of skillMd.matchAll(/references\/([\w-]+\.md)/g)) refs.add(m[1]);
  // Skip placeholder examples like "references/xxx.md" used in docs to denote "any reference file".
  const PLACEHOLDERS = new Set(['xxx.md', 'example.md', 'placeholder.md']);
  let missing = 0;
  for (const r of refs) {
    if (PLACEHOLDERS.has(r)) continue;
    if (!existsSync(path.join(ROOT, 'references', r))) { fail(`  references/${r} referenced but missing`); missing++; }
  }
  if (missing === 0) ok(`all ${refs.size} referenced files exist`);
}

async function check5_ScriptSyntax() {
  console.log(`\n${BOLD}[5/6] Script syntax${RESET}`);
  const scriptsDir = path.join(ROOT, 'scripts');
  if (!existsSync(scriptsDir)) return info('no scripts/ dir — skipped');
  const files = (await fs.readdir(scriptsDir)).filter((f) => /\.(mjs|cjs|js|py)$/.test(f) && !f.endsWith('.bak'));
  let failed = 0;
  for (const f of files) {
    const full = path.join(scriptsDir, f);
    let result;
    if (f.endsWith('.py')) {
      result = spawnSync('python3', ['-c', `import ast; ast.parse(open(${JSON.stringify(full)}).read())`], { encoding: 'utf8' });
    } else {
      result = spawnSync('node', ['--check', full], { encoding: 'utf8' });
    }
    if (result.status !== 0) {
      fail(`  ${f}: ${(result.stderr || '').split('\n')[0] || 'syntax error'}`);
      failed++;
    }
  }
  if (failed === 0) ok(`${files.length} scripts syntax-checked`);
}

// Mirrors vercel-labs/skills: parseSkillMd + WellKnownProvider.isValidSkillEntry.
// Keeps the repo publishable to skills.sh on every commit.
async function check6_PublishSpec() {
  console.log(`\n${BOLD}[6/6] skills.sh publish spec${RESET}`);
  const nameRegex = /^[a-z0-9]([a-z0-9-]{0,62}[a-z0-9])?$/;

  // SKILL.md frontmatter
  const skillMd = path.join(ROOT, 'SKILL.md');
  if (!existsSync(skillMd)) return fail('SKILL.md missing at repo root');
  const raw = await readText(skillMd);
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return fail('SKILL.md has no YAML frontmatter');
  const fm = m[1];
  const nameMatch = fm.match(/^name:\s*(.+)$/m);
  const descMatch = fm.match(/^description:\s*(.+)$/m);
  const name = nameMatch ? nameMatch[1].trim() : '';
  const desc = descMatch ? descMatch[1].trim() : '';
  if (!name || !nameRegex.test(name)) fail(`  SKILL.md name invalid: ${JSON.stringify(name)}`);
  if (!desc) fail('  SKILL.md description missing');

  // Well-known indices
  for (const rel of ['.well-known/agent-skills/index.json', '.well-known/skills/index.json']) {
    const p = path.join(ROOT, rel);
    if (!existsSync(p)) { fail(`  ${rel} missing`); continue; }
    let idx;
    try { idx = JSON.parse(await readText(p)); }
    catch { fail(`  ${rel}: invalid JSON`); continue; }
    if (!Array.isArray(idx.skills) || idx.skills.length === 0) { fail(`  ${rel}: missing skills[]`); continue; }
    for (const e of idx.skills) {
      const errs = [];
      if (typeof e.name !== 'string' || !e.name) errs.push('name');
      else if (e.name.length > 1 && !nameRegex.test(e.name)) errs.push('name-regex');
      if (typeof e.description !== 'string' || !e.description) errs.push('description');
      if (!Array.isArray(e.files) || e.files.length === 0) errs.push('files[]');
      else {
        if (!e.files.some((f) => typeof f === 'string' && f.toLowerCase() === 'skill.md')) errs.push('files-must-include-SKILL.md');
        for (const f of e.files) {
          if (typeof f !== 'string' || f.startsWith('/') || f.startsWith('\\') || f.includes('..')) errs.push(`unsafe-path:${f}`);
        }
      }
      if (errs.length) fail(`  ${rel} entry ${e.name || '(?)'}: ${errs.join(', ')}`);
    }
  }
  if (failures === 0) ok('SKILL.md + well-known indices conform to skills.sh spec');
}

(async () => {
  console.log(`${BOLD}IFQ Design Skills · smoke test${RESET}  ${DIM}(${ROOT})${RESET}`);
  await check1_TemplateIndex();
  await check2_IdentityToolkit();
  await check3_IconSprite();
  await check4_References();
  await check5_ScriptSyntax();
  await check6_PublishSpec();
  console.log('');
  if (failures === 0) {
    console.log(`${GREEN}${BOLD}✓ smoke test passed${RESET}`);
    process.exit(0);
  } else {
    console.log(`${RED}${BOLD}✗ ${failures} check(s) failed${RESET}`);
    process.exit(1);
  }
})().catch((e) => { bad(`smoke runner crashed: ${e.message}`); process.exit(2); });
