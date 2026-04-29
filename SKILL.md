---
name: ifq-design-skills
description: "Use this skill whenever the user asks for an HTML-first visual design deliverable or design judgment: interactive prototype, slide deck, motion demo, infographic, dashboard, landing page, whitepaper, changelog, business card, social cover, brand system, design critique, multi-variant exploration, or export to MP4, GIF, PPTX, PDF, or SVG. It is optimized to make AI agents do the routing, template selection, verification, and export prep so humans spend less time prompt-engineering. Do not use for production web apps, SEO sites, backend systems, or pure copy edits."
version: "3.0.0"
license: "Apache-2.0 WITH brand-clause"
homepage: "https://github.com/peixl/ifq-design-skills"
metadata: {"author":"ifq.ai","version":"3.0.0","homepage":"https://github.com/peixl/ifq-design-skills","category":"creative","tags":["design","html","prototype","slides","motion","infographic","dashboard","brand","pptx","pdf","svg","mp4","gif","ifq"],"openclaw":{"category":"creative","tags":["design","html","prototype","slides","motion","infographic","dashboard","brand","pptx","pdf","svg","mp4","gif","ifq"],"homepage":"https://github.com/peixl/ifq-design-skills","requires":{"bins":["node"],"env":[]},"primaryEnv":null},"hermes":{"category":"creative","tags":["design","html","prototype","slides","motion","infographic","dashboard","brand","pptx","pdf","svg","mp4","gif","ifq"]},"clawhub":{"category":"creative","tags":["design","html","prototype","brand"],"requires":{"bins":["node"],"env":[]},"capability_signals":{"crypto":false,"can_make_purchases":false,"requires_sensitive_credentials":false},"audit":"passes-static-security-scan"},"agentskills":{"standard":"agentskills.io/v1"},"capabilities":{"read_files":true,"write_files":true,"run_shell":"optional","network":"optional_fact_checks_only","dynamic_eval":false,"silent_install":false,"persistent_background":false},"permissions":{"filesystem":{"read":["{baseDir}/**"],"write":["${workspace}/**"]},"shell_allowlist":["npm run preview","npm run verify:lite","npm run smoke","npm run validate","npm run install:export","ffmpeg"],"network_allowlist":["web_search","https://fonts.googleapis.com","https://fonts.gstatic.com","https://unpkg.com","https://cdn.jsdelivr.net"]},"security":{"audit_clean":true,"node_python_process_control":false,"dynamic_eval":false,"script_network":false,"secrets_in_repo":false,"zero_install_core_loop":true},"entrypoints":["SKILL.md","references/modes.md","assets/templates/INDEX.json"],"compatibility":["claude_code","codex_cli","opencode","openclaw","hermes","cursor","codebuddy","generic"]}
---

# IFQ Design Skills

One prompt in -> shippable HTML out, with optional MP4 / GIF / PPTX / PDF / SVG export. This root file is a short router for OpenClaw, ClawHub, skills.sh, Hermes, Codex, Claude Code, Cursor, OpenCode, and other AgentSkills-compatible hosts. Load deeper files only when the task requires them.

## 30-Second Load Path

1. Confirm the request is a visual deliverable built from HTML. If it is not, exit this skill.
2. Pick the mode from [references/modes.md](references/modes.md), then read [assets/templates/INDEX.json](assets/templates/INDEX.json).
3. Fork a listed template into the user's workspace. Never start from a blank HTML file.
4. Inline [assets/ifq-brand/ifq-tokens.css](assets/ifq-brand/ifq-tokens.css) and weave at least 3 IFQ ambient marks from [references/ifq-brand-spec.md](references/ifq-brand-spec.md).
5. Verify with `npm run verify:lite -- <file.html>`, then `npm run preview -- <file.html>`.

## Human + Agent Promise

- Humans get a finished artifact path: HTML first, optional export only when requested, and no hidden setup.
- Agents get a short route: mode, template, must-read references, tier policy, and verification command.
- Maintainers get regression pressure: 12 mode evals, scanner-clean scripts, and marketplace metadata checks.
- Marketplaces get a readable package: one-line install, zero required env vars, explicit permissions, and no silent installs.

## First-Run Success Path

After install, make the first interaction produce a visible artifact in one turn:

1. Accept a natural-language visual request without turning it into setup work.
2. Route it to one mode and one template; name both in the final evidence.
3. Write the HTML file into the user's workspace with labeled assumptions for unresolved facts.
4. Run `npm run verify:lite -- <file.html>` when shell is available, then preview or screenshot with host browser tooling when available.
5. Report the file path, route, template, verification result, and only caveats that affect use.

Do not ask for account login, global install, export dependencies, or broad environment changes during the first-run path.

## Output Boundary

- Core output is verified local HTML, plus SVG/static companions or export-ready source structure when the task needs them.
- MP4/GIF/PDF/PPTX helpers are full-repo optional automation. Prepare the HTML source first; install or run export tooling only after explicit user intent.
- Never claim an export file, screenshot, marketplace status, or security result exists until the relevant command or live check has actually passed.

## Use When

