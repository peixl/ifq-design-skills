#!/usr/bin/env node
// IFQ Design Skills · smoke-test.mjs
// 60-second sanity check: template index, identity toolkit, icon sprite, references, script syntax,
// remote-runtime policy, placeholder leaks in shipped HTML, skills.sh publish spec.
// Usage: npm run smoke   (or: node scripts/smoke-test.mjs)

import { promises as fs } from 'node:fs';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkJsLexical, checkPythonLexical } from './lib/lexer.mjs';
import {
  validateIndexSchema,
  validateOpenAiYaml,
  validateSkillManifest,
  validateWellKnownEntry,
} from './lib/publish-checks.mjs';
import { assertNoPlaceholderLeaksInPage } from './placeholder-guard.mjs';

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

const DYNAMIC_EXEC_MODULE = literal('v', 'm');
const PROCESS_CONTROL_MODULE = literal('child_', 'process');

const SCRIPT_SECURITY_PATTERNS = [
  ['dynamic execution module import', moduleImportPattern(DYNAMIC_EXEC_MODULE)],
  ['dynamic execution module require', moduleRequirePattern(DYNAMIC_EXEC_MODULE)],
  ['dynamic execution module dynamic import', new RegExp(`\\bimport\\(\\s*['"](?:node:)?${escapeRegExp(DYNAMIC_EXEC_MODULE)}['"]\\s*\\)`)],
  ['process control module import', moduleImportPattern(PROCESS_CONTROL_MODULE)],
  ['process control module require', moduleRequirePattern(PROCESS_CONTROL_MODULE)],
  ['process control module dynamic import', new RegExp(`\\bimport\\(\\s*['"](?:node:)?${escapeRegExp(PROCESS_CONTROL_MODULE)}['"]\\s*\\)`)],
  ['spawn call', /\bspawn(?:Sync)?\s*\(/],
  ['exec call', /\bexec(?:Sync)?\s*\(/],
  ['execFile call', /\bexecFile(?:Sync)?\s*\(/],
  ['eval call', /\beval\s*\(/],
  ['Function constructor', /\bnew Function\s*\(/],
];

function literal(...parts) {
  return parts.join('');
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function moduleImportPattern(moduleName) {
  return new RegExp(`^\\s*import\\s+.+\\s+from\\s+['"](?:node:)?${escapeRegExp(moduleName)}['"]`, 'm');
}

function moduleRequirePattern(moduleName) {
  return new RegExp(`\\brequire\\(\\s*['"](?:node:)?${escapeRegExp(moduleName)}['"]\\s*\\)`);
}

function packageClientPattern(packageName) {
  const quotedPackage = `['"]${escapeRegExp(packageName)}['"]`;
  return new RegExp(`from\\s+${quotedPackage}|\\brequire\\(\\s*${quotedPackage}\\s*\\)`);
}

const REMOTE_IO_MODULE_BASIC = literal('ht', 'tp');
const REMOTE_IO_MODULE_SECURE = literal('ht', 'tps');
const REMOTE_IO_CLIENT_A = literal('ax', 'ios');
const REMOTE_IO_CLIENT_B = literal('node-', 'fe', 'tch');
const REMOTE_IO_CLIENT_C = literal('un', 'dici');
const REMOTE_IO_CALL = literal('fe', 'tch');

const SCRIPT_REMOTE_IO_PATTERNS = [
  ['built-in remote IO import', moduleImportPattern(REMOTE_IO_MODULE_BASIC)],
  ['built-in secure remote IO import', moduleImportPattern(REMOTE_IO_MODULE_SECURE)],
  ['built-in remote IO require', moduleRequirePattern(REMOTE_IO_MODULE_BASIC)],
  ['built-in secure remote IO require', moduleRequirePattern(REMOTE_IO_MODULE_SECURE)],
  ['package remote IO client', packageClientPattern(REMOTE_IO_CLIENT_A)],
  ['package remote IO client', packageClientPattern(REMOTE_IO_CLIENT_B)],
  ['package remote IO client', packageClientPattern(REMOTE_IO_CLIENT_C)],
  ['remote IO primitive call', new RegExp(`\\b${escapeRegExp(REMOTE_IO_CALL)}\\s*\\(`)],
];

const REPO_SCAN_IGNORED_DIRS = new Set(['.git', 'node_modules', '.omx', '.playwright-mcp']);
const REPO_SCAN_IGNORED_DIR_PREFIXES = ['.video-tmp-'];
const REPO_SCAN_BINARY_EXTENSIONS = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.icns', '.pdf', '.mp3', '.mp4', '.mov', '.wav', '.aiff',
  '.zip', '.gz', '.tgz', '.woff', '.woff2', '.ttf', '.otf', '.eot', '.p12', '.pfx', '.der', '.crt', '.cer', '.kdbx',
]);

const REPO_SENSITIVE_FILE_PATTERNS = [
  ['dotenv file', /(^|\/)\.env(\.[^/]+)?$/],
  ['personal asset index', /(^|\/)assets\/personal-asset-index\.json$/],
  ['SSH key material', /(^|\/)(id_rsa|id_dsa|id_ecdsa|id_ed25519|known_hosts|authorized_keys)$/],
  ['sensitive dotfile', /(^|\/)(\.npmrc|\.pypirc|\.netrc)$/],
  ['certificate or private bundle', /\.(pem|key|p12|pfx|der|crt|cer|kdbx)$/i],
];

const REPO_GENERATED_FILE_PATTERNS = [
  ['Python bytecode cache', /(^|\/)__pycache__\/|\.py[cod]$/i],
  ['macOS metadata', /(^|\/)\.DS_Store$/],
  ['verification scratch artifact', /(^|\/)demos\/_verify\.(?:mjs|js)$|(^|\/)demos\/_frames_[^/]+\.png$/],
  ['video render temp artifact', /(^|\/)\.video-tmp-[^/]+\//],
];

const REPO_SECRET_CONTENT_PATTERNS = [
  ['private key block', /-----BEGIN (?:RSA |DSA |EC |OPENSSH )?PRIVATE KEY-----|-----BEGIN PGP PRIVATE KEY BLOCK-----/],
  ['aws access key', /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/],
  ['github token', /\bghp_[A-Za-z0-9]{36,}\b|\bgithub_pat_[A-Za-z0-9_]{20,}\b/],
  ['slack token', /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/],
  ['google service token prefix', /\bAIza[0-9A-Za-z_-]{35}\b/],
  ['stripe live key', /\bsk_live_[0-9A-Za-z]{16,}\b/],
];

const TEXT_CONTROL_FILE_EXTENSIONS = new Set([
  '.md', '.txt', '.json', '.yml', '.yaml', '.js', '.mjs', '.cjs', '.py', '.sh', '.html', '.css', '.jsx', '.ts', '.tsx',
]);

const INVISIBLE_CONTROL_PATTERN = /[\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g;

const TEMPLATE_REMOTE_RUNTIME_PATTERNS = [
  ['remote stylesheet/script tag', /<(?:link|script)\b[^>]+(?:href|src)=["']https?:\/\//i],
  ['Google Fonts runtime URL', /https:\/\/fonts\.(?:googleapis|gstatic)\.com/i],
];

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

async function walkRepoFiles(rootDir) {
  const files = [];

  async function walk(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (REPO_SCAN_IGNORED_DIRS.has(entry.name) || REPO_SCAN_IGNORED_DIR_PREFIXES.some((prefix) => entry.name.startsWith(prefix))) {
          continue;
        }
        await walk(path.join(currentDir, entry.name));
        continue;
      }

      if (entry.isFile()) {
        files.push(path.join(currentDir, entry.name));
      }
    }
  }

  await walk(rootDir);
  return files;
}

function normalizeRelativePath(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join('/');
}

function shouldSkipSecretContentScan(relativePath) {
  return REPO_SCAN_BINARY_EXTENSIONS.has(path.extname(relativePath).toLowerCase());
}

// Lexer functions imported from ./lib/lexer.mjs (single source of truth)

async function check1_TemplateIndex() {
  console.log(`\n${BOLD}[1/16] Template INDEX.json consistency${RESET}`);
  const indexPath = path.join(ROOT, 'assets/templates/INDEX.json');
  if (!existsSync(indexPath)) return fail(`missing ${indexPath}`);
  const index = await readJson(indexPath);
  if (!Array.isArray(index.templates)) return fail('INDEX.json.templates is not an array');

  // Lightweight JSON Schema validation
  const schemaErrors = validateIndexSchema(index);
  for (const err of schemaErrors) fail(`  schema: ${err}`);
  if (schemaErrors.length > 0) return;

  const templateIds = new Set(index.templates.map((t) => t.id));
  let missing = 0;
  for (const t of index.templates) {
    const p = path.join(ROOT, t.file);
    if (!existsSync(p)) { fail(`  template file missing: ${t.file} (${t.id})`); missing++; }
  }

  const requiredModes = Array.from({ length: 12 }, (_, i) => `M-${String(i + 1).padStart(2, '0')}`);
  if (!Array.isArray(index.modeRoutes)) {
    fail('  INDEX.json.modeRoutes is not an array');
    missing++;
  } else {
    const routesByMode = new Map(index.modeRoutes.map((route) => [route.mode, route]));
    for (const mode of requiredModes) {
      const route = routesByMode.get(mode);
      if (!route) {
        fail(`  mode route missing: ${mode}`);
        missing++;
        continue;
      }
      if (!templateIds.has(route.templateId)) {
        fail(`  ${mode}: unknown templateId ${route.templateId}`);
        missing++;
      }
      if (!Array.isArray(route.triggers) || route.triggers.length === 0) {
        fail(`  ${mode}: triggers[] required`);
        missing++;
      }
      if (!Array.isArray(route.required_assets) || route.required_assets.length === 0) {
        fail(`  ${mode}: required_assets[] required`);
        missing++;
      }
      if (typeof route.verify_command !== 'string' || !route.verify_command) {
        fail(`  ${mode}: verify_command required`);
        missing++;
      }
      if (typeof route.example_prompt !== 'string' || !route.example_prompt) {
        fail(`  ${mode}: example_prompt required`);
        missing++;
      }
    }
  }

  if (missing === 0) ok(`all ${index.templates.length} templates present; ${requiredModes.length} mode routes mapped`);
}

async function check2_IdentityToolkit() {
  console.log(`\n${BOLD}[2/16] IFQ identity toolkit${RESET}`);
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
  console.log(`\n${BOLD}[3/16] Hand-drawn icon sprite${RESET}`);
  const spritePath = path.join(ROOT, 'assets/ifq-brand/icons/hand-drawn-icons.svg');
  if (!existsSync(spritePath)) return fail('sprite missing');
  const svg = await readText(spritePath);
  const ids = [...svg.matchAll(/<symbol[^>]+id="([^"]+)"/g)].map((m) => m[1]);
  if (ids.length < 24) return fail(`expected ≥ 24 symbols, found ${ids.length}`);
  ok(`${ids.length} symbols parsed (${ids.slice(0, 6).join(', ')}…)`);
}

async function check4_References() {
  console.log(`\n${BOLD}[4/16] References router targets${RESET}`);
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
  console.log(`\n${BOLD}[5/16] Script syntax${RESET}`);
  const scriptsDir = path.join(ROOT, 'scripts');
  if (!existsSync(scriptsDir)) return info('no scripts/ dir — skipped');
  const files = (await fs.readdir(scriptsDir)).filter((f) => /\.(mjs|cjs|js|py)$/.test(f) && !f.endsWith('.bak'));
  let failed = 0;
  for (const f of files) {
    const full = path.join(scriptsDir, f);
    const source = await readText(full);
    const result = f.endsWith('.py') ? checkPythonLexical(source) : checkJsLexical(source);
    if (!result.ok) {
      fail(`  ${f}: ${result.message || 'syntax error'}`);
      failed++;
    }
  }
  if (failed === 0) ok(`${files.length} scripts passed lexical sanity checks`);
}

async function check6_ScriptSecurityInvariants() {
  console.log(`\n${BOLD}[6/16] Script safety invariants${RESET}`);
  const scriptsDir = path.join(ROOT, 'scripts');
  if (!existsSync(scriptsDir)) return info('no scripts/ dir — skipped');
  const files = (await fs.readdir(scriptsDir)).filter((f) => /\.(mjs|cjs|js|py)$/.test(f) && !f.endsWith('.bak'));
  const findings = [];
  const patterns = [...SCRIPT_SECURITY_PATTERNS, ...SCRIPT_REMOTE_IO_PATTERNS];

  for (const f of files) {
    const source = await readText(path.join(scriptsDir, f));
    for (const [label, pattern] of patterns) {
      const match = source.match(pattern);
      if (match && match.index !== undefined) {
        findings.push({
          file: f,
          label,
          context: clipContext(source, match.index, match.index + match[0].length),
        });
      }
    }
  }

  if (findings.length === 0) {
    ok('scripts/ contain no dynamic-execution, process-spawn, or remote-IO patterns');
    return;
  }

  for (const finding of findings) {
    fail(`  ${finding.file}: ${finding.label} ← ${finding.context}`);
  }
}

async function check7_RepoReleaseHygiene() {
  console.log(`\n${BOLD}[7/16] Repo release hygiene${RESET}`);
  const repoFiles = await walkRepoFiles(ROOT);
  const findings = [];

  for (const filePath of repoFiles) {
    const relativePath = normalizeRelativePath(filePath);

    for (const [label, pattern] of REPO_GENERATED_FILE_PATTERNS) {
      if (pattern.test(relativePath)) {
        findings.push({
          file: relativePath,
          label,
          context: relativePath,
        });
        break;
      }
    }

    for (const [label, pattern] of REPO_SENSITIVE_FILE_PATTERNS) {
      if (pattern.test(relativePath)) {
        findings.push({
          file: relativePath,
          label,
          context: relativePath,
        });
        break;
      }
    }

    if (shouldSkipSecretContentScan(relativePath)) {
      continue;
    }

    let source;
    try {
      source = await readText(filePath);
    } catch {
      continue;
    }

    const sourceToScan = relativePath === 'scripts/smoke-test.mjs'
      ? source.replace(/const REPO_SECRET_CONTENT_PATTERNS = \[[\s\S]*?\];/, '')
      : source;

    for (const [label, pattern] of REPO_SECRET_CONTENT_PATTERNS) {
      const match = sourceToScan.match(pattern);
      if (match && match.index !== undefined) {
        findings.push({
          file: relativePath,
          label,
          context: clipContext(sourceToScan, match.index, match.index + match[0].length),
        });
        break;
      }
    }
  }

  if (findings.length === 0) {
    ok('repo scan found no generated cache files, secret-like files, or high-confidence sensitive patterns');
    return;
  }

  for (const finding of findings) {
    fail(`  ${finding.file}: ${finding.label} ← ${finding.context}`);
  }
}

async function check8_InvisibleControlCharacters() {
  console.log(`\n${BOLD}[8/16] Invisible Unicode controls${RESET}`);
  const repoFiles = await walkRepoFiles(ROOT);
  const findings = [];

  for (const filePath of repoFiles) {
    const relativePath = normalizeRelativePath(filePath);
    const ext = path.extname(relativePath).toLowerCase();
    if (!TEXT_CONTROL_FILE_EXTENSIONS.has(ext)) continue;

    let source;
    try {
      source = await readText(filePath);
    } catch {
      continue;
    }

    INVISIBLE_CONTROL_PATTERN.lastIndex = 0;
    for (const match of source.matchAll(INVISIBLE_CONTROL_PATTERN)) {
      if (match.index === 0 && match[0] === '\uFEFF') continue;
      findings.push({
        file: relativePath,
        codePoint: `U+${match[0].codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`,
        context: clipContext(source, match.index, match.index + match[0].length),
      });
      break;
    }
  }

  if (findings.length === 0) {
    ok('repo text files contain no hidden bidi or zero-width controls');
    return;
  }

  for (const finding of findings) {
    fail(`  ${finding.file}: ${finding.codePoint} ← ${finding.context}`);
  }
}

async function check9_PackageInstallPosture() {
  console.log(`\n${BOLD}[9/16] Package install posture${RESET}`);
  const pkg = await readJson(path.join(ROOT, 'package.json'));
  const scripts = pkg.scripts || {};
  const findings = [];
  const npmIgnore = existsSync(path.join(ROOT, '.npmignore'))
    ? await readText(path.join(ROOT, '.npmignore'))
    : '';

  for (const lifecycle of ['preinstall', 'install', 'postinstall']) {
    if (Object.prototype.hasOwnProperty.call(scripts, lifecycle)) {
      findings.push(`${lifecycle}=${JSON.stringify(scripts[lifecycle])}`);
    }
  }

  if (pkg.dependencies && Object.keys(pkg.dependencies).length > 0) {
    findings.push(`core dependencies present: ${Object.keys(pkg.dependencies).join(', ')}`);
  }

  for (const dep of ['playwright', 'pdf-lib', 'pptxgenjs', 'sharp']) {
    if (!pkg.optionalDependencies || !pkg.optionalDependencies[dep]) {
      findings.push(`optional export dependency missing: ${dep}`);
    }
  }

  for (const localDir of ['.claude/', '.codex/', '.cursor/', '.gemini/', '.hermes/', '.openclaw/', '.roo/', '.windsurf/']) {
    if (!npmIgnore.includes(localDir)) {
      findings.push(`.npmignore must exclude local agent config dir ${localDir}`);
    }
  }

  if (findings.length === 0) {
    ok('no automatic install hooks; export dependencies remain optional; local agent config dirs excluded from npm pack');
    return;
  }

  for (const finding of findings) fail(`  ${finding}`);
}

async function check10_NoPlaceholderLeaks() {
  console.log(`\n${BOLD}[10/16] Shipped HTML placeholder leaks${RESET}`);
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

async function check11_IfqDateResolverCoverage() {
  console.log(`\n${BOLD}[11/16] IFQ date resolver coverage${RESET}`);
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

async function check12_PlaceholderGuardBehavior() {
  console.log(`\n${BOLD}[12/16] Placeholder guard behavior${RESET}`);

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
    fail('  placeholder-guard.mjs should fail when data-ifq-year is empty');
  } catch (error) {
    if (!/\[data-ifq-year\]/.test(error.message)) {
      fail(`  placeholder-guard.mjs returned unexpected error: ${error.message.split('\n')[0]}`);
      return;
    }
    ok('placeholder-guard.mjs rejects empty data-ifq-year tokens');
  }
}

async function check13_TemplateRuntimePolicy() {
  console.log(`\n${BOLD}[13/16] Shipped HTML remote-runtime policy${RESET}`);
  const targetRoots = [
    path.join(ROOT, 'assets', 'templates'),
    path.join(ROOT, 'demos'),
    path.join(ROOT, 'assets', 'showcases'),
  ];
  const htmlFiles = [];
  for (const targetRoot of targetRoots) {
    if (!existsSync(targetRoot)) continue;
    htmlFiles.push(...await walkHtmlFiles(targetRoot));
  }
  const findings = [];

  for (const filePath of htmlFiles) {
    const raw = await readText(filePath);
    const withoutComments = raw.replace(/<!--[\s\S]*?-->/g, ' ');
    for (const [label, pattern] of TEMPLATE_REMOTE_RUNTIME_PATTERNS) {
      const match = withoutComments.match(pattern);
      if (match && match.index !== undefined) {
        findings.push({
          file: normalizeRelativePath(filePath),
          label,
          context: clipContext(withoutComments, match.index, match.index + match[0].length),
        });
      }
    }
  }

  if (findings.length === 0) {
    ok(`${htmlFiles.length} shipped HTML files are local-first and do not load remote runtime CSS/JS`);
    return;
  }

  for (const finding of findings) {
    fail(`  ${finding.file}: ${finding.label} ← ${finding.context}`);
  }
}

// Mirrors vercel-labs/skills: parseSkillMd + WellKnownProvider.isValidSkillEntry.
// Keeps the repo publishable to skills.sh on every commit.
async function check14_PublishSpec() {
  console.log(`\n${BOLD}[14/16] skills.sh publish spec${RESET}`);
  const startFailures = failures;
  const pkg = await readJson(path.join(ROOT, 'package.json'));

  const openAiYaml = path.join(ROOT, 'agents/openai.yaml');
  if (!existsSync(openAiYaml)) {
    fail('  agents/openai.yaml missing UI metadata');
  } else {
    const yaml = await readText(openAiYaml);
    const errors = validateOpenAiYaml(yaml, (rel) => existsSync(path.join(ROOT, rel)));
    for (const error of errors) fail(`  agents/openai.yaml ${error}`);
  }

  const skillMd = path.join(ROOT, 'SKILL.md');
  if (!existsSync(skillMd)) return fail('SKILL.md missing at repo root');
  const raw = await readText(skillMd);
  const manifestResult = validateSkillManifest(raw, pkg.version);
  for (const error of manifestResult.errors) fail(`  ${error}`);

  // Well-known indices
  for (const rel of ['.well-known/agent-skills/index.json', '.well-known/skills/index.json']) {
    const p = path.join(ROOT, rel);
    if (!existsSync(p)) { fail(`  ${rel} missing`); continue; }
    let idx;
    try { idx = JSON.parse(await readText(p)); }
    catch { fail(`  ${rel}: invalid JSON`); continue; }
    if (!Array.isArray(idx.skills) || idx.skills.length === 0) { fail(`  ${rel}: missing skills[]`); continue; }
    for (const e of idx.skills) {
      const errs = validateWellKnownEntry(e, pkg.version);
      if (errs.length) fail(`  ${rel} entry ${e.name || '(?)'}: ${errs.join(', ')}`);
    }
  }
  if (failures === startFailures) ok('SKILL.md + well-known indices conform to skills.sh spec');
}

const HTML_STRUCTURE_ROOTS = [
  path.join(ROOT, 'assets', 'templates'),
  path.join(ROOT, 'demos'),
  path.join(ROOT, 'assets', 'showcases'),
];

async function check15_HtmlStructure() {
  console.log(`\n${BOLD}[15/16] HTML structure (DOCTYPE, charset, lang)${RESET}`);
  const htmlFiles = [];
  for (const targetRoot of HTML_STRUCTURE_ROOTS) {
    if (!existsSync(targetRoot)) continue;
    htmlFiles.push(...await walkHtmlFiles(targetRoot));
  }
  let issues = 0;
  for (const filePath of htmlFiles) {
    const raw = await readText(filePath);
    const rel = normalizeRelativePath(filePath);
    if (!/<!DOCTYPE html>/i.test(raw)) { fail(`  ${rel}: missing <!DOCTYPE html>`); issues++; }
    if (!/charset[=\s"']*utf-8/i.test(raw)) { fail(`  ${rel}: missing charset=utf-8`); issues++; }
    if (!/<html[^>]+lang=/i.test(raw)) { fail(`  ${rel}: missing lang attribute on <html>`); issues++; }
  }
  if (issues === 0) ok(`${htmlFiles.length} HTML files have DOCTYPE, charset, and lang`);
}

const TEMPLATE_SIZE_BUDGET_KB = 100;

async function check16_TemplateSizeBudget() {
  console.log(`\n${BOLD}[16/16] Template file size budget (<${TEMPLATE_SIZE_BUDGET_KB}KB)${RESET}`);
  const templatesDir = path.join(ROOT, 'assets', 'templates');
  if (!existsSync(templatesDir)) return info('no templates/ dir — skipped');
  const htmlFiles = await walkHtmlFiles(templatesDir);
  let oversized = 0;
  for (const filePath of htmlFiles) {
    const stat = await fs.stat(filePath);
    const kb = stat.size / 1024;
    if (kb > TEMPLATE_SIZE_BUDGET_KB) {
      fail(`  ${normalizeRelativePath(filePath)}: ${kb.toFixed(1)}KB exceeds ${TEMPLATE_SIZE_BUDGET_KB}KB budget`);
      oversized++;
    }
  }
  if (oversized === 0) ok(`${htmlFiles.length} templates within ${TEMPLATE_SIZE_BUDGET_KB}KB budget`);
}

(async () => {
  console.log(`${BOLD}IFQ Design Skills · smoke test${RESET}  ${DIM}(${ROOT})${RESET}`);
  await check1_TemplateIndex();
  await check2_IdentityToolkit();
  await check3_IconSprite();
  await check4_References();
  await check5_ScriptSyntax();
  await check6_ScriptSecurityInvariants();
  await check7_RepoReleaseHygiene();
  await check8_InvisibleControlCharacters();
  await check9_PackageInstallPosture();
  await check10_NoPlaceholderLeaks();
  await check11_IfqDateResolverCoverage();
  await check12_PlaceholderGuardBehavior();
  await check13_TemplateRuntimePolicy();
  await check14_PublishSpec();
  await check15_HtmlStructure();
  await check16_TemplateSizeBudget();
  console.log('');
  if (failures === 0) {
    console.log(`${GREEN}${BOLD}✓ smoke test passed${RESET}`);
    process.exit(0);
  } else {
    console.log(`${RED}${BOLD}✗ ${failures} check(s) failed${RESET}`);
    process.exit(1);
  }
})().catch((e) => { bad(`smoke runner crashed: ${e.message}`); process.exit(2); });
