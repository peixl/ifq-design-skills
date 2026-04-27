// Validate SKILL.md and well-known indices against vercel-labs/skills rules
const fs = require('fs');

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { frontmatter: null, content: raw };
  return { frontmatter: m[1], content: m[2] };
}

const nameRegex = /^[a-z0-9]([a-z0-9-]{0,62}[a-z0-9])?$/;
let failed = 0;

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const content = fs.readFileSync('SKILL.md', 'utf8');
const { frontmatter } = parseFrontmatter(content);
if (!frontmatter) {
  console.log('FAIL: SKILL.md has no frontmatter'); failed++;
} else {
  const nameMatch = frontmatter.match(/^name:\s*(.+)$/m);
  const descMatch = frontmatter.match(/^description:\s*(.+)$/m);
  const versionMatch = frontmatter.match(/^version:\s*["']?([^"'\n]+)["']?$/m);
  const name = nameMatch ? nameMatch[1].trim() : null;
  const desc = descMatch ? descMatch[1].trim() : null;
  const version = versionMatch ? versionMatch[1].trim() : null;
  console.log('SKILL.md name:', JSON.stringify(name), nameRegex.test(name || '') ? 'OK' : 'FAIL');
  console.log('SKILL.md description length:', desc ? desc.length : 0, (desc && desc.length > 0) ? 'OK' : 'FAIL');
  console.log('SKILL.md version:', JSON.stringify(version), version === pkg.version ? 'OK' : 'FAIL expected ' + pkg.version);
  if (!name || !nameRegex.test(name)) failed++;
  if (!desc) failed++;
  if (version !== pkg.version) failed++;
}

for (const p of ['.well-known/agent-skills/index.json', '.well-known/skills/index.json']) {
  console.log('--- ' + p + ' ---');
  let idx;
  try { idx = JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch (e) { console.log('FAIL: invalid JSON'); failed++; continue; }
  if (!idx.skills || !Array.isArray(idx.skills)) { console.log('FAIL: missing skills array'); failed++; continue; }
  for (const e of idx.skills) {
    const errs = [];
    if (typeof e.name !== 'string' || !e.name) errs.push('name');
    if (typeof e.description !== 'string' || !e.description) errs.push('description');
    if (!Array.isArray(e.files) || e.files.length === 0) errs.push('files array');
    else {
      const hasSkillMd = e.files.some(f => typeof f === 'string' && f.toLowerCase() === 'skill.md');
      if (!hasSkillMd) errs.push('files-must-include-SKILL.md');
      for (const f of e.files) {
        if (typeof f !== 'string') errs.push('non-string file'); 
        else if (f.startsWith('/') || f.startsWith('\\') || f.includes('..')) errs.push('unsafe path ' + f);
      }
    }
    if (e.name && !nameRegex.test(e.name) && e.name.length > 1) errs.push('name-regex');
    if (!e.metadata || e.metadata.version !== pkg.version) errs.push('metadata.version');
    const requires = e.metadata && e.metadata.requires;
    if (!requires || !Array.isArray(requires.bins) || !requires.bins.includes('node')) errs.push('requires.bins.node');
    if (!requires || !Array.isArray(requires.env) || requires.env.length !== 0) errs.push('requires.env-empty');
    const signals = e.metadata && e.metadata.capability_signals;
    for (const key of ['crypto', 'can_make_purchases', 'requires_sensitive_credentials']) {
      if (!signals || signals[key] !== false) errs.push('capability_signals.' + key);
    }
    const install = e.metadata && e.metadata.install;
    for (const key of ['skills-cli', 'openclaw', 'hermes']) {
      if (!install || typeof install[key] !== 'string' || !install[key]) errs.push('install.' + key);
    }
    if (errs.length) { console.log('FAIL ' + e.name + ': ' + errs.join(', ')); failed++; }
    else console.log('OK ' + e.name + ' files=' + JSON.stringify(e.files));
  }
}

console.log('\n' + (failed === 0 ? '✅ ALL CHECKS PASSED' : '❌ ' + failed + ' failure(s)'));
process.exit(failed === 0 ? 0 : 1);
