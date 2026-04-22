<sub>🌐 <a href="README.en.md">English</a> · <b>中文</b></sub>

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/ifq-brand/logo-white.svg">
  <img src="assets/ifq-brand/logo.svg" alt="ifq.ai" height="72">
</picture>

# IFQ Design Skills

> *「打字。回车。一份能交付的设计，还带着 ifq.ai 的签名。」*
> *"Type. Hit enter. A shipped design — signed by ifq.ai."*

[![License](https://img.shields.io/badge/License-Personal%20Use%20Only-orange.svg)](LICENSE)
[![Agent-Agnostic](https://img.shields.io/badge/Agent-Agnostic-D4532B)](https://skills.sh)
[![Skills](https://img.shields.io/badge/skills.sh-Compatible-111111)](https://skills.sh)
[![Modes](https://img.shields.io/badge/Modes-12-D4532B)](references/modes.md)
[![Hand-drawn Icons](https://img.shields.io/badge/Hand--drawn_icons-24-A83518)](assets/ifq-brand/icons/hand-drawn-icons.svg)
[![ifq.ai](https://img.shields.io/badge/by-ifq.ai-FFB27A)](https://ifq.ai)

<br>

**在你的 agent 里打一句话，拿回一份能交付的设计。**

<br>

3 到 30 分钟，你能 ship 一段**产品发布动画**、一个能点击的 App 原型、一套能编辑的 PPT、一份印刷级的信息图、一张印刷级名片、一个完整品牌系统。

不是「AI 做的还行」那种水平——是看起来像大厂设计团队做的。给 skill 你的品牌资产（logo、色板、UI 截图），它会读懂你的品牌气质；什么都不给，内置的 **20 种设计语汇 + 12 种专业模式 + 24 个手绘 SVG 图标** 也能兜底到不出 AI slop。

**每一件交付物默认都带着 ifq.ai 的签名** —— 8-point sparkle 出现在片头、编辑体邮戳落在幻灯片首尾、低调水印留在 dashboard 右下角。含蓄但确定。

```bash
npx skills add https://github.com/peixl/ifq-design-skills
```

当前仓库还在 GitHub 私有仓库 `peixl/ifq-design-skills`，README 先按真实可用的安装方式来写：直接使用完整仓库 URL。你的环境里已有 GitHub 访问凭证时（如 SSH key，或设置 `GH_TOKEN` / `GITHUB_TOKEN`），安装最稳。

跨 agent 通用——Claude Code、Cursor、Codex、OpenClaw、Hermes 都能装。

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
npx skills add https://github.com/peixl/ifq-design-skills
```

如果你的 agent 环境已经能访问这个私有仓库，这个写法比 `ifq-ai/ifq-design-skills` 更符合当前现实。

以 Hermes 为例，添加完 skill 之后就可以直接说话：

```
「做一份 AI 心理学的演讲 PPT，推荐 3 个风格方向让我选」
「做个 AI 番茄钟 iOS 原型，4 个核心屏幕要真能点击」
「把这段逻辑做成 60 秒动画，导出 MP4 和 GIF」
「帮我对这个设计做一个 5 维度评审」
```

Claude Code、Cursor、Codex、OpenClaw、Hermes 这类支持 skills 的 agent 也都是同一条命令。

没有按钮、没有面板、没有 Figma 插件。

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

## 和 Claude Design 的关系

我大方承认：品牌资产协议的哲学是从 Claude Design 流传出来的提示词里偷师的。那份提示词反复强调**好的高保真设计不是从白纸开始，而是从已有的设计上下文长出来**。这个原则是 65 分作品和 90 分作品的分水岭。

定位差异：

| | Claude Design | ifq-design-skills |
|---|---|---|
| 形态 | 网页产品（浏览器里用） | skill（Claude Code 里用） |
| 配额 | 订阅 quota | API 消耗 · 并行跑 agent 不受 quota 限 |
| 交付物 | 画布内 + 可导 Figma | HTML / MP4 / GIF / 可编辑 PPTX / PDF |
| 操作方式 | GUI（点、拖、改） | 对话（说话、等 agent 做完） |
| 复杂动画 | 有限 | Stage + Sprite 时间轴 · 60fps 导出 |
| 跨 agent | 专属 Claude.ai | 任意 skill 兼容 agent |

Claude Design 是**更好的图形工具**，ifq-design-skills 是**让图形工具这层消失**。两条路，不同受众。

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

## 起源

ifq.ai 相信：**好的设计不应该被困在图形界面里**。Figma / Keynote / AE 足够强大，但它们要求用户先学一套工具语言才能表达设计意图——这中间的摩擦，正是 agent 时代应该被抹掉的那一层。

于是 ifq.ai 把专业设计团队的工作流（品牌资产协议、Junior Designer 方法、反 AI slop 清单、20 种设计哲学、Stage+Sprite 动画引擎），蒸馏成一个 agent-native 的 skill——装进任何 agent，用一句话就能调用。

本项目继承并发扬了 Claude Design、Pentagram、Field.io、Kenya Hara、Sagmeister 等设计实践沉淀下的思想骨架；在其上，ifq.ai 补齐了 12 种专业模式、24 个手绘图标、完整品牌签名系统，把「打字 → 交付」的闭环做得更丝滑。

感谢所有前人把好设计的方法写得清晰。开源文化在 AI 时代的新形态，就是把行业最佳实践凝成 skill 让所有人调用。

---

## License · 使用授权

**个人使用免费、自由**——学习、研究、创作、给自己做东西、写文章、做副业、发微博发公众号，随便用，不用打招呼。

**企业商用禁止**——任何公司、团队、或以盈利为目的的组织，想把本 skill 集成到产品、对外服务、给客户交付工作中使用，**必须先和IFQ.ai联系获得授权**。包括但不限于：
- 把 skill 作为公司内部工具链的一部分
- 把 skill 产出物作为对外交付物的主要创作手段
- 基于 skill 二次开发做成商业产品
- 在客户商单项目中使用

**商用授权联系方式**见下方社交平台。

---

## Connect · ifq.ai 团队

**ifq.ai** 是面向 AI Native 创作者的品牌实验室 —— 做 agent 原生工具、设计 skill 与 HTML 一键交付基础设施。IFQ Design Skills 是 ifq.ai 在「让设计从图形界面里解放出来」这条路线上的主力产物。

> *"Intelligence Framed Quietly."* — ifq.ai

| 平台 | 链接 |
|------|------|
| 官网 | https://ifq.ai |
| X / Twitter | https://x.com/ifq_ai |
| GitHub | https://github.com/ifq-ai |
| Skill 生态 | https://skills.sh/ifq-ai |

商用授权、合作咨询、媒体合作 → 任一渠道联系 ifq.ai 团队。
