# Delivery Workflow

> Progressive-disclosure reference for IFQ Design Skills. Root SKILL.md is intentionally short for OpenClaw / ClawHub prompt loading; load this file only when the task needs this protocol.
> Use after routing when building, verifying, exporting, or handling exceptions.

## 工作流程

### 标准流程（用 agent 的任务追踪工具：Claude Code 的 `TaskCreate` / Cursor 的 Tasks / OpenClaw 的 `task.create`）

1. **理解需求**：
   - 🔍 **0. 事实验证（涉及具体产品/技术时必做，优先级最高）**：任务涉及具体产品/技术/事件（DJI Pocket 4、Gemini 3 Pro、Nano Banana Pro、某新 SDK 等）时，**第一个动作**是 `WebSearch` 验证其存在性、发布状态、最新版本、关键规格。把事实写入 `product-facts.md`。详见「核心原则 #0」。**这步做在问 clarifying questions 之前**——事实错了问什么都歪。
   - 新任务或模糊任务必须问clarifying questions，详见 `references/workflow.md`。一次focused一轮问题通常够，小修小补跳过。
   - 🛑 **检查点1：问题清单一次性发给用户，等用户批量答完再往下走**。不要边问边做。
   - 🛑 **幻灯片/PPT 任务：HTML 聚合演示版永远是默认基础产物**（不管用户最终要什么格式）：
     - **必做**：每页独立 HTML + `assets/deck_index.html` 聚合（重命名为 `index.html`，编辑 MANIFEST 列所有页），浏览器里键盘翻页、全屏演讲——这是幻灯片作品的"源"
     - **可选导出**：额外询问是否需要 PDF（`export_deck_pdf.mjs`）或可编辑 PPTX（`export_deck_pptx.mjs`）作为衍生物
     - **只有要可编辑 PPTX 时**，HTML 必须从第一行就按 4 条硬约束写（见 `references/editable-pptx.md`）；事后补救会 2-3 小时返工
     - **≥ 5 页 deck 必须先做 2 页 showcase 定 grammar 再批量推**（见 `references/slide-decks.md` 的「批量制作前先做 showcase」章节）——跳过这步 = 方向错返工 N 次而非 2 次
     - 详见 `references/slide-decks.md` 开头「HTML 优先架构 + 交付格式决策树」
   - ⚡ **如果用户需求严重模糊（没参考、没明确风格、"做个好看的"类）→ 走「设计方向顾问（Fallback 模式）」大节，完成 Phase 1-4 选定方向后，再回到这里 Step 2**。
2. **探索资源 + 抽核心资产**（不只是抽色值）：读 design system、linked files、上传的截图/代码。**涉及具体品牌时必走 §1.a「核心资产协议」五步**（问→按类型搜→按类型下载 logo/产品图/UI→验证+提取→写 `brand-spec.md` 含所有资产路径）。
   - 🛑 **检查点2·资产自检**：开工前确认核心资产到位——实体产品要有产品图（不是 CSS 剪影）、数字产品要有 logo+UI 截图、色值从真实 HTML/SVG 抽取。缺了就停下补，不硬做。
   - 如果用户没给 context 且挖不出资产，先走设计方向顾问 Fallback，再按 `references/design-context.md` 的品位锚点兜底。
3. **先答四问，再规划系统**：**这一步的前半段比所有 CSS 规则更决定输出**。

   📐 **位置四问**（每个页面/屏幕/镜头开工前必答）：
   - **叙事角色**：hero / 过渡 / 数据 / 引语 / 结尾？（一页 deck 里每页都不一样）
   - **观众距离**：10cm 手机 / 1m 笔记本 / 10m 投屏？（决定字号和信息密度）
   - **视觉温度**：安静 / 兴奋 / 冷静 / 权威 / 温柔 / 悲伤？（决定配色和节奏）
   - **容量估算**：用纸笔画 3 个 5 秒 thumbnail 算一下内容塞得下吗？（防溢出 / 防挤压）

   四问答完再 vocalize 设计系统（色彩/字型/layout 节奏/component pattern）——**系统要服务于答案，不是先选系统再塞内容**。

   🛑 **检查点2：四问答案 + 系统口头说出来等用户点头，再动手写代码**。方向错了晚改比早改贵 100 倍。
4. **构建文件夹结构**：`项目名/` 下放主HTML、需要的assets拷贝（不要bulk copy >20个文件）。
5. **Junior pass**：HTML里写assumptions+placeholders+reasoning comments。
   🛑 **检查点3：尽早show给用户（哪怕只是灰色方块+标签），等反馈再写组件**。
