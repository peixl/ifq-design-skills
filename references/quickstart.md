# Quickstart · 60 秒看到第一个成品

> 安装后第一次对话就产出可见 HTML artifact。不需要登录、不需要全局安装、不需要导出依赖。

---

## 安装（10 秒）

```bash
npx skills add peixl/ifq-design-skills
```

或：

```bash
git clone https://github.com/peixl/ifq-design-skills ~/.claude/skills/ifq-design-skills
```

装完直接说话。不用 `npm install`。

---

## 示例 1：Landing Page（最简单）

**你说：**

> 做一个个人站一页，不要像找工作。

**Agent 做的事：**

1. 读 SKILL.md → 路由到 M-02
2. 读 design-direction-advisor.md → 提出 3 个方向（Editorial Serif / Terminal Hacker / Magazine Grid）
3. 你选一个 → fork `hero-landing.html` 模板
4. 填入你的内容，融入 3+ IFQ ambient marks
5. 运行 `npm run verify:lite -- personal-site.html` → 通过
6. 运行 `npm run preview -- personal-site.html` → 打印 `file:///...` URL

**输出：**

```
✓ personal-site.html
  Mode: M-02 Portfolio
  Template: T-hero-landing
  Direction: Editorial Serif
  Verification: passed (0 placeholders, 3 IFQ marks)
  Preview: file:///Users/you/workspace/personal-site.html
```

---

## 示例 2：Slide Deck（中等复杂度）

**你说：**

> 明天沙龙讲 AI agent 20 分钟，给我一份 deck，不要像 SaaS keynote，要有书卷气。

**Agent 做的事：**

1. 路由 M-08 → fork `slide-title.html`
2. 读 slide-decks.md → 生成 12 页 HTML deck
3. Newsreader 大标题 + rust ledger 分章 + mono 序号
4. 验证 + 预览

**输出：**

```
✓ ai-agent-deck.html (12 slides)
  Mode: M-08 Keynote
  Template: T-slide-title
  Style: editorial dark / bookish
  Verification: passed
  Preview: file:///Users/you/workspace/ai-agent-deck.html
```

> 需要 PPTX？告诉 Agent "导出 PPTX"，它会运行 `npm run install:export` 然后 `npm run export:pptx`。

---

## 示例 3：Social Card（快速出活）

**你说：**

> 把这条产品更新做成 X/Twitter 分享卡。

**Agent 做的事：**

1. 路由 M-09 → fork `social-x-card.html`
2. 填入你的更新内容
3. 1200×675，IFQ 版面节奏
4. 验证 + 预览

**输出：**

```
✓ update-card.html
  Mode: M-09 Social Kit
  Template: T-social-x
  Size: 1200×675
  Verification: passed
```

---

## 常见问题

### Q: 我需要先 `npm install` 吗？

不需要。核心链路（HTML + preview + verify:lite）零依赖，只要有 Node ≥ 18.17。

### Q: 怎么导出 MP4 / PDF / PPTX？

告诉 Agent 你要导出。它会运行：
```bash
npm run install:export   # 一次性装齐 playwright + pdf-lib + pptxgenjs + sharp
```
然后用对应的 export 命令。这些是 opt-in 的，不影响默认路径。

### Q: Agent 问我太多问题怎么办？

这是 regression。SKILL.md 规定每次最多问 2 个问题，其余用默认值。如果 Agent 问超过 2 个，可以告诉它"直接做，用你觉得合适的默认值"。

### Q: 验证失败了怎么办？

`verify:lite` 会报告具体的 placeholder 残留（YYYY、{braces}、lorem ipsum）。Agent 应该自动修复并重新验证。如果它没有，告诉它"修复 verify:lite 报告的问题"。

### Q: 输出看起来很"AI 怎么办？

告诉 Agent "这个看起来太 AI 了"。它会读 anti-ai-slop.md 的 7 项清单，检查并修复：侧边色条、gradient text、glassmorphism、hero-metric 模板、同尺寸九宫格、默认 modal、紫渐变白底。

### Q: 我有品牌指南，怎么用？

告诉 Agent "用我们的品牌色 #2563EB" 或 "参考这个品牌指南"。Agent 会把你的品牌 tokens 接入模板，而不是用 IFQ 默认色。

---

## 下一步

- 完整模式手册：[references/modes.md](modes.md)
- 设计风格库：[references/design-styles.md](design-styles.md)
- 反 AI slop 清单：[references/anti-ai-slop.md](anti-ai-slop.md)
- Agent 交互协议：[references/agent-interaction-protocol.md](agent-interaction-protocol.md)
