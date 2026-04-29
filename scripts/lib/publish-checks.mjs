// Shared publish-spec validation logic used by both smoke-test.mjs and validate_publish.cjs.
// Single source of truth for marketplace metadata checks.

export const NAME_REGEX = /^[a-z0-9]([a-z0-9-]{0,62}[a-z0-9])?$/;

export const REQUIRED_MARKETPLACE_TARGETS = [
  'skills.sh', 'agentskill.sh', 'agentskills.to',
  'clawhub.ai', 'clawskills.sh', 'skillhub.cn',
];

export const REQUIRED_QUALITY_SIGNALS = {
  zero_install_core: true,
  eval_coverage_modes: 12,
  root_skill_router: true,
  no_required_env: true,
  scanner_clean_scripts: true,
  default_remote_runtime: false,
};

export const REQUIRED_FIRST_RUN_EVIDENCE = [
  'file_path', 'route', 'template', 'verification_result', 'use_affecting_caveats',
];

export const REQUIRED_FORBIDDEN_SETUP_WORK = [
  'account_login', 'global_install', 'export_dependency_install', 'broad_environment_change',
];

export const REQUIRED_CORE_OUTPUTS = [
  'verified_html', 'svg_or_static_companions', 'export_ready_source_structure',
];

export const REQUIRED_QUALITY_SCORE_DIMENSIONS = [
  'Discovery', 'Implementation', 'Structure', 'Expertise', 'Security',
];

const REQUIRED_CLAWHUB_CAPABILITY_SIGNALS = [
  'crypto', 'can_make_purchases', 'requires_sensitive_credentials',
];

const REQUIRED_SECURITY_FALSE_FLAGS = [
  'node_python_process_control', 'dynamic_eval', 'script_network', 'secrets_in_repo',
];

export function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { frontmatter: null, content: raw };
  return { frontmatter: match[1], content: match[2] };
}

/**
 * Validate SKILL.md frontmatter and marketplace-facing metadata.
 * Returns parsed fields plus error strings (empty = valid).
 */
export function validateSkillManifest(raw, pkgVersion) {
  const errors = [];
  const { frontmatter } = parseFrontmatter(raw);
  const lineCount = raw.split(/\r?\n/).length;
  const fields = {
    name: null,
    description: null,
    version: null,
    metadata: null,
    lineCount,
  };

  if (!frontmatter) {
    errors.push('SKILL.md has no frontmatter');
    return { errors, fields };
  }

  const nameMatch = frontmatter.match(/^name:\s*(.+)$/m);
  const descMatch = frontmatter.match(/^description:\s*(.+)$/m);
  const versionMatch = frontmatter.match(/^version:\s*["']?([^"'\n]+)["']?$/m);
  const metadataMatch = frontmatter.match(/^metadata:\s*(\{.*\})$/m);
  fields.name = nameMatch ? nameMatch[1].trim() : null;
  fields.description = descMatch ? descMatch[1].trim() : null;
  fields.version = versionMatch ? versionMatch[1].trim() : null;

  if (!fields.name || !NAME_REGEX.test(fields.name)) errors.push('SKILL.md name');
  if (!fields.description) errors.push('SKILL.md description');
  if (fields.version !== pkgVersion) errors.push('SKILL.md version');
  if (lineCount > 500) errors.push('SKILL.md line count');

  if (!metadataMatch) {
    errors.push('SKILL.md metadata single-line JSON');
  } else {
    try {
      fields.metadata = JSON.parse(metadataMatch[1]);
    } catch (error) {
      errors.push(`SKILL.md metadata JSON: ${error.message}`);
    }
  }

  const metadata = fields.metadata;
  if (!metadata) return { errors, fields };

  if (metadata.version !== pkgVersion) errors.push('metadata.version');

  const openclaw = metadata.openclaw;
  if (!openclaw || !openclaw.requires || !Array.isArray(openclaw.requires.bins) || !openclaw.requires.bins.includes('node')) {
    errors.push('metadata.openclaw.requires.bins.node');
  }
  if (!openclaw || !openclaw.requires || !Array.isArray(openclaw.requires.env) || openclaw.requires.env.length !== 0) {
    errors.push('metadata.openclaw.requires.env.empty');
  }

  const capabilitySignals = metadata.clawhub && metadata.clawhub.capability_signals;
  for (const key of REQUIRED_CLAWHUB_CAPABILITY_SIGNALS) {
    if (!capabilitySignals || capabilitySignals[key] !== false) {
      errors.push(`metadata.clawhub.capability_signals.${key}`);
    }
  }

  const security = metadata.security || {};
  for (const key of REQUIRED_SECURITY_FALSE_FLAGS) {
    if (security[key] !== false) {
      errors.push(`metadata.security.${key}`);
    }
  }

  return { errors, fields };
}