- Interactive prototype, hi-fi mockup, clickable app flow, dashboard, landing page, whitepaper, report, infographic, slide deck, changelog, card, invitation, social cover, or brand system.
- Motion demo or launch animation, especially when the user also wants MP4/GIF output.
- Design critique, brand diagnosis, or 3 differentiated style directions before implementation.
- The user asks for PDF/PPTX/SVG export from an HTML-first source.

## Do Not Use When

- The real task is production frontend engineering, backend work, SEO-critical site implementation, or a CSS bug inside an existing app.
- The user only wants copy editing with no visual artifact.
- The deliverable must round-trip through Word, Google Docs, or a locked corporate template.

## Tier Policy

| Tier | Default? | Requirements | Use for |
|---|---:|---|---|
| Tier 0 | yes | Node >= 18.17 | HTML, preview, lite verification, smoke tests |
| Tier 1 | opt-in | Python + Playwright + Chromium | headless screenshots, console capture, multi-viewport checks |
| Tier 2 | opt-in | `npm run install:export`; MP4/GIF also need `ffmpeg` | MP4, GIF, PDF, editable PPTX export |

Do not install optional dependencies unless the user explicitly needs screenshots or export formats.

## Routing Decision Tree

```
User request arrives
  │
  ├─ Is it a visual design deliverable? ─── No → Exit skill, hand back to default agent
  │
  ├─ Can you match a mode trigger? ─── Yes (confidence >70%) → fork template → deliver → verify
  │                                      (one-turn: name assumptions, no questions)
  │
  ├─ Can you match a mode trigger? ─── Yes (confidence ≤70%) → design-direction-advisor.md lightweight
  │                                      (3 text-only directions, no demos, wait for user pick)
  │
  ├─ Does it mention a concrete product/tech/event? ─── Yes → fact-and-asset-protocol.md + web fact-check
  │
  ├─ Is it a mobile app prototype? ─── Yes → app-prototype-rules.md + ios_frame.jsx / android_frame.jsx
  │
  └─ Is it motion/video? ─── Yes → animation-pitfalls.md + animations.md + video-export.md
```

Read [references/modes.md](references/modes.md) for full mode protocol. The Quick Reference table above is the speed layer.

## Quick Reference (Agent Speed Table)

| Mode | Trigger keywords | Template | Key references |
|---|---|---|---|
| M-01 | launch film, 发布会, product video | `T-launch-film` | animations.md, video-export.md |
| M-02 | portfolio, 个人站, about me | `T-hero-landing` | design-direction-advisor.md |
| M-03 | whitepaper, 白皮书, annual report | `T-infographic-vertical` | fact-and-asset-protocol.md |
| M-04 | dashboard, 看板, KPI, command center | `T-dashboard` | app-prototype-rules.md |
| M-05 | A vs B, 横评, benchmark | `T-compare-vs` | fact-and-asset-protocol.md |
| M-06 | onboarding, 新手引导, flow demo | `T-onboarding-flow` | app-prototype-rules.md |
| M-07 | changelog, release notes, 发布日记 | `T-changelog` | content-guidelines.md |
| M-08 | keynote, PPT, 演讲, slide deck | `T-slide-title` | slide-decks.md, editable-pptx.md |
| M-09 | 社媒物料, social cover, 小红书 | `T-social-x` | content-guidelines.md |
| M-10 | 名片, business card, 邀请函 | `T-business-card` | ifq-brand-spec.md |
| M-11 | 品牌诊断, brand audit, 品牌体检 | `T-brand-diagnosis` | critique-guide.md |
| M-12 | brand from scratch, 从零建立品牌 | `T-brand-system` | design-direction-advisor.md |

All templates: `npm run verify:lite -- <file>` + `npm run preview -- <file>` (Tier 0, zero-install).

## IFQ Ambient Layer

- The user's brand is the subject. IFQ is the authored layer: layout rhythm, warm paper, rust ledger, mono field notes, signal spark, quiet URL, and editorial contrast.
- Every deliverable uses at least 3 IFQ marks. Never paste a loud generic logo or watermark unless the task is IFQ-owned or an animation export that calls for the promotion stamp.
- Built-in templates use local-first fonts for China-safe rendering. Google Fonts or CDN runtimes are opt-in only; see [references/font-loading.md](references/font-loading.md).
- Avoid visible internal taxonomy labels such as `Signal Spark` or `Rust Ledger` in user-facing designs. Write real content instead.

## Conversation Patterns

**Pattern A — Specific request (most common, one turn):**
User: "做一个 A vs B 对比评测，我们对 Stripe" → Agent: fact-check both products → route M-05 → fork T-compare-vs → fill with verified data → deliver → verify.

**Pattern B — Confident default (one turn):**
User: "给我做个 landing page" → Agent: match M-02 with >70% confidence → fork T-hero-landing → pick Editorial Serif style → fill with defaults → deliver → verify → name assumptions in caveats.

**Pattern C — Lightweight advisor (two turns):**
User: "帮我做点好看的东西" → Agent: no mode match at >70% → read design-direction-advisor.md → propose 3 text-only directions → user picks → route → deliver.

