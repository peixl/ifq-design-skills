<sub>🌐 <a href="README.en.md">English</a> · <b>中文</b></sub>

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/ifq-brand/logo-white.svg">
  <img src="assets/ifq-brand/logo.svg" alt="ifq.ai" height="72">
</picture>

# IFQ Design Skills

> *「打字。回车。一份能交付的设计，还带着 ifq.ai 的签名。」*
> *"Type. Hit enter. A shipped design — signed by ifq.ai."*

[![License](https://img.shields.io/badge/License-Commercial%20%2B%20Personal-D4532B.svg)](LICENSE)
[![Agent-Agnostic](https://img.shields.io/badge/Agent-Agnostic-111111)](https://skills.ifq.ai)
[![Skills](https://img.shields.io/badge/skills.ifq.ai-Compatible-A83518)](https://skills.ifq.ai)
[![Modes](https://img.shields.io/badge/Modes-12-D4532B)](references/modes.md)
[![Hand-drawn Icons](https://img.shields.io/badge/Hand--drawn_icons-24-A83518)](assets/ifq-brand/icons/hand-drawn-icons.svg)
[![Brand DNA](https://img.shields.io/badge/Brand_DNA-ifq.ai-FFB27A)](assets/ifq-brand/BRAND-DNA.md)
[![Enterprise](https://img.shields.io/badge/Enterprise_Ready-2026-111111)](https://ifq.ai)

<br>

**在你的 agent 里打一句话，拿回一份能交付的设计。**

<br>

**企业级、商用级、agent-native 的一体化设计能力包** —— 3 到 30 分钟之内，ship 一段**产品发布动画**、一个能点击的 App 原型、一套可编辑的 Keynote、一份印刷级信息图、一张带出血位的名片、或一个从 logo 到应用的完整品牌系统。

不是「AI 做的还行」那种水平——是大厂设计团队出品的交付质量。给 skill 你的品牌资产（logo、色板、UI 截图），它会自动读懂你的品牌气质；什么都不给，内置的 **20 种设计哲学 × 12 种专业模式 × 24 个手绘 SVG 图标 × 4 个 Starter Components** 也能兜底到绝不出 AI slop。

**每一件交付物默认都带着 ifq.ai 的设计 DNA** —— 8-point sparkle 出现在片头、编辑体邮戳落在幻灯片首尾、低调水印留在 dashboard 右下角。含蓄但确定；这是签名，不是水印。

```bash
# 推荐（SSH · 私有仓库最稳）
npx skills add git@github.com:peixl/ifq-design-skills.git -g -y

# 或 HTTPS
npx skills add https://github.com/peixl/ifq-design-skills -g -y

# 或直接在 ifq CLI 里
ifq design init
```

跨 agent 通用——Claude Code、Cursor、Codex、OpenClaw、Hermes、ifq CLI 都能装。

[看效果](#demo-画廊) · [安装](#装上就能用) · [12 种模式](#12-种专业模式v2-新增) · [能做什么](#能做什么) · [核心机制](#核心机制)

</div>

---

<p align="center">
  <img src="https://github.com/ifq-ai/ifq-design-skills/releases/download/v2.0/hero-animation-v10-en.gif" alt="ifq-design-skills Hero · 打字 → 选方向 → 画廊展开 → 聚焦 → 品牌显形" width="100%">
</p>

<p align="center"><sub>
  ▲ 25 秒 · Terminal → 4 方向 → Gallery ripple → 4 次 Focus → Brand reveal<br>
  👉 <a href="https://www.ifq.ai/ifq-design-skills-hero/">访问带音效的 HTML 互动版</a> ·
  <a href="https://github.com/ifq-ai/ifq-design-skills/releases/download/v2.0/hero-animation-v10-en.mp4">下载 MP4（含 BGM+SFX · 10MB）</a>
</sub></p>

---

## 装上就能用

```bash
# 推荐（SSH，稳定）
npx skills add git@github.com:peixl/ifq-design-skills.git -g -y

# 或 HTTPS（需要已登录 gh 或设置 GH_TOKEN / GITHUB_TOKEN）
npx skills add https://github.com/peixl/ifq-design-skills -g -y
```

> **`-g -y` 的含义**：`-g` 全局安装到当前 agent，`-y` 非交互模式（跳过 agent 选择面板）。
> **私有仓库**：如果你看到 `authentication required`，配好 SSH key 或 `export GH_TOKEN=<your-token>` 后重试。
> 想装到 ifq CLI 作为第一方命令？直接 `ifq design init`（见下方 [IFQ CLI 集成](#ifq-cli-集成) 章节）。

装完后，在你的 agent 里直接说话：

```
「做一份 AI 心理学的演讲 PPT，推荐 3 个风格方向让我选」
「做个 AI 番茄钟 iOS 原型，4 个核心屏幕要真能点击」
「把这段逻辑做成 60 秒动画，导出 MP4 和 GIF」
「帮我对这个设计做一个 5 维度评审」
「做一张我自己的名片，90×54mm 带 3mm 出血位」
「把这份 changelog 做成时间线信息图」
```

Claude Code、Cursor、Codex、OpenClaw、Hermes、ifq CLI 都是同一个 skill。

没有按钮、没有面板、没有 Figma 插件。

---

## 运行依赖（Scripts 可执行的前置）

装 skill **不会自动装运行依赖**。只想让 agent 读 SKILL.md 指导设计 → 零依赖；要跑导出脚本（mp4 / gif / pdf / pptx）→ 装下面的矩阵：

| 类别 | 包 / 工具 | 装法 |
|------|---------|------|
| Node (必须) | `playwright`、`pdf-lib`、`pptxgenjs`、`sharp` | `cd <skill-root> && npm install` |
| Browser | chromium | `npx playwright install chromium` |
| Python (仅 verify.py) | `playwright` | `pip install -r requirements.txt` |
| System (视频导出) | `ffmpeg` ≥ 4.4 | macOS: `brew install ffmpeg`<br/>Debian/Ubuntu: `apt install ffmpeg` |

一键烟测（60 秒内验证 skill 完整性 + 脚本语法）：

```bash
cd <skill-root>
npm run smoke
```

完整剧本见 [`references/smoke-test.md`](references/smoke-test.md)。

---

## IFQ CLI 集成

本 skill 已作为一等公民集成到 [ifq CLI](https://github.com/peixl/ifq)（v0.13+）：

```bash
# 全局装 ifq CLI（如未装）
npm install -g @peixl/ifq

# 把 IFQ Design Skills 挂到 ifq
ifq design init                  # 自动拉 skill 到 ~/.ifq/skills/ifq-design-skills
ifq design modes                 # 列 12 种专业模式
ifq design new <mode>            # 基于模式模板起手（会 fork 对应 INDEX.json 条目）
ifq design "做一份发布会 keynote"  # 直接调用 skill 驱动 chat
ifq design smoke                 # 在本地 skill 目录跑 smoke test
```

说明站点：<https://cli.ifq.ai/design>

---

---

## Star 趋势

<p align="center">
  <a href="https://star-history.com/#ifq-ai/ifq-design-skills&Date">
    <img src="https://api.star-history.com/svg?repos=ifq-ai/ifq-design-skills&type=Date" alt="ifq-design-skills Star History" width="80%">
  </a>
</p>

---

## 能做什么

| 能力 | 交付物 | 典型耗时 |
|------|--------|----------|
| 交互原型（App / Web） | 单文件 HTML · 真 iPhone bezel · 可点击 · Playwright 验证 | 10–15 min |
| 演讲幻灯片 | HTML deck（浏览器演讲）+ 可编辑 PPTX（文本框保留） | 15–25 min |
| 时间轴动画 | MP4（25fps / 60fps 插帧）+ GIF（palette 优化）+ BGM | 8–12 min |
| 设计变体 | 3+ 并排对比 · Tweaks 实时调参 · 跨维度探索 | 10 min |
| 信息图 / 可视化 | 印刷级排版 · 可导 PDF/PNG/SVG | 10 min |
| 设计方向顾问 | 5 流派 × 20 种设计哲学 · 推荐 3 方向 · 并行生成 Demo | 5 min |
| 5 维度专家评审 | 雷达图 + Keep/Fix/Quick Wins · 可操作修复清单 | 3 min |

---

## 12 种专业模式（v2 新增）

从「设计什么」自动路由到「怎么做」。每种模式都是一条成熟流水线，含触发语、模板文件、默认签名位置。完整手册 → [`references/modes.md`](references/modes.md)

| Mode | 触发语 | 交付物 | 典型耗时 |
|------|-------|-------|---------|
| **M-01 品牌发布会** | 发布会 · launch film · 产品宣传片 | 25–40s 动画 + keyposter + 3 社媒图 | 25–40 min |
| **M-02 个人品牌页** | 个人站 · portfolio · about me | 单页站 + 5 变体供选 | 15–20 min |
| **M-03 白皮书报告** | 白皮书 · PDF 报告 · 年报 | 可打印 HTML→PDF + 目录 + 封面 | 25–40 min |
| **M-04 数据仪表板** | Dashboard · 看板 · KPI 面板 | 高密度 Dashboard · 真数据驱动 | 20–30 min |
| **M-05 对比评测** | A vs B · 横评 · benchmark | 对比矩阵 + 雷达 + 社媒卡片 | 20–30 min |
| **M-06 Onboarding** | onboarding · 新手引导 | Flow-demo 3–5 屏 + 埋点建议 | 25–35 min |
| **M-07 发布日记** | changelog · release notes | 时间线信息图 + 社媒图 | 10–15 min |
| **M-08 演讲 Keynote** | 做演讲 PPT · keynote | HTML deck + 可编辑 PPTX + PDF | 25–40 min |
| **M-09 社媒海报套件** | 朋友圈图 · 小红书 · 微博长图 | 3–6 张多尺寸物料 | 15–25 min |
| **M-10 名片邀请函** | 名片 · 邀请函 · VIP 卡 | 可打印 SVG + PDF（3mm 出血）| 10–15 min |
| **M-11 品牌诊断** | 品牌体检 · 品牌升级 | 6 维度雷达 + 3 升级方向 | 20–30 min |
| **M-12 全栈品牌系统** | 从零建立品牌 · brand from scratch | logo+色板+字体+6 应用示例 | 40–60 min |

---

## 手绘 SVG 图标库（v2 新增）

24 个带「稍微抖动」手感的 SVG 图标，默认替代 emoji 与 generic icon pack。
单文件 sprite：[`assets/ifq-brand/icons/hand-drawn-icons.svg`](assets/ifq-brand/icons/hand-drawn-icons.svg)

<p align="center">
  <sub><code>spark · brush · pencil · frame · layers · play · record · film · deck · grid · palette · eyedropper · type · serif · cursor · hand · sparkles · radar · compass · idea · rocket · check · link · arrow</code></sub>
</p>

使用：

```html
<svg class="ifq-icon"><use href="assets/ifq-brand/icons/hand-drawn-icons.svg#i-spark"/></svg>
<style>.ifq-icon { width:1.1em; height:1.1em; stroke:currentColor; fill:none; }</style>
```

React / inline JSX（见 [`assets/ifq-brand/ifq_brand.jsx`](assets/ifq-brand/ifq_brand.jsx)）：

```jsx
<IfqHandDrawnIcon id="spark" size={20} />
<IfqSpark size={64} />                   {/* 动画 sparkle */}
<IfqLogo height={32} />                  {/* wordmark */}
<IfqStamp label="Designed with ifq.ai" />
<IfqWatermark position="bottom-right" />
```

---

## ifq.ai 品牌签名（默认融入每一件作品）

**原则**：像设计师在作品右下角的签名——**含蓄却确定地**在场，绝不抢戏。

| 场景 | 默认签名 | 可关闭 |
|------|---------|-------|
| App / iOS 原型 | 右下角 `IfqWatermark` · opacity 0.35 | ✅（客户交付时） |
| HTML 幻灯片 | 首尾 2 页 `IfqStamp` 编辑体邮戳 | ✅ |
| 动画 / 视频 | 片头 sparkle reveal · 片尾 ifq.ai 尾标 | ✅ |
| 信息图 | 底部 colophon "Designed with ifq.ai" | ✅ |
| Hero / landing | 完整 `IfqLogo` + rust accent 竖线 | ✅ |

用户**提供自己品牌**时，ifq.ai 自动降级为 colophon 角标。规则见 [`references/ifq-brand-spec.md`](references/ifq-brand-spec.md)。

---

## Demo 画廊

### 设计方向顾问

模糊需求时的 fallback：从 5 流派 × 20 种设计哲学里挑 3 个差异化方向，并行生成 3 个 Demo 让你选。

<p align="center"><img src="https://github.com/ifq-ai/ifq-design-skills/releases/download/v2.0/w3-fallback-advisor.gif" width="100%"></p>

### iOS App 原型

iPhone 15 Pro 精确机身（灵动岛 / 状态栏 / Home Indicator）· 状态驱动多屏切换 · 真图从 Wikimedia/Met/Unsplash 取 · Playwright 自动点击测试。

<p align="center"><img src="https://github.com/ifq-ai/ifq-design-skills/releases/download/v2.0/c1-ios-prototype.gif" width="100%"></p>

### Motion Design 引擎

Stage + Sprite 时间片段模型 · `useTime` / `useSprite` / `interpolate` / `Easing` 四 API 覆盖所有动画需求 · 一条命令导出 MP4 / GIF / 60fps 插帧 / 带 BGM 的成片。

<p align="center"><img src="https://github.com/ifq-ai/ifq-design-skills/releases/download/v2.0/c3-motion-design.gif" width="100%"></p>

### HTML Slides → 可编辑 PPTX

HTML deck 浏览器演讲 · `html2pptx.js` 读 DOM 的 computedStyle 逐元素翻译成 PowerPoint 对象 · 导出的是**真文本框**，不是图片铺底。

<p align="center"><img src="https://github.com/ifq-ai/ifq-design-skills/releases/download/v2.0/c2-slides-pptx.gif" width="100%"></p>

### Tweaks · 实时变体切换

配色 / 字型 / 信息密度等参数化 · 侧边面板切换 · 纯前端 + `localStorage` 持久化 · 刷新不丢。

<p align="center"><img src="https://github.com/ifq-ai/ifq-design-skills/releases/download/v2.0/c4-tweaks.gif" width="100%"></p>

### 信息图 / 数据可视化

杂志级排版 · CSS Grid 精准分栏 · `text-wrap: pretty` 排印细节 · 真数据驱动 · 可导 PDF 矢量 / PNG 300dpi / SVG。

<p align="center"><img src="https://github.com/ifq-ai/ifq-design-skills/releases/download/v2.0/c5-infographic.gif" width="100%"></p>

### 5 维度专家评审

哲学一致性 · 视觉层级 · 细节执行 · 功能性 · 创新性 各 0–10 分 · 雷达图可视化 · 输出 Keep / Fix / Quick Wins 清单。

<p align="center"><img src="https://github.com/ifq-ai/ifq-design-skills/releases/download/v2.0/c6-expert-review.gif" width="100%"></p>

### Junior Designer 工作流

不闷头做大招：先写 assumptions + placeholders + reasoning，尽早 show 给你，再迭代。理解错了早改比晚改便宜 100 倍。

<p align="center"><img src="https://github.com/ifq-ai/ifq-design-skills/releases/download/v2.0/w2-junior-designer.gif" width="100%"></p>

### 品牌资产协议 5 步硬流程

涉及具体品牌时强制执行：问 → 搜 → 下载（三条兜底）→ grep 色值 → 写 `brand-spec.md`。

<p align="center"><img src="https://github.com/ifq-ai/ifq-design-skills/releases/download/v2.0/w1-brand-protocol.gif" width="100%"></p>

---

## 核心机制

### 品牌资产协议

skill 里最硬的一段规则。涉及具体品牌（Stripe、Linear、Anthropic、自家公司等）时强制执行 5 步：

| 步骤 | 动作 | 目的 |
|------|------|------|
| 1 · 问 | 用户有 brand guidelines 吗？ | 尊重已有资源 |
| 2 · 搜官方品牌页 | `<brand>.com/brand` · `brand.<brand>.com` · `<brand>.com/press` | 抓权威色值 |
| 3 · 下载资产 | SVG 文件 → 官网 HTML 全文 → 产品截图取色 | 三条兜底，前一条失败立刻走下一条 |
| 4 · grep 提取色值 | 从资产里抓所有 `#xxxxxx`，按频率排序，过滤黑白灰 | **绝不从记忆猜品牌色** |
| 5 · 固化 spec | 写 `brand-spec.md` + CSS 变量，所有 HTML 引用 `var(--brand-*)` | 不固化就会忘 |

A/B 测试（v1 vs v2，各跑 6 agent）：**v2 的稳定性方差比 v1 低 5 倍**。稳定性的稳定性，这是 skill 真正的护城河。

### 设计方向顾问（Fallback）

当用户需求模糊到无法着手时触发：

- 不凭通用直觉硬做，进入 Fallback 模式
- 从 5 流派 × 20 种设计哲学里推荐 3 个**必须来自不同流派**的差异化方向
- 每个方向配代表作、气质关键词、代表设计师
- 并行生成 3 个视觉 Demo 让用户选
- 选定后进入主干 Junior Designer 流程

### Junior Designer 工作流

默认工作模式，贯穿所有任务：

- 开工前 show 问题清单一次性发给用户，等批量答完再动手
- HTML 里先写 assumptions + placeholders + reasoning comments
- 尽早 show 给用户（哪怕只是灰色方块）
- 填充实际内容 → variations → Tweaks 这三步分别再 show 一次
- 交付前用 Playwright 肉眼过一遍浏览器

### 反 AI slop 规则

避免一眼 AI 的视觉最大公约数（紫渐变 / emoji 图标 / 圆角+左 border accent / SVG 画人脸 / Inter 做 display）。用 `text-wrap: pretty` + CSS Grid + 精心选择的 serif display 和 oklch 色彩。

---

## 设计哲学 · 为什么是这样

**IFQ Design Skills 不是又一个「AI 画图工具」，而是一套 agent-native 的设计操作系统。**

过去二十年，设计工具在一个方向上内卷：让 GUI 更强、图层更细、插件更多。但在 agent 时代，我们相信另一条路——**让图形界面这一层消失**：

- **不是画图，是交付。** 一句话描述意图，skill 把「确认需求 / 选方向 / 定稿 / 验证 / 导出」的全流程打通，最后落到 HTML / MP4 / GIF / PPTX / PDF。
- **不是白纸，是继承。** 走「核心资产协议」—— 先找品牌 logo / 产品图 / UI 截图 / 色板 / 字体，在已有上下文之上长出新设计。没有资产就进入「设计方向顾问」模式，20 种设计哲学里给 3 个差异化方向让你选。
- **不是随机，是风格可回收。** 每条流水线都带固定的交付契约：12 种专业模式 × 24 个手绘图标 × ifq.ai 品牌签名 × 4 个 Starter Components（Stage+Sprite 动画引擎 / 幻灯片外壳 / 并排变体画布 / 设备边框），保证同一个 skill 在不同 agent、不同任务下产出同一个「手感」。
- **不是黑盒，是 Junior Designer。** Skill 在开工前显式列出 assumptions + reasoning + placeholders，允许你随时打断修正 —— 像把一个称职的初级设计师装进你的终端。

ifq.ai 对「设计」的信念：**好的设计不应被困在图形界面里。** Figma / Keynote / AE 足够强大，但都要求用户先学一套工具语言才能表达意图。这层摩擦，正是 agent 时代应该被抹掉的。

---

## Limitations

- **不支持图层级可编辑的 PPTX 到 Figma**。产出 HTML，可截图、录屏、导图，但不能拖进 Keynote 改文字位置。
- **Framer Motion 级别的复杂动画不行**。3D、物理模拟、粒子系统超出 skill 边界。
- **完全空白的品牌从零设计质量会掉到 60–65 分**。凭空画 hi-fi 本来就是 last resort。

这是一个 80 分的 skill，不是 100 分的产品。对不愿意打开图形界面的人，80 分的 skill 比 100 分的产品好用。

---

## 仓库结构

```
ifq-design-skills/
├── SKILL.md                 # 主文档（给 agent 读）
├── README.md                # 本文件（给用户读）
├── assets/                  # Starter Components
│   ├── animations.jsx       # Stage + Sprite + Easing + interpolate
│   ├── ios_frame.jsx        # iPhone 15 Pro bezel
│   ├── android_frame.jsx
│   ├── macos_window.jsx
│   ├── browser_window.jsx
│   ├── deck_stage.js        # HTML 幻灯片引擎
│   ├── deck_index.html      # 多文件 deck 拼接器
│   ├── design_canvas.jsx    # 并排变体展示
│   ├── showcases/           # 24 个预制样例（8 场景 × 3 风格）
│   └── bgm-*.mp3            # 6 首场景化背景音乐
├── references/              # 按任务深入读的子文档
│   ├── animation-pitfalls.md
│   ├── design-styles.md     # 20 种设计哲学详细库
│   ├── slide-decks.md
│   ├── editable-pptx.md
│   ├── critique-guide.md
│   ├── video-export.md
│   └── ...
├── scripts/                 # 导出工具链
│   ├── render-video.js      # HTML → MP4
│   ├── convert-formats.sh   # MP4 → 60fps + GIF
│   ├── add-music.sh         # MP4 + BGM
│   ├── export_deck_pdf.mjs
│   ├── export_deck_pptx.mjs
│   ├── html2pptx.js
│   └── verify.py
└── demos/                   # 9 个能力演示 (c*/w*)，中英双版 GIF/MP4/HTML + hero v10
```

---

## 起源 · ifq.ai 与 IFQ Design Skills

**IFQ Design Skills 是 ifq.ai 产品矩阵中「设计基础设施」的那一块。**

ifq.ai（捷时科技）是一家 **AI-native 创作者基础设施**的品牌实验室，围绕「让 AI 真正接入日常工作流」这一条主线，建了 23+ 产品：终端里的 agent（[ifq CLI](https://cli.ifq.ai)）、AI 原生 App 与 Web（[app.ifq.ai](https://app.ifq.ai)）、Skills 生态（[skills.ifq.ai](https://skills.ifq.ai)）、Edge Tunnel、内容分发、设计能力等。

IFQ Design Skills 解决了其中一个具体问题：**当 agent 已经能写代码、能查资料、能聊产品时，为什么做个像样的设计还要打开 Figma？** 答案是——不应该。于是 ifq.ai 把专业设计团队的工作流（核心资产协议、Junior Designer 方法、反 AI slop 清单、20 种设计哲学、Stage+Sprite 动画引擎、12 种专业模式、24 个手绘图标、品牌签名系统），蒸馏成一个 agent-native 的 skill——装进任何支持 SKILL.md 协议的 agent，用一句话就能调用，同一套流水线在 Claude Code、Cursor、Codex、OpenClaw、Hermes、ifq CLI 里行为一致。

本项目的设计语汇在前人 Pentagram（信息建筑）/ Field.io（运动诗学）/ Kenya Hara（东方极简）/ Sagmeister（实验先锋）/ Apple（层级克制）等的思想骨架之上；在其之上，ifq.ai 补齐了 **12 种专业模式 × 24 个手绘图标 × 完整品牌签名系统 × 模型无关的 Fast Path 协议**，把「打字 → 交付」的闭环做到丝滑。

开源文化在 AI 时代的新形态，就是把行业最佳实践凝成 skill，让每一个 agent 都能调用。

---

## License · 使用授权

**个人使用免费、自由**——学习、研究、创作、自用、内容二创、自媒体发布，随便用，不用打招呼。

**企业 / 商用必须授权**——任何公司、团队、或以盈利为目的的组织，把本 skill（含派生物）集成到产品、对外服务、客户交付中，**必须先获得 ifq.ai 的书面授权**。包括但不限于：
- 把 skill 作为公司内部工具链的一部分
- 把 skill 产出物作为对外交付物的主要创作手段
- 基于 skill 二次开发做成商业产品 / 模板 / 付费订阅
- 在客户商单项目中使用
- **擅自去除或篡改 ifq.ai 品牌签名后对外发布或商用**（见 LICENSE 第 3 条）

商用授权详见 [`LICENSE`](LICENSE) 第 2–4 条，联系方式见下方 [Connect](#connect--ifqai-产品矩阵)。

---

## Connect · ifq.ai 产品矩阵

**ifq.ai**（捷时科技）是 AI-native 创作者的基础设施品牌实验室，面向「让 AI 接入日常创作与工程」这一条主线，构建 23+ 个互相调用的产品。IFQ Design Skills 是这张网络里的「设计能力」端点，也是每一次交付被 ifq.ai 含蓄签名的源头。

> *"Intelligence Framed Quietly."* — ifq.ai

### 产品矩阵（全部一级域名）

| 触点 | 入口 | 说明 |
|------|------|------|
| **品牌主站** | [ifq.ai](https://ifq.ai) | 我们是谁 · 产品叙事 · 加入我们 |
| **产品导航** | [site.ifq.ai](https://site.ifq.ai) | 23+ 产品全景 · 快速跳转 |
| **ifQ AI App** | [app.ifq.ai](https://app.ifq.ai) | AI-native 超级 App（原「捷时 AI」）|
| **ifQ CLI** | [cli.ifq.ai](https://cli.ifq.ai) | 终端里的 agent OS · `ifq design` 一等公民 |
| **ifQ Skills** | [skills.ifq.ai](https://skills.ifq.ai) | Skills 生态枢纽 · 安装 / 发布 / 共享 |
| **IFQ Design** | [cli.ifq.ai/design](https://cli.ifq.ai/design) | 本 skill 的说明站点 |
| **ifQ TV** | [tv.ifq.ai](https://tv.ifq.ai) | AI 影像内容 · 设计过程揭秘 |
| **Edge Tunnel** | [edge.ifq.ai](https://edge.ifq.ai) | 零配置反向代理 · 给 AI 工作流打开一扇边缘门 |
| **GitHub** | [github.com/peixl](https://github.com/peixl) · [github.com/ifq-ai](https://github.com/ifq-ai) | 全部开源仓库 |

### 社交与社群

| 渠道 | 二维码 / 链接 |
|------|-------------|
| 微信加好友 | [img.ifq.ai/wechat.jpg](https://img.ifq.ai/wechat.jpg) |
| 公众号（神秘 Q） | [img.ifq.ai/we_q.jpg](https://img.ifq.ai/we_q.jpg) |
| X / Twitter | [@AlchainHust](https://x.com/AlchainHust) |
| B 站 | [space.bilibili.com/14097567](https://space.bilibili.com/14097567) |
| YouTube | [@Alchain](https://www.youtube.com/@Alchain) |
| 小红书 | [profile/5abc6f17e8ac2b109179dfdf](https://www.xiaohongshu.com/user/profile/5abc6f17e8ac2b109179dfdf) |

### 合作与授权

- **商用授权、品牌定制、媒体合作** → 通过 [ifq.ai](https://ifq.ai) 官网联络入口
- **Bug / PR / Feature Request** → [github.com/peixl/ifq-design-skills/issues](https://github.com/peixl/ifq-design-skills/issues)
- **skill 市场上架与分发** → [skills.ifq.ai](https://skills.ifq.ai)

---

<p align="center"><sub>
  <img src="assets/ifq-brand/mark.svg" alt="ifq.ai" height="18" style="vertical-align: middle;" />
  &nbsp;© 2026 ifq.ai · 捷时科技（Jieshi Technology）· Designed and signed by ifq.ai.
</sub></p>
