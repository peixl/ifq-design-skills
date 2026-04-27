# Marketplace Quality · skills.sh / ClawHub / VirusTotal 友好准则

本页把 IFQ Design Skills 的发布质量做成可执行清单。若 agent 能访问 skills.sh / ClawHub / VirusTotal，就先在线核验；若网络被策略阻断，不要编造排行或扫描结论，先跑本地静态闸门。

## 2026-04-27 MCP Chrome 调研结论

通过 MCP 驱动 Chrome 实测三个目录：

| 站点 | 看到的高信号区 | IFQ 要吸收的经验 |
|---|---|---|
| `clawhub.ai` | `Skills` 列表可按 downloads/stars/installs/updated 排序，并有 `Hide suspicious`；详情页展示 install、版本、下载量、VirusTotal、OpenClaw、静态分析详情 | 列表页只给短摘要；详情页把安装、版本、安全、源码分区展示；任何 suspicious 都必须能点开看到文件和原因 |
| `skills.sh` | Leaderboard + Audits；详情页有 `npx skills add ...`、Summary、完整 `SKILL.md`、Gen Agent Trust Hub / Socket / Snyk | 顶级 skill 都让用户 30 秒理解用途；安全审计是一级信息，不藏在 README 深处 |
| `clawskills.sh` | 独立精选索引，公开过滤规则：spam、duplicate、low-quality、finance/trade、malicious | marketplace 不只拼数量，还拼去噪；IFQ 发布面要避免高风险领域词、重复入口和低价值大文件 |

抽样 Top 10：

- ClawHub downloads 榜：self-improving-agent、self-improving、ontology、Polymarket、Multi Search Engine、AdMapix、Agent Browser、PollyReach、Nano Banana Pro、Obsidian。
- skills.sh all-time / audits 前列：find-skills、vercel-react-best-practices、frontend-design、soultrace、web-design-guidelines、remotion-best-practices、microsoft-foundry、azure-ai、azure-deploy、azure-prepare。
- clawskills.sh 精选下载榜：Agent Browser、gog、auto-updater、api-gateway、baidu-search、automation-workflows、free-ride、freeride、freeride-ai、elite-longterm-memory。

## 顶级 skill 的共同特征

这些是面向 skill marketplace 的硬指标，IFQ 默认遵守：

1. 30 秒内能读懂：`SKILL.md` 顶部有 Cheat Sheet、三步 loop、依赖分层。
2. 一行安装：`npx skills add peixl/ifq-design-skills`、`openclaw skills install peixl/ifq-design-skills` 都要清晰可复制。
3. 零安装核心链路：只要 Node 就能 `verify:lite` + `preview`；重依赖全部 opt-in。
4. 明确 entrypoints：`SKILL.md`、`references/modes.md`、`assets/templates/INDEX.json`。
5. 产物可 fork：内置模板覆盖主要场景，agent 不从白纸开始。
6. 安全声明可机读：frontmatter 包含 `capabilities` / `permissions` / `security`。
7. 静态扫描友好：脚本目录无 `child_process`、无 `eval` / `new Function`、无运行时对外网络请求。
8. 不偷偷安装：Playwright、Chromium、ffmpeg、PPTX/PDF 依赖只在用户明确要导出时出现。
9. 网络弱环境可用：模板 local-first 字体；Google Fonts 与 CDN 都是显式 opt-in。
10. 每次变更可验证：`npm run validate` 是发布前最低门槛。

## 上游审计管线

| Marketplace | 审计来源 | IFQ 的等价闸门 |
|---|---|---|
| skills.sh / vercel-labs `skills-cli` | Gen Agent Trust Hub · Socket · Snyk | `npm run smoke` 12 项检查（zero-spawn/eval/network、no-secret、模板网络策略） |
| ClawHub / OpenClaw | VirusTotal + 平台静态分析 + OpenClaw verdict | `npm run validate` + 人工打开 ClawHub Security Scan，确认无 suspicious banner 和无静态命中 |
| Cursor / Claude Code 用户体感 | 安装失败率、skill 启动失败率 | Tier 0 zero-install + `npm run verify:publish` |

skills.sh audits 页对每个 skill 的目标是 “Safe / 0 alerts”。ClawHub 的目标是详情页不出现 `Skill flagged — suspicious patterns detected`，且 Security Scan 无静态命中。

## ClawHub / VirusTotal 敏感点

避免这些模式出现在默认发布面：

- `child_process` / `spawn` / `exec` / `execFile`
- `eval` / `new Function` / `node:vm`
- 脚本源码同时出现“读文件 API”和网络发送 API 的字面特征，即使只是写给本地扫描器用，也可能被 ClawHub 判成 possible exfiltration
- 私钥、token、`.env`、`.npmrc`、证书包、个人资产索引
- 默认模板里的远程 runtime CSS/JS
- 不必要的转码库包装器；视频最终转码交给用户显式运行的 `ffmpeg` 命令
- marketplace 调研快照、浏览器日志、测试截图目录（例如 `.playwright-mcp/`）

2026-04-27 线上观察：ClawHub v2.3.6 页面显示 `Static analysis: 1 pattern detected`，命中 `scripts/smoke-test.mjs:22`，原因是 “File read combined with network send (possible exfiltration)”。v2.3.7 的修复方向：保留本地扫描能力，但移除 smoke 脚本中的网络调用字面特征，并把 `.playwright-mcp/` 排除出仓库和 secret scan。

## 本地发布闸门

```bash
npm run validate
npm run verify:publish
```

`validate` 运行 `sync:year -- --check` + `smoke`。`smoke` 覆盖模板索引、品牌资产、icon sprite、reference 路由、脚本词法、脚本安全不变量、secret hygiene、HTML 占位符、IFQ 日期 resolver、shipped HTML 网络策略、well-known 发布规范。

## 线上核验记录

如果能访问外部服务，再补充人工结果：

- skills.sh：访问 `https://skills.sh/audits` 找到本 skill 行，记录 Gen / Socket / Snyk 三栏结果。
- ClawHub：访问 `https://clawhub.ai/peixl/ifq-design-skills`，记录是否还有 suspicious banner、VirusTotal 状态、OpenClaw verdict、静态分析详情。
- VirusTotal：只提交公开仓库 URL 或 ClawHub 报告链接，不上传用户私有素材，记录检测时间与结果摘要。
- 如果访问被企业/IDE 网络策略阻断，在交付说明里明确写出“未能线上核验，已完成本地等价静态闸门”。
