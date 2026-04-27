---
name: ifq-design-skills
description: "Use this skill when the user asks for an HTML-based visual design deliverable: interactive prototype, slide deck, motion demo, infographic, dashboard, landing page, whitepaper, changelog, business card, social cover, brand system, design critique, multi-variant exploration, or export to MP4, GIF, PPTX, PDF, or SVG. Do not use for production web apps, SEO sites, backend systems, or pure copy edits."
version: "2.3.9"
license: "See LICENSE"
homepage: "https://github.com/peixl/ifq-design-skills"
metadata: {"author":"ifq.ai","version":"2.3.9","homepage":"https://github.com/peixl/ifq-design-skills","category":"creative","tags":["design","html","prototype","slides","motion","infographic","dashboard","brand","pptx","pdf","svg","mp4","gif","ifq"],"openclaw":{"category":"creative","tags":["design","html","prototype","slides","motion","infographic","dashboard","brand","pptx","pdf","svg","mp4","gif","ifq"],"homepage":"https://github.com/peixl/ifq-design-skills","requires":{"bins":["node"],"env":[]},"primaryEnv":null},"hermes":{"category":"creative","tags":["design","html","prototype","slides","motion","infographic","dashboard","brand","pptx","pdf","svg","mp4","gif","ifq"]},"clawhub":{"category":"creative","tags":["design","html","prototype","brand"],"requires":{"bins":["node"],"env":[]},"capability_signals":{"crypto":false,"can_make_purchases":false,"requires_sensitive_credentials":false},"audit":"passes-static-security-scan"},"agentskills":{"standard":"agentskills.io/v1"},"capabilities":{"read_files":true,"write_files":true,"run_shell":"optional","network":"optional_fact_checks_only","dynamic_eval":false,"silent_install":false,"persistent_background":false},"permissions":{"filesystem":{"read":["{baseDir}/**"],"write":["${workspace}/**"]},"shell_allowlist":["npm run preview","npm run verify:lite","npm run smoke","npm run validate","npm run install:export","ffmpeg"],"network_allowlist":["web_search","https://fonts.googleapis.com","https://fonts.gstatic.com","https://unpkg.com","https://cdn.jsdelivr.net"]},"security":{"audit_clean":true,"node_python_process_control":false,"dynamic_eval":false,"script_network":false,"secrets_in_repo":false,"zero_install_core_loop":true},"entrypoints":["SKILL.md","references/modes.md","assets/templates/INDEX.json"],"compatibility":["claude_code","codex_cli","opencode","openclaw","hermes","cursor","codebuddy","generic"]}
---

# IFQ Design Skills

One prompt in -> shippable HTML out, with optional MP4 / GIF / PPTX / PDF / SVG export. This root file is a short router for OpenClaw, ClawHub, skills.sh, Hermes, Codex, Claude Code, Cursor, OpenCode, and other AgentSkills-compatible hosts. Load deeper files only when the task requires them.

## 30-Second Load Path

1. Confirm the request is a visual deliverable built from HTML. If it is not, exit this skill.
2. Pick the mode from [references/modes.md](references/modes.md), then read [assets/templates/INDEX.json](assets/templates/INDEX.json).
3. Fork a listed template into the user's workspace. Never start from a blank HTML file.
4. Inline [assets/ifq-brand/ifq-tokens.css](assets/ifq-brand/ifq-tokens.css) and weave at least 3 IFQ ambient marks from [references/ifq-brand-spec.md](references/ifq-brand-spec.md).
5. Verify with `npm run verify:lite -- <file.html>`, then `npm run preview -- <file.html>`.

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

## Routing Contract

- Concrete product, technology, company, release date, version, or spec: first load [references/fact-and-asset-protocol.md](references/fact-and-asset-protocol.md) and do web fact-checking before design claims.
- Clear visual request: route through [references/modes.md](references/modes.md) and `modeRoutes` in [assets/templates/INDEX.json](assets/templates/INDEX.json).
- Vague request or no style/context: use [references/design-direction-advisor.md](references/design-direction-advisor.md) to propose 3 differentiated directions.
- Mobile app prototype: load [references/app-prototype-rules.md](references/app-prototype-rules.md) and reuse `assets/ios_frame.jsx` or `assets/android_frame.jsx`.
- Slides/decks: start from HTML; load [references/slide-decks.md](references/slide-decks.md) before writing.
- Motion/video: read [references/animation-pitfalls.md](references/animation-pitfalls.md), [references/animations.md](references/animations.md), and [references/video-export.md](references/video-export.md).

