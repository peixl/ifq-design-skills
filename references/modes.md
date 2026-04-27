# IFQ Design Skills · Mode Library (v2 新增)

> 超越 Junior Designer / 设计方向顾问的**扩展模式**。每一种模式都是一条"开箱即用"的流水线，根据用户的请求自动路由。
>
> 模式路由规则见根 `SKILL.md` 的 Routing Contract，以及 `assets/templates/INDEX.json` 的 `modeRoutes`。本文件是每种模式的操作手册。

---

## 模式索引

| Mode ID | 中文名 | 触发语 | 典型交付物 | 耗时 |
|---------|-------|--------|-----------|------|
| `M-01` | 品牌发布会模式 | 「发布会动画 / launch film / 产品发布物料」 | 25–40s 动画 + keyposter + 3 张社媒图 | 25–40 min |
| `M-02` | 个人品牌页模式 | 「做我的个人站 / 个人主页 / portfolio / about me」 | 单页个人站 HTML + OG 图 | 15–20 min |
| `M-03` | 白皮书 / 报告模式 | 「白皮书 / PDF 报告 / 年报 / research report」 | 可打印 HTML→PDF + 封面 + 目录 | 25–40 min |
| `M-04` | 数据仪表板模式 | 「Dashboard / 数据看板 / KPI 面板」 | 高密度 Dashboard HTML，真数据驱动 | 20–30 min |
| `M-05` | 对比评测模式 | 「评测 / VS 对比 / 横评 / benchmark」 | 对比信息图 + 评分雷达 + 可分享卡片 | 20–30 min |
| `M-06` | Onboarding 流程模式 | 「onboarding / 新手引导 / 首启流程」 | Flow-demo App 原型（3–5 屏）+ 埋点建议 | 25–35 min |
| `M-07` | 发布日记模式 | 「changelog / release notes / 版本记录」 | 时间线信息图 + 社媒图 | 10–15 min |
| `M-08` | 演讲 Keynote 模式 | 「做演讲 PPT / keynote / talk slides」 | 1920×1080 HTML deck + PPTX + PDF | 25–40 min |
| `M-09` | 社媒海报套件 | 「朋友圈图 / 小红书封面 / 微博长图 / 社媒物料」 | 3–6 张物料（1:1 / 9:16 / 4:5 / 1.91:1） | 15–25 min |
| `M-10` | 印刷名片/邀请函 | 「名片 / 邀请函 / 活动票 / VIP 卡」 | 可打印 SVG + PDF（含出血位 3mm） | 10–15 min |
| `M-11` | 品牌诊断模式 | 「给我家品牌诊断 / 品牌体检 / 升级现有品牌」 | 诊断报告 + 3 个升级方向 | 20–30 min |
| `M-12` | 全栈品牌系统 | 「从零建立品牌 / brand from scratch」 | logo + 色板 + 字体 + 6 应用示例 | 40–60 min |

---

## M-01 · 品牌发布会模式

**触发**：用户提到具体产品（实体/数字）要做"发布会"、"launch film"、"产品宣传片"、"产品物料"。

**前置硬门**：
1. 必先走 `references/fact-and-asset-protocol.md` 的事实验证 — 产品必须已确认存在、版本、规格
2. 必先走 `references/fact-and-asset-protocol.md` 的核心资产协议 — logo / 产品渲染图 / UI 截图必须到位
3. 素材未到 8/10 → **停下问用户**，不凑合

**交付件清单**（并行产出）：
- `launch-film.html` · 25–40s HTML motion demo，Stage + Sprite 时间轴
- `poster-hero.html` · 一张 key visual（16:9 与 1:1 双版）
- `social-twitter.html` · 1200×675 社媒图
- `social-xiaohongshu.html` · 1242×1656 竖版
- `social-og.html` · 1200×630 OG 分享图
- 导出 `.mp4 (25fps + 60fps 插帧)` + `.gif`

**IFQ 签名融入点**：
- 片头第 8–12 帧：`IfqSpark` 从屏幕中心绽开，300ms 内切入品牌 logo
- 片尾最后 20 帧：右下角浮现「made with ifq.ai」编辑体水印，opacity 0.4
- Poster 右下 colophon：`IfqStamp` rust 边框邮戳

**执行模板**：
```text
Stage 时长：
  00.0–02.4s   Spark reveal + 品牌 logo 浮现
  02.4–08.0s   产品图 rotate / pan
  08.0–16.0s   核心卖点 3 条文字，Newsreader italic
  16.0–22.0s   场景使用镜头（真实素材）
  22.0–26.0s   CTA + ifq.ai 尾标
```