/**
 * Validate a single well-known index entry.
 * Returns an array of error strings (empty = valid).
 */
export function validateWellKnownEntry(entry, pkgVersion) {
  const errs = [];

  if (typeof entry.name !== 'string' || !entry.name) errs.push('name');
  else if (entry.name.length > 1 && !NAME_REGEX.test(entry.name)) errs.push('name-regex');

  if (typeof entry.description !== 'string' || !entry.description) errs.push('description');

  if (!entry.metadata || entry.metadata.version !== pkgVersion) errs.push('metadata.version');

  const requires = entry.metadata && entry.metadata.requires;
  if (!requires || !Array.isArray(requires.bins) || !requires.bins.includes('node')) errs.push('requires.bins.node');
  if (!requires || !Array.isArray(requires.env) || requires.env.length !== 0) errs.push('requires.env-empty');

  const signals = entry.metadata && entry.metadata.capability_signals;
  for (const key of ['crypto', 'can_make_purchases', 'requires_sensitive_credentials']) {
    if (!signals || signals[key] !== false) errs.push(`capability_signals.${key}`);
  }

  const quality = entry.metadata && entry.metadata.quality_signals;
  for (const [key, expected] of Object.entries(REQUIRED_QUALITY_SIGNALS)) {
    if (!quality || quality[key] !== expected) errs.push(`quality_signals.${key}`);
  }

  const install = entry.metadata && entry.metadata.install;
  for (const key of ['skills-cli', 'openclaw', 'hermes']) {
    if (!install || typeof install[key] !== 'string' || !install[key]) {
      errs.push(`install.${key}`);
    }
  }

  const firstRun = entry.metadata && entry.metadata.first_run_success;
  if (!firstRun || typeof firstRun.goal !== 'string' || firstRun.goal.length < 20) errs.push('first_run_success.goal');
  for (const key of REQUIRED_FIRST_RUN_EVIDENCE) {
    if (!firstRun || !Array.isArray(firstRun.required_evidence) || !firstRun.required_evidence.includes(key)) {
      errs.push(`first_run_success.required_evidence.${key}`);
    }
  }
  for (const key of REQUIRED_FORBIDDEN_SETUP_WORK) {
    if (!firstRun || !Array.isArray(firstRun.forbidden_setup_work) || !firstRun.forbidden_setup_work.includes(key)) {
      errs.push(`first_run_success.forbidden_setup_work.${key}`);
    }
  }

  const boundary = entry.metadata && entry.metadata.output_boundary;
  for (const key of REQUIRED_CORE_OUTPUTS) {
    if (!boundary || !Array.isArray(boundary.core_outputs) || !boundary.core_outputs.includes(key)) {
      errs.push(`output_boundary.core_outputs.${key}`);
    }
  }
  if (!boundary || typeof boundary.export_claim_rule !== 'string' || !boundary.export_claim_rule.includes('until')) {
    errs.push('output_boundary.export_claim_rule');
  }

  const dims = entry.metadata && entry.metadata.quality_score_dimensions;
  for (const key of REQUIRED_QUALITY_SCORE_DIMENSIONS) {
    if (!Array.isArray(dims) || !dims.includes(key)) errs.push(`quality_score_dimensions.${key}`);
  }

  const benchmarks = entry.metadata && entry.metadata.benchmark_targets;
  if (!benchmarks || !/^\d{4}-\d{2}-\d{2}$/.test(benchmarks.observed_on || '')) errs.push('benchmark_targets.observed_on');
  if (!benchmarks || typeof benchmarks.skills_sh_top10_floor_installs !== 'number' || benchmarks.skills_sh_top10_floor_installs < 260000) {
    errs.push('benchmark_targets.skills_sh_top10_floor_installs');
  }

  const targets = entry.metadata && entry.metadata.marketplace_targets;
  for (const target of REQUIRED_MARKETPLACE_TARGETS) {
    if (!Array.isArray(targets) || !targets.includes(target)) errs.push(`marketplace_targets.${target}`);
  }

  for (const key of ['human_value', 'agent_value', 'entrypoints']) {
    if (!Array.isArray(entry.metadata && entry.metadata[key]) || entry.metadata[key].length < 3) errs.push(key);
  }

  if (!Array.isArray(entry.files) || entry.files.length === 0) errs.push('files[]');
  else {
    if (!entry.files.some((f) => typeof f === 'string' && f.toLowerCase() === 'skill.md')) errs.push('files-must-include-SKILL.md');
    for (const f of entry.files) {
      if (typeof f !== 'string' || f.startsWith('/') || f.startsWith('\\') || f.includes('..')) errs.push(`unsafe-path:${f}`);
    }
  }

  return errs;
}

