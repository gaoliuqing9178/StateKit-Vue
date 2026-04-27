# StateKit TODO

这份清单只保留当前还需要推进的事项。现在的重点已经不是 `0.2.1` 发版收口，而是：

1. 把 `onboarding` category pilot 收到可发布状态。
2. 继续增加高价值场景组件 / preset recipes，让覆盖率真正往前走。
3. 在扩展过程中守住 StateKit 的边界，不把它做成失控的大杂烩。

## P0 近期必须收口

- [ ] 为 `onboarding` category pilot 确定下一次版本号与发布口径
  目标：确认这次是按 patch 还是 minor 处理，并把原因写清楚。
  当前更合理的默认倾向：把“新增独立 category-first 入口 `OnboardingState`”视为公开 API 扩展，更偏向按 minor 版本处理。
  需要同步的文件：`README.md`、`README.zh-CN.md`、`packages/vue/README.md`、`docs/statekit-ai-handoff-brief.md`、`docs/statekit-launch-checklist.md`、`docs/交接/CHANGELOG.md`、`docs/交接/剩餘部分.md`。
  完成标准：对外文档、交接文档和最终版本号口径一致，不再出现“代码里已经有 onboarding，但发布说明还像 0.2.1 patch 尾声”的割裂表述。

- [ ] 补一次围绕 `onboarding` 的人工 QA
  目标：确认新增的第 7 类状态在 docs 和 example 里是“语义更清楚”，而不是只是多了一个名字。
  重点页面：`/`、`/recipes`、`/recipes/onboarding-workspace-state`、`/examples/admin-empty-states`、`examples/vite-vue-admin`。
  重点宽度：`1700`、`1440`、`1280`、`1160`、`1000`、`760`。
  检查点：`OnboardingState` 的图形、标题节奏、CTA 层级、移动端按钮堆叠、以及它和 `EmptyState` / `first-project` 的语义边界是否足够清楚。
  完成标准：从首页到详情页到示例页，用户能直观看出“onboarding 不是 generic empty state”。

- [ ] 在最终发版前重新跑完整发布链路
  命令：
  ```bash
  npm run typecheck
  npm run build
  npm run test:unit
  npm run test:ui
  npm run pack:check
  npm run smoke:install
  ```
  说明：当前 `typecheck`、`build`、`test:unit`、`test:ui`、`pack:check` 已为 onboarding 这轮重新验证过，但 `smoke:install` 还需要在最终发版口径定稿后再补一次。
  完成标准：六个命令全部通过，并且结果与交接文档一致。

## P1 下一阶段最值得推进

- [ ] 把 `onboarding` 从 1 个试点 recipe 扩成最小闭环
  当前只有 `onboarding-workspace`，语义还不够完整。
  建议下一批至少再补 2 个高信号 onboarding recipes：
  1. 邀请首位成员 / 邀请协作者
  2. 完成初始连接或初始配置
  完成标准：`OnboardingState` 不再只对应“创建 workspace”这一个瞬间，而能覆盖 first-run 激活链路里最常见的几个节点。

- [ ] 先做“场景缺口矩阵”，再决定下一批新增组件
  目标：避免凭感觉一直加组件名，最后把 API 做散。
  建议维度：`category × 用户阶段（start / operate / blocked / recover / finish）`。
  输出内容：哪些高频场景已经有 recipe，哪些缺口最值得补，哪些其实只需要覆盖文案而不需要新增组件。
  完成标准：下一批扩展有一张可复用的缺口表，而不是每次重新拍脑袋。

- [ ] 新增场景时，优先扩 recipe 覆盖率，而不是继续膨胀顶层公开入口
  目标：让 StateKit 继续保持“少量统一入口 + 多个高价值 preset recipe”的结构。
  做法：默认先在 `packages/shared/src/block-meta.ts` 增 recipe，再同步 docs/example；只有当多个高频场景都明显不适合现有 7 个 category 时，才考虑新增第 8 类入口。
  完成标准：新增场景后，公开 API 仍然清楚，不会退回到“每个场景一个公开组件名”的旧路径。

- [ ] 扩 docs / example 的产品上下文，而不是只在 metadata 里增加 recipe
  当前已有三条 docs example 和一个外部 example，但对 onboarding 之后的链路仍然偏少。
  建议优先补：一个 onboarding-heavy 的启动流程页面，或者把现有示例页继续串成更完整的“首次进入 -> 配置 -> 阻断 -> 完成”路径。
  完成标准：新增 recipe 不是只在列表里能看到，而是在真实产品流里也能看到为什么要有它。

- [ ] 把 UI 自动化覆盖扩到更多示例页和主路径
  当前浏览器级测试已经覆盖了 recipes 导航与 `Admin Empty States`。
  下一步优先补：`/` 首页基础导航、`/examples/permissions-and-upgrade`、`/examples/task-flow`，以及 onboarding 之后新增的关键示例页。
  完成标准：未来再加 recipe 或调 CTA / layout / docs 路由时，不会只能靠人工回归。

- [ ] 继续减少 docs 站的手写分类文案与维护点
  当前 recipe 列表和详情页虽然已经主要吃 shared 元数据，但首页分类说明、部分 usage copy 仍然是手写维护。
  目标：在不把 shared 搞得过重的前提下，继续减少“新增一个 recipe / category 时需要手动改很多地方”的成本。
  完成标准：新增 recipe 或调整 category 文案时，docs 同步点进一步减少。

## P2 后续可评估

- [ ] 评估是否需要在 `onboarding` 之后继续新增第 8 类 category
  原则：只有当多个高频场景都已经明显不适合 `empty / onboarding / loading / error / permission / upgrade / success` 任一语义时再拆。
  目标：避免为了多几个组件而把类别体系越拆越碎。

- [ ] 评估是否解耦“类别默认图形”和“个别 recipe 专属图形”
  目标：提高后续定制能力，但不要破坏当前 shared metadata + preset block 的简单结构。
  当前最值得关注的不是全部 recipe，而是 `onboarding`、`upgrade`、`success` 这些更容易需要专属语义图形的类别。
  完成标准：只有在现有图形复用开始明显限制表达时再推进。

## 明确不在当前范围内

- [ ] 不新增第三个 CTA
- [ ] 不引入复杂 slot 系统
- [ ] 不把 StateKit 扩成高度自由的页面搭建器
- [ ] 不对外暗示 React 或多框架支持
- [ ] 不为每个新增 recipe 都额外暴露一个新的公开入口组件

这些不是“忘了做”，而是当前版本必须明确守住的边界。
