# 字体加载策略 · China-safe by default

目标：IFQ Design Skills 产出的核心 HTML 在中国网络、离线预览、企业内网、导出场景里都能流畅打开。文字渲染不能依赖 Google Fonts 是否可访问。

## 默认规则

1. 内置模板默认不写 `fonts.googleapis.com` / `fonts.gstatic.com`。
2. 先用 `assets/ifq-brand/ifq-tokens.css` 的 local-first 字体变量。
3. 不因为 webfont 没加载就阻塞预览、截图、PDF、PPTX 导出。
4. 用户或品牌明确要求某个 webfont 时，才把 Google Fonts 当 opt-in 增强。

## IFQ 默认字体栈

```css
:root {
  --ifq-font-display: "Newsreader", "Noto Serif SC", "Source Han Serif SC", "Songti SC", STSong, Georgia, serif;
  --ifq-font-body: "Noto Serif SC", "Source Han Serif SC", "Songti SC", STSong, Georgia, "Times New Roman", serif;
  --ifq-font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", "Source Han Sans SC", Arial, sans-serif;
  --ifq-font-mono: "JetBrains Mono", "SF Mono", "Cascadia Mono", "Microsoft YaHei Mono", ui-monospace, Menlo, Consolas, monospace;
}
```

设计含义：如果用户机器装了 Newsreader / Noto / JetBrains Mono，就呈现完整 IFQ editorial 味道；没有安装时，系统中文宋体/黑体/等宽字体会接住版式，不会白屏、卡住或长时间闪字。

## Google Fonts opt-in

只有在满足这些条件时才加：目标受众能稳定访问 Google Fonts；用户接受外网依赖；交付物不是离线包、企业内网演示、印前导出主路径。

```html
<!-- Optional only: remove for China/offline/enterprise delivery. -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;600&family=Noto+Serif+SC:wght@400;700;900&display=swap" rel="stylesheet">
```

保留 local-first 栈，不要把 `font-family` 改成只含 webfont 的脆弱写法。

## 品牌字体

- 用户提供 `.woff2` / `.otf` / `.ttf`：优先 self-host 到项目目录，用相对路径 `@font-face`。
- 只知道品牌官网用了某字体：先把它当风格线索，不要直接热链官网字体文件。
- 需要完全还原品牌：问用户要授权字体文件或可公开使用的字体替代。

## Agent 自检

交付前检查：

- `assets/templates/*.html` 不应包含 `https://fonts.googleapis.com` 或 `https://fonts.gstatic.com`。
- 默认模板不应包含远程 `<script src="https://...">` 或远程 `<link href="https://...">`。
- `npm run smoke` 会执行 shipped HTML network policy，防止模板、demos、showcases 重新引入远程字体或脚本。