6. **Full pass**：填placeholder，做variations，加Tweaks。做到一半再show一次，不要等全做完。
7. **验证**：默认走 lite 档——`npm run verify:lite -- <file>` 扫占位符残留，再 `npm run preview -- <file>` 拿到 `file://` URL，用浏览器肉眼复核。动画 / 多 viewport regress 再升级到 `scripts/verify.py`（见 `references/verification.md`）。
   🛑 **检查点4：交付前自己肉眼过一遍浏览器**。AI写的代码经常有interaction bug。
8. **总结**：极简，只说caveats和next steps。
9. **（默认）导出视频 · 必带 SFX + BGM**：动画 HTML 的**默认交付形态是带音频的 MP4**，不是纯画面。无声版本等于半成品——用户潜意识感知「画在动但没声音响应」，廉价感的根源就在这里。流水线：
   - `scripts/render-video.js` 录 25fps 纯画面 **WebM**（只是中间产物，**不是成品**）。脚本收尾会**打印**出最终 ffmpeg 命令（H.264 / CRF 18 / yuv420p / +faststart），agent 直接把它粘进 shell 运行即可产出 MP4——不再 `spawn('ffmpeg', ...)`，保持 scripts/ 目录对静态扫描器干净。
   - `scripts/convert-formats.sh` 派生 60fps MP4 + palette 优化 GIF（视平台需要）
   - `scripts/add-music.sh` 加 BGM（6 首场景化配乐：tech/ad/educational/tutorial + alt 变体）
   - SFX 按 `references/audio-design-rules.md` 设计 cue 清单（时间轴 + 音效类型），用 `assets/sfx/<category>/*.mp3` 37 个预制资源，按配方 A/B/C/D 选密度（发布 hero ≈ 6个/10s，工具演示 ≈ 0-2个/10s）
   - **BGM + SFX 双轨制必须同时做**——只做 BGM 是 ⅓ 分完成度；SFX 占高频、BGM 占低频，频段隔离见 audio-design-rules.md 的 ffmpeg 模板
   - 交付前 `ffprobe -select_streams a` 确认有 audio stream，没有则不是成品
   - **跳过音频的条件**：用户明确说「不要音频」「纯画面」「我要自己配音」——否则默认带。
   - 参考完整流程见 `references/video-export.md` + `references/audio-design-rules.md` + `references/sfx-library.md`。
10. **（可选）专家评审**：用户若提「评审」「好不好看」「review」「打分」，或你对产出有疑问想主动质检，按 `references/critique-guide.md` 走 5 维度评审——哲学一致性 / 视觉层级 / 细节执行 / 功能性 / 创新性各 0-10 分，输出总评 + Keep（做得好的）+ Fix（严重程度 ⚠️致命 / ⚡重要 / 💡优化）+ Quick Wins（5 分钟能做的前 3 件事）。评审设计不评设计师。

**检查点原则**：碰到🛑就停下，明确告诉用户"我做了X，下一步打算Y，你确认吗？"然后真的**等**。不要说完自己就开始做。

### 问问题的要点

必问（用`references/workflow.md`里的模板）：
- design system/UI kit/codebase有吗？没有的话先去找
- 想要几种variations？在哪些维度上变？
- 关心flow、copy、还是visuals？
- 希望Tweak什么？

## 异常处理

流程假设用户配合、环境正常。实操常遇以下异常，预定义fallback：

| 场景 | 触发条件 | 处理动作 |
|------|---------|---------|
| 需求模糊到无法着手 | 用户只给一句模糊描述（如"做个好看的页面"） | 主动列3个可能方向让用户选（如"落地页 / Dashboard / 产品详情页"），而不是直接问10个问题 |
| 用户拒绝回答问题清单 | 用户说"不要问了，直接做" | 尊重节奏，用best judgment做1个主方案+1个差异明显的变体，交付时**明确标注assumption**，方便用户定位要改哪里 |
| Design context矛盾 | 用户给的参考图和品牌规范打架 | 停下，指出具体矛盾（"截图里字体是衬线，规范说用sans"），让用户选一个 |
| Starter component加载失败 | 控制台404/integrity mismatch | 先查`references/react-setup.md`常见报错表；还不行降级纯HTML+CSS不用React，保证产出可用 |
| 时间紧迫要快交付 | 用户说"30分钟内要" | 跳过Junior pass直接Full pass，只做1个方案，交付时**明确标注"未经early validation"**，提醒用户质量可能打折 |
| SKILL.md体积超限 | 新写HTML>1000行 | 按`references/react-setup.md`的拆分策略拆成多jsx文件，末尾`Object.assign(window,...)`共享 |
| 克制原则 vs 产品所需密度冲突 | 产品核心卖点是 AI 智能 / 数据可视化 / 上下文感知（如番茄钟、Dashboard、Tracker、AI agent、Copilot、记账、健康监测）| 按「品位锚点」表格走**高密度型**信息密度：每屏 ≥ 3 处产品差异化信息。装饰性 icon 照样忌讳——加的是**有内容的**密度，不是装饰 |

