# Agent Interaction Protocol · 让 AI 确定性地工作

> 这份协议定义了 Agent 在 IFQ Design Skills 中的行为规范。目标：最少交互、最确定路由、最高质量产出。

---

## Decision Tree（请求分类）

```
用户请求到达
│
├─ 是视觉设计产物吗？
│  ├─ 否 → 退出 skill，交还默认 agent
│  └─ 是 ↓
│
├─ 提到了具体产品/技术/事件？
│  ├─ 是 → fact-and-asset-protocol.md → WebSearch 事实核验 → 继续
│  └─ 否 ↓
│
├─ 能匹配模式触发词？（查 Quick Reference 表）
│  ├─ 是 → 读 must-read references → fork 模板 → 生产 → 验证 → 交付
│  └─ 否 ↓
│
├─ 请求模糊/无风格/无上下文？
│  ├─ 是 → design-direction-advisor.md → 提出 3 个方向 → 用户选择 → 路由
│  └─ 否 ↓
│
├─ 是移动端原型？
│  ├─ 是 → app-prototype-rules.md + 设备框架
│  └─ 否 ↓
│
├─ 是幻灯片/deck？
│  ├─ 是 → slide-decks.md → T-slide-title
│  └─ 否 ↓
│
└─ 是动画/视频？
   ├─ 是 → animation-pitfalls.md + animations.md + video-export.md
   └─ 否 → 用 T-hero-landing 作为通用骨架
```

---

## State Machine（状态转换）

```
┌─────────┐    用户请求    ┌──────────┐
│  idle   │ ──────────────→│ routing  │
└─────────┘                └────┬─────┘
                                │
                    ┌───────────┼───────────┐
                    ↓           ↓           ↓
              ┌──────────┐ ┌────────┐ ┌──────────┐
              │  asset   │ │direction│ │ direct   │
              │ gathering│ │ advisor │ │  route   │
              └────┬─────┘ └───┬────┘ └────┬─────┘
                   │           │            │
                   └───────────┼────────────┘
                               ↓
                        ┌────────────┐
                        │ producing  │ ← fork template + fill content
                        └─────┬──────┘
                              ↓
                        ┌────────────┐
                        │ verifying  │ ← verify:lite + preview
                        └─────┬──────┘
                              ↓
                        ┌────────────┐
                        │ delivering │ ← report file + route + template + verification
                        └────────────┘
```

**状态规则：**
- `routing` → 最多 2 秒（对 Agent 而言）。匹配就直接进入 producing，不要犹豫。
- `asset gathering` → 只在 fact_check_required=true 时触发。最多问用户 1 个问题（"能提供 logo/产品图吗？"），然后用 placeholder 继续。
- `direction advisor` → 只在请求模糊时触发。提出 3 个方向，每个一行描述 + 风格名。等用户选择。
- `producing` → fork 模板，不从白纸开始。填入内容，融入 3+ IFQ ambient marks。
- `verifying` → 运行 `verify:lite`，修复所有 placeholder 残留，再运行 `preview`。
- `delivering` → 报告：文件路径、路由模式、模板 ID、验证结果、caveats。

---

## Question Minimization（最少提问）

| 场景 | 最多问几个问题 | 问什么 |
|------|:---:|------|
| 模糊请求 | 0 | 直接用 Design Direction Advisor 给 3 个方向 |
| 明确请求但缺关键信息 | 1 | 只问最关键的缺失（如"你的品牌色是什么？"） |
| 需要品牌资产 | 1 | "能提供 logo 或产品图吗？没有我用 placeholder" |
| 迭代修改 | 0 | 直接修改，报告改了什么 |
| 导出请求 | 0 | 直接运行导出命令 |

**规则：** 如果能在 3 秒内猜到合理默认值，就不要问。把你的选择写在 deliverable 的 assumptions 里，用户可以迭代。

---

## Progressive Disclosure（渐进式交付）

```
第一轮：核心产物（HTML + 验证）
  │
  ├─ 用户满意 → 完成
  │
  ├─ 用户要修改 → 迭代修改 → 重新验证
  │
  └─ 用户要增强 ↓
       ├─ "导出 PPTX" → 运行 export 命令
       ├─ "导出 PDF" → 运行 export 命令
       ├─ "加 dark mode" → 修改 HTML → 重新验证
       ├─ "加动画" → 读 animation references → 修改 → 验证
       └─ "做个变体" → fork 当前产物 → 修改 → 验证
```

**原则：** 先给最小可用产物，再按需增强。不要一次性交付用户没要求的东西。

---

## Failure Modes（失败回退）

| 失败类型 | 回退策略 |
|---------|---------|
| 没有匹配的模板 | 用 T-hero-landing 作为通用骨架，在 deliverable 里注明"无精确匹配模板" |
| verify:lite 报 placeholder | 修复所有占位符 → 重新验证 → 报告修复了什么 |
| verify:lite 报 IFQ label leak | 移除用户可见的内部术语（Signal Spark / Rust Ledger 等） |
| 用户说"太 AI 了" | 读 anti-ai-slop.md 7 项清单 → 逐项检查 → 修复 → 重新验证 |
| 导出命令失败 | 报告精确错误信息 → 如果是依赖缺失，建议 `npm run install:export` → 不要声称导出成功 |
| 无法事实核验（无网络） | 在 deliverable 里标注"以下声明未经事实核验" → 不要编造数据 |
| 模板渲染异常 | 降级到更简单的模板 → 报告降级原因 |
| 用户要求超出 Skill 范围 | 诚实说明边界 → 建议替代方案（如"这个需求更适合用 React 框架实现"） |

---

## Output Contract（交付标准）

每次交付必须包含：

```
✓ <file-path>
  Mode: <M-XX mode name>
  Template: <T-template-id>
  Verification: <passed/failed + details>
  Preview: <file:// URL>
  Caveats: <only if they affect use>
```

**禁止：**
- 声称导出文件存在但没有运行导出命令
- 声称验证通过但没有运行验证脚本
- 在用户没有要求的情况下安装 Tier 1/Tier 2 依赖
- 用"看起来不错"代替实际验证

---

## Co-brand Rules（共品牌处理）

| 场景 | IFQ 品牌元素处理 |
|------|-----------------|
| IFQ 自有物料 | 全部品牌元素上台 |
| 第三方物料 | IFQ 退到版面层：editorial contrast + ledger 节奏 + colophon |
| 用户要求 white-label | 去掉显式 wordmark 和 field note，保留版面做工 |
| 用户有自己的品牌系统 | 用用户的 tokens 替换 IFQ 默认色，IFQ 只保留版面结构 |
