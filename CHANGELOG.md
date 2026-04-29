# Changelog

All notable changes to IFQ Design Skills are documented here.

## [3.0.0] — 2026-04-29

### Added
- **4 new specialized templates**: `T-launch-film` (M-01), `T-onboarding-flow` (M-06), `T-brand-diagnosis` (M-11), `T-brand-system` (M-12) — all 12 modes now have dedicated templates
- **Quick Reference Table** in SKILL.md: mode → trigger → template → key references, one-line speed lookup for agents
- **Routing Decision Tree** in SKILL.md: visual flowchart replacing prose-based routing contract
- **Conversation Patterns** in SKILL.md: 3 documented patterns (vague/specific/iterative) with agent behavior rules
- **Error Recovery Table** in SKILL.md: 6 failure modes with standardized fallback strategies
- **Quickstart Guide** (`references/quickstart.md`): 3 one-liner examples + troubleshooting FAQ
- **Agent Interaction Protocol** (`references/agent-interaction-protocol.md`): decision tree, state machine, question minimization rules, progressive disclosure, failure modes, output contract
- **8 new eval scenarios**: brand with existing assets, real-data dashboard, multiplatform onboarding, deck with PPTX export, multiplatform social kit, brand with existing guidelines, vague request handling, iterative refinement
- **Demo/Showcase system** (`demos/`): 3 production-quality HTML demos (landing page, dashboard, slide deck)
- **Comparison table** in README: IFQ vs 5 leading design skills across 10 capabilities
- **Showcase section** in README: links to demo files
- **Community section** in README: Issues, Discussions, Contributing links
- **CHANGELOG.md**: this file

### Changed
- All 8 existing templates upgraded with: responsive breakpoints (1024px, 640px), print-safe styles, dark mode support (`prefers-color-scheme: dark`), reduced motion support (`prefers-reduced-motion: reduce`), responsive viewport meta
- M-01/M-06/M-11/M-12 mode routes updated to use new dedicated templates (with fallback notes)
- SKILL.md Reference Map expanded with quickstart and agent-interaction-protocol entries
- `.well-known/**` manifests: added `examples` (3 prompt→output mappings) and `screenshots` (demo file paths)
- `agents/openai.yaml`: added `examples` array and `category_tags` for marketplace cards
- Eval suite expanded from 12 to 20 scenarios

### Quality
- All 14 smoke test gates pass
- All 20 eval scenarios validated
- All templates pass `verify:lite` placeholder scan
- All templates are local-first (no remote CSS/JS)

## [2.4.1] — 2026-04-29

### Changed
- Kept Actions compatible with current GitHub runtimes
- Made skill adoption measurable before marketplace submission

## [2.4.0] — 2026-04-28

### Changed
- Enhanced documentation and validation processes
- Added new quality signals and marketplace targets

## [2.3.8] — 2026-04-27

### Changed
- Bumped version and updated marketplace quality references

## [2.3.7] — 2026-04-27

### Changed
- Updated version and enhanced documentation for clarity

## [2.3.6] — 2026-04-27

### Added
- Design direction advisor, designer operating principles, fact and asset protocol
- IFQ ambient runtime documentation

### Changed
- Upgraded marketplace-ready skill guidance
