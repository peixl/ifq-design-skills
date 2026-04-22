# Smoke Test · IFQ Design Skills

一页说明：**如何快速验证 skill 安装完整且脚本可执行**。不是完整 QA，是 60 秒内跑完、任何破损都能暴露的最小回归入口。

## 一行启动

```bash
# 在 ifq-design-skills 仓库根目录下
npm run smoke
```

这个命令会顺序验证：

1. **模板索引一致性** — `assets/templates/INDEX.json` 里每一条 `file` 在磁盘上真实存在
2. **品牌资产齐备** — `assets/ifq-brand/logo.svg`、`logo-white.svg`、`mark.svg`、`icons/hand-drawn-icons.svg`、`ifq_brand.jsx` 全在
3. **手绘图标 sprite 可解析** — `hand-drawn-icons.svg` 的 `<symbol id="...">` 至少 24 条
4. **References 路由目标存在** — SKILL.md 里每个 `references/*.md` 指向都真实存在
5. **关键脚本语法** — `scripts/verify.py`（python -c）与 `scripts/*.mjs / *.js`（node --check）全部通过

退出码：`0` 成功 · `1` 失败（会打印第一条失败详情）。

## 三种任务的最小验证剧本

如果你要验证**整条交付链**而不是只验证文件齐不齐，按下面的最小任务跑一次：

### ① 原型任务最小验证

```
任务：给 iPhone 15 Pro 做一个「相机 App 拍照瞬间」的高保真原型，1 屏即可。
验收：
- 使用 Starter Components 里的 AppPhone 状态管理器
- 图片素材必须来自 Wikimedia / Met / Unsplash，不能用纯色占位
- 交付前跑 Playwright 点击测试，至少 1 个可点击交互
```

预期耗时 3–5 分钟；失败通常意味着：占位图没替换 / AppPhone 没包 / Playwright 未安装。

### ② 动画任务最小验证

```
任务：5 秒 logo 起幕动画，1920×1080，60fps，导出 mp4 + gif。
验收：
- 使用动画引擎（keyframe-based，非 CSS transition 堆叠）
- 导出后 gif ≤ 2 MB，palette 优化开启
- mp4 自动附加 BGM + fade in/out
```

预期耗时 6–10 分钟；失败通常意味着：ffmpeg 没装 / Playwright 没装 chromium / BGM 文件缺失。

### ③ Deck 导出最小验证

```
任务：3 页 keynote HTML deck（封面 + 1 内容页 + 封底），同时导出 PDF 与 PPTX。
验收：
- 使用 slide-title.html 模板 + 两个自定义页
- PDF 文件 > 0 字节，页数 = 3
- PPTX 在 Keynote / PowerPoint 打开文字仍可编辑
```

预期耗时 4–8 分钟；失败通常意味着：`pptxgenjs` 或 `pdf-lib` 没装 / chromium 没装 / 字体加载失败。

## 依赖矩阵速查

| 脚本 | Node deps | Python deps | System |
|------|-----------|-------------|--------|
| `scripts/verify.py` | — | `playwright` | chromium |
| `scripts/render-video.js` | `playwright`, `sharp` | — | `ffmpeg`, chromium |
| `scripts/export_deck_pdf.mjs` | `playwright`, `pdf-lib` | — | chromium |
| `scripts/export_deck_pptx.mjs` | `playwright`, `pptxgenjs`, `sharp` | — | chromium |
| `scripts/export_deck_stage_pdf.mjs` | `playwright`, `pdf-lib` | — | chromium |
| `scripts/html2pptx.js` | `pptxgenjs`, `sharp` | — | — |

> **装一次就好**：
> ```
> npm install            # Node deps
> npx playwright install chromium
> pip install -r requirements.txt   # 仅当你要跑 verify.py
> brew install ffmpeg    # macOS；Debian/Ubuntu 用 apt install ffmpeg
> ```

## 失败排查清单

- `Error: browserType.launch: Executable doesn't exist` → `npx playwright install chromium`
- `ffmpeg: command not found` → `brew install ffmpeg`（macOS）/ `apt install ffmpeg`（Linux）
- `Cannot find module 'playwright'` → `npm install`
- `ModuleNotFoundError: No module named 'playwright'` → `pip install -r requirements.txt`
- INDEX.json 指向不存在文件 → 先运行 `npm run smoke` 看第一条失败，再修或删索引
