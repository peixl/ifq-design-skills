<sub>🌐 <a href="README.md">中文</a> · <b>English</b> · <code>ifq.ai / field note / 2026</code></sub>

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

<br>

<sub>01 · The thesis &nbsp;·&nbsp; 02 · Install &nbsp;·&nbsp; 03 · What you say, what it hears &nbsp;·&nbsp; 04 · Anatomy of one page &nbsp;·&nbsp; 05 · Co-brand rule &nbsp;·&nbsp; 06 · 12 modes &nbsp;·&nbsp; 07 · The six layers &nbsp;·&nbsp; 08 · Verification &nbsp;·&nbsp; 09 · Roadmap</sub>

</div>

---

## 01 · The thesis

Most agents, asked to design something, will hand you one of two things: a **Figma Community template that tries too hard**, or a **Notion page that an AI reformatted**. Neither ships.

This skill is what gets in the way of that.  
It is not a palette file. It is not a logo sticker.  
It is **a way of making things**: treat a web page like an editorial spread, an animation like a teaser cut, a slide deck like a launch-night master, a business card like a print job with real bleed.

The ifq.ai signature lives inside that craft. So the first thing the viewer sees is the content, and **only on the second look do they realize: this is ifq.ai’s hand**.

We call that second look the **Ambient Brand**. It is made of five environmental markers — not ornaments, but layout grammar:

<table>
<tr>
<td width="22%" align="center"><code><b>Signal Spark</b></code><br><sub>8-point spark</sub></td>
<td>the moment intelligence lights up. The small point top-right of a hero, a single-frame cue in a motion piece, the center of a stamp. Never decorative sparkles.</td>
</tr>
<tr>
<td align="center"><code><b>Rust Ledger</b></code><br><sub>terracotta ruling</sub></td>
<td>verticals, dividers, numbering, axes. IFQ is less a brand block and more a carefully set publication — this rule is the spine of the publication.</td>
</tr>
<tr>
<td align="center"><code><b>Mono Field Note</b></code><br><sub>authored byline</sub></td>
<td><code>ifq.ai / field note / 2026</code>, <code>ifq.ai / release ledger</code>, <code>ifq.ai / live system</code> — a JetBrains Mono microline in place of a rude watermark.</td>
</tr>
<tr>
<td align="center"><code><b>Quiet URL</b></code><br><sub>a domain that doesn’t shout</sub></td>
<td>the URL behaves like someone who knows who they are. Small, precise, once.</td>
</tr>
<tr>
<td align="center"><code><b>Editorial Contrast</b></code><br><sub>desk-grade typography</sub></td>
<td>Newsreader italic + JetBrains Mono + warm paper. Serif breathes, mono provides evidence.</td>
</tr>
</table>

Every deliverable weaves in at least three. The viewer never names which three. They only say: “this one looks different from the AI stuff.”

---

## 02 · Install

```bash
# Recommended (SSH)
npx skills add git@github.com:peixl/ifq-design-skills.git -g -y

# Or HTTPS
npx skills add https://github.com/peixl/ifq-design-skills -g -y
```

Then just talk to your agent. The skill routes the task, picks the template, and runs verification on its own.

---

## 03 · What you say, what it hears

Real conversations. Left: the sentence you actually type. Right: what the skill hears and goes to build.

<table>
<thead>
<tr><th width="50%">You say</th><th>It hears</th></tr>
</thead>
<tbody>

<tr>
<td>

> “I’m giving a 20-min talk on AI agents tomorrow. Can you make me a deck that doesn’t look like a SaaS keynote? A bit bookish, not too Silicon Valley.”

</td>
<td>

<sub>M-08 Keynote · editorial dark · Newsreader display · section dividers as rust ledger verticals · mono page number <code>01 / 20</code> · colophon stamp on the closer · HTML + PPTX + PDF all emitted</sub>

</td>
</tr>

<tr>
<td>

> “We shipped 4 things this week. Make a vertical changelog page that feels like flipping open a field notebook, not a bulletin board.”

</td>
<td>

<sub>M-07 Changelog Timeline · warm paper · single rust ledger as the left axis · each entry gets a mono timestamp and a category stamp · header <code>release ledger / vol.12</code> · no emoji, hand-drawn icons only</sub>

</td>
</tr>

<tr>
<td>

> “Make a business card for a friend’s indie coffee shop. Black and white, both sides. Not fancy, but it should look handmade.”

</td>
<td>

