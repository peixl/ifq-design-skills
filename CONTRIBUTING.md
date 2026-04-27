# Contributing to IFQ Design Skills

IFQ Design Skills is a skill package, not an app. Contributions should improve
one of four things: user outcomes, agent routing, export reliability, or
marketplace trust.

## Start Here

1. Read `SKILL.md` first. Keep it short; it is the router, not the manual.
2. Read only the reference file for the surface you are changing.
3. Fork existing templates instead of starting from blank HTML.
4. Keep Tier 0 zero-install. Do not add dependencies for the default path.

## Good Changes

- Sharper mode routing, examples, or trigger keywords.
- Safer and more deterministic verification scripts.
- Better templates that preserve local-first fonts and no remote runtime assets.
- Eval cases that catch routing, quality, or export regressions.
- Documentation that reduces install or contribution ambiguity for humans and
  agents.

## Guardrails

- No new dependencies without a clear need and maintainer review.
- No `child_process`, process-spawn APIs, dynamic eval, or runtime network calls
  in Node/Python scripts.
- No secrets, private assets, `.env`, `.npmrc`, generated browser traces, or
  local cache files in commits.
- Do not silently install Playwright, Chromium, Python packages, or ffmpeg.
- Do not bloat `SKILL.md`; move long protocol into `references/`.
- Do not introduce defensive rival-name comparison copy in user-facing docs.

## Eval Contract

`evals/evals.json` is the regression map for the skill. Every new mode,
template, or major workflow change should either update an existing scenario or
add a new one.

Each scenario must protect:

- `user_value`: what the human gets that is better than a generic answer.
- `agent_value`: what makes the task easier and safer for an AI agent.
- `agent_contract`: route, templates, files to read, tier policy, and
  verification commands.
- `quality_bar`: what must appear and what must not regress.

Validate the suite with:

```bash
npm run evals:validate
```

## Verification

Run the full local gate before opening a pull request:

```bash
npm run validate
npm run verify:publish
```

For HTML artifacts, also run:

```bash
npm run verify:lite -- path/to/design.html
npm run preview -- path/to/design.html
```

For export work, only install optional export dependencies when the change
actually touches MP4, GIF, PDF, PPTX, or headless browser verification.

## Pull Request Shape

- State the user or agent problem being improved.
- List changed files by surface: router, references, templates, scripts, evals,
  docs.
- Include verification output.
- Call out anything not tested.
