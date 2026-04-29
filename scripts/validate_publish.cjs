// Validate SKILL.md and well-known indices against marketplace publish rules.
const fs = require('fs');
const path = require('path');

let failed = 0;

function report(label, ok, detail = '') {
  console.log(label + ':', ok ? 'OK' : `FAIL${detail ? ' ' + detail : ''}`);
  if (!ok) failed++;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

async function main() {
  const {
    validateOpenAiYaml,
    validateSkillManifest,
    validateWellKnownEntry,
  } = await import('./lib/publish-checks.mjs');

  const pkg = readJson('package.json');
  const npmIgnore = fs.existsSync('.npmignore') ? fs.readFileSync('.npmignore', 'utf8') : '';

  const openAiYamlPath = 'agents/openai.yaml';
  if (!fs.existsSync(openAiYamlPath)) {
    report('agents/openai.yaml', false, 'missing UI metadata');
  } else {
    const yaml = fs.readFileSync(openAiYamlPath, 'utf8');
    const errors = validateOpenAiYaml(yaml, (rel) => fs.existsSync(path.join(process.cwd(), rel)));
    report('agents/openai.yaml', errors.length === 0, errors.join(', '));
  }

  const skillPath = 'SKILL.md';
  if (!fs.existsSync(skillPath)) {
    report('SKILL.md', false, 'missing');
  } else {
    const result = validateSkillManifest(fs.readFileSync(skillPath, 'utf8'), pkg.version);
    report('SKILL.md publish metadata', result.errors.length === 0, result.errors.join(', '));
  }

  for (const localDir of ['.claude/', '.codex/', '.cursor/', '.gemini/', '.hermes/', '.openclaw/', '.roo/', '.windsurf/']) {
    report(`.npmignore excludes ${localDir}`, npmIgnore.includes(localDir));
  }

  for (const indexPath of ['.well-known/agent-skills/index.json', '.well-known/skills/index.json']) {
    console.log('--- ' + indexPath + ' ---');
    if (!fs.existsSync(indexPath)) {
      report(indexPath, false, 'missing');
      continue;
    }

    let index;
    try {
      index = readJson(indexPath);
    } catch (error) {
      report(indexPath, false, `invalid JSON: ${error.message}`);
      continue;
    }

    if (!Array.isArray(index.skills) || index.skills.length === 0) {
      report(indexPath, false, 'missing skills[]');
      continue;
    }

    for (const entry of index.skills) {
      const errors = validateWellKnownEntry(entry, pkg.version);
      report(`${indexPath} ${entry.name || '(unnamed)'}`, errors.length === 0, errors.join(', '));
    }
  }

  console.log('\n' + (failed === 0 ? '✅ ALL CHECKS PASSED' : '❌ ' + failed + ' failure(s)'));
  process.exit(failed === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
