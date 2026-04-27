# Marketplace Quality · skills.sh / ClawHub / VirusTotal 友好准则

本页把 IFQ Design Skills 的发布质量做成可执行清单。若 agent 的网络策略允许访问 skills.sh / ClawHub / VirusTotal，可以再做线上核验；若网络被策略阻断，不要编造排行或扫描结论，先跑本地 smoke 与静态闸门。

## 上游审计管线

| Marketplace | 审计来源 | IFQ 的等价闸门 |
|---|---|---|
| skills.sh / vercel-labs `skills-cli` | **Gen Agent Trust Hub** · **Socket** · **Snyk** | `npm run smoke` 12 项检查（zero-spawn/eval/network、no-secret、模板网络策略） |
| ClawHub / OpenClaw | **VirusTotal**（URL + 发布包） | 公开 GitHub URL + 不上传打包二进制 + 内置模板 local-first，扫描器看到的全是原文件 |
| Cursor / Claude Code 用户体感 | 安装失败率、skill 启动失败率 | Tier 0 zero-install + `npm run verify:publish` |

skills.sh audits 页对每个 skill 的目标都是 “Safe / 0 alerts”。IFQ Design Skills 当前 `npm run smoke` 静态等价于这三家扫描器关心的项。

## 顶级 skill 的共同特征

这些是面向 skill marketplace 的硬指标，IFQ 默认遵守：

1. 30 秒内能读懂：`SKILL.md` 顶部有 Cheat Sheet、三步 loop、依赖分层。
2. 零安装核心链路：只要 Node 就能 `verify:lite` + `preview`，重依赖全部 opt-in。
3. 明确 entrypoints：`SKILL.md`、`references/modes.md`、`assets/templates/INDEX.json`。
4. 产物可 fork：内置模板覆盖主要场景，agent 不从白纸开始。
5. 安全声明可机读：frontmatter 包含 `capabilities` / `permissions` / `security`。
6. 静态扫描友好：脚本目录无 `child_process`、无 `eval` / `new Function`、无运行时对外网络请求。
7. 不偷偷安装：Playwright、Chromium、ffmpeg、PPTX/PDF 依赖只在用户明确要导出时出现。
8. 网络弱环境可用：模板 local-first 字体；Google Fonts 与 CDN 都是显式 opt-in。
9. 发布包轻：well-known stub 只指向根 skill，不夹带二进制或大依赖。
10. 每次变更可验证：`npm run smoke` 是发布前最低门槛。

## VirusTotal / 静态扫描敏感点

避免这些模式出现在默认发布面：

- `child_process` / `spawn` / `exec` / `execFile`
- `eval` / `new Function` / `node:vm`
- 脚本运行时 `fetch` / `axios` / `node-fetch` / `undici` / `http` / `https`
- 私钥、token、`.env`、`.npmrc`、证书包、个人资产索引
- 默认模板里的远程 runtime CSS/JS
- 不必要的转码库包装器；视频最终转码交给用户显式运行的 `ffmpeg` 命令

## 本地发布闸门

```bash
npm run smoke
npm run verify:publish
```

`smoke` 覆盖模板索引、品牌资产、icon sprite、reference 路由、脚本词法、脚本安全不变量、secret hygiene、HTML 占位符、IFQ 日期 resolver、shipped HTML 网络策略、well-known 发布规范。

## 线上核验记录

如果能访问外部服务，再补充人工结果：

- skills.sh：访问 `https://skills.sh/audits` 找到本 skill 行，记录 Gen / Socket / Snyk 三栏结果。
- ClawHub：在 `https://clawhub.ai` skill 详情页核对 category / tags / install 命令、记录是否通过平台静态扫描。
- VirusTotal：上传公开仓库 URL（不要上传用户私有素材），记录检测时间与结果摘要。
- 如果访问被企业/IDE 网络策略阻断，在交付说明里明确写出“未能线上核验，已完成本地等价静态闸门”。