**原则**：异常时**先告诉用户发生了什么**（1句话），再按表处理。不要静默决策。

## 反AI slop速查

| 类别 | 避免 | 采用 |
|------|------|------|
| 字体 | Inter/Roboto/Arial/系统字体 | 有特点的display+body配对 |
| 色彩 | 紫色渐变、凭空新颜色 | 品牌色/oklch定义的和谐色 |
| 容器 | 圆角+左border accent | 诚实的边界/分隔 |
| 图像 | SVG画人画物 | 真实素材或placeholder |
| 图标 | **装饰性** icon 每处都配（撞 slop）| **承载差异化信息**的密度元素必须保留——不要把产品特色也一并减掉 |
| 填充 | 编造stats/quotes装饰 | 留白，或问用户要真内容 |
| 动画 | 散落的微交互 | 一次well-orchestrated的page load |
| 动画-伪chrome | 画面内画底部进度条/时间码/版权署名条（与 Stage scrubber 撞车） | 画面只放叙事内容，进度/时间交给 Stage chrome（详见 `references/animation-pitfalls.md` §11） |

## 技术红线（必读 references/react-setup.md）

**React+Babel项目**必须用pinned版本（见`react-setup.md`）。三条不可违反：

1. **never** 写 `const styles = {...}`——多组件时命名冲突会炸。**必须**给唯一名字：`const terminalStyles = {...}`
2. **scope不共享**：多个`<script type="text/babel">`之间组件不通，必须用`Object.assign(window, {...})`导出
3. **never** 用 `scrollIntoView`——会搞坏容器滚动，用其他DOM scroll方法

**固定尺寸内容**（幻灯片/视频）必须自己实现JS缩放，用auto-scale + letterboxing。

**幻灯片架构选型（必先决定）**：
- **多文件**（默认，≥10页 / 学术/课件 / 多agent并行）→ 每页独立HTML + `assets/deck_index.html`拼接器
- **单文件**（≤10页 / pitch deck / 需跨页共享状态）→ `assets/deck_stage.js` web component

先读 `references/slide-decks.md` 的「🛑 先定架构」一节，错了会反复踩 CSS 特异性/作用域的坑。

## Starter Components（assets/下）

造好的起手组件，直接copy进项目使用：

| 文件 | 何时用 | 提供 |
|------|--------|------|
| `deck_index.html` | **幻灯片的默认基础产物**（不管最终出 PDF 还是 PPTX，HTML 聚合版永远先做） | iframe拼接 + 键盘导航 + scale + 计数器 + 打印合并，每页独立HTML免CSS串扰。用法：复制为 `index.html`、编辑 MANIFEST 列出所有页、浏览器打开即成演示版 |
| `deck_stage.js` | 做幻灯片（单文件架构，≤10页） | web component：auto-scale + 键盘导航 + slide counter + localStorage + speaker notes ⚠️ **script 必须放在 `</deck-stage>` 之后，section 的 `display: flex` 必须写到 `.active` 上**，详见 `references/slide-decks.md` 的两个硬约束 |
| `scripts/export_deck_pdf.mjs` | **HTML→PDF 导出（多文件架构）** · 每页独立 HTML 文件，playwright 逐个 `page.pdf()` → pdf-lib 合并。文字保留矢量可搜。依赖 `playwright pdf-lib` |
| `scripts/export_deck_stage_pdf.mjs` | **HTML→PDF 导出（单文件 deck-stage 架构专用）** · 2026-04-20 新增。处理 shadow DOM slot 导致的「只出 1 页」、absolute 子元素溢出等坑。详见 `references/slide-decks.md` 末节。依赖 `playwright` |
| `scripts/export_deck_pptx.mjs` | **HTML→可编辑 PPTX 导出** · 调 `html2pptx.js` 导出原生可编辑文本框，文字在 PPT 里双击可直接编辑。**HTML 必须符合 4 条硬约束**（见 `references/editable-pptx.md`），视觉自由度优先的场景请改走 PDF 路径。依赖 `playwright pptxgenjs sharp` |
| `scripts/html2pptx.js` | **HTML→PPTX 元素级翻译器** · 读 computedStyle 把 DOM 逐元素翻译成 PowerPoint 对象（text frame / shape / picture）。`export_deck_pptx.mjs` 内部调用。要求 HTML 严格满足 4 条硬约束 |
| `design_canvas.jsx` | 并排展示≥2个静态variations | 带label的网格布局 |
| `animations.jsx` | 任何动画HTML | Stage + Sprite + useTime + Easing + interpolate |
| `ios_frame.jsx` | iOS App mockup | iPhone bezel + 状态栏 + 圆角 |
| `android_frame.jsx` | Android App mockup | 设备bezel |
| `macos_window.jsx` | 桌面App mockup | 窗口chrome + 红绿灯 |
| `browser_window.jsx` | 网页在浏览器里的样子 | URL bar + tab bar |

