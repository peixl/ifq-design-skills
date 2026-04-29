---
name: ifq-design-skills
description: Agent-native design engine that makes AI do more useful work: route the prompt, fork a template, weave IFQ ambient craft, verify the artifact, and only install export tooling when requested. One prompt -> shippable HTML, with optional MP4 / GIF / PPTX / PDF / SVG. Triggers include prototype, hi-fi mockup, slide deck, motion demo, infographic, dashboard, whitepaper, changelog, business card, social cover, brand from scratch, design critique, mp4/gif export, 60fps, keynote, PPTX, A-vs-B benchmark. Do not use for production web apps, SEO-critical sites, backend systems, or pure copy edits.
---

# IFQ Design Skills — Well-Known Stub

This stub exists so hosts serving this repository as a static site expose a
spec-compliant `.well-known/agent-skills/` endpoint. The short root router,
templates, references, and scripts live in the root of the repository at
<https://github.com/peixl/ifq-design-skills>.

## Install the full skill

```bash
# via skills.sh CLI (recommended)
npx skills add peixl/ifq-design-skills

# OpenClaw / ClawHub
openclaw skills install peixl/ifq-design-skills

# Hermes
hermes skills install github:peixl/ifq-design-skills

# or clone directly for shared local agents
git clone https://github.com/peixl/ifq-design-skills ~/.agents/skills/ifq-design-skills
```

After installing, read the root [SKILL.md](https://github.com/peixl/ifq-design-skills/blob/main/SKILL.md)
for routing, then load the task-specific files under `references/`. The core
loop is zero-install: fork a template, run `npm run verify:lite -- <file.html>`,
and run `npm run preview -- <file.html>`.

First run should produce a visible HTML artifact, not setup work. Report the
file path, route, template, verification result, and use-affecting caveats.
Claim MP4/GIF/PDF/PPTX only after the user asks for export and the matching
command has passed.
