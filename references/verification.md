# Verification：证据优先的输出验证流程

IFQ 的验证不是"随手看一眼没问题就算完"，而是**先定义什么算完成，再收集对应证据**。

**验证分两档。默认走 Lite（零依赖），必要时才升级 Deep（Playwright）。**

核心原则：

- 没有浏览器里看过，不算看过
- 没有静态占位符扫，不算交付
- 没有导出核对，不算可交付
- 没有控制台检查，不算能运行

## ⚡ 两档验证（先记这一张表）

| 档 | 命令 | 依赖 | 覆盖 | 何时用 |
|---|------|------|------|-------|
| **Lite**（默认） | `npm run preview -- <file>` + `npm run verify:lite -- <file>` | **零依赖**，Node ≥18.17 即可 | 人眼浏览器看 + 静态占位符扫（YYYY/MM/DD/{…}/lorem/template-stub/空 data-ifq-*） | 所有日常交付（99% 情况） |
| **Deep**（按需） | `python scripts/verify.py <file>` | Python + `pip install playwright` + `playwright install chromium` | headless 多 viewport 截图 + console-error 抓取 + rendered-text 扫描 | 自动化截图 / 批量 regress / CI / 多分辨率核对 |

**不要默认推 Deep 档给用户**——让用户为了看个 HTML 装 500MB Chromium 是 skill 体验噩梦。

## Lite 档 · 日常验证四步

### 1. 浏览器渲染检查（默认用系统默认浏览器）

```bash
# 跨平台（推荐）
npm run preview -- path/to/design.html

# 或手动
open path/to/design.html          # macOS
xdg-open path/to/design.html      # Linux
start path/to/design.html         # Windows
```

用户在自己系统默认浏览器里看。零安装，零配置。

### 2. 静态占位符扫（零依赖）

```bash
npm run verify:lite -- path/to/design.html
```

纯 Node，扫这几类：

- `{ something }` — 未填充的 brace 占位符
- `YYYY` / `MM` / `DD` / `<year>` — 未替换的日期 token
- `lorem ipsum` / `Your headline here` / `TODO:` — 模板残留
- 空的 `data-ifq-year|month|day` 节点 — 运行时忘了填日期

**这一步在大部分交付场景就够用了**。命中就修，修到没警告再交付。

### 3. 交互检查（人工）

Tweaks、动画、按钮切换——静态扫不到。让用户或自己在浏览器里点一遍，特别是：

- tab / segment / filter 切换
- modal 开关
- tweaks 拖动
- 滚动 sticky 行为

### 4. 幻灯片快速浏览

在浏览器里按 `→` 翻页，用键盘走一遍。幻灯片逐页截图请用 Deep 档。

## Deep 档 · 需要自动化时再装

**安装（按需，一次）**：

```bash
# Node 侧
npm run install:export           # 一键装齐 playwright + pdf-lib + pptxgenjs + sharp + Chromium

# 或 Python 侧（仅 verify.py 需要）
pip install playwright
python -m playwright install chromium
```

### Deep 档命令速查

```bash
# 基础：headless 截图 + 控制台错误抓取 + rendered-text 占位符扫
python scripts/verify.py design.html

# 多 viewport
python scripts/verify.py design.html --viewports 1920x1080,1440x900,768x1024,375x667

# 幻灯片逐页截前 N 张
python scripts/verify.py deck.html --slides 10

# 输出到指定目录
python scripts/verify.py design.html --output ./screenshots/

# 非 headless，真实浏览器弹出来给你看
python scripts/verify.py design.html --show
```

Deep 档覆盖 Lite 档的能力集，再加：

- rendered DOM 文本扫（JS 执行后的最终文本）
- `console.error` / `pageerror` 捕获
- 像素级多 viewport 截图比对
- 幻灯片翻页自动化

同一条占位符保护也接到了导出链：PDF / PPTX / MP4 导出前会先检查渲染后的页面文本；发现未替换占位符会直接中止导出。

## 截图最佳实践

### 截完整页面

```python
page.screenshot(path='full.png', full_page=True)
```

### 截viewport

```python
page.screenshot(path='viewport.png')  # 默认只截可见区域
```

### 截特定元素

```python
element = page.query_selector('.hero-section')
element.screenshot(path='hero.png')
```

### 高清截图

```python
page = browser.new_page(device_scale_factor=2)  # retina
```

### 等动画结束再截

```python
page.wait_for_timeout(2000)  # 等2秒让动画settle
page.screenshot(...)
```

## 把截图发给用户

### 本地截图直接打开

```bash
open screenshot.png
```

用户会在自己的 Preview/Figma/VSCode/浏览器 里看。

### 上传图床分享链接

如果需要给远程协作者看（比如 Slack/飞书/微信），让用户用自己的图床工具或 MCP 上传：

```bash
python ~/Documents/写作/tools/upload_image.py screenshot.png
```

返回ImgBB的永久链接，可以粘贴到任何地方。

## 验证出错时

### 页面白屏

控制台一定有错。先检查：

1. React+Babel script tag的integrity hash对不对（见`react-setup.md`）
2. 是不是`const styles = {...}`命名冲突
3. 跨文件的组件有没有export到`window`
4. JSX语法错误（babel.min.js不报错，换babel.js非压缩版）

### 动画卡

- 用Chrome DevTools Performance tab录一段
- 找layout thrashing（频繁的reflow）
- 动效优先用`transform`和`opacity`（GPU加速）

### 字体不对

- 检查`@font-face`的url是否可访问
- 检查fallback字体
- 中文字体加载慢：先显示fallback，加载完再切换

### 布局错位

- 检查`box-sizing: border-box`是否全局应用
- 检查`*  margin: 0; padding: 0`reset
- Chrome DevTools里打开gridlines看实际布局

## 验证=设计师的第二双眼

**永远要自己过一遍**。AI写代码时经常出现：

- 看起来对但interaction有bug
- 静态截图好但scroll时错位
- 宽屏好看但窄屏崩
- Dark mode忘了测
- Tweaks切换后某些组件没响应

**最后1分钟的验证可以省1小时的返工**。

## 常用验证脚本命令

```bash
# 基础：打开+截图+抓错
python verify.py design.html

# 多viewport
python verify.py design.html --viewports 1920x1080,375x667

# 多slide
python verify.py deck.html --slides 10

# 输出到指定目录
python verify.py design.html --output ./screenshots/

# headless=false，打开真实浏览器给你看
python verify.py design.html --show

# 只在故意预览模板骨架时跳过占位符检查
python verify.py template.html --allow-placeholders
```
