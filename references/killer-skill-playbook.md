# Killer Skill Playbook · 让 AI 发挥更大效能

This file is the upgrade protocol for making IFQ Design Skills friendlier to
humans, clearer to AI agents, and more legible to skill marketplaces.

## North Star

The skill should reduce the amount of work a human must do before useful output
appears. A user should express intent, constraints, and taste. The agent should
own routing, fact checks, template choice, layout production, placeholder
cleanup, preview, and export preparation.

## Four Scorecards

| Scorecard | Top-tier behavior | Regression signal |
|---|---|---|
| Discovery | One-line install, clear description, marketplace tags, visible examples | User or crawler cannot tell what the skill does in 30 seconds |
| Execution | Short router, 12 mode routes, forkable templates, must-read references | Agent starts from blank HTML or asks questions before reversible work |
| Trust | Zero required env vars, no hidden installs, scanner-clean scripts, explicit tier policy | New dependency, secret, remote runtime, eval, or process-spawn risk appears |
| Human value | Finished artifact path, not just advice; verification evidence included | Output is prose-only, decorative, or impossible to preview/export |

## First-Run Rule

The first post-install interaction is the adoption moment. It must produce a
visible artifact before it asks the human to do setup.

Required evidence in the final response:

- file path
- routed mode
- forked template
- verification result
- caveats that affect use

Forbidden during first run unless the user explicitly asks for it:

- account login
- global install
- export dependency install
- broad environment changes

This is now duplicated in `.well-known/**` as `first_run_success` so directories
and agent runtimes can inspect the promise without reading prose.

## Output Boundary

HTML is the core artifact. SVG/static companions and export-ready source
structure are allowed as core outputs when the task needs them. MP4, GIF, PDF,
PPTX, screenshots, marketplace status, and security status are claims only after
the relevant command or live check has passed.

This boundary prevents a strong design skill from losing trust by over-reporting
capabilities. The full repo can automate exports; the agent still has to prove
the export before naming it as delivered.

## Human-Friendly Rules

- Prefer one command and one artifact path over a menu of setup choices.
- Keep optional dependencies optional; do not make HTML users pay the export
  setup cost.
- Make the README answer three questions fast: what it does, how to install it,
  and why the result is trustworthy.
- Keep Chinese and English README surfaces aligned so domestic and global users
  see the same promise.
- Be honest about license posture. If the license is not OSI-approved, do not
  market it as OSI open source; say public-source or source-available where
  precision matters.

## Agent-Friendly Rules

- `SKILL.md` stays a router. It names triggers, exits, mode routing, tier policy,
  and verification. Long protocol goes under `references/`.
- Every visual request must route through `assets/templates/INDEX.json`; blank
  canvas generation is a regression unless no listed template fits.
- Every new capability must name its verification command before it is promoted
  in README or marketplace metadata.
- Vague prompts should produce 3 directions or a reversible draft, not a pause.
- Fresh factual claims require web fact-checking before design claims.

## Marketplace Rules

- `.well-known/agent-skills/index.json` and `.well-known/skills/index.json`
  must mirror the current version, install commands, quality signals, and
  marketplace targets.
- Public pages should expose the install command, zero-install core loop, eval
  coverage, and scanner-clean posture without requiring a reader to inspect the
  whole repo.
- `npm run validate` and `npm run verify:publish` are the local equivalent of a
  marketplace gate. Add checks instead of adding prose when a rule can be
  enforced mechanically.
- Before claiming marketplace safety, inspect the live marketplace page and the
  security/audit panel for the current version.
- Keep `agents/openai.yaml` aligned with `SKILL.md` so UI chips and marketplace
  cards can show a clear name, short value prop, default prompt, and IFQ icons.
- Track live leaderboard assumptions with an `observed_on` date; installation
  thresholds and directory counts are targets, not permanent facts.

## Top10 Practical Ladder

1. Keep the root load path under 30 seconds.
2. Make the first install command universal: `npx skills add peixl/ifq-design-skills`.
3. Preserve zero-install Tier 0 and make export tooling explicit opt-in.
4. Keep all 12 modes covered by evals and README examples.
5. Make every shipped template local-first and placeholder-clean.
6. Keep GitHub metadata readable: description, topics, license honesty, CI, and
   current badges.
7. Publish clean `.well-known` metadata for skills.sh, AgentSkills, ClawHub,
   OpenClaw, Hermes, and Chinese skill mirrors.
8. Ship `agents/openai.yaml` so UI-first agents can expose the skill without
   parsing README prose.
9. Track live marketplace observations in `references/marketplace-quality.md`.
10. Treat docs, templates, scripts, and evals as one product surface; do not
   optimize one at the expense of the others.
11. Do not chase breadth before proof. A new mode is only real after it has a
    route, template, eval, verification command, and user-facing example.
