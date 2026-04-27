# Design Direction Advisor

> Progressive-disclosure reference for IFQ Design Skills. Root SKILL.md is intentionally short for OpenClaw / ClawHub prompt loading; load this file only when the task needs this protocol.
> Use when the user has no clear style, asks for recommendations, or needs 3 differentiated directions.

## 设计方向顾问（Fallback 模式）

**什么时候触发**：
- 用户需求模糊（"做个好看的"、"帮我设计"、"这个怎么样"、"做个XX"没有具体参考）
- 用户明确要"推荐风格"、"给几个方向"、"选个哲学"、"想看不同风格"
- 项目和品牌没有任何 design context（既没有 design system，又找不到参考）
- 用户主动说"我也不知道要什么风格"

**什么时候 skip**：
- 用户已经给了明确的风格参考（Figma / 截图 / 品牌规范）→ 直接走「核心哲学 #1」主干流程
- 用户已经说清楚要什么（"做个 Apple Silicon 风格的发布会动画"）→ 直接进 Junior Designer 流程
- 小修小补、明确的工具调用（"帮我把这段 HTML 变成 PDF"）→ skip

不确定就用最轻量版：**列出 3 个差异化方向让用户二选一，不展开不生成**——尊重用户节奏。

### 完整流程（8 个 Phase，顺序执行）

**Phase 1 · 深度理解需求**
提问（一次最多 3 个）：目标受众 / 核心信息 / 情感基调 / 输出格式。需求已清晰则跳过。

**Phase 2 · 顾问式重述**（100-200 字）
用自己的话重述本质需求、受众、场景、情感基调。以「基于这个理解，我为你准备了 3 个设计方向」结尾。

**Phase 3 · 推荐 3 套设计哲学**（必须差异化）

每个方向必须：
- **含设计师/机构名**（如「Kenya Hara 式东方极简」，不是只说「极简主义」）
- 50-100 字解释「为什么这个设计师适合你」
- 3-4 条标志性视觉特征 + 3-5 个气质关键词 + 可选代表作

**差异化规则**（必守）：3 个方向**必须来自 3 个不同流派**，形成明显视觉反差：

| 流派 | 视觉气质 | 适合作为 |
|------|---------|---------|
| 信息建筑派（01-04） | 理性、数据驱动、克制 | 安全/专业选择 |
| 运动诗学派（05-08） | 动感、沉浸、技术美学 | 大胆/前卫选择 |
| 极简主义派（09-12） | 秩序、留白、精致 | 安全/高端选择 |
| 实验先锋派（13-16） | 先锋、生成艺术、视觉冲击 | 大胆/创新选择 |
| 东方哲学派（17-20） | 温润、诗意、思辨 | 差异化/独特选择 |
| **IFQ 原生派（21 · IFQ Native）** | 编辑部语气、rust ledger、暖纸、field-note colophon | ifq.ai 自有物料 / 用户明确要「ifq 独有美感」 / 不擞大师的创新选择 |

❌ **禁止从同一流派推荐 2 个以上** — 差异化不够用户看不出区别。

⚡ **IFQ 原生派的调用约束**：这一流派只有一个风格（IFQ Native），**不自动覆盖**其他流派。自动优先出现的三种场景：（1）用户做的是 ifq.ai 自己的物料（发布会 / 官网 / changelog / 社媒）；（2）用户明说「ifq 风 / 你们自己的风格 / ifq.ai 独有」；（3）用户要「全新的 / 不撞大师的 / 原创的」方向。其余场景仍从 20 大师中三选一或三选三。

详细 20+1 种风格库 + AI 提示词模板 → `references/design-styles.md`、`references/ifq-native-recipes.md`。

**Phase 4 · 展示预制 Showcase 画廊**

推荐 3 方向后，**立即检查** `assets/showcases/INDEX.md` 是否有匹配的预制样例（8 场景 × 3 风格 = 24 个样例）：

| 场景 | 目录 |
|------|------|
| 公众号封面 | `assets/showcases/cover/` |
| PPT 数据页 | `assets/showcases/ppt/` |
| 竖版信息图 | `assets/showcases/infographic/` |
| 个人主页 / AI 导航 / AI 写作 / SaaS / 开发文档 | `assets/showcases/website-*/` |

匹配话术：「在启动实时 Demo 之前，先看看这 3 个风格在类似场景的效果 →」然后 Read 对应 .png。

场景模板按输出类型组织 → `references/scene-templates.md`。

**Phase 5 · 生成 3 个视觉 Demo**

> 核心理念：**看到比说到更有效。** 别让用户凭文字想象，直接看。

为 3 个方向各生成一个 Demo——**如果当前 agent 支持 subagent 并行**，启动 3 个并行子任务（后台执行）；**不支持就串行生成**（先后做 3 次，同样能用）。两种路径都能工作：
- 使用**用户真实内容/主题**（不是 Lorem ipsum）
- HTML 存 `_temp/design-demos/demo-[风格].html`
- 截图：`npx playwright screenshot file:///path.html out.png --viewport-size=1200,900`
- 全部完成后一起展示 3 张截图

风格类型路径：
| 风格最佳路径 | Demo 生成方式 |
|-------------|--------------|
| HTML 型 | 生成完整 HTML → 截图 |
| AI 生成型 | `nano-banana-pro` 用风格配方 + 内容描述 |
| 混合型 | HTML 布局 + AI 插画 |

**Phase 6 · 用户选择**：选一个深化 / 混合（"A 的配色 + C 的布局"）/ 微调 / 重来 → 回 Phase 3 重新推荐。

**Phase 7 · 生成 AI 提示词**
结构：`[设计哲学约束] + [内容描述] + [技术参数]`
- ✅ 用具体特征而非风格名（写「Kenya Hara 的留白感+赤土橙 #C04A1A」，不写「极简」）
- ✅ 包含颜色 HEX、比例、空间分配、输出规格
- ❌ 避开审美禁区（见反 AI slop）

**Phase 8 · 选定方向后进入主干**
方向确认 → 回到「核心哲学」+「工作流程」的 Junior Designer pass。这时已经有明确的 design context，不再是凭空做。

**真实素材优先原则**（涉及用户本人/产品时）：
1. 先查用户配置的**私有 memory 路径**下的 `personal-asset-index.json`（各 agent 按自身约定：Claude Code → `~/.claude/memory/`；Cursor/Codex → workspace 设定；OpenClaw → `~/.openclaw/memory/`；ifq CLI → `~/.ifq/memory/`）
2. 首次使用：复制 `assets/personal-asset-index.example.json` 到上述私有路径，填入真实数据
3. 找不到就直接问用户要，不要编造——真实数据文件不要放在 skill 目录内避免随分发泄露隐私
