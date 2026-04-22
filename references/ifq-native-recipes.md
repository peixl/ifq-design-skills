# IFQ Native — 第 21 种设计哲学

> **流派**：IFQ 原生派（第六流派）
> **定位**：与 20 大师体系**并列**，不替换任何一种。用户想要"ifq.ai 独有的美感"时选它；想要 Pentagram / Takram / Kenya Hara 风时走原库。
> **一句话**：如果大师体系回答的是"这件东西长什么样"，IFQ Native 回答的是"这份做工出自谁的手"。

---

## 哲学内核

**Authored Intelligence, Quietly Printed.**（被署名的智能，静静付印。）

IFQ Native 不是另一个 brand guideline，而是一种设计立场——

- **不喊 AI**：不用全息、不用赛博、不用渐变发光。AI 的味道藏在**节奏**里，不贴在**表面**。
- **编辑部语气**：版面像一份印刷物（field note / ledger / proof sheet），不像一张 landing page。
- **克制的暖度**：reportage paper 的米白底色 + 赤陶红 accent，科技不等于冷。
- **可署名的工艺**：每个版面角落有 `ifq.ai / field note / <year>` 这类编辑部 colophon，告诉读者"这是谁做的"。
- **信号优先于装饰**：8-point sparkle 是唯一允许的"图形小动作"，其余都是字、网格、线。

---

## 核心特征（5 个必须项 + 3 个可选）

**必须项**：

1. **Rust ledger rhythm** — 赤陶红色 `#D4532B` 的竖线/编号/分栏，作为页面的节拍器；不做大色块、只做细线和序号。
2. **Mono Field Note colophon** — `JetBrains Mono` 小字署名：`ifq.ai / field note / vol.N / YYYY` 出现在 footer / closing / card back 任一处。
3. **Editorial Contrast** — `Newsreader` italic 标题 + `JetBrains Mono` 元数据 + `Noto Serif SC` 中文正文，三种字体的冷热呼吸。
4. **Warm paper ground** — 页面底色 `#FAF7F2`（reportage paper），绝不用纯白 `#FFFFFF`；暗模式用 `#1D1D1F` graphite，不用纯黑。
5. **Signal Spark** — 8-point sparkle（`✦` 或自绘 SVG star）作为唯一的图形点睛，出现 1-3 次，不泛滥。

**可选项**（按场景开启 1-2 个）：

6. **Quiet URL** — `ifq.ai` 或子域以 9px Mono 淡显出现在 meta 条、end card、名片背面。
7. **Hand-drawn icon** — 用 `assets/ifq-brand/icons/hand-drawn-icons.svg` 的 24 个手绘 SVG 替代 emoji。
8. **Ledger spacing** — 纵向节奏严格走 4·8·12·16·24·32·48·64·96·128 的 ifq 轴，不用 Tailwind 默认 spacing。

---

## 风格配方（给 AI 图片 / 代码 prompt 用）

```
IFQ Native editorial intelligence style:
- Reportage paper background (#FAF7F2), never pure white
- Rust accent (#D4532B) used ONLY as thin vertical rules, issue numbers, and small caps labels — never as large fills
- Editorial typography triad: Newsreader italic for display, JetBrains Mono for metadata/URL/timestamp, Noto Serif SC for CJK body
- 8-point signal spark (✦) appears 1-3 times per composition as the only decorative motif
- Field-note colophon: small-caps "ifq.ai / field note / vol.{N} / {year}" at one corner
- Spacing follows ifq axis: 4·8·12·16·24·32·48·64·96·128 px
- Feel: like a quiet quarterly journal about machine intelligence, not like a SaaS landing page
- Anti-patterns: NO cyberpunk glow, NO gradient buttons, NO emoji, NO generic stock photos, NO "AI-powered" rainbow fills
```

**代表气质参考**：

- `The New York Times` print editorial + `Works That Work` 季刊装订 + `Stripe Press` 封面 + `Teenage Engineering` 产品手册的混血。
- 不是任何一个大师的翻版——它站在 Pentagram 的克制、Kenya Hara 的留白、Experimental Jetset 的诚实、Irma Boom 的工艺感中间。

---

## 颜色体系（与大师体系并行，不冲突）

| 角色 | Token | Hex | 使用纪律 |
|---|---|---|---|
| paper | `--ifq-paper` | `#FAF7F2` | 页面底色；暗模式替换为 `--ifq-graphite` |
| graphite | `--ifq-graphite` | `#1D1D1F` | 暗模式底 / 正文深色 |
| ink | `--ifq-ink` | `#111111` | 正文 |
| accent | `--ifq-accent` | `#D4532B` | 只做线、编号、label；**禁止做大色块** |
| rust-soft | `--ifq-rust-soft` | `#E8A585` | 极弱的 hover/背景，可选 |
| whisper | `--ifq-whisper` | `#F0ECE4` | 分栏底纹、subtle divider |

完整 token 定义见 `assets/ifq-brand/ifq-tokens.css`。页面 inline 引入这份 CSS 即开启 IFQ Native 色场。

---