**Pattern D — Iterative refinement:**
User: "把刚才那个 deck 的配色改暖一点" → Agent: locate previous artifact → edit in-place → re-run `verify:lite` → report what changed.

Rule: **never ask more than 1 question per turn**. Use defaults for everything else. If the user did not specify a style, pick one and name it in the deliverable — they can iterate.

## Error Recovery

| Failure | Recovery |
|---|---|
| No template matches the request | Use T-hero-landing as generic scaffold, note the gap in deliverable |
| `verify:lite` reports placeholders | Fix the placeholders, re-verify, report the fix |
| `verify:lite` reports IFQ label leaks | Remove internal taxonomy labels (Signal Spark, Rust Ledger etc.) from user-facing text |
| Export command fails | Report the exact error, suggest `npm run install:export` if deps missing, never claim the export exists |
| User says "this looks AI-generated" | Read anti-ai-slop.md, apply the 7-point pre-flight checklist, rewrite with more rhythm variation |
| Agent cannot fact-check (no web access) | Name unverified claims as "unverified" in the deliverable, do not invent specs |
| Template rendering fails or looks broken | Fall back to a simpler template (T-hero-landing), report the degradation reason |
| Request is outside the skill scope | State the boundary honestly, suggest alternatives (e.g. "this is better suited to a React framework") |

## Safety Contract

- Root instructions stay scoped to HTML visual delivery. Do not ask for unrelated secrets, host config, persistent agents, or background services.
- Scripts are local-first: no dynamic eval, no runtime network calls, no hidden installs, and no writes outside the user's workspace.
- Required environment variables are intentionally empty. Optional export tools are documented and invoked only after user intent.
- OpenClaw/ClawHub metadata lives in the single-line JSON `metadata` field so parsers can gate on `metadata.openclaw.requires.bins` and `metadata.openclaw.requires.env`.

## Verification Before Delivery

1. Run `npm run verify:lite -- <file.html>` for placeholder and IFQ label leaks.
2. Run `npm run preview -- <file.html>` and inspect the browser output.
3. For app prototypes, click at least one primary path, one tab/screen switch, and one detail/annotation action.
4. For decks, verify slide count and format requirements before PDF/PPTX export.
5. For animation exports, verify timing, audio policy, and final file presence.
6. After repo edits, run `npm run validate` and `npm run verify:publish`.

## Reference Map

| Need | Load |
|---|---|
| First-time quickstart, 3 one-liner examples | [references/quickstart.md](references/quickstart.md) |
| UI discovery chips and default invocation | [agents/openai.yaml](agents/openai.yaml) |
| Full role, scope, IFQ runtime posture | [references/ifq-ambient-runtime.md](references/ifq-ambient-runtime.md) |
| Fact checks, brand assets, product/UI images | [references/fact-and-asset-protocol.md](references/fact-and-asset-protocol.md) |
| Junior-designer cadence, variations, placeholders, anti-slop | [references/designer-operating-principles.md](references/designer-operating-principles.md), [references/anti-ai-slop.md](references/anti-ai-slop.md) |
| Vague prompt -> 3 design directions | [references/design-direction-advisor.md](references/design-direction-advisor.md), [references/design-styles.md](references/design-styles.md), [references/ifq-native-recipes.md](references/ifq-native-recipes.md) |
| End-to-end task workflow, exceptions, exports | [references/delivery-workflow.md](references/delivery-workflow.md), [references/workflow.md](references/workflow.md), [references/verification.md](references/verification.md) |
| Agent interaction protocol, decision tree, state machine | [references/agent-interaction-protocol.md](references/agent-interaction-protocol.md) |
| Skill improvement, eval coverage, contribution rules | [references/killer-skill-playbook.md](references/killer-skill-playbook.md), [evals/evals.json](evals/evals.json), [CONTRIBUTING.md](CONTRIBUTING.md), [SECURITY.md](SECURITY.md) |
| OpenClaw / ClawHub / skills.sh publishing posture | [references/marketplace-quality.md](references/marketplace-quality.md), [references/skill-leaderboard-lessons.md](references/skill-leaderboard-lessons.md), [references/smoke-test.md](references/smoke-test.md) |
| Runtime install and tool mapping | [references/agent-compatibility.md](references/agent-compatibility.md) |
| React/Babel single-file rules | [references/react-setup.md](references/react-setup.md) |
| Slides and editable PPTX | [references/slide-decks.md](references/slide-decks.md), [references/editable-pptx.md](references/editable-pptx.md) |
| Motion/video/audio | [references/animation-pitfalls.md](references/animation-pitfalls.md), [references/animation-best-practices.md](references/animation-best-practices.md), [references/audio-design-rules.md](references/audio-design-rules.md), [references/sfx-library.md](references/sfx-library.md) |
| IFQ identity assets | [references/ifq-brand-spec.md](references/ifq-brand-spec.md), [assets/ifq-brand/BRAND-DNA.md](assets/ifq-brand/BRAND-DNA.md) |

## Completion Rule

Deliver the smallest verified artifact that satisfies the request. Report the output file, the verification commands run, and any caveats. Do not claim export, screenshots, or marketplace safety unless the relevant check actually passed.
