<sub>🌐 <a href="README.en.md">English</a> · <b>中文</b> · <code>ifq.ai / 2026</code></sub>

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/ifq-brand/logo-white.svg">
  <img src="assets/ifq-brand/logo.svg" alt="ifq.ai" height="64">
</picture>

# IFQ Design Skills

<sub><i>Intelligence, framed quietly.</i></sub>

<br>

<code>&nbsp;一句话进。&nbsp;&nbsp;一份能发出去的页面出来。&nbsp;&nbsp;做工像 ifq.ai 亲手做的。&nbsp;</code>

<br><br>

[![License](https://img.shields.io/badge/license-commercial%20%2B%20personal-D4532B?style=flat-square&labelColor=111111)](LICENSE)
[![ifq.ai native](https://img.shields.io/badge/ifq.ai-native-111111?style=flat-square)](assets/ifq-brand/BRAND-DNA.md)
[![ambient brand](https://img.shields.io/badge/ambient_brand-embedded-A83518?style=flat-square&labelColor=111111)](references/ifq-brand-spec.md)
[![proof first](https://img.shields.io/badge/proof--first-on-111111?style=flat-square)](references/verification.md)
[![modes](https://img.shields.io/badge/modes-12-D4532B?style=flat-square&labelColor=111111)](references/modes.md)

<br>

<sub>立场 &nbsp;·&nbsp; 安装 &nbsp;·&nbsp; 说给它听 &nbsp;·&nbsp; 一页的解剖 &nbsp;·&nbsp; 五个标记 &nbsp;·&nbsp; 12 种模式 &nbsp;·&nbsp; 六层骨架 &nbsp;·&nbsp; 验证 &nbsp;·&nbsp; 许可</sub>

</div>

---

## 立场

大多数 agent 被要求"做设计"时，会交出两样东西：**一张过度装饰的 Figma Community 模板**，或者 **一份被 AI 格式化过的 Notion 页面**。都不能发出去。

这个 skill 解决的就是这一件事。它不是配色文件，也不是一张 logo 贴纸。

它是一种 **做工**：把网页当编辑部版面排、把动画当预告片剪、把 PPT 当发布会母版做、把名片当印前 PDF 对齐出血位。

ifq.ai 的标识被埋在这份做工里。看第一眼是内容，**第二眼才意识到：这是 ifq.ai 的手感**。

---

## 安装

```bash
npx skills add peixl/ifq-design-skills -g -y
```

> `peixl/ifq-design-skills` 是 GitHub 仓库短路径 → <https://github.com/peixl/ifq-design-skills>

装完直接对 agent 说话。skill 自己判断任务、自己路由模式、自己挑模板、自己跑验证。

**核心链路零依赖**：写 HTML → `npm run preview -- <file>` 打印 `file://` 预览 URL → `npm run verify:lite -- <file>` 扫占位符。**不需要装 Playwright、Chromium、Python、ffmpeg**。只有当用户真的要导出 MP4 / PDF / PPTX 时，才用 `npm run install:export` 按需拉齐。

**其他 agent 一键安装**：

```bash
# Hermes（Nous Research）
hermes skills install github:peixl/ifq-design-skills

# Claude Code（personal）
git clone https://github.com/peixl/ifq-design-skills ~/.claude/skills/ifq-design-skills

# OpenClaw
openclaw skills install ifq-design-skills   # 或 symlink 到 ~/.openclaw/skills/

# Codex CLI / OpenCode / 任何读取 AGENTS.md 的 agent
# 本仓库根已内置 AGENTS.md —— 克隆后 agent 自动认得
git clone https://github.com/peixl/ifq-design-skills

# 共享给所有 agent（推荐）
git clone https://github.com/peixl/ifq-design-skills ~/.agents/skills/ifq-design-skills
```

完整矩阵与工具映射：[references/agent-compatibility.md](references/agent-compatibility.md)。

---

## 给 AI agent（30 秒上手）

本仓库根有 `AGENTS.md`，`SKILL.md` 最顶部有「🤖 Agent Cheat Sheet」，两处都是为 agent 写的。落地后任何 runtime（Claude Code / Codex / OpenCode / OpenClaw / Hermes / Cursor）的动作都一样：

1. **读** [SKILL.md](SKILL.md) 的 Cheat Sheet + Fast Path（约前 150 行）→ 能力、权限、三步环路一眼看完。
2. **路由** [references/modes.md](references/modes.md) → 选 12 模式之一 → 在 [assets/templates/INDEX.json](assets/templates/INDEX.json) 找模板 fork，**不要从白纸开始**。
3. **验证**（默认 Tier 0 · 零安装）：`npm run verify:lite -- <file>` 扫占位符 → `npm run preview -- <file>` 拿到 `file://` URL 自己用浏览器工具打开。

**能力与权限**（SKILL.md frontmatter 里有机读 `capabilities:` / `permissions:` / `security:` 块，OpenClaw / Hermes 可直接按块授权）：

- 读：skill 根目录下所有文件
- 写：用户当前 workspace（不会写到 workspace 之外）
- 运行：仅 `npm run preview | verify:lite | smoke | install:export` + 可选 `ffmpeg`
- 网络：#0 事实校验用 WebSearch；产出的 HTML 默认 local-first 字体、不加载 Google Fonts，只有用户明确需要时才 opt-in Google Fonts / unpkg / jsDelivr
- **scripts/ 目录零 `child_process`、零 `eval`、零对外网络请求**；内置模板默认不加载远程 CSS/JS——静态安全扫描（ClawHub 等）更干净

只想要 HTML 的任务永远停在 Tier 0。只有用户明确要 MP4 / GIF / PDF / PPTX 时才 `npm run install:export` 拉 Tier 2 依赖；只有要自动化多 viewport 截图时才 `pip install playwright` 拉 Tier 1。

---

## 说给它听

下面是真实的对话。左边是你随口一句，右边是 skill 真正去做的事。

<table>
<thead>
<tr><th width="50%">你说</th><th>它做</th></tr>
</thead>
<tbody>

<tr>
<td>

> 「明天沙龙讲 AI agent 20 分钟，给我一份 deck，不要像 SaaS keynote，要有书卷气。」

</td>
<td>

<sub>M-08 Keynote · editorial dark · Newsreader 大标题 · rust ledger 竖线分章 · 每页 mono 序号 <code>01 / 20</code> · 结尾 colophon · 同步导出 HTML + PPTX + PDF</sub>

</td>
</tr>

<tr>
<td>

> 「这周 4 个更新，做成纵向 changelog，要像活页笔记，别像公告栏。」

</td>
<td>

<sub>M-07 Changelog · warm paper · 单根 rust 左轴 · 每条 entry 带 mono 时间戳 · 顶部 <code>release ledger / vol.12</code> · 全程手绘图标代替 emoji</sub>

</td>
</tr>

<tr>
<td>

> 「朋友独立咖啡店名片，黑白双面，不要花，要有手工感。」

</td>
<td>

<sub>M-10 名片 · 85×55mm + 3mm 出血 · 正面一行业务陈述 + spark 小点 · 反面 mono 信息条 · 第三方物料 · 显式 wordmark 关闭 · IFQ 只保留版面节奏 · 输出带 crop marks 的 PDF</sub>

</td>
</tr>

<tr>
<td>

> 「24 秒硬件发布片头，冷静，像 Teenage Engineering，不要发布会预热。」

</td>
<td>

<sub>M-01 Launch Film · 先 3 方向 (matter-of-fact / editorial / kinetic-type) · Stage+Sprite 时间轴 · 60fps · key shot + spec mono 叠印 + 2s quiet URL 定版 · 输出 mp4 + gif + keyposter</sub>

</td>
</tr>

<tr>
<td>

> 「个人站一页，但不要像找工作。」

</td>
<td>

<sub>M-02 Portfolio · 先 5 方向 (archive / studio / essay / atlas / ledger) · 选 1 做主，2 做变体画布 · 首屏不放头像，放 currently / writing / building 三栏 · 底部 mono colophon</sub>

</td>
</tr>

<tr>
<td>

> 「内部 AI 做一个 command center，像 Bloomberg 终端，不要 BI 套壳。」

</td>
<td>

<sub>M-04 Dashboard · graphite 底 · 12 列 ledger 栅格 · mono 数字 + 极细 rust underline 表趋势 · 顶栏 session / latency / build 三段 · 禁用渐变按钮和卡通色饼图</sub>

</td>
</tr>

<tr>
<td>

> 「路演要一张 A vs B，我们对三家友商，一眼看出为什么选我们，不许吹。」

</td>
<td>

<sub>M-05 Compare · 矩阵而非雷达 · 四列等宽 · 每项 ✓ / ● / — 三态 + 小字来源 · 底部 <code>compiled from public docs · ifq.ai</code> · 事实先 WebSearch</sub>

</td>
</tr>

<tr>
<td>

> 「2026 AI agent 白皮书，50 页内，直接印。」

</td>
<td>

<sub>M-03 白皮书 · A4 可打印 HTML · 扉页 / 摘要 / 目录 / 章节 / 参考 / colophon 全套 · 每章起首 mono 序号 + 半页留白 · 页脚 <code>ifq.ai / 2026</code> · 导出 print-ready PDF + 书签</sub>

</td>
</tr>

<tr>
<td>

> 「视觉有点乱，先别改，先告诉我问题在哪。」

</td>
<td>

<sub>M-11 品牌诊断 · 不动手 · 一页报告 · 色彩 / 字体 / 节奏 / 母题 / 完成度五维评分 · 每维 before / suggested after 小样 · 三个升级方向，不给结论</sub>

</td>
</tr>

<tr>
<td>

> 「小红书 6 张封面，新栏目『每周一张图』，克制，但一眼能被认出来。」

</td>
<td>

<sub>M-09 社媒套件 · 1242×1660 · 左上 mono 栏目章 <code>weekly / 01</code>→<code>06</code> · 编辑部排版而非大字 emoji · 右下 quiet URL · 6 张封面 + 1 张 OG 横版</sub>

</td>
</tr>

</tbody>
</table>

> 不用记模式编号。说人话，skill 自己路由。

---

## 一页的解剖

一张 hero landing。它看起来很安静。它同时在做 7 件事：

```text
 ┌────────────────────────────────────────────────────────────────────┐
 │  ◇ ifq.ai / live system                            [01 / 12]       │ ← mono field note + 栏位序号
 │                                                                    │
 │                                                                    │
 │     Intelligence, framed                                           │ ← Newsreader display
 │     quietly.                                                       │   italic 判断点
 │                                                                    │
 │     A design engine that understands the difference                │ ← body serif
 │     between a slide deck and a launch film.                        │
 │                                                                    │
 │   ┃  ·  ledger                                                     │ ← rust ledger 竖线
 │   ┃                                                                │   承担版面秩序
 │   ┃   01    mode-aware pipeline                                    │ ← mono 编号行
 │   ┃   02    ambient brand, not loud branding                       │
 │   ┃   03    proof-first export loop                                │
 │                                                                    │
 │                                                                    │
 │                                      ✦                             │ ← signal spark
 │                                                                    │   安静点一下
 │                                                                    │
 │  compiled by ifq.ai              ·           ifq.ai / 2026         │ ← quiet URL + colophon
 └────────────────────────────────────────────────────────────────────┘
```

拆开看：

1. **Editorial contrast** — Newsreader serif 配 JetBrains Mono，不是随机字体组合。
2. **Rust ledger** — 左侧那根竖线就是 ifq.ai 的"脊"。比大 logo 更 IFQ。
3. **Mono field note** — 顶部和底部那行 `ifq.ai / live system`、`ifq.ai / 2026`。
4. **Quiet URL** — 没有 CTA 咆哮。域名只出现一次，在右下。
5. **Signal spark** — 右下一颗小火花。整页唯一的图形重音。
6. **Warm paper** — 背景 `#FAF7F2`，不是 `#FFFFFF`。冷白让版面没有温度。
7. **Ledger rhythm** — 所有间距走 `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64` 这条轴。不凭感觉。

用户不会去数这 7 件事。用户只会说"这页看起来比较高级"。

**高级 = 同一只手 = ifq.ai 的 Ambient Brand**。

---

## 五个标记

Ambient Brand 由五个环境级标记组成。每份交付物默认至少融合其中 3 个。

| 标记 | 是什么 | 出现在哪 |
|------|--------|----------|
| **Signal Spark** | 8-point 火花。intelligence 被点亮的一瞬 | hero 右上 · 动画开场一帧 · 印章中心 |
| **Rust Ledger** | 赤陶色竖线、分隔、编号、轴线 | hero · slides · infographic · dashboard |
| **Mono Field Note** | JetBrains Mono 写的 `ifq.ai / 2026` 小字 | footer · closing · 角落 |
| **Quiet URL** | 域名以极低姿态出现一次 | footer · meta · end card |
| **Editorial Contrast** | Newsreader italic + JetBrains Mono + 暖纸白 | 整体排版骨架 |

这不是装饰元素，是版面语法。

---

## 共品牌

| 场景 | IFQ 在哪里 |
|------|------------|
| **IFQ 自有物料**（ifq.ai 及子产品） | 全员到齐：wordmark · spark · field note · quiet URL 都可上台 |
| **第三方 / 客户物料** | 主品牌在前。IFQ 退到 authored layer：版面节奏、色温、colophon、手绘图标、导出完成度 |
| **客户要求 white-label** | 去掉显式 wordmark 和 field note。保留 editorial contrast、ledger 节奏、proof-first 做工 |

**IFQ 可以隐身，不能不在场**。做工本身就是标识。

---

## 12 种模式

| # | 模式 | 典型触发 | 交付 |
|---|------|----------|------|
| M-01 | Launch Film | 发布动画 · 产品宣传片 | 25–40s 动画 + keyposter + 社媒套件 |
| M-02 | Portfolio | portfolio · 个人站 · about | 单页站 + 5 方向变体 |
| M-03 | 白皮书 | 白皮书 · 年报 · 研究 PDF | 可打印 HTML → PDF |
| M-04 | Dashboard | 数据看板 · KPI · 监控台 | 高密度 dashboard |
| M-05 | Compare | A vs B · 横评 · benchmark | 对比矩阵 + 事实来源 |
| M-06 | Onboarding | 新手引导 · flow demo | 3–5 屏交互流 |
| M-07 | Changelog | release notes · 发布日记 | 纵向时间线 |
| M-08 | Keynote | 演讲 PPT · 母版 | HTML deck + PPTX + PDF |
| M-09 | Social Kit | 小红书 · 朋友圈 · OG 卡 | 多尺寸静态物料 |
| M-10 | 名片 / 邀请函 | 名片 · VIP 卡 · 请柬 | SVG + 出血位 PDF |
| M-11 | 品牌诊断 | 体检 · 升级建议 | 诊断报告 + 3 方向 |
| M-12 | 全栈品牌 | brand from scratch | logo + 色板 + 字体 + 6 应用 |

路由：**模式触发 → 设计方向顾问 fallback → Junior Designer 主干**。

完整协议：[references/modes.md](references/modes.md)。

---

## 六层骨架

这个 skill 像 IFQ，不是因为颜色，而是因为下面 6 层同时工作：

| 层 | 做什么 | 关键文件 |
|----|--------|----------|
| **01 · Context Engine** | 从上下文长设计，不从白纸瞎猜 | [design-context.md](references/design-context.md) |
| **02 · Asset Protocol** | 动视觉前先抓事实 / logo / 产品图 / UI | [SKILL.md](SKILL.md) · [workflow.md](references/workflow.md) |
| **03 · House Marks** | 把 5 个 ambient 标记写进版面 | [ifq-brand-spec.md](references/ifq-brand-spec.md) · [assets/ifq-brand/](assets/ifq-brand/) |
| **04 · Style Recipes** | 风格靠配方和 scene template 组织 | [design-styles.md](references/design-styles.md) · [ifq-native-recipes.md](references/ifq-native-recipes.md) |
| **05 · Output Compiler** | HTML → MP4 / GIF / PPTX / PDF 一条导出链 | [scripts/](scripts/) |
| **06 · Proof Loop** | 截图 + 点击 + smoke + 导出核对 | [verification.md](references/verification.md) · [smoke-test.mjs](scripts/smoke-test.mjs) |

```text
ifq-design-skills/
├── SKILL.md                 # 主协议：fast path · 角色 · 原则
├── assets/
│   ├── ifq-brand/           # logo · sparkle · tokens · BRAND-DNA
│   └── templates/           # 已内嵌 ambient marks 的可 fork 模板
├── references/              # 方法论 · 模式手册 · 验证 · 风格配方 · 宪章
├── scripts/                 # 导出 · 验证 · smoke · pdf · pptx
└── demos/                   # 示例产物
```

---

## 验证

**Lite 档（默认，零依赖）**：

```bash
npm run preview -- path/to/design.html   # 打印 file:// URL，交给浏览器工具或用户打开
npm run verify:lite -- path/to/design.html   # 纯静态扫占位符残留（YYYY / {…} / lorem / 空 data-ifq-*）
npm run smoke                              # 一分钟 skill 自检
```

不需要装 Playwright、不需要 Chromium、不需要 Python。跨 macOS / Linux / Windows 即跑。

**Deep 档（按需，仅导出或自动化才装）**：

```bash
npm run install:export   # 一键装齐 playwright + pdf-lib + pptxgenjs + sharp + Chromium
python scripts/verify.py path/to/design.html   # headless 多 viewport 截图 + 控制台错误
```

单件作品在需要自动截图/可点击测试/导出 MP4 PDF PPTX 时才走 Deep 档。详见 [references/verification.md](references/verification.md)。

---

## 许可

个人用免费。商用见 [LICENSE](LICENSE)。

---

<div align="center">

<sub><code>compiled by ifq.ai&nbsp;&nbsp;·&nbsp;&nbsp;2026</code></sub>


</div>
