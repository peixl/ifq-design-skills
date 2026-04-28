# Marketplace Quality · skills.sh / ClawHub / VirusTotal 友好准则

本页把 IFQ Design Skills 的发布质量做成可执行清单。若 agent 能访问 skills.sh / ClawHub / VirusTotal，就先在线核验；若网络被策略阻断，不要编造排行或扫描结论，先跑本地静态闸门。

## 2026-04-27 live 调研结论

通过 Web / Node fetch 实测三个目录；ClawHub 主列表页是客户端动态加载，直接 HTML 只暴露筛选壳，因此不从不可见列表编造排行，改用 ClawHub 上可验证的 `topclawhubskills` API 与详情页扫描信息：

| 站点 | 看到的高信号区 | IFQ 要吸收的经验 |
|---|---|---|
| `clawhub.ai` | 详情页展示 install、版本、下载量、VirusTotal、OpenClaw、静态分析详情；主列表有 downloads/stars/installs/updated 排序与 `Hide suspicious` | 列表页只给短摘要；详情页把安装、版本、安全、源码分区展示；任何 suspicious 都必须能点开看到文件和原因 |
| `skills.sh` | Leaderboard + Audits；首页展示 `npx skills add <owner/repo>`、agents support、all-time/trending/hot 排行 | 顶级 skill 都让用户 30 秒理解用途；安全审计是一级信息，不藏在 README 深处 |
| `clawskills.sh` | 独立精选索引，公开过滤规则：spam、duplicate、low-quality、finance/trade、malicious | marketplace 不只拼数量，还拼去噪；IFQ 发布面要避免高风险领域词、重复入口和低价值大文件 |

抽样 Top 10 / 高信号样本：

- ClawHub downloads API（generated_at 2026-04-27）：self-improving-agent、Skill Vetter、Self-Improving + Proactive Agent、ontology、Github、Gog、Proactive Agent、Weather、Polymarket、Multi Search Engine。
- ClawHub stars API（generated_at 2026-04-27）：self-improving-agent、Self-Improving + Proactive Agent、Skill Vetter、Gog、Proactive Agent、Multi Search Engine、Humanizer、ontology、Github、Free Ride。
- skills.sh all-time visible 前列：find-skills、vercel-react-best-practices、frontend-design、soultrace、web-design-guidelines、remotion-best-practices、microsoft-foundry；同页继续显示 agent-browser、skill-creator、supabase-postgres-best-practices、pdf、pptx、docx、webapp-testing 等高安装样本。
- clawskills.sh 当前首页：显示 5,147 curated skills，并公开过滤 7,060 条（spam、duplicate、low-quality、finance/trade、malicious）；当前可见下载样本为 cad-agent、bluente-translate。

## 2026-04-28 live delta

本次升级重新核验了用户点名的渠道。结论要落进代码和 manifest，不只留在调研笔记里：

| 站点 | 当前可见信号 | IFQ 吸收动作 |
|---|---|---|
| `https://clawhub.ai/peixl/ifq-design-skills` | 当前公开页显示 `v2.4.0`、226 downloads、VirusTotal benign、OpenClaw benign、runtime 只要求 `node` | 保持 `metadata.openclaw.requires.env=[]`、single-line metadata、zero-install bundle；发布后必须复查详情页是否仍无 suspicious banner |
| `https://skills.sh/` | all-time 列表显示 91,018 skills；Top10 大约进入 260K+ installs 区间；设计相邻标杆包括 `frontend-design`、`web-design-guidelines`、`ui-ux-pro-max`、`extract-design-system`、`canvas-design`、`theme-factory` | README 首屏必须保留 `npx skills add peixl/ifq-design-skills`；description 要主动触发设计、deck、motion、dashboard、export 等关键词 |
| `https://www.agentskills.to/` | 首页宣称 24K+ skills、4 platforms，显式支持 Claude Code / Codex CLI / Cursor / Gemini CLI；trending 卡片把“使用场景 + installs + install”放在同一张卡里 | `.well-known` metadata 增加 `human_value`、`agent_value`、`quality_signals`，让目录卡片能读出人类价值和 agent contract |
| `https://agentskill.sh/` | 目录强调 107,000+ skills、20+ AI tools，并把 quality score 拆成 Discovery / Implementation / Structure / Expertise，同时显示 security score | 新增 `references/killer-skill-playbook.md` 的四张 scorecard，并让 `verify:publish` 检查 discovery/quality metadata |
| `https://clawskills.sh/` | 独立索引当前文本抓取只显示 2 indexed，但公开过滤 7,060 条（spam、duplicate、low-quality、finance/trade、malicious） | 不追求堆关键词和重复入口；默认避开高风险金融/交易语义，发布面强调设计与本地 artifact |
| `https://skillhub.cn/` | 直接文本抓取为空；公开二级资料描述其面向中文用户、中文搜索、镜像下载、精选榜单 | 不从不可读页面编造排名；中文 README 和安装说明保持一等公民，后续人工打开页面后再记录截图/排名 |

从这些渠道抽象出的硬目标：

