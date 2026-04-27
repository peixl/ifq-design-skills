# Skill leaderboard lessons · 顶级 skill 共性提炼

抓 skills.sh / clawhub.ai / clawskills.sh 的 leaderboard + audits 页面、读 anthropics/skills、vercel-labs/agent-skills、pbakaus/impeccable、obra/superpowers 的 SKILL.md 之后蒸馏出来的。这些是 IFQ Design Skills 想成为“最佳设计 skill”必须遵守的协议规范。

## 一、frontmatter 三档结构

skills.sh CLI、Claude Code、ClawHub 都按这个三档读：

1. **Anthropic minimal**：只 `name` + `description`（+ 可选 `license`）。`anthropics/skills/template/SKILL.md`、`frontend-design`、`pdf`、`pptx` 走这个。
2. **Vercel metadata**：在前面基础上加 `metadata.author` / `metadata.version` / `metadata.argument-hint`。`vercel-labs/agent-skills/web-design-guidelines`、`react-best-practices` 走这个。
3. **Impeccable extended**：再加 `argument-hint`、`user-invocable`、`allowed-tools`。`pbakaus/impeccable` 走这个。
4. **IFQ extended**：在 1+2+3 基础上加 `capabilities` / `permissions` / `security` / `compatibility` / `metadata.{hermes,clawhub,agentskills}` 这些 OpenClaw / Hermes 友好的字段。**新增字段不影响向后兼容性**，因为它们都是 namespaced 的可选 YAML key。

IFQ 选择超集是对的，但要确保 1 + 2 的字段先满足，CLI 解析才不会 fallback 到默认。

## 二、description 一定要 push

Anthropic skill-creator 原话：“Claude has a tendency to undertrigger skills.” 所以 description 要写得稍微 pushy：

- ✅ "Use this skill whenever the user mentions dashboards, data visualization, internal metrics, or wants to display any kind of company data, even if they don't explicitly ask for a 'dashboard.'"
- ❌ "How to build a simple fast dashboard."

IFQ 当前 description 已经覆盖到这个浓度，但要持续维护：每加一种交付类型（whitepaper / changelog / business card / social cover）就在 description 里加触发关键词。

## 三、SKILL.md 长度纪律

- Anthropic 推荐 < 500 行。
- 真正读得起的 skill：frontend-design ≈ 50 行、web-design-guidelines ≈ 30 行、impeccable ≈ 200 行 + references。
- IFQ 当前 SKILL.md 比这些都长，因为它要做 12 modes 的 router。**对策不是删长**，而是把每个 mode / workflow 拆成 `references/`，让 SKILL.md 主体只承担 router 角色。每次升级评估：能不能把这一段挪到 reference？

## 四、references / scripts / assets 三仓制

```
skill-name/
├── SKILL.md          # 路由 + cheat sheet，永远 < 500 行
├── references/       # 按需加载的 doc，每个 ≤ 300 行 + 顶部 TOC
├── scripts/          # 确定性、纯函数、零网络
└── assets/           # 模板 / 图标 / 字体 / token / brand
```

IFQ 已经全部到位。继续约束：

- references 里若 > 300 行，加目录块。
- Node/Python scripts 不允许 `child_process` / `eval` / outbound remote IO；shell 导出助手只在显式导出时调用 `ffmpeg` / `ffprobe`。
- assets 不放二进制大文件；字体走用户 self-host。

## 五、Audit pipeline 对齐

| 平台 | 审计来源 | IFQ 通过路径 |
|---|---|---|
| skills.sh | Gen Agent Trust Hub · Socket · Snyk | `npm run validate` 覆盖 zero-spawn / zero-eval / zero-remote-IO / no-secret / no-hidden-Unicode / no-generated-cache 的等价静态闸门 |
| ClawHub | VirusTotal + 平台静态分析 + OpenClaw verdict | 公开 GitHub URL + `optionalDependencies` 隔离 + 不打包 minified bundle，让扫描器看到原文件 |
| Cursor / Claude Code 用户体感 | 安装失败率 + skill 启动失败率 | `verify:publish` + Tier 0 zero-install 已经覆盖 |

audits 页面看到的 “Safe / 0 alerts” 都基于：

1. 仓库内没有可执行二进制、私钥、`.env`、token。
2. 脚本不调用 `child_process.spawn` / `exec` / `vm` / dynamic import 网络模块。
3. package.json 不含可疑后安装钩子（`postinstall: curl ... | sh` 之类）。
4. 默认产物不偷偷加载远端域名。

IFQ 用 `npm run validate` 覆盖这些本地等价项。2026-04-27 额外发现：ClawHub 会把“读文件 API + 网络调用字面特征”判成 possible exfiltration，即使这些网络特征只是本地扫描器的正则样本；因此 smoke 脚本自身也必须 scanner-clean。

## 六、安装姿势对齐 leaderboard

skills.sh 的标准命令是 `npx skills add <owner/repo>`。IFQ 必须保留这条入口，并且在 README + .well-known/skills/index.json 里都明确出现。