<sub>M-10 Card · 85×55mm with 3mm bleed · front: one business line + a small spark dot · back: mono info strip · non-IFQ work, wordmark removed · IFQ survives only as rhythm and bleed alignment · print-ready PDF with crop marks</sub>

</td>
</tr>

<tr>
<td>

> “Do a 24-second launch teaser for a piece of hardware. Cold, a bit like Teenage Engineering — not a hype reel.”

</td>
<td>

<sub>M-01 Launch Film · three directions first (matter-of-fact / editorial / kinetic-type) · then Stage+Sprite timeline at 60fps · product key shot + mono spec overlay + a 2-second quiet URL closer · mp4 + gif + first-frame keyposter</sub>

</td>
</tr>

<tr>
<td>

> “I want a personal site. One page is enough, but I don’t want it to look like I’m job-hunting.”

</td>
<td>

<sub>M-02 Portfolio · five directions up front (archive / studio / essay / atlas / ledger) · user picks one, two are saved as variant canvases · hero is not a headshot but a three-column <i>currently / writing about / building</i> · mono colophon at the foot</sub>

</td>
</tr>

<tr>
<td>

> “We need a command-center dashboard for an internal AI. Bloomberg-terminal density. No BI chrome.”

</td>
<td>

<sub>M-04 Dashboard · dark graphite · 12-col ledger grid · metrics in mono with a hairline rust underline for trend direction · top strip with authored <i>session / latency / build</i> fields · no gradient buttons, no cartoon pies</sub>

</td>
</tr>

<tr>
<td>

> “Pitching next week. I need one A-vs-B chart: us vs three competitors. It has to be obvious why us — but no bragging.”

</td>
<td>

<sub>M-05 Compare · matrix over radar · four equal columns · each capability ✓ / ● / — with a small source citation · bottom: <code>compiled from public docs · ifq.ai</code> · facts WebSearched before any pixel moves</sub>

</td>
</tr>

<tr>
<td>

> “Make me a 2026 AI-agent whitepaper. Under 50 pages. Has to be printable.”

</td>
<td>

<sub>M-03 Whitepaper · A4 print-ready HTML · cover / abstract / TOC / chapters / references / colophon · each chapter opens with a mono section number and half a page of air · footer <code>ifq.ai / field note / 2026</code> · print-ready PDF with page numbers and chapter bookmarks</sub>

</td>
</tr>

<tr>
<td>

> “Our visuals feel messy. Don’t fix it yet — just tell me what’s wrong.”

</td>
<td>

<sub>M-11 Brand Diagnosis · hands off. Produces a one-page report: color temperature / type hierarchy / rhythm / motif / finish, each scored 1–5, each with a before / suggested-after thumbnail · ends with three upgrade directions, no single verdict</sub>

</td>
</tr>

<tr>
<td>

> “A set of 6 Xiaohongshu / social covers for a new column called ‘one image a week.’ Restrained, but instantly recognizable in-feed.”

</td>
<td>

<sub>M-09 Social Kit · 1242×1660 · unified top-left column stamp <code>weekly / 01</code> → <code>06</code> · editorial-typography hero, no giant emoji · quiet URL bottom-right · 6 covers + 1 OG landscape, same scene system</sub>

</td>
</tr>

</tbody>
</table>

> You don’t have to remember mode numbers. Plain language is enough. The skill routes.

---

## 04 · Anatomy of one page

Take a single hero landing. It looks calm. It is doing seven things at once:

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

Seven things, none of them ornament:

1. **Editorial contrast** — Newsreader serif paired with JetBrains Mono. Not a random font stack.
2. **Rust ledger** — the vertical on the left is the spine. More IFQ than a logo would be.
3. **Mono field note** — `ifq.ai / live system` at the top, `ifq.ai / 2026` at the foot.
4. **Quiet URL** — no CTA yelling. The URL appears once, bottom-right.
5. **Signal spark** — one small lit point. The only graphical beat on the page.
6. **Warm paper** — background is `#FAF7F2`, not `#FFFFFF`. Cold white drains the temperature.
7. **Ledger rhythm** — all spacing lives on `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64`. Not vibes.

**The viewer will not count any of this.** The viewer will just say “that page looks well made.”  
Well made = same hand = ifq.ai’s ambient brand system.

---

## 05 · Co-brand rule

