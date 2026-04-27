# AGENTS.md — IFQ Design Skills

> Any AI coding agent reading this file: **this repo IS a skill**, not an app. Your job when invoked in this workspace is to treat [`SKILL.md`](SKILL.md) as the operating manual and follow it. This AGENTS.md exists so Codex CLI, OpenCode, sst, and any other AGENTS.md-aware runtime finds the skill without extra configuration.

## First-contact protocol (60 seconds · any runtime)

When you land in this repo with a design-ish user request:

1. **Read** [`SKILL.md`](SKILL.md) as the short root router (≈ first 120 lines). That alone tells you trigger boundaries, capabilities, permissions, tier policy, and the three-move loop.
2. **Route** via [`references/modes.md`](references/modes.md) → pick one of the 12 modes → read [`assets/templates/INDEX.json`](assets/templates/INDEX.json) → fork the template into the user's working directory. **Never start from a blank HTML.**
3. **Verify lite** with `npm run verify:lite -- <file>` then `npm run preview -- <file>` (both zero-install · Tier 0).
4. Only escalate to Tier 1 (`python scripts/verify.py`) or Tier 2 (`npm run install:export` + ffmpeg) when the user explicitly asks for headless screenshots, MP4/GIF, PDF, or PPTX.

If the user's request is **not** a visual design deliverable, exit this skill cleanly and hand back to your default agent — do not force-fit.

## What this repo is

A design engine packaged as a skill. One prompt in → a shippable HTML / MP4 / GIF / PPTX / PDF / SVG out, with the IFQ ambient brand layer woven into the layout.

Full protocol: [`SKILL.md`](SKILL.md). Start there. Everything below is just the TL;DR for agents landing here cold.

## When to engage the skill

Whenever the user asks for **a visual deliverable built from HTML** — prototype, slide deck, motion demo, infographic, dashboard, landing page, whitepaper, changelog, business card, social cover, brand system — or wants exports (MP4 / GIF / PPTX / PDF / SVG) from the same source, or wants design variants, or wants a design critique.

Do **not** engage for: production web apps, SEO-critical marketing sites, backend systems, or pure copy/text rewriting.

## Zero-install core loop

```bash
# write HTML into the project, then:
npm run preview -- path/to/design.html       # prints a file:// URL (no child process)
npm run verify:lite -- path/to/design.html   # pure Node placeholder scan
```

Works on macOS / Linux / Windows without a single `npm install`.

## On-demand tiers (install only when needed)

| User asked for… | Run once |
|---|---|
| MP4 / GIF / PDF / PPTX export | `npm run install:export` (pulls playwright + pdf-lib + pptxgenjs + sharp + Chromium) |
| MP4 / GIF specifically | plus `brew install ffmpeg` or `apt install ffmpeg` |
| Automated headless multi-viewport screenshots + console capture | `pip install playwright && python -m playwright install chromium` |

Never push these on the user if they only asked for HTML. `playwright` lives under `optionalDependencies` on purpose.

## Safety posture (scanner-clean)

- Zero Node/Python `child_process` / `spawn` / `exec` APIs in `scripts/**`; shell export helpers may call `ffmpeg` / `ffprobe` only when explicitly invoked for export.
- Zero `eval` / `new Function` anywhere.
- No outbound network calls from any script at runtime.
- Built-in templates use local-first fonts and do not load Google Fonts unless the user explicitly opts in.
- The skill never writes outside the user's workspace; it never installs anything silently.
- Full capability / permission declaration lives in `SKILL.md` frontmatter as single-line JSON `metadata` (`metadata.openclaw.requires`, capability signals, and security signals) — permission-aware runtimes (OpenClaw, Hermes) can grant scopes from there.

## Agent runtime pointers

| Runtime | How this skill is wired |
|---|---|
| **Claude Code** | symlink / clone into `~/.claude/skills/ifq-design-skills`; frontmatter auto-discovery. |
| **Codex CLI (OpenAI)** | reads this `AGENTS.md`; follow the pointer to `SKILL.md`. |
| **OpenCode (sst/opencode)** | reads this `AGENTS.md` automatically on session start. |
| **OpenClaw** | register under `plugins.allow` in `openclaw.json`, restart gateway. |
| **Hermes** | `hermes skills install github:peixl/ifq-design-skills`. |
| **Cursor** | pin `@ifq-design-skills/SKILL.md` at start of chat. |
| **CodeBuddy (Tencent)** | reads this `AGENTS.md` from the workspace; pin `@SKILL.md` in chat to load the root router, then follow its reference map. |

Full install matrix with per-agent tool mapping: [`references/agent-compatibility.md`](references/agent-compatibility.md).

## Neutral verbs (do not hard-code tool names)

This skill uses runtime-agnostic verbs. Translate them to your runtime's actual tools:

| Neutral verb | What it means |
|---|---|
| **read file** | open a file and read its contents |
| **write file** | create or overwrite a file |
| **run command** | execute a shell command |
| **web search** | search the open web (for `#0 fact-verification` — see SKILL.md) |
| **preview** | `npm run preview -- <file>` — prints a `file://` URL for you to hand to a browser tool or the user |
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