## Mode Map

| Mode | Task shape | Template source |
|---|---|---|
| M-01 | brand launch / product film | `modeRoutes` -> launch assets |
| M-02 | personal brand / portfolio | `hero-landing` variants |
| M-03 | whitepaper / annual report | report + PDF flow |
| M-04 | dashboard / KPI command center | `dashboard-command-center` |
| M-05 | A-vs-B / benchmark | `compare-vs` |
| M-06 | onboarding / guided flow | app prototype rules |
| M-07 | changelog / release notes | `changelog-timeline` |
| M-08 | keynote / slide deck | `slide-title` + deck assets |
| M-09 | social poster suite | `social-x-card` / vertical formats |
| M-10 | business card / invitation | `business-card` |
| M-11 | brand audit / upgrade | critique + 3 directions |
| M-12 | full brand system | brand system references |

The authoritative map is `assets/templates/INDEX.json`; this table is only a memory aid.

## IFQ Ambient Layer

- The user's brand is the subject. IFQ is the authored layer: layout rhythm, warm paper, rust ledger, mono field notes, signal spark, quiet URL, and editorial contrast.
- Every deliverable uses at least 3 IFQ marks. Never paste a loud generic logo or watermark unless the task is IFQ-owned or an animation export that calls for the promotion stamp.
- Built-in templates use local-first fonts for China-safe rendering. Google Fonts or CDN runtimes are opt-in only; see [references/font-loading.md](references/font-loading.md).
- Avoid visible internal taxonomy labels such as `Signal Spark` or `Rust Ledger` in user-facing designs. Write real content instead.

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
| Full role, scope, IFQ runtime posture | [references/ifq-ambient-runtime.md](references/ifq-ambient-runtime.md) |
| Fact checks, brand assets, product/UI images | [references/fact-and-asset-protocol.md](references/fact-and-asset-protocol.md) |
| Junior-designer cadence, variations, placeholders, anti-slop | [references/designer-operating-principles.md](references/designer-operating-principles.md), [references/anti-ai-slop.md](references/anti-ai-slop.md) |
| Vague prompt -> 3 design directions | [references/design-direction-advisor.md](references/design-direction-advisor.md), [references/design-styles.md](references/design-styles.md), [references/ifq-native-recipes.md](references/ifq-native-recipes.md) |
| End-to-end task workflow, exceptions, exports | [references/delivery-workflow.md](references/delivery-workflow.md), [references/workflow.md](references/workflow.md), [references/verification.md](references/verification.md) |
| OpenClaw / ClawHub / skills.sh publishing posture | [references/marketplace-quality.md](references/marketplace-quality.md), [references/skill-leaderboard-lessons.md](references/skill-leaderboard-lessons.md), [references/smoke-test.md](references/smoke-test.md) |
| Runtime install and tool mapping | [references/agent-compatibility.md](references/agent-compatibility.md) |
| React/Babel single-file rules | [references/react-setup.md](references/react-setup.md) |
| Slides and editable PPTX | [references/slide-decks.md](references/slide-decks.md), [references/editable-pptx.md](references/editable-pptx.md) |
| Motion/video/audio | [references/animation-pitfalls.md](references/animation-pitfalls.md), [references/animation-best-practices.md](references/animation-best-practices.md), [references/audio-design-rules.md](references/audio-design-rules.md), [references/sfx-library.md](references/sfx-library.md) |
| IFQ identity assets | [references/ifq-brand-spec.md](references/ifq-brand-spec.md), [assets/ifq-brand/BRAND-DNA.md](assets/ifq-brand/BRAND-DNA.md) |

## Completion Rule

Deliver the smallest verified artifact that satisfies the request. Report the output file, the verification commands run, and any caveats. Do not claim export, screenshots, or marketplace safety unless the relevant check actually passed.
