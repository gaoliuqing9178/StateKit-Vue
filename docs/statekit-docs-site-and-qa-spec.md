# StateKit Docs Site And QA Spec

## 目的

`apps/docs` 不是一个简单的 demo，它承担三项职责：

- 让首次接触 StateKit 的人快速理解产品定位。
- 让使用者能找到合适的 Block，并看到真实预览。
- 作为发布前人工 QA 的主要观察面板，同时也是 Playwright 自动化回归的测试宿主。

因此 docs 站的内容必须和 shared 元数据、Vue 组件导出保持同步。

## 当前信息架构

根据现有路由，docs 站包含以下页面：

| 路径 | 页面职责 |
| --- | --- |
| `/` | 首页，介绍 StateKit 定位、展示 featured blocks、跳转示例页 |
| `/recipes` | Recipe 总览列表页 |
| `/recipes/:slug` | 单个 Recipe 详情页，包含 live preview、元数据、代码片段 |
| `/blocks` | 兼容重定向 → `/recipes` |
| `/blocks/:slug` | 兼容重定向 → `/recipes/:slug` |
| `/docs/installation` | 安装与最小接入说明 |
| `/examples` | 重定向 → `/examples/onboarding-activation` |
| `/examples/onboarding-activation` | 示例页，展示完整 first-run 激活流程（workspace → 成员 → 集成 → 完成） |
| `/examples/admin-empty-states` | 示例页，展示 empty 与 onboarding 状态在后台中的组合 |
| `/examples/permissions-and-upgrade` | 示例页，展示权限与升级场景 |
| `/examples/task-flow` | 示例页，展示 loading / error / success 流程串联 |

## 页面要求

### 首页

首页至少要解决三件事：

- StateKit 是什么。
- 它覆盖哪些状态类型。
- 访问者下一步去哪里看安装、Block 列表或示例页面。

现有首页已经有这套基本骨架，后续维护时不要把首页改成纯 marketing copy，而失去产品导航功能。

### Recipe 列表页

Recipe 列表页必须：

- 覆盖全部 `stateBlockMetaList`。
- 明确展示类别、标题、摘要和支持布局。
- 允许使用者快速比较相似场景，例如 `page-error` 和 `inline-error`。

### Recipe 详情页

每个 Recipe 详情页至少包含：

- 标题与摘要
- live preview
- `slug`
- 组件名
- 优先级
- 支持布局
- 可直接复制的使用示例代码

详情页的数据必须优先来自 shared 元数据，而不是在 docs 站本地重复写一份。

### Installation 页

安装页必须回答以下问题：

- 包怎么装。
- 样式怎么引。
- 一个最基本的使用示例是什么。

如果未来 README 与 docs 安装页内容出现冲突，以 docs 安装页为先，再回修 README。

### Example 页

示例页的目标不是把所有 Block 摆成 gallery，而是展示它们在产品流程里的上下文。每个示例页都应满足：

- 至少有一个明确用户任务。
- Block 放在合理位置，而不是脱离页面结构单独居中。
- 能体现为什么这个 Block 适合该场景。

当前四个示例页：

- `/examples/onboarding-activation`：first-run 激活流程的端到端示范（默认入口）。
- `/examples/admin-empty-states`：后台空状态与 onboarding 状态的组合使用。
- `/examples/permissions-and-upgrade`：权限限制与升级引导场景。
- `/examples/task-flow`：loading → error → success 流程串联。

## QA 原则

docs 站是最重要的人工 QA 面板。同时，`apps/docs/tests/` 下已有 10 个 Playwright spec 文件覆盖主路径和移动端断点，提供基础自动化回归。自动化测试通过后，仍需人工确认视觉质量。

### 基础检查

- 首页、列表页、详情页和安装页都可正常访问。
- 每个 `slug` 都能打开对应详情页，没有 404。
- 详情页展示的组件名和 shared 元数据一致。
- 使用示例代码中的组件名与实际导出名一致。

### 视觉检查

- `inline`、`panel`、`page` 三种布局在桌面端和窄屏下都可读。
- `compact`、`cozy`、`spacious` 的内边距和媒体尺寸差异明显但不过激。
- `danger`、`warning`、`success` 等 tone 的语义与场景一致。
- loading 动画在允许动效场景下正常工作，在窄屏下没有错位。

### 内容检查

- Block 标题、描述和 CTA 没有明显占位词或示例假文案味道。
- featured blocks 与 `priorityStateBlockIds` 保持一致。
- 首页文案、安装页文案和根 README 的主张不互相冲突。

### 交互检查

- 有 `href` 的 action 渲染为链接，没有 `href` 的渲染为按钮。
- `onClick` action 可正常触发；如果同时提供 `href`，仍保持链接语义。
- `loading` action 会显示 `loadingLabel ?? "Working..."`，并阻止重复点击或跳转。
- 对 preset 传入 `primaryAction: null` 或 `secondaryAction: null` 时，默认按钮会被显式移除。
- `disabled` 与 `loading` 动作都有明显的不可交互视觉状态，包含灰态或 cursor 变化。
- 次按钮样式与主按钮明显区分。
- 移动端按钮会纵向堆叠，点击区域足够。

## 建议的 QA 场景矩阵

每次视觉或结构改动时，至少人工检查以下几类代表 Block：

| 代表 Block | 检查重点 |
| --- | --- |
| `empty-search` | 空结果语义是否清晰，`inline/panel/page` 是否都成立 |
| `onboarding-workspace` | `page + spacious + brand` 是否足够像首次启动入口，而不是普通 empty state |
| `first-project` | 是否已经更清楚地表达"工作区已存在，但还没有首个项目" |
| `page-error` | 整页错误是否有明确恢复动作 |
| `no-permission` | `warning` 语气是否准确，不像系统崩溃 |
| `upgrade-plan` | 商业引导是否自然，不像广告 Banner |
| `task-success` | 成功完成感是否明确，后续动作是否清晰 |

## 发布前最小验收

在计划对外展示或发布前，docs 站至少要满足：

- `npm run dev:docs` 可启动。
- `npm run build --workspace @statekit/docs` 通过。
- `npm run test:ui` 通过（10 个 Playwright spec）。
- Block 列表数量与 shared 中一致。
- 每个 launch 级 Block 都有可访问详情页。
- Installation 页能让新用户完成最基本接入。

## 当前缺口

这部分需要诚实记录，而不是在发布前假装不存在：

- 已有 Playwright 自动化覆盖主路径和移动端断点，但暂无像素级视觉回归；插图细节仍需人工确认。
- docs 站的组件映射仍是手工维护的（`recipe-components.ts`）。
- 示例页产品流程的覆盖密度还有提升空间，尤其是 permissions-and-upgrade 和 task-flow 示例页的叙事深度。
- 根 README 仍需按 `statekit-readme-outline.md` 单独补齐（当前 README 已基本符合大纲要求）。
