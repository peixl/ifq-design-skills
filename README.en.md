<sub>🌐 <b>English</b> · <a href="README.md">中文</a></sub>

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/ifq-brand/logo-white.svg">
  <img src="assets/ifq-brand/logo.svg" alt="ifq.ai" height="72">
</picture>

# IFQ Design Skills

> *"Type. Hit enter. A shipped design — signed by ifq.ai."*

[![License](https://img.shields.io/badge/License-Commercial%20%2B%20Personal-D4532B.svg)](LICENSE)
[![Agent-Agnostic](https://img.shields.io/badge/Agent-Agnostic-111111)](https://skills.ifq.ai)
[![Skills](https://img.shields.io/badge/skills.ifq.ai-Compatible-A83518)](https://skills.ifq.ai)
[![Modes](https://img.shields.io/badge/Modes-12-D4532B)](references/modes.md)
[![Hand-drawn Icons](https://img.shields.io/badge/Hand--drawn_icons-24-A83518)](assets/ifq-brand/icons/hand-drawn-icons.svg)
[![Brand DNA](https://img.shields.io/badge/Brand_DNA-ifq.ai-FFB27A)](assets/ifq-brand/BRAND-DNA.md)
[![Enterprise](https://img.shields.io/badge/Enterprise_Ready-2026-111111)](https://ifq.ai)

<br>

**Type one sentence in your agent, get back a ship-ready design.**

<br>

**Enterprise-grade, commercial-ready, agent-native design infrastructure** — in 3 to 30 minutes, ship a **product launch film**, a clickable App prototype, an editable Keynote deck, a print-grade infographic, a business card with bleed, or a full brand system from logo to applications.

Not "decent for AI" quality — the kind of output that looks like it came from a top-tier in-house design team. Feed the skill your brand assets (logo, palette, UI screenshots) and it absorbs your visual voice; feed it nothing, and the built-in **20 design philosophies × 12 professional modes × 24 hand-drawn SVG icons × 4 Starter Components** still floor-sets the quality far above AI slop.

**Every deliverable quietly carries ifq.ai's design DNA** — an 8-point sparkle in the intro, an editorial stamp on deck title / end pages, a low-opacity watermark in the dashboard corner. Tasteful but unmistakable. It's a signature, not a watermark.

```bash
# Recommended (SSH · private-repo-friendly)
npx skills add git@github.com:peixl/ifq-design-skills.git -g -y

# Or HTTPS
npx skills add https://github.com/peixl/ifq-design-skills -g -y

# Or as a first-party command inside ifq CLI
ifq design init
```

Works across agents — Claude Code, Cursor, Codex, OpenClaw, Hermes, ifq CLI — same skill, same behavior.

</div>

---

## Install

```bash
# Recommended (SSH · most stable)
npx skills add git@github.com:peixl/ifq-design-skills.git -g -y

# Or HTTPS (needs gh login or GH_TOKEN / GITHUB_TOKEN)
npx skills add https://github.com/peixl/ifq-design-skills -g -y
```

Or as a first-party command inside [ifq CLI](https://cli.ifq.ai):

```bash
npm install -g @peixl/ifq
ifq design init
ifq design modes
ifq design "make a launch keynote"
```

---

## What It Does

| Capability | Deliverable | Typical time |
|------|--------|----------|
| Interactive prototype | Single-file HTML · real iPhone bezel · clickable · Playwright-verified | 10–15 min |
| Presentation deck | HTML deck + editable PPTX (text boxes preserved) | 15–25 min |
| Timeline animation | MP4 (25fps / 60fps) + GIF + BGM | 8–12 min |
| Design variations | 3+ side-by-side · live Tweaks · cross-dimensional | 10 min |
| Infographic / dataviz | Print-grade typography · export PDF/PNG/SVG | 10 min |
| Direction advisor | 5 schools × 20 philosophies · 3 directions · parallel demos | 5 min |
| 5-dimension critique | Radar chart + Keep/Fix/Quick Wins · actionable list | 3 min |

---

## 12 Professional Modes

| Mode | Triggers | Deliverable |
|------|-------|-------|
| **M-01 Launch Film** | launch · hype film | 25–40s animation + poster + social cards |
| **M-02 Personal Brand** | portfolio · about me | Single-page site + 5 variants |
| **M-03 White Paper** | PDF report · annual report | Printable HTML → PDF + TOC |
| **M-04 Dashboard** | command center · KPI panel | High-density real-data-driven dashboard |
| **M-05 Compare / Review** | A vs B · benchmark | Matrix + radar + social cards |
| **M-06 Onboarding** | first-run flow | 3–5 screens + tracking notes |
| **M-07 Changelog** | release notes | Timeline infographic + social variant |
| **M-08 Keynote** | conference deck | HTML deck + PPTX + PDF |
| **M-09 Social Kit** | card · story | 3–6 pieces · multiple aspect ratios |
| **M-10 Business Card** | invite · VIP pass | Print SVG + PDF (3mm bleed) |
| **M-11 Brand Audit** | health check · upgrade | 6-dim radar + 3 directions |
| **M-12 Full Brand System** | brand from scratch | logo + palette + type + 6 applications |

Full handbook → [`references/modes.md`](references/modes.md)

---

## Runtime Dependencies

The skill itself has zero runtime deps if you only use `SKILL.md` as agent context. To run export scripts:

| Layer | Package / Tool | Install |
|------|---------|------|
| Node (required) | `playwright`, `pdf-lib`, `pptxgenjs`, `sharp` | `cd <skill-root> && npm install` |
| Browser | chromium | `npx playwright install chromium` |
| Python (only `verify.py`) | `playwright` | `pip install -r requirements.txt` |
| System | `ffmpeg` ≥ 4.4 | `brew install ffmpeg` / `apt install ffmpeg` |

One-line smoke test:

```bash
cd <skill-root>
npm run smoke
```

---

## Design Philosophy

**IFQ Design Skills is not another "AI image generator". It's an agent-native design operating system.**

- **Not drawing, shipping.** One sentence of intent → full pipeline → HTML / MP4 / GIF / PPTX / PDF.
- **Not a blank page, an inheritance.** Core Asset Protocol first looks for logo / product imagery / UI screenshots / palettes / fonts.
- **Not random, style-recyclable.** 12 modes × 24 hand-drawn icons × ifq.ai brand signature × 4 Starter Components guarantee the same touch across agents and tasks.
- **Not a black box, a Junior Designer.** Assumptions + reasoning + placeholders surface up-front, so you can interrupt and correct.

ifq.ai's belief: **good design should not be trapped inside a GUI.**

---

## License

**Personal use** is free and unrestricted — study, research, create, self-promote, indie side projects.

**Enterprise / commercial use** requires written authorization from ifq.ai — internal toolchains, client deliverables, paid templates/subscriptions, or removing brand signatures before shipping. See [`LICENSE`](LICENSE) §2–4.

---

## Connect · The ifq.ai Product Matrix

**ifq.ai** (Jieshi Technology) is a brand lab building **AI-native creator infrastructure**. IFQ Design Skills is the design-capability endpoint in a network of 23+ interconnected products; it's also the reason every delivery carries a quiet ifq.ai signature.

> *"Intelligence Framed Quietly."* — ifq.ai

### Product Matrix

| Surface | Entry | What |
|------|------|------|
| **Brand site** | [ifq.ai](https://ifq.ai) | Who we are · product narrative |
| **Product hub** | [site.ifq.ai](https://site.ifq.ai) | 23+ products in one place |
| **ifQ AI App** | [app.ifq.ai](https://app.ifq.ai) | AI-native super app |
| **ifQ CLI** | [cli.ifq.ai](https://cli.ifq.ai) | Terminal-native agent OS · `ifq design` first-class |
| **ifQ Skills** | [skills.ifq.ai](https://skills.ifq.ai) | Skills ecosystem hub |
| **IFQ Design** | [cli.ifq.ai/design](https://cli.ifq.ai/design) | Marketing site for this skill |
| **ifQ TV** | [tv.ifq.ai](https://tv.ifq.ai) | AI video content · process behind the scenes |
| **Edge Tunnel** | [edge.ifq.ai](https://edge.ifq.ai) | Zero-config reverse tunnel for AI workflows |
| **GitHub** | [github.com/peixl](https://github.com/peixl) · [github.com/ifq-ai](https://github.com/ifq-ai) | All open-source repos |

### Social

| Channel | Link |
|------|-------------|
| WeChat | [img.ifq.ai/wechat.jpg](https://img.ifq.ai/wechat.jpg) |
| Official Account | [img.ifq.ai/we_q.jpg](https://img.ifq.ai/we_q.jpg) |
| X / Twitter | [@AlchainHust](https://x.com/AlchainHust) |
| Bilibili | [space.bilibili.com/14097567](https://space.bilibili.com/14097567) |
| YouTube | [@Alchain](https://www.youtube.com/@Alchain) |
| Xiaohongshu | [profile/5abc6f17...](https://www.xiaohongshu.com/user/profile/5abc6f17e8ac2b109179dfdf) |

### Partnership & Licensing

- **Commercial license, brand customization, press** → reach out via [ifq.ai](https://ifq.ai)
- **Bug / PR / feature request** → [issues](https://github.com/peixl/ifq-design-skills/issues)
- **Skill marketplace & distribution** → [skills.ifq.ai](https://skills.ifq.ai)

---

<p align="center"><sub>
  <img src="assets/ifq-brand/mark.svg" alt="ifq.ai" height="18" style="vertical-align: middle;" />
  &nbsp;© 2026 ifq.ai · Jieshi Technology · Designed and signed by ifq.ai.
</sub></p>
