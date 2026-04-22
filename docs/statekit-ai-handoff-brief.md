# StateKit AI Handoff Brief

## 项目一句话

StateKit 是一个面向 SaaS 产品的 category-first 状态 UI 组件库，当前以 Vue 3 为主，聚焦 empty / onboarding / loading / error / permission / upgrade / success 这类状态页与流程节点。

## 当前仓库事实

- 仓库是 monorepo。
- `packages/shared` 是 `@statekit-vue/shared` 的源码目录，也是共享类型与 recipe 元数据的单一事实来源。
- `packages/vue` 提供 `@statekit-vue/vue` 的组件实现、导出和默认样式。
- `apps/docs` 是文档站与主要人工 QA 面板。
- `examples/vite-vue-admin` 用于展示更真实的集成场景。

## 当前实现方式

- 公开 API 已经收敛到 7 个 category-first 入口：`EmptyState`、`OnboardingState`、`LoadingState`、`ErrorState`、`PermissionState`、`UpgradeState`、`SuccessState`。
- 底层仍保留 19 个 preset recipes；旧场景名组件继续作为 deprecated compatibility exports 保留。
- Vue 层核心渲染逻辑集中在 `StatePresetBlock` 和 `StateBlockShell`。
- docs 站直接读取 shared 元数据，shared 变更会同步影响 docs 展示与示例代码。

## 当前版本状态

- npm 上最新已发布版本：
  - `@statekit-vue/shared@0.2.1`
  - `@statekit-vue/vue@0.2.1`
- 本地 workspace 当前仍在 `0.2.1` 版本线，但已经包含未发版的 onboarding category pilot。

## 最近已经完成的工作

- example 已完成第一轮视觉重做，方向是更安静、更开放的 editorial layout，而不是 admin 卡片墙。
- docs 示例页和 docs 站外层样式已一起收口，整体持续减少卡片感。
- onboarding 已作为独立 category 试点引入，当前先提供 `OnboardingState` 和 `onboarding-workspace` 这条完整链路。
- 共享插图细节已修正：
  - success 去掉 shadow line
  - error cross 改成真正居中
  - permission lock 改成专用居中定位
- 交接文档当前维护在 `docs/交接/` 下。

## 如果你要继续开发

建议遵守这个顺序：

1. 先改 `packages/shared`
2. 再改 `packages/vue`
3. 再改 `apps/docs` 和 `examples/vite-vue-admin`
4. 最后同步 README、CHANGELOG、handoff brief 和 launch checklist

不要倒过来先改 docs 文案，再回头猜实现应该是什么。

## 你最应该看的文件

- `packages/shared/src/types.ts`
- `packages/shared/src/block-meta.ts`
- `packages/vue/src/base/StatePresetBlock.vue`
- `packages/vue/src/base/StateBlockShell.vue`
- `packages/vue/src/styles/base.css`
- `apps/docs/src/styles.css`
- `apps/docs/src/demo-styles.css`
- `apps/docs/src/router.ts`
- `apps/docs/src/lib/recipe-docs.ts`
- `apps/docs/src/lib/recipe-components.ts`

## 不要误判的地方

- StateKit 不是通用组件库。
- onboarding 已经是独立 category，不要再默认把 first-run 激活语义塞回 `empty`。
- 当前没有第三个 CTA，也没有复杂 slot 系统。
- docs 站不是 marketing site，而是产品文档和 QA 工具。
- 当前没有自动化视觉回归；很多视觉调整仍需要人工检查 docs/example。

## 当前已验证

- `npm run typecheck` 已通过
- `npm run build` 已通过
- `npm run pack:check` 已通过
- `npm run smoke:install` 已通过

## 当前优先方向

- 验证 onboarding category pilot 的语义、文档和示例是否足够顺手
- 继续收 docs/example 的外层视觉，减少卡片感，但不要把站点做成纯 marketing page
- 给 `error` / `permission` / `success` 这些插图补更稳的视觉回归
- 持续维持 README、package README、launch checklist、handoff notes 的口径一致
