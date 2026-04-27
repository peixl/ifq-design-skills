# Anti-AI-slop · 让 IFQ 输出不像“AI 默认味”

蒸馏自当前 skills.sh leaderboard 上排名前列的 design skill：Anthropic `frontend-design`、Vercel `web-design-guidelines`、Anthropic `web-artifacts-builder`、`pbakaus/impeccable`。这些 skill 的共识是：AI 写出来的 UI 一眼能认出来，不是因为它“丑”，而是因为它**总是默认成同一套**。IFQ 输出必须先扫一遍这份清单，再交付。

## 一、绝对禁止（match-and-refuse）

如果即将写出下面任何一条，停下，换结构。

- **侧边色条 border-left/right > 1px** 当作 card / list / alert 的强调。换成完整描边、背景色块、序号或图标领头，或干脆不要。
- **Gradient text**（`background-clip: text` + 渐变背景）。装饰性、无意义。用单一实色 + 字重/字号制造层级。
- **默认 glassmorphism**：高斯模糊磨砂玻璃当成卡片样式。只有真有空间纵深时才用，不能当默认 UI 语言。
- **Hero-metric 模板**：超大数字 + 小标签 + 一排辅助 stats + 渐变。SaaS 套路，2018 年就用烂了。
- **完全相同尺寸的图标卡片九宫格**：图标 + 标题 + 一句话，复读三行。把节奏变得不规则，或者用其他构图。
- **Modal 第一反应**：先用就近 inline / 渐进式展开 / drawer / popover，把 modal 当最后手段。
- **purple gradient on white**：紫渐变白底，AI 默认的“高级感”已经成 cliché。
- **Inter / Roboto / Arial / 系统默认字体当 hero display**。它们只能做沉默的 fallback，不能是品牌嗓音。

## 二、字体策略（China-safe + 反 AI slop）

IFQ 的字体走 **two-track**：

1. **Quiet fallback**（`--ifq-font-sans`、`--ifq-font-mono`）：local-first，包含 `-apple-system` / `PingFang SC` / `Microsoft YaHei` / `SF Mono`。它们**只用在正文**，让中国 / 离线 / 企业内网都能流畅打开。它们不是品牌嗓音。
2. **Display voice**（`--ifq-font-display`、`--ifq-font-body`）：Newsreader、Noto Serif SC、Source Han Serif、Songti SC、JetBrains Mono。这些是 IFQ 的 editorial 嗓音，hero / kicker / colophon 必须用。

如果用户给了授权字体，把它接到 display 通道，不要塞到 sans 通道。如果用户明确要 webfont 且目标用户能稳定访问 Google Fonts，按 [`font-loading.md`](font-loading.md) opt-in，但**永远保留 local-first 兜底栈**。

## 三、Color 策略（borrowed from impeccable）

先选 commit 等级，再选颜色。不要每个稿子都默认 Restrained。

- **Restrained** — tinted neutrals + 单一 accent ≤ 10%。dashboard / 文档场景默认。
- **Committed** — 一个饱和色撑 30–60% 表面。landing、changelog、hero 默认。
- **Full palette** — 3–4 个有名字的角色色。campaign、infographic、data viz。
- **Drenched** — 表面就是颜色。hero、社交封面、品牌爆款。

技术约束：

- 不要 `#000` / `#fff`。所有中性灰都向品牌主色微偏（chroma 0.005–0.01 已足够），IFQ 主色 `#D4532B`，因此 paper / cream / hairline 都已经按这个偏。
- 优先 OKLCH，把 chroma 控制在亮度两端附近收敛。
- “1 个 accent ≤ 10%” 只属于 Restrained。Committed / Full palette / Drenched **必须**故意越过这条线。

## 四、Layout 反 AI slop

- 同样的内边距 / 同样的卡片 / 同样的间距 = 单调。每个 section 用不同的节奏。
- **不要把所有内容包进一个 1280px 居中容器**。大部分东西不需要 container。
- **嵌套 card 永远是错的**。如果你想嵌一层，用 hairline、上下边线、或留白替代。
- **网格之外要留破格**：让一两个 element 越过 grid，不要全员对齐到同一格。

## 五、Motion 反 AI slop

- 不要 animate CSS layout 属性（width / height / top / left / margin）。用 transform / opacity。
- ease 用 exponential 类 `cubic-bezier(0.16, 1, 0.3, 1)`（quart）或 quint / expo。**不要 bounce / elastic**。
- 一次有秩序的 staggered page-load reveal，比满屏 hover micro-interaction 更值钱。
- IFQ 的 motion 默认不是“弹一下”，是“稳重地落位”。

## 六、Copy 反 AI slop

- 不要写 `Lorem ipsum`，不要 `Welcome to your dashboard`，不要 `Get started in seconds`。
- 中文不要写「赋能」「智能化」「打造」「数字化转型」「沉浸式」当默认词。
- 用 IFQ field-note 的语气：动词 + 具体名词。例如 `Ledger marks the day · 2026 / Spring`、`Move the brief, not the brand`。

## 七、Pre-flight 自检（交付前 30 秒）

打开浏览器之前，扫一遍：

1. 没有侧边色条 / gradient text / 默认 glass / hero-metric / 同尺寸九宫格 / 默认 modal。
2. Display 字体不是 Inter / Roboto / Arial / system stack。
3. 颜色 strategy 是否被注释或写在 colophon（让自己 commit）。
4. 至少有一处节奏破格：尺寸 / 间距 / 对齐其中之一不规则。
5. Motion 没有 animate layout 属性。
6. 至少 3 个 IFQ ambient 标记（rust ledger / signal spark / mono field note / quiet URL / editorial contrast）。

七项里漏一条都会让作品退回到“看起来 AI 写的”。