- **官方一行**：`npx skills add peixl/ifq-design-skills`
- **Claude Code**：`git clone ... ~/.claude/skills/ifq-design-skills`
- **OpenCode / Codex CLI**：仓库根 `AGENTS.md` 自动被发现
- **OpenClaw / Hermes**：用 `.well-known/agent-skills/index.json` 暴露 `openclaw` / `hermes` install 命令

## 七、2026-04-27 leaderboard 样本

2026-04-27 live 调研三处目录，取页面/API 可见信息，不从记忆推断；ClawHub 主列表为客户端动态加载，排行用可验证 API 样本记录。

| 来源 | Top 样本 | IFQ 吸收点 |
|---|---|---|
| skills.sh all-time / visible samples | find-skills · vercel-react-best-practices · frontend-design · soultrace · web-design-guidelines · remotion-best-practices · microsoft-foundry · agent-browser · skill-creator · pdf / pptx / docx | 安装命令、Summary、完整 SKILL.md、安全审计都在首屏；顶级 skill 的 README 不绕 |
| ClawHub downloads API | self-improving-agent · Skill Vetter · Self-Improving + Proactive Agent · ontology · Github · Gog · Proactive Agent · Weather · Polymarket · Multi Search Engine | ClawHub 头部偏 agent infrastructure；设计 skill 要靠 category/tags、短摘要、安装体验和安全状态赢信任 |
| clawskills.sh curated | cad-agent · bluente-translate（当前首页可见样本）+ 5,147 curated / 7,060 filtered-out 信号 | 独立精选索引会过滤 spam、重复、低质量、高风险金融交易、malicious；IFQ 发布面必须去噪 |

## 八、设计 / 文档 / 工作流 skill 的关键词样本

来自 skills.sh 当前 leaderboard 前 130 名里跟 IFQ 相邻的设计 / 文档 / 工作流 skill：

```
frontend-design          (anthropics)            产品级 UI、distinctive aesthetic
web-design-guidelines    (vercel-labs)           UI 评审、accessibility 复核
canvas-design            (anthropics)            poster / scene composition / 灵感采样
brand-guidelines         (anthropics)            企业品牌色 + 字体
theme-factory            (anthropics)            10 种成品主题快速套用
web-artifacts-builder    (anthropics)            React + shadcn 单文件 artifact
pptx                     (anthropics)            可编辑幻灯片
pdf                      (anthropics)            PDF 全套
docx                     (anthropics)            文档全套
webapp-testing           (anthropics)            Playwright 端到端
ui-ux-pro-max            (nextlevelbuilder)      UI/UX 一站式
extract-design-system    (arvindrk)              逆向 design system
sleek-design-mobile-apps (sleekdotdesign)        移动端 UI
impeccable / polish / critique / typeset (pbakaus)  设计 polish 套件
brainstorming / writing-plans / systematic-debugging (obra/superpowers)  workflow
```

IFQ 的差异化定位：

- frontend-design + web-design-guidelines 只做“写或评审”，IFQ **同时做设计 + 多格式导出 + 品牌融入**。
- pptx / pdf 各自只覆盖一种格式，IFQ 一份 HTML 导出五格式。
- impeccable 给 polish 协议但不带模板与品牌系统。
- IFQ 把 **brand ambient layer**（rust ledger、signal spark、mono field note、quiet URL、editorial contrast）做进 layout。这一点没有任何 leaderboard skill 复刻。

继续放大这个差异化，不要试图把 IFQ 改成 frontend-design 的样子。

## 九、ClawHub 顶层 skill 观察

ClawHub leaderboard 头部以 **agent infrastructure** 为主（agent-browser、gog Google Workspace CLI、auto-updater、api-gateway、freeride-ai、blogwatcher、playwright-mcp）。设计类 skill 在 ClawHub 上几乎是空白市场。IFQ Design Skills 在 ClawHub 上的目标是“设计场景里第一个被想到的 OpenClaw skill”。需要做的是：

- `metadata.clawhub` 里写清楚 category / tags / audit 状态。
- `AGENTS.md` 顶层提到 OpenClaw 的 `plugins.allow` 集成方式。
- README 给 OpenClaw 一行装命令。

已落地：`metadata.clawhub`、OpenClaw 安装命令、AGENTS.md。继续补强：发布前必须打开 ClawHub 详情页，确认没有 suspicious banner；若有，点开 Static analysis 记录命中文件和原因，先修本地再发布。

## 十、Skill self-improvement loop（来自 anthropics/skill-creator）

Anthropic 推荐 skill 自己也跑 eval：

1. 写 2–3 个真实 prompt → `evals/evals.json`。
2. 同一 prompt 跑两遍：with-skill / baseline。
3. 把产物保存到 `<skill>-workspace/iteration-N/eval-X/`。
4. 用 quantitative + qualitative 评估，迭代 description / 主体。

IFQ 当前有 `test-prompts.json`，可以演进成这个 eval workspace 结构（不强求，列在 backlog）。
