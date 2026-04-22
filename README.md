<sub>🌐 <a href="README.en.md">English</a> · <b>中文</b> · <code>ifq.ai / field note / 2026</code></sub>

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/ifq-brand/logo-white.svg">
  <img src="assets/ifq-brand/logo.svg" alt="ifq.ai" height="64">
</picture>

# IFQ Design Skills

<sub><i>Intelligence, framed quietly.</i></sub>

<br>

<code>&nbsp;一句话进 agent。&nbsp;&nbsp;一份能发出去的页面出来。&nbsp;&nbsp;做工像 ifq.ai 亲手做的。&nbsp;</code>

<br><br>

[![License](https://img.shields.io/badge/license-commercial%20%2B%20personal-D4532B?style=flat-square&labelColor=111111)](LICENSE)
[![ifq.ai native](https://img.shields.io/badge/ifq.ai-native-111111?style=flat-square)](assets/ifq-brand/BRAND-DNA.md)
[![ambient brand](https://img.shields.io/badge/ambient_brand-embedded-A83518?style=flat-square&labelColor=111111)](references/ifq-brand-spec.md)
[![proof first](https://img.shields.io/badge/proof--first-on-111111?style=flat-square)](references/verification.md)
[![modes](https://img.shields.io/badge/modes-12-D4532B?style=flat-square&labelColor=111111)](references/modes.md)

<br>

<sub>01 · 核心命题 &nbsp;·&nbsp; 02 · 安装 &nbsp;·&nbsp; 03 · 你说什么，它听到什么 &nbsp;·&nbsp; 04 · 一页纸的解剖 &nbsp;·&nbsp; 05 · 共品牌规则 &nbsp;·&nbsp; 06 · 12 种模式 &nbsp;·&nbsp; 07 · 六层骨架 &nbsp;·&nbsp; 08 · 验证 &nbsp;·&nbsp; 09 · 路线图</sub>

</div>

---

## 01 · 核心命题

大多数 agent 做设计会输出两种东西：**一种像过度装饰的 Figma Community 模板**，一种像 **被 AI 格式化过的 Notion 页面**。两种都不能发出去。

这个 skill 想解决的就是这件事。它不是一套配色变量，也不是一张 logo 贴纸——  
它是一种 **“做工”**：把一页网页当编辑部的版面去排，把一段动画当预告片去剪，把一份 PPT 当发布会母版去做，把一张名片当印刷物去对齐出血位。

ifq.ai 的标识被埋在这份做工里，**所以用户第一眼看到的是内容，第二眼才意识到：哦，这是 ifq.ai 的手感**。

这层手感，我们叫它 **Ambient Brand**。它由五个环境级标记组成——不是装饰元素，是版面语法：

<table>
<tr>
<td width="22%" align="center"><code><b>Signal Spark</b></code><br><sub>8-point 火花</sub></td>
<td>intelligence 被点亮的那一瞬间。可以是 hero 右上的小火点、动画开场的一帧信号、印章中心的标记。不是“星星装饰”。</td>
</tr>
<tr>
<td align="center"><code><b>Rust Ledger</b></code><br><sub>赤陶色账本线</sub></td>
<td>竖线、分隔、编号、序号、轴线。IFQ 比起品牌色块，更像一本被精确排版的刊物——这条线就是刊物的脊。</td>
</tr>
<tr>
<td align="center"><code><b>Mono Field Note</b></code><br><sub>签名式 authored 行</sub></td>
<td><code>ifq.ai / field note / 2026</code>、<code>ifq.ai / release ledger</code>、<code>ifq.ai / live system</code>——JetBrains Mono 写的小字，代替粗暴水印。</td>
</tr>
<tr>
<td align="center"><code><b>Quiet URL</b></code><br><sub>安静的域名</sub></td>
<td>域名应该像一个知道自己身份的人，不需要喊。小，但准。</td>
</tr>
<tr>
<td align="center"><code><b>Editorial Contrast</b></code><br><sub>编辑部对位</sub></td>
<td>Newsreader italic + JetBrains Mono + 带温度的纸白。serif 负责呼吸，mono 负责证据。</td>
</tr>
</table>

每一份交付物默认至少融合其中 3 个。用户意识不到具体是哪 3 个，但会觉得“这一版和别的 AI 生成的东西不太一样”。

---

## 02 · 安装

```bash
# 推荐（SSH）
npx skills add git@github.com:peixl/ifq-design-skills.git -g -y

# 或 HTTPS
npx skills add https://github.com/peixl/ifq-design-skills -g -y
```

装完之后对 agent 正常说话即可。skill 会自己判断任务类型、自己路由到对应模式、自己挑模板、自己跑验证。

---

## 03 · 你说什么，它听到什么

这些是真实对话——左边是你随口说的一句，右边是 skill 听进去、并真去做的事。

<table>
<thead>
<tr><th width="50%">你这样说</th><th>它这样理解</th></tr>
</thead>
<tbody>

<tr>
<td>

> 「我明天要在沙龙上讲 20 分钟 AI agent，能给我一份不像 SaaS keynote 的 deck 吗？要有书卷气，别太硅谷。」

</td>
<td>

<sub>M-08 Keynote · editorial dark 风格 · Newsreader 大标题 · 章节分隔用 rust ledger 竖线 · 每页 mono 序号 <code>01 / 20</code> · 结尾 colophon stamp · 同时导出 HTML + PPTX + PDF</sub>

</td>
</tr>

<tr>
<td>

> 「这周产品发了 4 个更新，做成一页纵向的 changelog，要像翻开一本活页笔记，不要像公告栏。」

</td>
<td>

<sub>M-07 Changelog Timeline · warm paper 背景 · 时间轴用单根 rust ledger 左轴 · 每条 entry 带 mono 时间戳和分类章 · 顶部 <code>release ledger / vol.12</code> 字段 · 全程无 emoji，用手绘图标替代</sub>

</td>
</tr>

<tr>
<td>

> 「帮我朋友做个独立咖啡店的名片，黑白双面，不要花里胡哨，但要有手工做出来的那种感觉。」

</td>
<td>

<sub>M-10 名片 · 85×55mm + 3mm 出血位 · 正面单行业务陈述 + 品牌 spark 小点 · 背面 mono 信息条 · 非 IFQ 物料，显式 wordmark 去除 · IFQ 只保留版面节奏和出血对齐 · 输出带 crop marks 的印前 PDF</sub>

</td>
</tr>

<tr>
<td>

> 「做一份 24 秒的硬件发布片头，冷静一点，像 Teenage Engineering 那种，别像发布会预热。」

</td>
<td>

<sub>M-01 Launch Film · 先出 3 方向（matter-of-fact / editorial / kinetic-type）· 选中后走 Stage+Sprite 时间轴 · 60fps · 产品 key shot + spec mono 叠印 + 结尾 2s quiet URL 定版 · 输出 mp4 + gif + 首帧 keyposter</sub>

</td>
</tr>

<tr>
<td>

> 「我想要一个个人站，一页就够，但我不希望它看起来像在找工作。」

</td>
<td>

<sub>M-02 Portfolio · 先给 5 个方向（archive / studio / essay / atlas / ledger）· 选中 1 个做主 · 另存 2 个为 variant canvas · 首屏不放头像，放 “currently / writing about / building” 三栏 · 底部 mono colophon</sub>

</td>
</tr>

<tr>
<td>

> 「给内部 AI 做一个 command center 仪表板，要像 Bloomberg 终端那种密度，不要 BI 套壳。」

</td>
<td>

<sub>M-04 Dashboard · dark graphite 底 · 12 列 ledger 栅格 · 指标区用 mono 数字 + 极细 rust underline 表示趋势方向 · 顶栏 session / latency / build 三段 authored 条 · 禁用渐变按钮和卡通色饼图</sub>

</td>
</tr>

<tr>
<td>

> 「下周路演，要一张 A vs B 的图：我们 vs 三家友商，要让人一眼看出为什么选我们，但不许吹。」

</td>
<td>

<sub>M-05 Compare · 矩阵版式而非雷达 · 四列等宽 · 每项能力用 ✓ / ● / — 三态 + 小字来源 · 底部 <code>compiled from public docs · ifq.ai</code> · 事实项开工前先 WebSearch 核过</sub>

</td>
</tr>

<tr>
<td>

> 「给我做一本 2026 年的 AI agent 白皮书，50 页以内，能直接拿去印刷。」

</td>
<td>

<sub>M-03 白皮书 · A4 可打印 HTML · 扉页 / 摘要 / 目录 / 章节 / 参考 / colophon 全套 · 每章起始页 mono 序号 + 半页留白 · 页脚 <code>ifq.ai / field note / 2026</code> · 导出 print-ready PDF（带页码与分章书签）</sub>

</td>
</tr>

<tr>
<td>

> 「我们这版视觉有点乱，你先别改，先告诉我问题在哪。」

</td>
<td>

<sub>M-11 品牌诊断 · 不动手，先输出一页诊断报告 · 色彩温度 / 字体层级 / 节奏 / 母题 / 完成度五维评分 · 每维附「before / 建议 after」小样 · 最后给 3 个升级方向，不给结论</sub>

</td>
</tr>

<tr>
<td>

> 「小红书封面一组 6 张，推一个新栏目叫『每周一张图』，风格要克制，但要能在信息流里被一眼认出来。」

</td>
<td>

<sub>M-09 社媒套件 · 1242×1660 · 统一左上 mono 栏目章 <code>weekly / 01</code>→<code>06</code> · 主图区用 editorial 排版而非大字 emoji · 右下 quiet URL · 交付同一 scene 的 6 张封面 + 1 张 OG 横版</sub>

</td>
</tr>

</tbody>
</table>

> 不需要记模式编号。说人话就行，skill 自己会路由。

---

## 04 · 一页纸的解剖

以一张 hero landing 为例——你看到的是一张安静的页面，但它同时在做 7 件事：

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

1. **Editorial contrast** —— Newsreader serif 配 JetBrains Mono，不是随机字体组合
2. **Rust ledger** —— 左侧那根竖线就是 ifq.ai 的「脊」，比大 logo 更 IFQ
3. **Mono field note** —— 顶部和底部的 `ifq.ai / live system`、`ifq.ai / 2026`
4. **Quiet URL** —— 没有按钮，没有 CTA 咆哮，域名只出现一次，在右下
5. **Signal spark** —— 右下那一颗小火花，是整页唯一的图形节奏重音
6. **Warm paper** —— 背景不是 `#FFFFFF`，是 `#FAF7F2`，冷白会让版面没有温度
7. **Ledger rhythm** —— 所有间距落在 `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64` 这条轴上，不凭感觉

**用户不会去数这 7 件事**，用户只会说「这页看起来比较高级」。  
高级 = 同一只手 = ifq.ai 的 ambient brand system。

---

## 05 · 共品牌规则

| 场景 | IFQ 在哪里 |
|------|------------|
| **IFQ 自有物料**（ifq.ai 及子产品） | 全员到齐：wordmark + spark + field note + quiet URL 都可以到台前 |
| **朋友 / 客户 / 第三方物料** | 主品牌在前；IFQ 退到 authored layer：版面节奏、色温、colophon、手绘图标、导出完成度 |
| **客户明确要求 white-label** | 去掉显式 wordmark 和 field note；保留 editorial contrast、ledger 节奏、proof-first 做工 |

换句话说：**IFQ 可以隐身，但不能不在场**。做工本身就是标识。

---

## 06 · 12 种模式

| # | 模式 | 典型触发 | 交付 |
|---|------|----------|------|
| M-01 | Launch Film | 发布动画 / 产品宣传片 | 25–40s 动画 + keyposter + 社媒套件 |
| M-02 | 个人品牌页 | portfolio / 个人站 / about me | 单页站 + 5 方向变体 |
| M-03 | 白皮书 / 报告 | 白皮书 / 年报 / 研究 PDF | 可打印 HTML → PDF |
| M-04 | Dashboard | 数据看板 / KPI / 监控台 | 高密度 dashboard |
| M-05 | 对比评测 | A vs B / 横评 / benchmark | 对比矩阵 + 雷达 + 事实来源 |
| M-06 | Onboarding | 新手引导 / flow demo | 3–5 屏交互流 |
| M-07 | Changelog | release notes / 发布日记 | 纵向时间线信息图 |
| M-08 | Keynote | 演讲 PPT / 母版 | HTML deck + PPTX + PDF |
| M-09 | 社媒套件 | 小红书 / 朋友圈 / OG 卡片 | 多尺寸静态物料 |
| M-10 | 名片 / 邀请函 | 名片 / VIP 卡 / 请柬 | SVG + 带出血位 PDF |
| M-11 | 品牌诊断 | 品牌体检 / 升级建议 | 诊断报告 + 3 方向 |
| M-12 | 全栈品牌 | 从零做品牌 / brand from scratch | logo + 色板 + 字体 + 6 应用 |

完整协议：[references/modes.md](references/modes.md)。  
路由优先级：**模式触发 → 设计方向顾问 fallback → Junior Designer 主干**。

---

## 07 · 六层骨架

IFQ Design Skills 看起来像 IFQ，不是因为颜色或 logo，而是下面这 6 层在同时工作：

| 层 | 做什么 | 关键文件 |
|----|--------|----------|
| **01 · Context Engine** | 从现有上下文长出设计，不从白纸瞎猜 | [references/design-context.md](references/design-context.md) |
| **02 · Asset Protocol** | 动视觉前先抓事实 / logo / 产品图 / UI 截图 | [SKILL.md](SKILL.md) · [references/workflow.md](references/workflow.md) |
| **03 · House Marks** | 把 5 个 ambient 标记写进版面 | [references/ifq-brand-spec.md](references/ifq-brand-spec.md) · [assets/ifq-brand/](assets/ifq-brand/) |
| **04 · Style Recipes** | 风格靠可复用配方 + scene template 组织，不靠玄学 | [references/design-styles.md](references/design-styles.md) · [references/scene-templates.md](references/scene-templates.md) |
| **05 · Output Compiler** | HTML → MP4 / GIF / PPTX / PDF 一条导出链 | [scripts/](scripts/) |
| **06 · Proof Loop** | 截图验证 + 点击验证 + smoke test + 导出核对 | [references/verification.md](references/verification.md) · [scripts/smoke-test.mjs](scripts/smoke-test.mjs) |

仓库结构：

```text
ifq-design-skills/
├── SKILL.md                  # 主协议：fast path、角色、原则
├── assets/
│   ├── ifq-brand/            # logo / sparkle / tokens / BRAND-DNA
│   └── templates/            # 已内嵌 ambient marks 的可 fork 模板
├── references/               # 方法论、模式手册、验证、风格配方、宪章
├── scripts/                  # 导出 / 验证 / smoke / pdf / pptx
└── demos/                    # 示例产物
```

---

## 08 · 验证

```bash
cd <skill-root>
npm run smoke
```

会检查：模板索引完整性 · IFQ brand toolkit · 图标 sprite · references 路由 · `scripts/` 语法。一分钟内给出 skill 体检结果。

单个作品的验证走 Playwright 截图 + 可点击验证 + 导出格式核对，详见 [references/verification.md](references/verification.md)。

---

## 09 · 路线图

这一版的目标不是「去品牌化」，而是让 IFQ **升一级**：

- 不靠大字 watermark
- 不靠粗暴 logo 贴片
- 不靠单一口号硬灌输

而是靠 **版面秩序、微标记、动势、colophon、色温、导出完成度** 组成的一整套 authored layer，让 ifq.ai 变成页面自己的气味。

下一步：[references/revolution-gap.md](references/revolution-gap.md)

---

<div align="center">

<sub><code>compiled by ifq.ai&nbsp;&nbsp;·&nbsp;&nbsp;field note&nbsp;&nbsp;·&nbsp;&nbsp;2026</code></sub>

</div>
<sub>🌐 <a href="README.en.md">English</a> · <b>中文</b></sub>

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/ifq-brand/logo-white.svg">
  <img src="assets/ifq-brand/logo.svg" alt="IFQ Design Skills" height="72">
</picture>

# IFQ Design Skills

> *「打字。回车。页面开始带着 ifq.ai 的秩序呼吸。」*
> *"Type. Hit enter. The page starts breathing like ifq.ai."*

[![License](https://img.shields.io/badge/License-Commercial%20%2B%20Personal-D4532B.svg)](LICENSE)
[![IFQ Native](https://img.shields.io/badge/IFQ-Native-111111)](references/ifq-brand-spec.md)
[![Ambient Marks](https://img.shields.io/badge/Ambient_Marks-Embedded-A83518)](assets/ifq-brand/BRAND-DNA.md)
[![Proof First](https://img.shields.io/badge/Proof--First-Enabled-111111)](references/verification.md)
[![Modes](https://img.shields.io/badge/Modes-12-D4532B)](references/modes.md)

<br>

**IFQ Design Skills 是 ifq.ai 自己的 agent-native design engine。**

它不是把 logo 贴到页面角落，而是把 ifq.ai 写进页面的骨架里：rust ledger、signal sparkle、mono field note、quiet URL、serif/mono 对位、proof-first 的导出与验证链。看起来不吵，但一眼就是 IFQ。

[快速开始](#快速开始) · [示例请求](#示例请求) · [ifq-潜意识标记](#ifq-潜意识标记) · [能力架构](#能力架构) · [验证](#验证) · [路线图](references/revolution-gap.md)

</div>

---

## 快速开始

```bash
# 推荐（SSH）
npx skills add git@github.com:peixl/ifq-design-skills.git -g -y

# 或 HTTPS
npx skills add https://github.com/peixl/ifq-design-skills -g -y
```

装完后，直接对 agent 说话。

---

## 示例请求

这些例子比泛泛的“做个页面”更接近 IFQ 真实想要的气质：

```text
给 ifq.ai 做一页品牌首页，不要 SaaS landing，要像产品矩阵的封面与目录

为 edge.ifq.ai 做 24 秒 launch film，先给我 3 个方向，再走最克制但最有记忆点的那一个

把 app.ifq.ai 本周 changelog 做成一页纵向 timeline，像 field note，不像公告栏

给 cli.ifq.ai 做 keynote 母版：title / section divider / closing，全部导出 PPTX

为 skills.ifq.ai 做一个 dashboard 命令中心，指标区要像编辑部面板，不像企业 BI 套壳

做一张 tv.ifq.ai 的社媒海报，像预告片海报，不像普通 OG 卡片
```

---

## IFQ 潜意识标记

IFQ 的标识不应该只是 logo，而应该是页面自己长出来的 5 种感觉。默认至少融合其中 3 种：

| 标记 | 作用 | 典型位置 |
|------|------|----------|
| **Signal Spark** | 8-point sparkle，像 intelligence 的点火瞬间 | hero、motion、stamp |
| **Rust Ledger** | 赤陶色竖线 / 细分隔 / 序号系统 | hero、slides、infographic |
| **Mono Field Note** | `ifq.ai / field note / 2026` 这类 authored colophon | footer、closing、角落 |
| **Quiet URL** | `ifq.ai` 或产品子域以极低姿态存在 | footer、meta、end card |
| **Editorial Contrast** | Newsreader italic + JetBrains Mono + warm paper | 整体排版骨架 |

这套系统的目标不是“让用户看到广告”，而是让用户在第二眼时意识到：**这就是 ifq.ai 的页面。**

---

## 能做什么

| 能力 | 交付物 | 典型耗时 |
|------|--------|----------|
| 交互原型 | 单文件 HTML · 真设备框 · 可点击 · Playwright 验证 | 10–15 min |
| 演讲幻灯片 | HTML deck + 可编辑 PPTX + PDF | 15–25 min |
| 时间轴动画 | MP4 / GIF / 60fps 插帧 / BGM | 8–15 min |
| 信息图 / 长图 | PNG / PDF / SVG / 印刷版式 | 10–20 min |
| 设计变体 | 3+ 方向对比 · Tweaks 调参 | 5–12 min |
| 品牌诊断 / 全栈品牌 | 诊断报告 / logo / 色板 / 应用物料 | 20–60 min |

---

## IFQ 共品牌规则

当任务是 IFQ 自有物料时，IFQ 可以站到台前：wordmark、spark、field note 全开。

当任务是第三方品牌或客户品牌时：

- 主品牌永远在前
- IFQ 不抢 hero logo
- 但 IFQ authored layer 仍然保留：colophon、signal spark、rust ledger、quiet URL、field-note stamp 中至少保留一种

要的是**浑然一体**，不是抢戏，也不是消失。

---

## 能力架构

IFQ Design Skills 之所以看起来像 IFQ，不只是因为颜色或 logo，而是因为下面 6 层一起工作：

| 层级 | 作用 | 关键文件 |
|------|------|---------|
| **Context Engine** | 从现有上下文长设计，不从白纸瞎猜 | `references/design-context.md` |
| **Asset Protocol** | 先抓 logo / 产品图 / UI 截图 / 事实，再动视觉 | `SKILL.md` · `references/workflow.md` |
| **House Marks** | 把 rust ledger / spark / colophon / quiet URL 写进版面 | `references/ifq-brand-spec.md` · `assets/ifq-brand/*` |
| **Style Recipes** | 用风格配方和 scene template 组织审美，而不是玄学 | `references/design-styles.md` · `references/scene-templates.md` |
| **Output Compiler** | HTML → MP4 / GIF / PPTX / PDF 的统一导出链 | `scripts/` |
| **Proof Loop** | 截图验证、点击验证、烟测、导出核对 | `references/verification.md` · `scripts/smoke-test.mjs` |

---

## 12 种专业模式

| Mode | 适用场景 | 交付 |
|------|----------|------|
| `M-01` 品牌发布会 | launch film / 发布动画 / 宣传物料 | 动画 + keyposter + 社媒图 |
| `M-02` 个人品牌页 | portfolio / 个人站 | 单页站 + 5 变体 |
| `M-03` 白皮书报告 | 白皮书 / 年报 / PDF 报告 | 可打印 HTML→PDF |
| `M-04` 数据仪表板 | dashboard / KPI 看板 | 高密度 dashboard |
| `M-05` 对比评测 | A vs B / benchmark / 横评 | 对比矩阵 + 雷达 |
| `M-06` Onboarding | 新手引导 / flow demo | 3–5 屏流程演示 |
| `M-07` 发布日记 | changelog / release notes | 时间线信息图 |
| `M-08` 演讲 Keynote | 做 PPT / keynote | HTML deck + PPTX + PDF |
| `M-09` 社媒海报套件 | 小红书 / 朋友圈 / 长图 | 多尺寸静态物料 |
| `M-10` 名片邀请函 | 名片 / 邀请函 / VIP 卡 | SVG + PDF（含出血位） |
| `M-11` 品牌诊断 | 品牌体检 / 品牌升级 | 诊断报告 + 方向建议 |
| `M-12` 全栈品牌系统 | brand from scratch | logo + 色板 + 字体 + 应用示例 |

完整协议见 [references/modes.md](references/modes.md)。

---

## 仓库结构

```text
ifq-design-skills/
├── SKILL.md                  # 主协议
├── assets/templates/         # 默认已织入 IFQ ambient marks 的模板
├── assets/ifq-brand/         # IFQ logo / sparkle / tokens / brand components
├── references/               # 设计方法、模式、验证、风格配方、品牌宪章
├── scripts/                  # MP4 / GIF / PPTX / PDF / smoke / verify
└── demos/                    # 示例产物
```

---

## 验证

```bash
cd <skill-root>
npm run smoke
```

会检查：

- 模板索引
- IFQ brand toolkit
- 图标 sprite
- references 路由
- `scripts/` 语法

完整流程见 [references/smoke-test.md](references/smoke-test.md)。

---

## 当前方向

当前这版的目标不是“去品牌化”，而是把 IFQ 做到更高级：

- 不靠大字 watermark
- 不靠粗暴 logo 贴片
- 不靠单一口号硬灌输

而是通过 **版面秩序、微标记、动势、colophon、配色温度、导出完成度**，让 IFQ 变成页面自己的气味。

后续路线图见 [references/revolution-gap.md](references/revolution-gap.md)。