---

## M-02 · 个人品牌页模式

**触发**：「做我的个人站」「portfolio」「about me」「个人主页」。

**关键问题**（一次问清）：
- 你的职业标签？1 句话 tagline？
- 3 个代表作 + 每个一句话？
- 社交链接？（X / B站 / 小红书 / 公众号 / GitHub / 邮箱）
- 头像图？没有就留位

**五种变体**（并排生成让用户选）：
1. **Editorial Serif** · Kenya Hara 式大量留白 + serif display
2. **Terminal Hacker** · 等宽字 + rust accent + 打字机开场
3. **Magazine Grid** · Pentagram 式栏线 + 期刊感
4. **Paper Journal** · 手绘 SVG 图标 + 纸质纹理 + 斜体 pull quote
5. **Minimalist Card** · 一屏完事，居中 hero card

每个变体都内嵌 `IfqWatermark` 右下角；footer 用 `IfqStamp`。

---

## M-03 · 白皮书 / 报告模式

**触发**：「白皮书」「research report」「年报」「行业报告」。

**硬要求**：
- A4 打印尺寸（210×297mm），`@page { margin: 20mm }` 设置
- 真数据驱动（提前问用户要数据源，没有则走设计方向顾问推荐）
- 目录页自动生成（基于 `<h2>` 锚点 + page-break）
- 封面 / 扉页 / 目录 / 章节页 / 正文 / 封底 六类模板

**IFQ 签名**：
- 封面右下：`IfqStamp` + 出版序号 `N° <auto-increment>`
- 每页 footer 中央：8pt rust spark + "ifq.ai · <报告简称>"
- 封底：`IfqLogo` + 版权声明

**导出**：`node scripts/export_deck_pdf.mjs --paper=A4 --print=true`

---

## M-04 · 数据仪表板模式

**触发**：「Dashboard」「看板」「KPI 面板」「monitoring UI」。

**硬要求**（来自 `references/app-prototype-rules.md` 的信息密度·高密度型）：
- 每屏 ≥ 3 处产品差异化信息（非装饰性数据）
- tabular-nums，mono font 数字列对齐
- sparklines 用真数据，不画假波形
- 过滤器、筛选、时间切换 3 件套默认提供

**布局模板**（三选一）：
- `Command Center` · 左 nav + 顶部 KPI 条 + 3×3 metric grid + 右 side feed
- `Financial Terminal` · 纯黑底 + rust accent + 密集表格
- `Health Tracker` · 明亮底 + 大号 metric hero + 趋势图卡片

**手绘图标接入**：使用 `radar / sparkles / check / arrow` 作为状态 indicator，避免 emoji。

---

## M-05 · 对比评测模式

**触发**：「A vs B」「横评」「评测」「benchmark」。

**交付件**：
- 顶部 hero：两个产品 logo + 对撞分数
- 中部矩阵：5–8 维度打分 + 每格 1 行评语
- 雷达图（复用 `c6-expert-review` 的画法）
- 尾部："最终推荐" + 使用场景矩阵
- 可分享社媒卡片（正方形）

**评分协议**：用户提供分数 or 让用户选"我来打分 / AI 代打+人工复核"。**不要 AI 独立打分不告知用户**。

---

## M-06 · Onboarding 流程模式

**触发**：「onboarding」「新手引导」「首启流程」「首次打开」。

**强制 flow-demo**（不是 overview 平铺）：
- 3–5 屏 clickable，每屏有 CTA
- 每屏附"用户心智"标注：在想什么 / 为什么点 / 下一步期待
- 埋点建议：每个 primary action 标注 `data-track="onboarding_step_X_action"`

**IFQ 签名**：在第 1 屏左上角角标出 spark icon 作为 brand presence；末屏完成页全屏 `IfqSpark` 庆祝动画。

---

## M-07 · 发布日记模式

**触发**：「changelog」「release notes」「版本记录」「更新日志」。

**模板**：时间线（左侧日期 rail + 右侧事件卡片），分版本折叠，rust accent 标记"新增"、ink 灰标记"修复"、soft accent 标记"优化"。

手绘图标绑定：
- 新增 → `sparkles`
- 修复 → `check`
- 优化 → `arrow`
- 重大更新 → `rocket`

---

## M-08 · 演讲 Keynote 模式

**触发**：「演讲 PPT」「keynote」「talk slides」「做演讲」。

