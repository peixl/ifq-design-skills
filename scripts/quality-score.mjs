#!/usr/bin/env node
// IFQ Design Skills · quality-score.mjs
// Scores the skill across 5 dimensions (agentskill.sh quality model):
//   Discovery, Implementation, Structure, Expertise, Security
// Usage: node scripts/quality-score.mjs [--json]

import { promises as fs } from 'node:fs';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const JSON_OUT = process.argv.includes('--json');

const DIMS = {
  Discovery: { score: 0, max: 0, checks: [] },
  Implementation: { score: 0, max: 0, checks: [] },
  Structure: { score: 0, max: 0, checks: [] },
  Expertise: { score: 0, max: 0, checks: [] },
  Security: { score: 0, max: 0, checks: [] },
};

function check(dim, name, passed, weight = 1) {
  DIMS[dim].max += weight;
  if (passed) DIMS[dim].score += weight;
  DIMS[dim].checks.push({ name, passed, weight });
}

async function readJson(p) {
  return JSON.parse(await fs.readFile(p, 'utf8'));
}

async function fileExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function run() {
  // ── Discovery ──
  const skillMd = await fs.readFile(path.join(ROOT, 'SKILL.md'), 'utf8');
  const hasDescription = skillMd.includes('description:');
  check('Discovery', 'SKILL.md has description field', hasDescription);

  const readmeExists = await fileExists(path.join(ROOT, 'README.md'));
  const readmeEnExists = await fileExists(path.join(ROOT, 'README.en.md'));
  check('Discovery', 'README.md exists', readmeExists);
  check('Discovery', 'README.en.md exists', readmeEnExists);

  const wellKnown = await fileExists(path.join(ROOT, '.well-known/skills/index.json'));
  check('Discovery', '.well-known/skills/index.json exists', wellKnown);

  const agentsYaml = await fileExists(path.join(ROOT, 'agents/openai.yaml'));
  check('Discovery', 'agents/openai.yaml exists', agentsYaml);

  const quickstart = await fileExists(path.join(ROOT, 'references/quickstart.md'));
  check('Discovery', 'Quickstart guide exists', quickstart);

  const changelog = await fileExists(path.join(ROOT, 'CHANGELOG.md'));
  check('Discovery', 'CHANGELOG.md exists', changelog);

  const readmeContent = await fs.readFile(path.join(ROOT, 'README.md'), 'utf8');
  const hasInstallCmd = readmeContent.includes('npx skills add') || skillMd.includes('npx skills add');
  check('Discovery', 'Install command in README or SKILL.md', hasInstallCmd);

  // ── Implementation ──
  const templatesDir = path.join(ROOT, 'assets/templates');
  const templateFiles = (await fs.readdir(templatesDir)).filter(f => f.endsWith('.html'));
  check('Implementation', `Templates >= 12 (found ${templateFiles.length})`, templateFiles.length >= 12, 2);

  const indexJson = await readJson(path.join(templatesDir, 'INDEX.json'));
  const modeRoutes = indexJson.modeRoutes || [];
  check('Implementation', `Mode routes >= 12 (found ${modeRoutes.length})`, modeRoutes.length >= 12, 2);

  const evals = await readJson(path.join(ROOT, 'evals/evals.json'));
  const scenarioCount = evals.scenarios?.length || 0;
  check('Implementation', `Eval scenarios >= 12 (found ${scenarioCount})`, scenarioCount >= 12, 2);

  const refsDir = path.join(ROOT, 'references');
  const refFiles = (await fs.readdir(refsDir)).filter(f => f.endsWith('.md'));
  check('Implementation', `References >= 20 (found ${refFiles.length})`, refFiles.length >= 20);

  const hasModesMd = await fileExists(path.join(ROOT, 'references/modes.md'));
  check('Implementation', 'modes.md exists', hasModesMd);

  const hasAgentProtocol = await fileExists(path.join(ROOT, 'references/agent-interaction-protocol.md'));
  check('Implementation', 'Agent interaction protocol exists', hasAgentProtocol);

  // ── Structure ──
  const skillLines = skillMd.split('\n').length;
  check('Structure', `SKILL.md <= 500 lines (found ${skillLines})`, skillLines <= 500, 2);

  const hasDecisionTree = skillMd.includes('Decision Tree');
  check('Structure', 'Decision tree in SKILL.md', hasDecisionTree);

  const hasConversationPatterns = skillMd.includes('Conversation Patterns');
  check('Structure', 'Conversation patterns in SKILL.md', hasConversationPatterns);

  const hasErrorRecovery = skillMd.includes('Error Recovery');
  check('Structure', 'Error recovery in SKILL.md', hasErrorRecovery);

  const hasQuickRef = skillMd.includes('Quick Reference');
  check('Structure', 'Quick reference table in SKILL.md', hasQuickRef);

  const pkg = await readJson(path.join(ROOT, 'package.json'));
  const hasValidate = pkg.scripts?.validate;
  check('Structure', 'npm run validate script exists', !!hasValidate);

  const hasVerifyPublish = pkg.scripts?.['verify:publish'];
  check('Structure', 'npm run verify:publish script exists', !!hasVerifyPublish);

  // ── Expertise ──
  const hasAntiSlop = await fileExists(path.join(ROOT, 'references/anti-ai-slop.md'));
  check('Expertise', 'Anti-AI-slop checklist exists', hasAntiSlop);

  const hasCritiqueGuide = await fileExists(path.join(ROOT, 'references/critique-guide.md'));
  check('Expertise', 'Critique guide exists', hasCritiqueGuide);

  const hasDesignStyles = await fileExists(path.join(ROOT, 'references/design-styles.md'));
  check('Expertise', 'Design styles library exists', hasDesignStyles);

  const hasBrandSpec = await fileExists(path.join(ROOT, 'references/ifq-brand-spec.md'));
  check('Expertise', 'IFQ brand spec exists', hasBrandSpec);

  const hasFactCheck = await fileExists(path.join(ROOT, 'references/fact-and-asset-protocol.md'));
  check('Expertise', 'Fact-check protocol exists', hasFactCheck);

  const demosDir = path.join(ROOT, 'demos');
  const demoExists = await fileExists(demosDir);
  check('Expertise', 'Demos directory exists', demoExists);

  const hasSfx = await fileExists(path.join(ROOT, 'assets/sfx'));
  check('Expertise', 'SFX library exists', hasSfx);

  // ── Security ──
  const hasSecurityMd = await fileExists(path.join(ROOT, 'SECURITY.md'));
  check('Security', 'SECURITY.md exists', hasSecurityMd);

  const hasLicense = await fileExists(path.join(ROOT, 'LICENSE'));
  check('Security', 'LICENSE exists', hasLicense);

  const noEnvRequired = skillMd.includes('"env":[]');
  check('Security', 'No required env vars', noEnvRequired);

  const noPostinstall = !pkg.scripts?.postinstall;
  check('Security', 'No postinstall hook', noPostinstall);

  const hasOptionalDeps = !!pkg.optionalDependencies;
  check('Security', 'Export deps under optionalDependencies', hasOptionalDeps);

  const hasCapabilitySignals = skillMd.includes('"crypto":false');
  check('Security', 'Capability signals declared (no crypto)', hasCapabilitySignals);

  // ── Output ──
  const total = Object.values(DIMS).reduce((s, d) => s + d.score, 0);
  const maxTotal = Object.values(DIMS).reduce((s, d) => s + d.max, 0);
  const pct = Math.round((total / maxTotal) * 100);

  if (JSON_OUT) {
    const report = {
      version: pkg.version,
      scored_at: new Date().toISOString(),
      total: { score: total, max: maxTotal, percent: pct },
      dimensions: {},
    };
    for (const [name, dim] of Object.entries(DIMS)) {
      report.dimensions[name] = {
        score: dim.score,
        max: dim.max,
        percent: Math.round((dim.score / dim.max) * 100),
        checks: dim.checks,
      };
    }
    console.log(JSON.stringify(report, null, 2));
  } else {
    const BOLD = '\x1b[1m', GREEN = '\x1b[32m', YELLOW = '\x1b[33m', RED = '\x1b[31m', DIM = '\x1b[2m', RESET = '\x1b[0m';
    console.log(`${BOLD}IFQ Design Skills · Quality Score${RESET}`);
    console.log(`${DIM}(${new Date().toISOString().slice(0, 10)})${RESET}\n`);

    for (const [name, dim] of Object.entries(DIMS)) {
      const dimPct = Math.round((dim.score / dim.max) * 100);
      const color = dimPct >= 80 ? GREEN : dimPct >= 60 ? YELLOW : RED;
      console.log(`${BOLD}${name}${RESET}  ${color}${dim.score}/${dim.max} (${dimPct}%)${RESET}`);
      for (const c of dim.checks) {
        const mark = c.passed ? `${GREEN}✓${RESET}` : `${RED}✗${RESET}`;
        console.log(`  ${mark} ${c.name}`);
      }
      console.log();
    }

    const color = pct >= 80 ? GREEN : pct >= 60 ? YELLOW : RED;
    console.log(`${BOLD}Total: ${color}${total}/${maxTotal} (${pct}%)${RESET}`);
  }

  process.exit(total === maxTotal ? 0 : 1);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