1. **Discovery**：30 秒读懂用途、安装命令、输出范围、验证方式。
2. **Implementation**：有模板、有 routes、有 evals，agent 不从白纸开始。
3. **Structure**：根入口短，reference 分层，heavy export opt-in。
4. **Expertise**：设计判断不只靠形容词，必须落到版式、节奏、输出格式和可验证文件。
5. **Security**：不要求 secrets，不隐藏安装，不默认远程 runtime，不把扫描器敏感模式带进脚本。

## 顶级 skill 的共同特征

这些是面向 skill marketplace 的硬指标，IFQ 默认遵守：

1. 30 秒内能读懂：`SKILL.md` 是短路由入口，保留触发边界、三步 loop、依赖分层、验证硬闸。
2. 一行安装：`npx skills add peixl/ifq-design-skills`、`openclaw skills install peixl/ifq-design-skills` 都要清晰可复制。
3. 零安装核心链路：只要 Node 就能 `verify:lite` + `preview`；重依赖全部 opt-in。
4. 明确 entrypoints：`SKILL.md`、`references/modes.md`、`assets/templates/INDEX.json`。
5. 产物可 fork：内置模板覆盖主要场景，agent 不从白纸开始。
6. 安全声明可机读：frontmatter 使用单行 JSON `metadata`，包含 `openclaw.requires`、ClawHub capability signals、security signals。
7. 静态扫描友好：Node/Python 脚本无 `child_process`、无 `eval` / `new Function`、无运行时对外网络请求；shell 导出助手只在显式导出时调用 `ffmpeg` / `ffprobe`。
8. 不偷偷安装：Playwright、Chromium、ffmpeg、PPTX/PDF 依赖只在用户明确要导出时出现。
9. 网络弱环境可用：模板 local-first 字体；Google Fonts 与 CDN 都是显式 opt-in。
10. 每次变更可验证：`npm run validate` 是发布前最低门槛，并同时覆盖 smoke 闸门与 12 模式 eval 契约。

## 上游审计管线

| Marketplace | 审计来源 | IFQ 的等价闸门 |
|---|---|---|
| skills.sh / vercel-labs `skills-cli` | Gen Agent Trust Hub · Socket · Snyk | `npm run smoke` 14 项检查（modeRoutes、`SKILL.md <= 500`、单行 metadata JSON、zero-spawn/eval/remote-IO、no-secret、无生成缓存、无隐藏 Unicode、模板 remote-runtime 策略） |
| ClawHub / OpenClaw | VirusTotal + 平台静态分析 + OpenClaw verdict | `npm run validate` + 人工打开 ClawHub Security Scan，确认无 suspicious banner 和无静态命中 |
| Cursor / Claude Code 用户体感 | 安装失败率、skill 启动失败率 | Tier 0 zero-install + `npm run verify:publish` |

skills.sh audits 页对每个 skill 的目标是 “Safe / 0 alerts”。ClawHub 的目标是详情页不出现 `Skill flagged — suspicious patterns detected`，且 Security Scan 无静态命中。

## ClawHub / VirusTotal 敏感点

避免这些模式出现在默认发布面：

- Node/Python subprocess APIs: `child_process` / `spawn` / `exec` / `execFile`
- `eval` / `new Function` / `node:vm`
- 脚本源码同时出现“读文件 API”和 remote-send API 的字面特征，即使只是写给本地扫描器用，也可能被 ClawHub 判成 possible exfiltration
- 私钥、token、`.env`、`.npmrc`、证书包、个人资产索引
- 默认模板里的远程 runtime CSS/JS
- 不必要的转码库包装器；视频最终转码交给用户显式运行的 `ffmpeg` 命令
- marketplace 调研快照、浏览器日志、测试截图目录（例如 `.playwright-mcp/`）

2026-04-27 线上观察：ClawHub v2.3.6 页面显示 `Static analysis: 1 pattern detected`，命中 `scripts/smoke-test.mjs:22`，原因是 “File read combined with network send (possible exfiltration)”。v2.4.0 的修复方向：保留本地扫描能力，移除 smoke 脚本中的高风险 remote-send 字面特征，拦截 Python bytecode / cache 生成物，并把 `.playwright-mcp/` 排除出仓库和 secret scan。

## 本地发布闸门

```bash
npm run validate
npm run verify:publish
```

`validate` 运行 `sync:year -- --check` + `smoke` + `evals:validate`。`smoke` 覆盖模板索引、12 模式路由、品牌资产、icon sprite、reference 路由、脚本词法、脚本安全不变量、secret/release hygiene、不可见 Unicode 控制符、package 安装姿态、HTML 占位符、IFQ 日期 resolver、shipped HTML remote-runtime 策略、well-known 发布规范。`evals:validate` 覆盖 12 种模式的 human value、agent contract、模板路由、must-read 文件、tier policy 与验证命令。

## 线上核验记录

如果能访问外部服务，再补充人工结果：

- skills.sh：访问 `https://skills.sh/audits` 找到本 skill 行，记录 Gen / Socket / Snyk 三栏结果。
- ClawHub：访问 `https://clawhub.ai/peixl/ifq-design-skills`，记录是否还有 suspicious banner、VirusTotal 状态、OpenClaw verdict、静态分析详情。
- VirusTotal：只提交公开仓库 URL 或 ClawHub 报告链接，不上传用户私有素材，记录检测时间与结果摘要。
- 如果访问被企业/IDE 网络策略阻断，在交付说明里明确写出“未能线上核验，已完成本地等价静态闸门”。