沿用 `references/slide-decks.md` + `editable-pptx.md`，额外规则：
- 开场第 1 页：左下 `IfqSpark` 动画 + 右下 `IfqStamp`
- Speaker notes 自动生成中英双语（中文主讲 + 英文 backup）
- 导出走 `scripts/export_deck_pptx.mjs` 得到真文本框 PPTX

---

## M-09 · 社媒海报套件

**触发**：「社媒物料」「朋友圈图」「小红书封面」「社媒套件」。

**标准尺寸矩阵**（按平台自动匹配）：

| 平台 | 尺寸 | 文件名 |
|------|------|-------|
| X / Twitter | 1200×675 | `social-x.html` |
| 小红书 | 1242×1656 | `social-rednote.html` |
| 微信公众号头图 | 900×383 | `social-wechat.html` |
| Instagram 方图 | 1080×1080 | `social-ig-sq.html` |
| 抖音 / TikTok | 1080×1920 | `social-tiktok.html` |
| LinkedIn | 1200×627 | `social-linkedin.html` |

每张都内嵌 `IfqWatermark` 或 `IfqStamp`（用户可一键去除）。

---

## M-10 · 印刷名片 / 邀请函

**触发**：「名片」「邀请函」「活动票」「VIP 卡」。

**硬规格**：
- 名片：90×54mm，+3mm 出血，安全线 3mm
- 邀请函：支持 100×210mm 长邀请条 / 148×210mm A5 / 210×99mm DL
- 输出：`.svg` + `.pdf` (300dpi, CMYK placeholder)

IFQ 签名：正面一枚微缩 spark（3mm）+ 反面 `IfqLogo` 14mm 高。

---

## M-11 · 品牌诊断模式

**触发**：「品牌体检」「给我家品牌诊断」「品牌升级」「现有品牌优化」。

**流程**：
1. 请用户提供 3–5 个**现有物料**截图（logo 使用、网站、产品、社媒图）
2. 从 6 维度打分（识别度 / 一致性 / 时代感 / 情感传达 / 差异化 / 应用扩展性），每维 0–10
3. 输出雷达图 + 3 条"Keep / 3 条"Fix" / 3 条"Quick Wins"
4. 给 3 个升级方向的 moodboard（每方向并排 2 张参考 + 1 个风格 demo）

---

## M-12 · 全栈品牌系统

**触发**：「从零建立品牌」「brand from scratch」「给新公司做品牌」。

**完整交付**：
1. `brand-spec.md` · 按 `references/fact-and-asset-protocol.md` 模板填充
2. `logo.svg` · 主版 + 反色版 + 方版 + 横版
3. `palette.html` · 色板可视化（带 oklch 值 + WCAG 对比度）
4. `type-system.html` · 字体阶梯（H1–H6 + body + mono）
5. **6 个应用示例**：名片 / 网站 hero / App icon / 社媒头图 / 邀请函 / 产品包装
6. 打包 zip

**强流程**：必须走 `references/design-direction-advisor.md` 先让用户选流派，不能凭空给 logo。

---

## 手绘图标使用约定（所有模式通用）

替代 emoji 的场景下，优先使用 `assets/ifq-brand/icons/hand-drawn-icons.svg`：

```html
<svg class="ifq-icon"><use href="assets/ifq-brand/icons/hand-drawn-icons.svg#i-spark"/></svg>
<style>
  .ifq-icon { width: 1.1em; height: 1.1em; stroke: currentColor; fill: none;
              vertical-align: -0.15em; }
</style>
```

React 组件（inline JSX）：`<IfqHandDrawnIcon id="spark" size={20} />`（见 `assets/ifq-brand/ifq_brand.jsx`）。

**签名绑定默认映射**：

| 语义 | icon id |
|------|---------|
| AI / 智能 / 生成 | `sparkles` / `spark` |
| 完成 / 成功 | `check` |
| 下一步 / 前进 | `arrow` |
| 设计 / 创作 | `brush` / `pencil` |
| 原型 / 设备 | `frame` |
| 动画 / 视频 | `film` / `play` |
| 幻灯片 | `deck` |
| 变体 / 画布 | `grid` |
| 配色 / 色板 | `palette` / `eyedropper` |
| 字型 | `type` / `serif` |
| 评审 / 诊断 | `radar` |
| 方向顾问 | `compass` |
| 想法 / 灵感 | `idea` |
| 发布 / 上线 | `rocket` |
| 关联 / 引用 | `link` |
| 光标 / 交互 | `cursor` / `hand` |
