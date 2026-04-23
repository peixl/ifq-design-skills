#!/usr/bin/env node
// IFQ Design Skills · smoke-test.mjs
// 60-second sanity check: template index, identity toolkit, icon sprite, references, script syntax,
// placeholder leaks in shipped HTML, skills.sh publish spec.
// Usage: npm run smoke   (or: node scripts/smoke-test.mjs)

import { promises as fs } from 'node:fs';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { createRequire } from 'node:module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const require = createRequire(import.meta.url);

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

function stripVisibleText(markup) {
  return markup
    .replace(/<(section|div|article)[^>]*class=["'][^"']*\b(code|terminal|snippet|example)\b[^"']*["'][^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<(pre|code)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&#183;|&middot;/gi, '·')
    .replace(/&#8470;/gi, '№')
    .replace(/\s+/g, ' ')
    .trim();
}

function clipContext(text, start, end, radius = 36) {
  return text.slice(Math.max(0, start - radius), Math.min(text.length, end + radius)).trim();
}

const SHIPPED_PLACEHOLDER_PATTERNS = [
  ['brace-placeholder', /\{[^{}\n]{1,120}\}/g],
  ['year-token', /(^|[^A-Za-z0-9_])(YYYY|<year>)(?=$|[^A-Za-z0-9_])/g],
  ['month-day-token', /(^|[^A-Za-z0-9_])(MM|DD)(?=$|[^A-Za-z0-9_])/g],
];

const IFQ_DATE_ATTR_PATTERN = /data-ifq-(year|month|day)/;
const IFQ_DATE_SOURCE_PATTERN = /IFQ_CREATION_DATE|data-ifq-created-at|ifq:created-at/;
const IFQ_DATE_ASSIGN_PATTERN = /querySelectorAll\(\s*['"`]\[data-ifq-|querySelectorAll\(\s*`\[data-ifq-\$\{/;
const IFQ_YEAR_RESOLVER_PATTERN = /getFullYear\(|year\s*:/;
const IFQ_MONTH_RESOLVER_PATTERN = /getMonth\(|month\s*:/;
const IFQ_DAY_RESOLVER_PATTERN = /getDate\(|day\s*:/;
const IFQ_IMPLICIT_STRING_DATE_PATTERN = /new Date\(candidate\)|value instanceof Date\s*\?\s*value\s*:\s*new Date\(value\)/;

function findPlaceholderLeaks(text) {
  const findings = [];
  for (const [name, pattern] of SHIPPED_PLACEHOLDER_PATTERNS) {
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) {
      const token = match[2] || match[0];
      const offset = match.index + (match[1] ? match[1].length : 0);
      findings.push({
        pattern: name,
        token,
        context: clipContext(text, offset, offset + token.length),
      });
    }
  }
  return findings;
}

async function walkHtmlFiles(rootDir) {
  const files = [];

  async function walk(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        files.push(fullPath);
      }
    }
  }

  await walk(rootDir);
  return files;
}

// Pure-Node JS syntax check: parses the source with vm.Script so we never
// execute the file. `vm.Script` only runs the V8 parser; no I/O, no
// network, no sub-processes. It is script-mode only, so for ESM we first
// strip top-level `import` / `export` statements via a small regex pass.
// This still catches 99% of real-world syntax mistakes (unclosed braces,
// bad operators, stray characters) and costs nothing at runtime.
function stripEsmSyntax(source) {
  return source
    // `import ... from '...';` / `import '...';` (multiline allowed)
    .replace(/^\s*import\s+[\s\S]+?from\s+['"][^'"]+['"]\s*;?\s*$/gm, '')
    .replace(/^\s*import\s+['"][^'"]+['"]\s*;?\s*$/gm, '')
    // `export default` → nothing (leave the expression)
    .replace(/^\s*export\s+default\s+/gm, '')
    // `export { ... } from '...';`
    .replace(/^\s*export\s*\{[\s\S]+?\}\s*(?:from\s+['"][^'"]+['"])?\s*;?\s*$/gm, '')
    // `export const|let|var|function|class|async function` → drop the keyword
    .replace(/^\s*export\s+(?=(?:const|let|var|function|class|async)\b)/gm, '')
    // `import.meta.xyz` — replace the whole meta expression with a stub ident
    .replace(/\bimport\.meta\b/g, '(void 0)');
}

function checkJsSyntax(source, filename) {
  // Strip shebang — legal only at file start, illegal inside the IIFE wrap.
  const noShebang = source.replace(/^#![^\n]*\n?/, '');
  const isEsm = /\.mjs$/i.test(filename) || /^\s*(?:import|export)\b/m.test(noShebang);
  let prepared = isEsm ? stripEsmSyntax(noShebang) : noShebang;
  if (isEsm) {
    // Wrap in an async IIFE so top-level `await` parses as legal script syntax.
    prepared = `(async () => {\n${prepared}\n})();`;
  }
  try {
    // eslint-disable-next-line no-new
    new vm.Script(prepared, { filename, displayErrors: false });
    return { ok: true };
  } catch (err) {
    return { ok: false, message: err && err.message ? err.message.split('\n')[0] : String(err) };
  }
}

// Lightweight Python lexical sanity: balanced triple-quotes and brackets.
// A real AST check would require invoking python; we skip that to stay
// zero-dependency and free of any process-spawning code paths. The
// authoritative check for verify.py lives in its own runtime.
function checkPythonLexical(source) {
  const triple = (source.match(/"""|'''/g) || []).length;
  if (triple % 2 !== 0) return { ok: false, message: 'unbalanced triple-quoted string' };
  const stack = [];
  const open = { '(': ')', '[': ']', '{': '}' };
  let inStr = null; // '\'' | '"' | null
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
    const source = await readText(full);
    const result = f.endsWith('.py') ? checkPythonLexical(source) : checkJsSyntax(source, f);
    if (!result.ok) {
      fail(`  ${f}: ${result.message || 'syntax error'}`);
      failed++;
    }
  }
  if (failed === 0) ok(`${files.length} scripts syntax-checked`);
}

async function check6_NoPlaceholderLeaks() {
  console.log(`\n${BOLD}[6/9] Shipped HTML placeholder leaks${RESET}`);
  const targetRoots = [
    path.join(ROOT, 'demos'),
    path.join(ROOT, 'assets', 'showcases'),
  ];

  const findings = [];
  for (const targetRoot of targetRoots) {
    if (!existsSync(targetRoot)) continue;
    const htmlFiles = await walkHtmlFiles(targetRoot);
    for (const filePath of htmlFiles) {
      const raw = await readText(filePath);
      const visibleText = stripVisibleText(raw);
      const fileFindings = findPlaceholderLeaks(visibleText);
      if (fileFindings.length > 0) {
        findings.push({
          filePath,
          finding: fileFindings[0],
        });
      }
    }
  }

  if (findings.length === 0) {
    ok('demos/ and assets/showcases/ have no leaked YYYY-style placeholders');
    return;
  }

  for (const { filePath, finding } of findings) {
    fail(`  ${path.relative(ROOT, filePath)}: ${finding.token} ← ${finding.context}`);
  }
}

async function check7_IfqDateResolverCoverage() {
  console.log(`\n${BOLD}[7/9] IFQ date resolver coverage${RESET}`);
  const targetRoots = [
    path.join(ROOT, 'assets', 'templates'),
    path.join(ROOT, 'demos'),
    path.join(ROOT, 'assets', 'showcases'),
  ];

  let checked = 0;
  for (const targetRoot of targetRoots) {
    if (!existsSync(targetRoot)) continue;
    const htmlFiles = await walkHtmlFiles(targetRoot);
    for (const filePath of htmlFiles) {
      const raw = await readText(filePath);
      if (!IFQ_DATE_ATTR_PATTERN.test(raw)) {
        continue;
      }

      checked += 1;
      const missing = [];
      if (!IFQ_DATE_SOURCE_PATTERN.test(raw)) missing.push('creation-date source');
      if (!IFQ_DATE_ASSIGN_PATTERN.test(raw)) missing.push('data-ifq assignment');
      if (raw.includes('data-ifq-year') && !IFQ_YEAR_RESOLVER_PATTERN.test(raw)) missing.push('year resolver');
      if (raw.includes('data-ifq-month') && !IFQ_MONTH_RESOLVER_PATTERN.test(raw)) missing.push('month resolver');
      if (raw.includes('data-ifq-day') && !IFQ_DAY_RESOLVER_PATTERN.test(raw)) missing.push('day resolver');
      if (IFQ_IMPLICIT_STRING_DATE_PATTERN.test(raw)) missing.push('explicit date parsing');

      if (missing.length > 0) {
        fail(`  ${path.relative(ROOT, filePath)}: missing ${missing.join(', ')}`);
      }
    }
  }

  if (checked > 0 && failures === 0) ok(`${checked} HTML files with data-ifq-* include resolver logic`);
}

async function check8_PlaceholderGuardBehavior() {
  console.log(`\n${BOLD}[8/9] Placeholder guard behavior${RESET}`);
  const { assertNoPlaceholderLeaksInPage } = require(path.join(ROOT, 'scripts', 'placeholder-guard.cjs'));

  const fakePage = {
    async evaluate(fn, arg) {
      if (typeof arg === 'string') {
        return [{ label: 'body', text: 'ifq.ai / 2026' }];
      }

      if (Array.isArray(arg)) {
        return [{ token: 'data-ifq-year', value: '', context: 'ifq.ai / ' }];
      }

      throw new Error('unexpected evaluate signature');
    },
  };

  try {
    await assertNoPlaceholderLeaksInPage(fakePage, { label: 'smoke-fixture.html' });
    fail('  placeholder-guard.cjs should fail when data-ifq-year is empty');
  } catch (error) {
    if (!/\[data-ifq-year\]/.test(error.message)) {
      fail(`  placeholder-guard.cjs returned unexpected error: ${error.message.split('\n')[0]}`);
      return;
    }
    ok('placeholder-guard.cjs rejects empty data-ifq-year tokens');
  }
}

// Mirrors vercel-labs/skills: parseSkillMd + WellKnownProvider.isValidSkillEntry.
// Keeps the repo publishable to skills.sh on every commit.
async function check7_PublishSpec() {
  console.log(`\n${BOLD}[9/9] skills.sh publish spec${RESET}`);
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
  await check6_NoPlaceholderLeaks();
  await check7_IfqDateResolverCoverage();
  await check8_PlaceholderGuardBehavior();
  await check7_PublishSpec();
  console.log('');
  if (failures === 0) {
    console.log(`${GREEN}${BOLD}✓ smoke test passed${RESET}`);
    process.exit(0);
  } else {
    console.log(`${RED}${BOLD}✗ ${failures} check(s) failed${RESET}`);
    process.exit(1);
  }
})().catch((e) => { bad(`smoke runner crashed: ${e.message}`); process.exit(2); });
