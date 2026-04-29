// Validate SKILL.md and well-known indices against vercel-labs/skills rules
const fs = require('fs');
const path = require('path');

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { frontmatter: null, content: raw };
  return { frontmatter: m[1], content: m[2] };
}

const nameRegex = /^[a-z0-9]([a-z0-9-]{0,62}[a-z0-9])?$/;
let failed = 0;
const requiredMarketplaceTargets = ['skills.sh', 'agentskill.sh', 'agentskills.to', 'clawhub.ai', 'clawskills.sh', 'skillhub.cn'];
const requiredQualitySignals = {
  zero_install_core: true,
  eval_coverage_modes: 12,
  root_skill_router: true,
  no_required_env: true,
  scanner_clean_scripts: true,
  default_remote_runtime: false,
};
const requiredFirstRunEvidence = ['file_path', 'route', 'template', 'verification_result', 'use_affecting_caveats'];
const requiredForbiddenSetupWork = ['account_login', 'global_install', 'export_dependency_install', 'broad_environment_change'];
const requiredCoreOutputs = ['verified_html', 'svg_or_static_companions', 'export_ready_source_structure'];
const requiredQualityScoreDimensions = ['Discovery', 'Implementation', 'Structure', 'Expertise', 'Security'];

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const npmIgnore = fs.existsSync('.npmignore') ? fs.readFileSync('.npmignore', 'utf8') : '';
const content = fs.readFileSync('SKILL.md', 'utf8');
const { frontmatter } = parseFrontmatter(content);