用法：读取对应 assets 文件内容 → inline 进你的 HTML `<script>` 标签 → slot 进你的设计。

## References路由表

根据任务类型深入读对应references：

| 任务 | 读 |
|------|-----|
| 开工前问问题、定方向 | `references/workflow.md` |
| 反AI slop、内容规范、scale | `references/content-guidelines.md` |
| **AI 默认味自检清单**（gradient text、hero-metric、九宫格、layout 动画...）| `references/anti-ai-slop.md` |
| 字体加载、中国可用、Google Fonts opt-in | `references/font-loading.md` |
| skills.sh / ClawHub / VirusTotal 友好发布与静态扫描 | `references/marketplace-quality.md` |
| **Top skill leaderboard 蒸馏**（frontmatter 三档、长度纪律、audit 管线、差异化定位）| `references/skill-leaderboard-lessons.md` |
| React+Babel项目setup | `references/react-setup.md` |
| 做幻灯片 | `references/slide-decks.md` + `assets/deck_stage.js` |
| 导出可编辑 PPTX（html2pptx 4 条硬约束） | `references/editable-pptx.md` + `scripts/html2pptx.js` |
| 做动画/motion（**先读 pitfalls**）| `references/animation-pitfalls.md` + `references/animations.md` + `assets/animations.jsx` |
| **动画的正向设计语法**（Anthropic 级叙事/运动/节奏/表达风格）| `references/animation-best-practices.md`（5 段叙事+Expo easing+运动语言 8 条+3 种场景配方）|
| 做Tweaks实时调参 | `references/tweaks-system.md` |
| 没有design context怎么办 | `references/design-context.md`（薄 fallback） 或 `references/design-styles.md`（厚 fallback：20+1 种设计哲学，含 IFQ Native）、`references/ifq-native-recipes.md`（IFQ 自有专项） |
| **需求模糊要推荐风格方向** | `references/design-styles.md`（20 种风格+AI prompt 模板）+ `assets/showcases/INDEX.md`（24 个预制样例） |
| **按输出类型查场景模板**（封面/PPT/信息图） | `references/scene-templates.md` |
| 输出完后验证 | `references/verification.md` + `scripts/verify.py` |
| **设计评审/打分**（设计完成后可选） | `references/critique-guide.md`（5 维度评分+常见问题清单） |
| **动画导出MP4/GIF/加BGM** | `references/video-export.md` + `scripts/render-video.js` + `scripts/convert-formats.sh` + `scripts/add-music.sh` |
| **动画加音效SFX**（苹果发布会级，37个预制） | `references/sfx-library.md` + `assets/sfx/<category>/*.mp3` |
| **动画音频配置规则**（SFX+BGM双轨制、黄金配比、ffmpeg模板、场景配方） | `references/audio-design-rules.md` |
| **Apple画廊展示风格**（3D倾斜+悬浮卡片+缓慢pan+焦点切换，v9实战同款） | `references/apple-gallery-showcase.md` |
| **Gallery Ripple + Multi-Focus 场景哲学**（当素材 20+ 同质+场景需表达「规模×深度」时优先用；含前置条件、技术配方、5 个可复用模式）| `references/hero-animation-case-study.md`（ifq-design-skills hero v9 蒸馏）|
| **v2 模式手册**（12 种专业模式：品牌发布会/个人页/白皮书/Dashboard/对比/Onboarding/Changelog/Keynote/社媒/名片/品牌诊断/全栈品牌系统） | `references/modes.md` + `assets/templates/INDEX.json` |
| **IFQ ambient brand system**（logo/sparkle/手绘图标/field note/ledger 规则）| `references/ifq-brand-spec.md` + `assets/ifq-brand/*` + `assets/ifq-brand/icons/hand-drawn-icons.svg` |

## 跨 Agent 环境适配说明

