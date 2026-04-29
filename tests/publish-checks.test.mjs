import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  NAME_REGEX,
  validateWellKnownEntry,
  validateOpenAiYaml,
  validateIndexSchema,
} from '../scripts/lib/publish-checks.mjs';

describe('NAME_REGEX', () => {
  it('accepts valid names', () => {
    assert.ok(NAME_REGEX.test('ifq-design-skills'));
    assert.ok(NAME_REGEX.test('a'));
    assert.ok(NAME_REGEX.test('my-skill-123'));
  });

  it('rejects invalid names', () => {
    assert.ok(!NAME_REGEX.test(''));
    assert.ok(!NAME_REGEX.test('-starts-dash'));
    assert.ok(!NAME_REGEX.test('ends-dash-'));
    assert.ok(!NAME_REGEX.test('Has-Caps'));
    assert.ok(!NAME_REGEX.test('has space'));
  });
});

describe('validateWellKnownEntry', () => {
  function makeValidEntry() {
    return {
      name: 'ifq-design-skills',
      description: 'Agent-native design engine',
      files: ['SKILL.md'],
      metadata: {
        version: '3.0.0',
        requires: { bins: ['node'], env: [] },
        capability_signals: { crypto: false, can_make_purchases: false, requires_sensitive_credentials: false },
        quality_signals: {
          zero_install_core: true,
          eval_coverage_modes: 12,
          root_skill_router: true,
          no_required_env: true,
          scanner_clean_scripts: true,
          default_remote_runtime: false,
        },
        first_run_success: {
          goal: 'Produce a verified HTML artifact in one turn from a natural-language request',
          required_evidence: ['file_path', 'route', 'template', 'verification_result', 'use_affecting_caveats'],
          forbidden_setup_work: ['account_login', 'global_install', 'export_dependency_install', 'broad_environment_change'],
        },
        output_boundary: {
          core_outputs: ['verified_html', 'svg_or_static_companions', 'export_ready_source_structure'],
          export_claim_rule: 'Do not claim export exists until command passes',
        },
        quality_score_dimensions: ['Discovery', 'Implementation', 'Structure', 'Expertise', 'Security'],
        benchmark_targets: { observed_on: '2026-04-01', skills_sh_top10_floor_installs: 260000 },
        marketplace_targets: ['skills.sh', 'agentskill.sh', 'agentskills.to', 'clawhub.ai', 'clawskills.sh', 'skillhub.cn'],
        human_value: ['one', 'two', 'three'],
        agent_value: ['one', 'two', 'three'],
        entrypoints: ['SKILL.md', 'modes.md', 'INDEX.json'],
      },
    };
  }

  it('accepts a fully valid entry', () => {
    const errs = validateWellKnownEntry(makeValidEntry(), '3.0.0');
    assert.deepEqual(errs, []);
  });

  it('rejects missing name', () => {
    const entry = makeValidEntry();
    entry.name = '';
    const errs = validateWellKnownEntry(entry, '3.0.0');
    assert.ok(errs.includes('name'));
  });

  it('rejects version mismatch', () => {
    const errs = validateWellKnownEntry(makeValidEntry(), '9.9.9');
    assert.ok(errs.includes('metadata.version'));
  });

  it('rejects missing files array', () => {
    const entry = makeValidEntry();
    delete entry.files;
    const errs = validateWellKnownEntry(entry, '3.0.0');
    assert.ok(errs.includes('files[]'));
  });

  it('rejects files without SKILL.md', () => {
    const entry = makeValidEntry();
    entry.files = ['README.md'];
    const errs = validateWellKnownEntry(entry, '3.0.0');
    assert.ok(errs.includes('files-must-include-SKILL.md'));
  });

  it('rejects unsafe file paths', () => {
    const entry = makeValidEntry();
    entry.files = ['SKILL.md', '../etc/passwd'];
    const errs = validateWellKnownEntry(entry, '3.0.0');
    assert.ok(errs.some(e => e.startsWith('unsafe-path')));
  });

  it('rejects missing capability_signals', () => {
    const entry = makeValidEntry();
    entry.metadata.capability_signals.crypto = true;
    const errs = validateWellKnownEntry(entry, '3.0.0');
    assert.ok(errs.includes('capability_signals.crypto'));
  });

  it('rejects missing quality_signals', () => {
    const entry = makeValidEntry();
    entry.metadata.quality_signals.eval_coverage_modes = 5;
    const errs = validateWellKnownEntry(entry, '3.0.0');
    assert.ok(errs.includes('quality_signals.eval_coverage_modes'));
  });

  it('rejects short first_run goal', () => {
    const entry = makeValidEntry();
    entry.metadata.first_run_success.goal = 'short';
    const errs = validateWellKnownEntry(entry, '3.0.0');
    assert.ok(errs.includes('first_run_success.goal'));
  });

  it('rejects missing marketplace targets', () => {
    const entry = makeValidEntry();
    entry.metadata.marketplace_targets = ['skills.sh'];
    const errs = validateWellKnownEntry(entry, '3.0.0');
    assert.ok(errs.some(e => e.startsWith('marketplace_targets')));
  });
});