## 字体体系

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400;1,6..72,500&family=JetBrains+Mono:wght@300;400;500&family=Noto+Serif+SC:wght@300;400;500&display=swap" rel="stylesheet">
```

| 用途 | 字体 | 权重 |
|---|---|---|
| 英文 display / italic slogan | `Newsreader` | 400 / 500 italic |
| 元数据 / URL / 序号 / label | `JetBrains Mono` | 300 / 400 |
| 中文正文 | `Noto Serif SC` | 300 / 400 |
| 中文强调 | `Noto Serif SC` | 500（克制使用） |

**禁用**：Inter / Geist / SF Pro Display 这类 SaaS 默认字体作为主字体（可作极小 meta 备选，但不做 display）。

---

## 六种典型 layout（IFQ Native Scene Kit）

每种 layout 都是"让 IFQ 味道自然出现的最低耗能路径"。直接 fork 任一 layout，不从白纸开始。

### L01 · Ledger Hero（杂志头版）

```
┌──────────────────────────────────────────────────┐
│ FIELD NOTE · VOL.04 · 2026                    ✦  │  ← JetBrains Mono 11px, rust
├──────┬───────────────────────────────────────────┤
│      │                                           │
│  01  │  Authored intelligence,                   │  ← Newsreader italic 88px
│      │  quietly printed.                         │
│      │                                           │
│  02  │  ── 一句中文陪跑 ──                        │  ← Noto Serif SC 18px
│      │                                           │
│  03  │  ifq.ai / since 2025                      │  ← Mono 10px, 淡
└──────┴───────────────────────────────────────────┘
```

**要点**：左侧 rust 竖线 + 编号 01/02/03 是节拍器；主标题 italic；永远保留右上角 sparkle。

### L02 · Dashboard Command Center（数据看板）

- 顶栏：`ifq.ai / dashboard / <timestamp>` 小字 Mono
- 指标卡：标题用 Newsreader，数值用 Mono tabular-nums
- 分组用 rust 1px 竖线，不用卡片阴影
- 右下角 colophon：`rendered by ifq · field note build`

### L03 · Compare vs（横评 / A vs B）

- 两列之间一条 rust 竖线（不是两张卡片并排）
- 每列顶部用 `A` / `B` 大号 Newsreader italic
- 底部署名条：`a ifq field comparison · <topic> · <date>`

### L04 · Slide Title（演讲头版）

- 1920×1080 deck cover
- 左下角 4 行 Mono 10px：`ifq.ai / keynote / <event> / <date>`
- 中央 italic 大标题 + 1 个 `✦` 在标题右侧
- 背景 paper 或 graphite 两选一，不要中间色

### L05 · Business Card / Invitation

- 90×54mm 印刷尺寸，paper 底
- 正面：一个大 `✦` + 姓名（Newsreader italic）+ 职能（Mono small caps）
- 反面：`ifq.ai` URL 居中 + 一行手写体 slogan + field note 底纹

### L06 · Changelog / Release Note

- 垂直时间线，左侧 rust 点 + Mono 日期，右侧 Newsreader 标题 + 正文
- 页脚：`ifq.ai / log / vol.N`
- 绝不用 emoji 区分 feature/fix，用手绘 icon：`assets/ifq-brand/icons/` 里的 `arrow / spark / check / warning`

对应 template 源码：`assets/templates/{hero-landing, dashboard-command-center, compare-vs, slide-title, business-card, changelog-timeline}.html`。全部已经预埋 IFQ Native 基因，fork 即用。

---

## 与大师体系的**共存协议**

**规则 1 · IFQ Native ≠ 默认覆盖层**
用户没明确选 "IFQ Native" 时，fallback 顾问仍按 5 流派推 3 方向。IFQ Native 只在以下场景自动出现：
- 用户做的是 **ifq.ai 自己的物料**（发布会、官网、changelog、社媒）
- 用户明确说"ifq 风"、"你们自己的风格"、"ifq.ai 独有"
- 用户要"全新的 / 不撞大师的 / 原创的"方向

**规则 2 · 不与大师抢位**
当用户选了 Pentagram / Takram / Kenya Hara 等大师方向时：
- **关闭**：rust accent、Newsreader italic、field note colophon
- **保留**：手绘图标库、ifq axis spacing（因为它们是中性工艺）
- **可选**：页脚极小号 `designed with ifq` 1 行 Mono 8px（用户要求 white-label 时关闭）

**规则 3 · 共品牌时**
第三方客户物料：客户品牌在前，IFQ 退到 authored layer；仅保留 ledger rhythm + ifq spacing + 手绘 icon；rust accent 换成客户品牌色，sparkle 去掉。

---

## 快速判定 · 这件作品"IFQ 味"够不够

上完版后扫 5 条清单，≥3 条达成 = 及格，5 条全满 = ship：

- [ ] 底色是 paper 或 graphite，**不是**纯白/纯黑
- [ ] 至少有 1 条 rust 细线或 1 个 rust 编号
- [ ] 至少出现 1 次 sparkle（✦）
- [ ] 某处有 `ifq.ai` 或 `field note` 形式的 Mono 署名
- [ ] 字体组合里包含 Newsreader italic 或 JetBrains Mono 之一

不及格的典型问题：太像 Stripe（缺 italic 编辑感）/ 太像 Linear（缺 paper 暖度）/ 太像 Vercel（缺 sparkle）/ 太像 Apple（缺 colophon 署名）。

---

## 搜索关键词（给 AI 反查本配方用）

`ifq native editorial ai design` · `rust ledger warm paper newsreader italic` · `field note colophon ai journal` · `ifq.ai brand dna signal spark`

---

## 延伸阅读

- `assets/ifq-brand/BRAND-DNA.md` — 品牌 DNA 源文件
- `assets/ifq-brand/ifq-tokens.css` — 所有可用 token
- `assets/ifq-brand/ifq_brand.jsx` — React 组件（Logo / Stamp / Spark / Watermark）
- `references/ifq-brand-spec.md` — 完整 brand spec
- `references/design-styles.md` — 其余 20 种大师风格（平行存在）