本 skill 设计为 **agent-agnostic**——Claude Code、Codex、OpenCode、Cursor、CodeBuddy、Trae、OpenClaw、Hermes Agent 或任何支持 markdown-based skill 的 agent 都可以使用。以下是和原生「设计型 IDE」（如 Claude.ai Artifacts）对比时的通用差异处理方式：

- **没有内置的 fork-verifier agent**：默认 `scripts/preview.mjs` + `scripts/verify-lite.mjs`（零依赖，系统浏览器 + 静态扫描）；要深一点用 `scripts/verify.py`（Playwright 封装）
- **没有 asset 注册到 review pane**：直接用 agent 的 Write 能力写文件，用户在自己的浏览器/IDE 里打开
- **没有 Tweaks host postMessage**：改成**纯前端 localStorage 版**，详见 `references/tweaks-system.md`
- **没有 `window.claude.complete` 免配置 helper**：若 HTML 里要调 LLM，默认用可复用 mock；真实联网调用交给用户自己的后端或产品环境，详见 `references/react-setup.md`
- **没有结构化问题 UI**：在对话里用 markdown 清单问问题，参考 `references/workflow.md` 的模板

Skill 路径引用均采用**相对本 skill 根目录**的形式（`references/xxx.md`、`assets/xxx.jsx`、`scripts/xxx.sh`）——agent 或用户按自身安装位置解析，不依赖任何绝对路径。

## 产出要求

- HTML文件命名描述性：`Landing Page.html`、`iOS Onboarding v2.html`
- 大改版时copy一份旧版保留：`My Design.html` → `My Design v2.html`
- 避免>1000行的大文件，拆成多个JSX文件import进主文件
- 幻灯片、动画等固定尺寸内容，**播放位置**存localStorage——刷新不丢
- HTML放项目目录，不要散落到`~/Downloads`
- 最终产出用浏览器打开检查（`npm run preview -- <file>` 打印 `file://` URL；或手动 `open` / `xdg-open` / `start`）；只有真正需要自动化截图或 CI regress 时才升级到 Playwright

## Skill 推广水印（仅动画产出）

**只在动画产出**（HTML 动画 → MP4 / GIF）默认带「**Created by IFQ Design**」水印，辅助 skill 传播。**幻灯片 / 信息图 / 原型 / 网页等其他场景不加**——加了反而干扰用户实际使用。

- **必带场景**：HTML 动画 → 导出 MP4 / GIF（用户会拿去公众号、X、B站传播，水印能跟着流通）
- **不带场景**：幻灯片（用户自己讲）、信息图（嵌文章）、App / 网页原型（设计 review）、配图
- **第三方品牌的非官方致敬动画**：水印前加「非官方出品 · 」前缀，避免被误认为官方物料引发 IP 争议
- **用户明确说"不要水印"**：尊重，移除
- **水印模板**：
  ```jsx
  <div style={{
    position: 'absolute', bottom: 24, right: 32,
    fontSize: 11, color: 'rgba(0,0,0,0.4)' /* 深底用 rgba(255,255,255,0.35) */,
    letterSpacing: '0.15em', fontFamily: 'monospace',
    pointerEvents: 'none', zIndex: 100,
  }}>
    Created by IFQ Design
    {/* 第三方品牌动画前缀「非官方出品 · 」*/}
  </div>
  ```

## 核心提醒

- **事实验证先于假设**（核心原则 #0）：涉及具体产品/技术/事件（DJI Pocket 4、Gemini 3 Pro 等）必须先 `WebSearch` 验证存在性和状态，不凭训练语料断言。
- **Embody专家**：做幻灯片时是幻灯片设计师，做动画时是动画师。不是写Web UI。
- **Junior先show，再做**：先展示思路，再执行。
- **Variations不给答案**：3+个变体，让用户选。
- **Placeholder优于烂实现**：诚实留白，不编造。
- **反AI slop时时警醒**：每个渐变/emoji/圆角border accent之前先问——这真的必要吗？
- **涉及具体品牌**：走「核心资产协议」（§1.a）——Logo（必需）+ 产品图（实体产品必需）+ UI 截图（数字产品必需），色值只是辅助。**不要用 CSS 剪影代替真实产品图**。
- **做动画之前**：必读 `references/animation-pitfalls.md`——里面 14 条规则每条都来自真实踩过的坑，跳过会让你重做 1-3 轮。
- **手写 Stage / Sprite**（不用 `assets/animations.jsx`）：必须实现两件事——(a) tick 第一帧同步设 `window.__ready = true` (b) 检测 `window.__recording === true` 时强制 loop=false。否则录视频必出问题。