| Scenario | Where IFQ lives |
|----------|-----------------|
| **IFQ-owned work** (ifq.ai and its products) | Everyone on stage: wordmark + spark + field note + quiet URL. |
| **Friend / client / third-party work** | Subject brand leads. IFQ retreats to an authored layer: rhythm, color temperature, colophon, hand-drawn icons, export finish. |
| **Client asks for white-label** | Remove explicit wordmark and field note. Keep editorial contrast, ledger rhythm, proof-first craft. |

So: **IFQ can disappear; it can’t be absent**. The craft is the signature.

---

## 06 · 12 modes

| # | Mode | Typical trigger | Output |
|---|------|-----------------|--------|
| M-01 | Launch Film | launch animation / product teaser | 25–40s motion + keyposter + social set |
| M-02 | Personal Brand | portfolio / personal site / about me | single page + 5 direction variants |
| M-03 | Whitepaper / Report | whitepaper / annual / research PDF | printable HTML → PDF |
| M-04 | Dashboard | KPI board / monitoring console | dense dashboard |
| M-05 | Comparison | A vs B / benchmark | matrix + radar + sources |
| M-06 | Onboarding | product onboarding / flow demo | 3–5 screen flow |
| M-07 | Changelog | release notes / weekly log | vertical timeline infographic |
| M-08 | Keynote | deck / stage master | HTML deck + PPTX + PDF |
| M-09 | Social Kit | Xiaohongshu / OG cards / story set | multi-size static assets |
| M-10 | Card / Invite | business card / VIP / invitation | SVG + print-bleed PDF |
| M-11 | Brand Diagnosis | brand audit / upgrade guidance | diagnostic report + 3 directions |
| M-12 | Full Brand | brand from scratch | logo + palette + type + 6 applications |

Full protocol: [references/modes.md](references/modes.md).  
Routing order: **mode trigger → ambient direction scout → IFQ designer trunk**.

---

## 07 · The six layers

IFQ Design Skills reads as IFQ not because of a color or a logo, but because these six layers run together:

| Layer | What it does | Key files |
|-------|--------------|-----------|
| **01 · Context Engine** | grow the design from existing context, not from a blank page | [references/design-context.md](references/design-context.md) |
| **02 · Asset Protocol** | fetch facts / logos / renders / UI screenshots before anything visual | [SKILL.md](SKILL.md) · [references/workflow.md](references/workflow.md) |
| **03 · House Marks** | weave the five ambient markers into the composition | [references/ifq-brand-spec.md](references/ifq-brand-spec.md) · [assets/ifq-brand/](assets/ifq-brand/) |
| **04 · Style Recipes** | organize taste through reusable recipes + scene templates | [references/design-styles.md](references/design-styles.md) · [references/scene-templates.md](references/scene-templates.md) |
| **05 · Output Compiler** | HTML → MP4 / GIF / PPTX / PDF as one pipeline | [scripts/](scripts/) |
| **06 · Proof Loop** | screenshot + click + smoke + export audits | [references/verification.md](references/verification.md) · [scripts/smoke-test.mjs](scripts/smoke-test.mjs) |

Repository layout:

```text
ifq-design-skills/
├── SKILL.md                  # main protocol: fast path, role, rules
├── assets/
│   ├── ifq-brand/            # logo / sparkle / tokens / BRAND-DNA
│   └── templates/            # fork-ready templates with ambient marks baked in
├── references/               # methods, modes, verification, recipes, charter
├── scripts/                  # export / verify / smoke / pdf / pptx
└── demos/                    # demo outputs
```

---

## 08 · Verification

```bash
cd <skill-root>
npm run smoke
```

Checks: template index integrity · IFQ brand toolkit · icon sprite · reference-router targets · `scripts/` syntax. Returns a one-minute health report.

Per-deliverable verification uses Playwright screenshots + click checks + export-format audits. See [references/verification.md](references/verification.md).

---

## 09 · Roadmap

This version is not about “de-branding” IFQ. It is about **making IFQ more advanced**:

- no loud watermark
- no crude logo slapping
- no single slogan pounded into every corner

Instead: **layout order, micro-markers, motion grammar, colophons, color temperature, export finish** — stacked into one authored layer, until ifq.ai becomes the page’s own scent.

Next: [references/revolution-gap.md](references/revolution-gap.md)

---

<div align="center">

<sub><code>compiled by ifq.ai&nbsp;&nbsp;·&nbsp;&nbsp;field note&nbsp;&nbsp;·&nbsp;&nbsp;2026</code></sub>

</div>