describe('validateOpenAiYaml', () => {
  const validYaml = `
version: "3.0.0"
interface:
  display_name: "IFQ Design Skills"
  short_description: "Agent-native design engine: one prompt in, shippable HTML out"
  icon_small: "./assets/ifq-brand/mark.svg"
  icon_large: "./assets/ifq-brand/logo.svg"
  brand_color: "#D4532B"
  default_prompt: "Use $ifq-design-skills to turn this visual-design request into a verified HTML artifact."
policy:
  allow_implicit_invocation: true
`;

  it('accepts valid yaml', () => {
    const errs = validateOpenAiYaml(validYaml, () => true);
    assert.deepEqual(errs, []);
  });

  it('rejects missing display_name', () => {
    const errs = validateOpenAiYaml(validYaml.replace('display_name:', '# removed:'), () => true);
    assert.ok(errs.includes('display_name missing'));
  });

  it('rejects missing allow_implicit_invocation', () => {
    const errs = validateOpenAiYaml(validYaml.replace('allow_implicit_invocation: true', '# removed'), () => true);
    assert.ok(errs.includes('must allow implicit invocation'));
  });
});

describe('validateIndexSchema', () => {
  function makeValidIndex() {
    return {
      version: '2.0',
      templates: [
        { id: 'T-hero-landing', mode: ['M-02'], name: 'Hero Landing', file: 'assets/templates/hero-landing.html' },
      ],
      modeRoutes: [
        {
          mode: 'M-02',
          templateId: 'T-hero-landing',
          triggers: ['portfolio'],
          required_assets: ['name'],
          verify_command: 'npm run verify:lite -- <file.html>',
          example_prompt: 'Make a portfolio',
        },
      ],
    };
  }

  it('accepts valid index', () => {
    const errs = validateIndexSchema(makeValidIndex());
    assert.deepEqual(errs, []);
  });

  it('rejects non-object', () => {
    const errs = validateIndexSchema(null);
    assert.ok(errs.length > 0);
  });

  it('rejects missing templates array', () => {
    const idx = makeValidIndex();
    delete idx.templates;
    const errs = validateIndexSchema(idx);
    assert.ok(errs.includes('templates must be an array'));
  });

  it('rejects missing modeRoutes array', () => {
    const idx = makeValidIndex();
    delete idx.modeRoutes;
    const errs = validateIndexSchema(idx);
    assert.ok(errs.includes('modeRoutes must be an array'));
  });

  it('rejects template without id', () => {
    const idx = makeValidIndex();
    idx.templates[0].id = '';
    const errs = validateIndexSchema(idx);
    assert.ok(errs.some(e => e.includes('templates[0].id')));
  });

  it('rejects modeRoute with invalid mode pattern', () => {
    const idx = makeValidIndex();
    idx.modeRoutes[0].mode = 'mode-2';
    const errs = validateIndexSchema(idx);
    assert.ok(errs.some(e => e.includes('M-XX pattern')));
  });

  it('rejects modeRoute referencing unknown templateId', () => {
    const idx = makeValidIndex();
    idx.modeRoutes[0].templateId = 'T-nonexistent';
    const errs = validateIndexSchema(idx);
    assert.ok(errs.some(e => e.includes('not found in templates')));
  });

  it('rejects modeRoute with empty triggers', () => {
    const idx = makeValidIndex();
    idx.modeRoutes[0].triggers = [];
    const errs = validateIndexSchema(idx);
    assert.ok(errs.some(e => e.includes('triggers')));
  });
});
