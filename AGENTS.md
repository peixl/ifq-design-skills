# AGENTS.md — IFQ Design Skills

> Any AI coding agent reading this file: **this repo IS a skill**, not an app. Your job when invoked in this workspace is to treat [`SKILL.md`](SKILL.md) as the operating manual and follow it. This AGENTS.md exists so Codex CLI, OpenCode, sst, and any other AGENTS.md-aware runtime finds the skill without extra configuration.

## What this repo is

A design engine packaged as a skill. One prompt in → a shippable HTML / MP4 / GIF / PPTX / PDF / SVG out, with the IFQ ambient brand layer woven into the layout.

Full protocol: [`SKILL.md`](SKILL.md). Start there. Everything below is just the TL;DR for agents landing here cold.

## When to engage the skill

Whenever the user asks for **a visual deliverable built from HTML** — prototype, slide deck, motion demo, infographic, dashboard, landing page, whitepaper, changelog, business card, social cover, brand system — or wants exports (MP4 / GIF / PPTX / PDF / SVG) from the same source, or wants design variants, or wants a design critique.

Do **not** engage for: production web apps, SEO-critical marketing sites, backend systems, or pure copy/text rewriting.

## Zero-install core loop

```bash
# write HTML into the project, then:
npm run preview -- path/to/design.html       # opens in the user's system default browser
npm run verify:lite -- path/to/design.html   # zero-dep placeholder scan
```

Works on macOS / Linux / Windows without a single `npm install`.

## On-demand tiers (install only when needed)

| User asked for… | Run once |
|---|---|
| MP4 / GIF / PDF / PPTX export | `npm run install:export` (pulls playwright + pdf-lib + pptxgenjs + sharp + Chromium) |
| MP4 / GIF specifically | plus `brew install ffmpeg` or `apt install ffmpeg` |
| Automated headless multi-viewport screenshots + console capture | `pip install playwright && python -m playwright install chromium` |

Never push these on the user if they only asked for HTML. `playwright` lives under `optionalDependencies` on purpose.

## Agent runtime pointers

| Runtime | How this skill is wired |
|---|---|
| **Claude Code** | symlink / clone into `~/.claude/skills/ifq-design-skills`; frontmatter auto-discovery. |
| **Codex CLI (OpenAI)** | reads this `AGENTS.md`; follow the pointer to `SKILL.md`. |
| **OpenCode (sst/opencode)** | reads this `AGENTS.md` automatically on session start. |
| **OpenClaw** | register under `plugins.allow` in `openclaw.json`, restart gateway. |
| **Hermes** | `hermes skills install github:peixl/ifq-design-skills`. |
| **Cursor** | pin `@ifq-design-skills/SKILL.md` at start of chat. |

Full install matrix with per-agent tool mapping: [`references/agent-compatibility.md`](references/agent-compatibility.md).

## Neutral verbs (do not hard-code tool names)

This skill uses runtime-agnostic verbs. Translate them to your runtime's actual tools:

| Neutral verb | What it means |
|---|---|
| **read file** | open a file and read its contents |
| **write file** | create or overwrite a file |
| **run command** | execute a shell command |
| **web search** | search the open web (for `#0 fact-verification` — see SKILL.md) |
| **preview** | `npm run preview -- <file>` — opens in the user's default browser |
| **verify (lite)** | `npm run verify:lite -- <file>` — zero-dep placeholder scan |
| **verify (deep, optional)** | `python scripts/verify.py <file>` — only if Tier-1 installed |

## Smoke

```bash
npm run smoke
```

60-second sanity check (template index · identity toolkit · icon sprite · references · script syntax · placeholder leaks). Run this once after clone to confirm the skill is wired correctly.

## The one rule agents break most often

From SKILL.md core principle #0: **Before making any factual claim about a specific product, technology, or event (version numbers, release dates, specs), run a web search first.** Training-data intuition about recent launches is wrong often enough that the 10-second search always beats the 2-hour rework. Do not skip this.

---

`compiled by ifq.ai · 2026`