const openAiYamlPath = 'agents/openai.yaml';
if (!fs.existsSync(openAiYamlPath)) {
  console.log('agents/openai.yaml:', 'FAIL missing UI metadata');
  failed++;
} else {
  const yaml = fs.readFileSync(openAiYamlPath, 'utf8');
  const checks = [
    ['interface.display_name', /^\s*display_name:\s*"IFQ Design Skills"\s*$/m.test(yaml)],
    ['interface.short_description', /^\s*short_description:\s*"[^"]{25,64}"\s*$/m.test(yaml)],
    ['interface.default_prompt mentions skill', /^\s*default_prompt:\s*"[^"]*\$ifq-design-skills[^"]*"\s*$/m.test(yaml)],
    ['policy.allow_implicit_invocation', /^\s*allow_implicit_invocation:\s*true\s*$/m.test(yaml)],
    ['interface.brand_color hex', /^\s*brand_color:\s*"#[0-9A-Fa-f]{6}"\s*$/m.test(yaml)],
  ];
  const iconMatches = [...yaml.matchAll(/^\s*icon_(?:small|large):\s*"([^"]+)"\s*$/gm)];
  checks.push(['interface.icons', iconMatches.length >= 2 && iconMatches.every((match) => {
    const rel = match[1].replace(/^\.\//, '');
    return rel && !rel.startsWith('/') && !rel.includes('..') && fs.existsSync(path.join(process.cwd(), rel));
  })]);
  for (const [label, ok] of checks) {
    console.log('agents/openai.yaml ' + label + ':', ok ? 'OK' : 'FAIL');
    if (!ok) failed++;
  }
}

if (!frontmatter) {
  console.log('FAIL: SKILL.md has no frontmatter'); failed++;
} else {
  const nameMatch = frontmatter.match(/^name:\s*(.+)$/m);
  const descMatch = frontmatter.match(/^description:\s*(.+)$/m);
  const versionMatch = frontmatter.match(/^version:\s*["']?([^"'\n]+)["']?$/m);
  const metadataMatch = frontmatter.match(/^metadata:\s*(\{.*\})$/m);
  const name = nameMatch ? nameMatch[1].trim() : null;
  const desc = descMatch ? descMatch[1].trim() : null;
  const version = versionMatch ? versionMatch[1].trim() : null;
  const lineCount = content.split(/\r?\n/).length;
  let metadata = null;
  console.log('SKILL.md name:', JSON.stringify(name), nameRegex.test(name || '') ? 'OK' : 'FAIL');
  console.log('SKILL.md description length:', desc ? desc.length : 0, (desc && desc.length > 0) ? 'OK' : 'FAIL');
  console.log('SKILL.md version:', JSON.stringify(version), version === pkg.version ? 'OK' : 'FAIL expected ' + pkg.version);
  console.log('SKILL.md line count:', lineCount, lineCount <= 500 ? 'OK' : 'FAIL expected <= 500');
  if (!name || !nameRegex.test(name)) failed++;
  if (!desc) failed++;
  if (version !== pkg.version) failed++;
  if (lineCount > 500) failed++;
  if (!metadataMatch) {
    console.log('SKILL.md metadata:', 'FAIL expected single-line JSON');
    failed++;
  } else {
    try {
      metadata = JSON.parse(metadataMatch[1]);
      console.log('SKILL.md metadata JSON:', 'OK');
    } catch (e) {
      console.log('SKILL.md metadata JSON:', 'FAIL ' + e.message);
      failed++;
    }
  }
  if (metadata) {
    const openclaw = metadata.openclaw;
    const clawhub = metadata.clawhub;
    const security = metadata.security || {};
    const checks = [];
    checks.push(['metadata.version', metadata.version === pkg.version]);
    checks.push(['metadata.openclaw.requires.bins.node', !!(openclaw && openclaw.requires && Array.isArray(openclaw.requires.bins) && openclaw.requires.bins.includes('node'))]);
    checks.push(['metadata.openclaw.requires.env.empty', !!(openclaw && openclaw.requires && Array.isArray(openclaw.requires.env) && openclaw.requires.env.length === 0)]);
    for (const key of ['crypto', 'can_make_purchases', 'requires_sensitive_credentials']) {
      checks.push([`metadata.clawhub.capability_signals.${key}`, !!(clawhub && clawhub.capability_signals && clawhub.capability_signals[key] === false)]);
    }
    for (const key of ['node_python_process_control', 'dynamic_eval', 'script_network', 'secrets_in_repo']) {
      checks.push([`metadata.security.${key}`, security[key] === false]);
    }
    for (const [label, ok] of checks) {
      console.log(label + ':', ok ? 'OK' : 'FAIL');
      if (!ok) failed++;
    }
  }
}

for (const localDir of ['.claude/', '.codex/', '.cursor/', '.gemini/', '.hermes/', '.openclaw/', '.roo/', '.windsurf/']) {
  const ok = npmIgnore.includes(localDir);
  console.log(`.npmignore excludes ${localDir}:`, ok ? 'OK' : 'FAIL');
  if (!ok) failed++;
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
    const quality = e.metadata && e.metadata.quality_signals;
    for (const [key, expected] of Object.entries(requiredQualitySignals)) {
      if (!quality || quality[key] !== expected) errs.push('quality_signals.' + key);
    }
    const firstRun = e.metadata && e.metadata.first_run_success;
    if (!firstRun || typeof firstRun.goal !== 'string' || firstRun.goal.length < 20) errs.push('first_run_success.goal');
    for (const key of requiredFirstRunEvidence) {
      if (!firstRun || !Array.isArray(firstRun.required_evidence) || !firstRun.required_evidence.includes(key)) {
        errs.push('first_run_success.required_evidence.' + key);
      }
    }
    for (const key of requiredForbiddenSetupWork) {
      if (!firstRun || !Array.isArray(firstRun.forbidden_setup_work) || !firstRun.forbidden_setup_work.includes(key)) {
        errs.push('first_run_success.forbidden_setup_work.' + key);
      }
    }
    const boundary = e.metadata && e.metadata.output_boundary;
    for (const key of requiredCoreOutputs) {
      if (!boundary || !Array.isArray(boundary.core_outputs) || !boundary.core_outputs.includes(key)) {
        errs.push('output_boundary.core_outputs.' + key);
      }
    }
    if (!boundary || typeof boundary.export_claim_rule !== 'string' || !boundary.export_claim_rule.includes('until')) {
      errs.push('output_boundary.export_claim_rule');
    }
    for (const key of requiredQualityScoreDimensions) {
      const dims = e.metadata && e.metadata.quality_score_dimensions;
      if (!Array.isArray(dims) || !dims.includes(key)) errs.push('quality_score_dimensions.' + key);
    }
    const benchmarks = e.metadata && e.metadata.benchmark_targets;
    if (!benchmarks || !/^\d{4}-\d{2}-\d{2}$/.test(benchmarks.observed_on || '')) errs.push('benchmark_targets.observed_on');
    if (!benchmarks || typeof benchmarks.skills_sh_top10_floor_installs !== 'number' || benchmarks.skills_sh_top10_floor_installs < 260000) {
      errs.push('benchmark_targets.skills_sh_top10_floor_installs');
    }
    const targets = e.metadata && e.metadata.marketplace_targets;
    for (const target of requiredMarketplaceTargets) {
      if (!Array.isArray(targets) || !targets.includes(target)) errs.push('marketplace_targets.' + target);
    }
    for (const key of ['human_value', 'agent_value', 'entrypoints']) {
      if (!Array.isArray(e.metadata && e.metadata[key]) || e.metadata[key].length < 3) errs.push(key);
    }
    if (errs.length) { console.log('FAIL ' + e.name + ': ' + errs.join(', ')); failed++; }
    else console.log('OK ' + e.name + ' files=' + JSON.stringify(e.files));
  }
}

console.log('\n' + (failed === 0 ? '✅ ALL CHECKS PASSED' : '❌ ' + failed + ' failure(s)'));
process.exit(failed === 0 ? 0 : 1);