/**
 * Validate agents/openai.yaml content (as raw text).
 * Returns an array of error strings (empty = valid).
 */
export function validateOpenAiYaml(yamlText, iconPathValidator) {
  const errs = [];

  if (!/^\s*display_name:\s*"IFQ Design Skills"\s*$/m.test(yamlText)) errs.push('display_name missing');
  if (!/^\s*short_description:\s*"[^"]{25,64}"\s*$/m.test(yamlText)) errs.push('short_description must be 25-64 chars');
  if (!/^\s*default_prompt:\s*"[^"]*\$ifq-design-skills[^"]*"\s*$/m.test(yamlText)) errs.push('default_prompt must mention $ifq-design-skills');
  if (!/^\s*allow_implicit_invocation:\s*true\s*$/m.test(yamlText)) errs.push('must allow implicit invocation');
  if (!/^\s*brand_color:\s*"#[0-9A-Fa-f]{6}"\s*$/m.test(yamlText)) errs.push('brand_color must be hex');

  const iconMatches = [...yamlText.matchAll(/^\s*icon_(?:small|large):\s*"([^"]+)"\s*$/gm)];
  if (iconMatches.length < 2) {
    errs.push('must include small and large icons');
  } else if (iconPathValidator) {
    for (const match of iconMatches) {
      const rel = match[1].replace(/^\.\//, '');
      if (!rel || rel.startsWith('/') || rel.includes('..') || !iconPathValidator(rel)) {
        errs.push(`icon path invalid: ${match[1]}`);
      }
    }
  }

  return errs;
}

/**
 * Lightweight INDEX.json schema validation (no external deps).
 * Returns an array of error strings (empty = valid).
 */
export function validateIndexSchema(index) {
  const errs = [];

  if (typeof index !== 'object' || index === null) return ['INDEX.json is not an object'];

  // version
  if (typeof index.version !== 'string') errs.push('version must be a string');

  // templates array
  if (!Array.isArray(index.templates)) {
    errs.push('templates must be an array');
  } else {
    for (let i = 0; i < index.templates.length; i++) {
      const t = index.templates[i];
      const prefix = `templates[${i}]`;
      if (typeof t !== 'object' || t === null) { errs.push(`${prefix}: not an object`); continue; }
      if (typeof t.id !== 'string' || !t.id) errs.push(`${prefix}.id required`);
      if (!Array.isArray(t.mode) || t.mode.length === 0) errs.push(`${prefix}.mode must be non-empty array`);
      if (typeof t.name !== 'string' || !t.name) errs.push(`${prefix}.name required`);
      if (typeof t.file !== 'string' || !t.file) errs.push(`${prefix}.file required`);
    }
  }

  // modeRoutes array
  if (!Array.isArray(index.modeRoutes)) {
    errs.push('modeRoutes must be an array');
  } else {
    const modePattern = /^M-\d{2}$/;
    for (let i = 0; i < index.modeRoutes.length; i++) {
      const r = index.modeRoutes[i];
      const prefix = `modeRoutes[${i}]`;
      if (typeof r !== 'object' || r === null) { errs.push(`${prefix}: not an object`); continue; }
      if (!modePattern.test(r.mode)) errs.push(`${prefix}.mode must match M-XX pattern`);
      if (typeof r.templateId !== 'string' || !r.templateId) errs.push(`${prefix}.templateId required`);
      if (!Array.isArray(r.triggers) || r.triggers.length === 0) errs.push(`${prefix}.triggers must be non-empty array`);
      if (!Array.isArray(r.required_assets) || r.required_assets.length === 0) errs.push(`${prefix}.required_assets must be non-empty array`);
      if (typeof r.verify_command !== 'string' || !r.verify_command) errs.push(`${prefix}.verify_command required`);
      if (typeof r.example_prompt !== 'string' || !r.example_prompt) errs.push(`${prefix}.example_prompt required`);
    }
  }

  // Cross-reference: every modeRoute.templateId must exist in templates[]
  if (Array.isArray(index.templates) && Array.isArray(index.modeRoutes)) {
    const templateIds = new Set(index.templates.map(t => t.id));
    for (const r of index.modeRoutes) {
      if (r.templateId && !templateIds.has(r.templateId)) {
        errs.push(`modeRoute ${r.mode}: templateId "${r.templateId}" not found in templates[]`);
      }
    }
  }

  return errs;
}
