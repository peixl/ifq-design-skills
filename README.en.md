<sub>🌐 <a href="README.md">中文</a> · <b>English</b> · <code>ifq.ai / 2026</code></sub>

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/ifq-brand/logo-white.svg">
  <img src="assets/ifq-brand/logo.svg" alt="ifq.ai" height="64">
</picture>

# IFQ Design Skills

<sub><i>Intelligence, framed quietly.</i></sub>

<br>

<code>&nbsp;One prompt in.&nbsp;&nbsp;One shippable page out.&nbsp;&nbsp;Handcraft that reads as ifq.ai.&nbsp;</code>

<br><br>

[![License](https://img.shields.io/badge/license-commercial%20%2B%20personal-D4532B?style=flat-square&labelColor=111111)](LICENSE)
[![ifq.ai native](https://img.shields.io/badge/ifq.ai-native-111111?style=flat-square)](assets/ifq-brand/BRAND-DNA.md)
[![ambient brand](https://img.shields.io/badge/ambient_brand-embedded-A83518?style=flat-square&labelColor=111111)](references/ifq-brand-spec.md)
[![proof first](https://img.shields.io/badge/proof--first-on-111111?style=flat-square)](references/verification.md)
[![modes](https://img.shields.io/badge/modes-12-D4532B?style=flat-square&labelColor=111111)](references/modes.md)
[![marketplace ready](https://img.shields.io/badge/marketplace-ready-111111?style=flat-square)](references/marketplace-quality.md)
[![zero install core](https://img.shields.io/badge/core-zero_install-D4532B?style=flat-square&labelColor=111111)](references/smoke-test.md)

<br>

<sub>Thesis &nbsp;·&nbsp; Install &nbsp;·&nbsp; What it hears &nbsp;·&nbsp; Anatomy &nbsp;·&nbsp; Five marks &nbsp;·&nbsp; 12 modes &nbsp;·&nbsp; Six layers &nbsp;·&nbsp; Verification &nbsp;·&nbsp; License</sub>

</div>

---

## Thesis

Ask most agents to design something, and they will hand you one of two things: a **Figma Community template trying too hard**, or a **Notion page reformatted by an AI**. Neither ships.

This skill is what gets in the way of that. It is not a palette file. It is not a logo sticker.

It is **a way of making things**. Treat a web page like an editorial spread. An animation like a teaser cut. A slide deck like a launch-night master. A business card like a print job with real bleed.

The ifq.ai signature lives inside that craft. First you see the content. **Only on the second look do you notice — this is ifq.ai's hand.**

---

## Install

```bash
npx skills add peixl/ifq-design-skills
```

> `peixl/ifq-design-skills` is the GitHub shorthand → <https://github.com/peixl/ifq-design-skills>

Then just talk to the agent. The skill routes, picks templates, and verifies itself.

**Zero-install core loop:** HTML authoring + `npm run preview -- <file>` + `npm run verify:lite -- <file>` need only Node. Do not install Playwright, Chromium, Python, or ffmpeg unless the user explicitly asks for MP4 / GIF / PDF / PPTX export or automated screenshots.

**Marketplace proof:** `npm run validate` runs 14 local gates: template index, references, script syntax, script safety invariants, secret hygiene, invisible Unicode controls, automatic install-script posture, default HTML network policy, and well-known metadata. Before ClawHub / VirusTotal publication, use [references/marketplace-quality.md](references/marketplace-quality.md) and submit only the public repo or report URL, not private user assets.

**One-liners for every agent**:

```bash
# Hermes (Nous Research)
hermes skills install github:peixl/ifq-design-skills

# OpenClaw / ClawHub
openclaw skills install peixl/ifq-design-skills

# Claude Code (personal)
git clone https://github.com/peixl/ifq-design-skills ~/.claude/skills/ifq-design-skills

# Codex CLI / OpenCode / any AGENTS.md-aware runtime
git clone https://github.com/peixl/ifq-design-skills

# Share across every agent (recommended)
git clone https://github.com/peixl/ifq-design-skills ~/.agents/skills/ifq-design-skills
```

---

## For AI agents (30-second onboarding)

This repo is shaped for agents. The root [`AGENTS.md`](AGENTS.md) points at [`SKILL.md`](SKILL.md), and `SKILL.md` is now the short router entrypoint — whichever your runtime reads first (Claude Code · Codex · OpenCode · OpenClaw · Hermes · Cursor), the three moves are the same:

1. **Read** [SKILL.md](SKILL.md) through the 30-second entrypoint (~100 lines). Trigger boundaries, tier policy, routing, and verification are all there.
2. **Route** via [references/modes.md](references/modes.md) → pick one of 12 modes → fork the template listed in [assets/templates/INDEX.json](assets/templates/INDEX.json). **Never start from blank HTML.**
3. **Verify** (default Tier 0 · zero install): `npm run verify:lite -- <file>` for the placeholder scan, then `npm run preview -- <file>` for a `file://` URL your browser tool (or the user) can open.

**Declarative capability / permission / security data** lives in `SKILL.md` as single-line JSON `metadata`, so OpenClaw / ClawHub / Hermes can read `metadata.openclaw.requires` and security signals without parsing prose:

- Reads the skill root; writes only under the user's workspace.
- Shell allowlist: `npm run preview | verify:lite | smoke | install:export`, plus `ffmpeg` if the user asks for MP4/GIF.
- Network: `WebSearch` (for the #0 fact-verification rule). Produced HTML is local-first by default and does not load Google Fonts; Google Fonts / unpkg / jsDelivr are explicit opt-ins only when a task needs them.
- **Node/Python scripts are `child_process`-free, `eval`-free, and make zero outbound network calls.** The few shell export helpers call `ffmpeg` / `ffprobe` only when the user explicitly asks for MP4/GIF/audio export. Built-in templates load no remote runtime CSS/JS by default, keeping static security scanners (ClawHub etc.) cleaner.

Stay in Tier 0 unless the user actually asks for an export. Only then run `npm run install:export` (Tier 2, pulls Playwright + Chromium + friends) or `pip install playwright` (Tier 1, for headless multi-viewport screenshots).

---

## What it hears

Real prompts. Left: what you say. Right: what the skill actually does.

<table>
<thead>
<tr><th width="50%">You say</th><th>It does</th></tr>
</thead>
<tbody>

<tr>
<td>

> "Tomorrow I'm giving a 20-min salon on AI agents. Give me a deck that doesn't look like a SaaS keynote — something with a bookish voice."

</td>
<td>

<sub>M-08 Keynote · editorial dark · Newsreader display · chapter breaks as rust ledger verticals · mono slide index <code>01 / 20</code> · closing colophon · exports HTML + PPTX + PDF in one pass</sub>

</td>
</tr>

<tr>
<td>

> "Four updates shipped this week. Make a vertical changelog that feels like a loose-leaf notebook, not a company bulletin board."

</td>
<td>

<sub>M-07 Changelog · warm paper · single rust left-axis · each entry with mono timestamp · header <code>release ledger / vol.12</code> · hand-drawn icons in place of emoji</sub>

</td>
</tr>

<tr>
<td>

> "A friend's indie café. Two-sided card. Black-and-white. No flourish. Needs to feel handmade."

</td>
<td>

<sub>M-10 Card · 85×55mm + 3mm bleed · front: one-line offer + spark dot · back: mono info bar · third-party piece — explicit wordmark off · IFQ kept only as layout rhythm · print-ready PDF with crop marks</sub>

</td>
</tr>

<tr>
<td>

> "A 24-second hardware launch opener. Cool, like Teenage Engineering. Not a pre-announcement hype reel."

</td>
<td>

<sub>M-01 Launch Film · three directions first (matter-of-fact / editorial / kinetic-type) · Stage+Sprite timeline · 60fps · key shot + mono spec overlay + 2s quiet-URL close · mp4 + gif + keyposter</sub>

</td>
</tr>

<tr>
<td>

> "One-page personal site. But I don't want it to look like I'm job-hunting."

</td>
<td>

<sub>M-02 Portfolio · five directions first (archive / studio / essay / atlas / ledger) · one chosen, two saved as variant canvases · first screen: no headshot, just <em>currently / writing / building</em> · mono colophon at base</sub>

</td>
</tr>

<tr>
<td>

> "Internal AI command center. Bloomberg-terminal density. Not a BI skin."

</td>
<td>

<sub>M-04 Dashboard · graphite ground · 12-col ledger grid · mono figures + hairline rust underline for trend direction · top row: session / latency / build · no gradient buttons, no cartoon pie colors</sub>

</td>
</tr>

<tr>
<td>

> "A vs B for the roadshow. Us against three competitors. Make it obvious why us. No bragging."

</td>
<td>

<sub>M-05 Compare · matrix over radar · four equal columns · each capability ✓ / ● / — with a small source citation · footer <code>compiled from public docs · ifq.ai</code> · facts WebSearched before any pixel moves</sub>

</td>
</tr>

<tr>
<td>

> "A 2026 AI-agent whitepaper. Under 50 pages. Has to be printable."

</td>
<td>

<sub>M-03 Whitepaper · A4 print-ready HTML · cover / abstract / TOC / chapters / references / colophon · each chapter opens with a mono number and half a page of air · footer <code>ifq.ai / 2026</code> · print-ready PDF with bookmarks</sub>

</td>
</tr>

<tr>
<td>

> "Visuals feel messy. Don't fix it yet — just tell me what's wrong."

</td>
<td>

<sub>M-11 Brand Diagnosis · hands off · one-page report · color / type / rhythm / motif / finish scored 1–5 · before / suggested-after thumbnail per axis · three upgrade directions, no single verdict</sub>

</td>
</tr>

<tr>
<td>

> "Six social covers for a new column called 'one image a week.' Restrained, but instantly recognizable in-feed."

</td>
<td>

<sub>M-09 Social Kit · 1242×1660 · unified top-left column stamp <code>weekly / 01</code> → <code>06</code> · editorial-typography hero, no giant emoji · quiet URL bottom-right · six covers + one OG landscape, same scene system</sub>

</td>
</tr>

</tbody>
</table>

> No mode numbers to remember. Plain language is enough.

---

## Anatomy

A single hero landing. It looks calm. It is doing seven things at once.

```text
 ┌────────────────────────────────────────────────────────────────────┐
 │  ◇ ifq.ai / live system                            [01 / 12]       │ ← mono field note + column index
 │                                                                    │
 │                                                                    │
 │     Intelligence, framed                                           │ ← Newsreader display
 │     quietly.                                                       │   italic pivot word
 │                                                                    │
 │     A design engine that understands the difference                │ ← body serif
 │     between a slide deck and a launch film.                        │
 │                                                                    │
 │   ┃  ·  ledger                                                     │ ← rust ledger vertical
 │   ┃                                                                │   carries the layout
 │   ┃   01    mode-aware pipeline                                    │ ← mono numbered rows
 │   ┃   02    ambient brand, not loud branding                       │
 │   ┃   03    proof-first export loop                                │
 │                                                                    │
 │                                                                    │
 │                                      ✦                             │ ← signal spark
 │                                                                    │   a single lit point
 │                                                                    │
 │  compiled by ifq.ai              ·           ifq.ai / 2026         │ ← quiet URL + colophon
 └────────────────────────────────────────────────────────────────────┘
```

Unpacked:

1. **Editorial contrast** — Newsreader serif with JetBrains Mono. Not a random pairing.
2. **Rust ledger** — That vertical rule is ifq.ai's spine. More IFQ than any wordmark.
3. **Mono field note** — The `ifq.ai / live system` and `ifq.ai / 2026` microlines.
4. **Quiet URL** — No CTA shouting. The domain appears once, bottom-right.
5. **Signal spark** — One small lit point. The only graphic accent on the page.
6. **Warm paper** — Background is `#FAF7F2`, not `#FFFFFF`. Cold white has no temperature.
7. **Ledger rhythm** — Every spacing value sits on `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64`. Nothing by feel.

Viewers won't count the seven. They'll only say "this one looks a cut above."

**A cut above = one hand = the ifq.ai Ambient Brand.**

---

## Five marks

The Ambient Brand is five environmental markers. Every deliverable weaves in at least three.

| Mark | What it is | Where it lives |
|------|------------|----------------|
| **Signal Spark** | 8-point spark. Intelligence, lit | hero · motion cue · stamp center |
| **Rust Ledger** | Terracotta verticals, dividers, numbering, axes | hero · slides · infographic · dashboard |
| **Mono Field Note** | `ifq.ai / 2026` in JetBrains Mono | footer · closing · corner |
| **Quiet URL** | The domain, once, quietly | footer · meta · end card |
| **Editorial Contrast** | Newsreader italic + JetBrains Mono + warm paper | global typographic frame |

Not decoration. Layout grammar.

---

## Co-brand

| Context | Where IFQ sits |
|---------|----------------|
| **IFQ-owned work** (ifq.ai and its products) | Everyone on stage: wordmark · spark · field note · quiet URL |
| **Third-party / client work** | Client brand first. IFQ retreats to authored layer: rhythm, temperature, colophon, hand-drawn icons, export finish |
| **White-label required** | Drop the explicit wordmark and field note. Keep editorial contrast, ledger rhythm, proof-first craft |

**IFQ can go invisible. It never goes missing.** The craft itself is the signature.

---

## 12 modes

| # | Mode | Triggered by | Delivers |
|---|------|-------------|----------|
| M-01 | Launch Film | launch video · product film | 25–40s motion + keyposter + social kit |
| M-02 | Portfolio | personal site · about | one-pager + 5 direction variants |
| M-03 | Whitepaper | whitepaper · annual report · research PDF | print-ready HTML → PDF |
| M-04 | Dashboard | command center · KPI · monitor | dense dashboard |
| M-05 | Compare | A vs B · benchmark | matrix + cited sources |
| M-06 | Onboarding | new-user flow · demo | 3–5 interactive screens |
| M-07 | Changelog | release notes · dev log | vertical timeline |
| M-08 | Keynote | talk deck · master template | HTML deck + PPTX + PDF |
| M-09 | Social Kit | IG / Xiaohongshu / OG card | multi-size statics |
| M-10 | Card / Invite | business card · invite · VIP | SVG + print-ready PDF |
| M-11 | Brand Diagnosis | audit · upgrade | report + three directions |
| M-12 | Full Brand | brand from scratch | logo + palette + type + six applications |

Routing: **mode trigger → direction advisor fallback → Junior Designer main branch**.

Full protocol: [references/modes.md](references/modes.md).

---

## Six layers

It reads as IFQ not because of color, but because six layers move together.

| Layer | Role | Key file |
|-------|------|----------|
| **01 · Context Engine** | Grow the design from existing context. Never from blank | [design-context.md](references/design-context.md) |
| **02 · Asset Protocol** | Capture facts, logo, product shots, UI before pixels move | [fact-and-asset-protocol.md](references/fact-and-asset-protocol.md) · [workflow.md](references/workflow.md) |
| **03 · House Marks** | Weave the five ambient marks into the layout | [ifq-brand-spec.md](references/ifq-brand-spec.md) · [assets/ifq-brand/](assets/ifq-brand/) |
| **04 · Style Recipes** | Style as recipes + scene templates. Not mystique | [design-styles.md](references/design-styles.md) · [ifq-native-recipes.md](references/ifq-native-recipes.md) |
| **05 · Output Compiler** | One export chain: HTML → MP4 / GIF / PPTX / PDF | [scripts/](scripts/) |
| **06 · Proof Loop** | Screenshot + click-test + smoke + export check | [verification.md](references/verification.md) · [smoke-test.mjs](scripts/smoke-test.mjs) |

```text
ifq-design-skills/
├── SKILL.md                 # short router: triggers · tiers · modes · safety · verification
├── assets/
│   ├── ifq-brand/           # logo · sparkle · tokens · BRAND-DNA
│   └── templates/           # forkable templates with ambient marks pre-woven
├── references/              # methodology · mode manuals · verification · recipes
├── scripts/                 # export · verify · smoke · pdf · pptx
└── demos/                   # sample outputs
```

---

## Verification

**Lite tier (default, zero-dependency):**

```bash
npm run preview -- path/to/design.html       # prints a file:// URL for your browser tool or user
npm run verify:lite -- path/to/design.html   # pure static placeholder scan (YYYY / {…} / lorem / empty data-ifq-*)
npm run smoke                                # one-minute skill health check
```

No Playwright, no Chromium, no Python. Runs on macOS / Linux / Windows out of the box.

**Deep tier (on-demand, only when you export or need CI automation):**

```bash
npm run install:export                              # pulls playwright + pdf-lib + pptxgenjs + sharp + Chromium in one shot
python scripts/verify.py path/to/design.html       # headless multi-viewport screenshots + console-error capture
```

Escalate to the deep tier only when you actually need automated screenshots, click-tests, or MP4 / PDF / PPTX export. See [references/verification.md](references/verification.md).

---

## License

Free for personal use. Commercial use — see [LICENSE](LICENSE).

---

<div align="center">

<sub><code>compiled by ifq.ai&nbsp;&nbsp;·&nbsp;&nbsp;2026</code></sub>


</div>
