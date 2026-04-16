# StateKit Launch Checklist

这份清单用于 StateKit 对外发布前的最后收口。当前这一版按 `0.2.1` patch 发包准备状态维护。

## 1. 产品范围确认

- [x] 一句话定位保持为“面向 SaaS 产品的 category-first 状态 UI 组件库”
- [x] 当前只对外承诺 Vue 3 支持，不暗示 React 或多框架
- [x] 公开主入口仍然是 6 个 category-first 组件
- [x] onboarding 仍通过 empty 类别里的 first-run recipes 表达，不是独立类别

## 2. 包结构与导出

- [x] `@statekit-vue/shared` 的导出、类型入口和构建脚本正确
- [x] `@statekit-vue/vue` 的导出、样式入口和 peerDependencies 正确
- [x] `@statekit-vue/vue` 对 `@statekit-vue/shared` 的依赖已同步到 `0.2.1`
- [x] `apps/docs` 和 `examples/vite-vue-admin` 已对齐到 `0.2.1`

## 3. 文档准备

- [x] README 与 package README 已反映 category-first API
- [x] 交接文档当前维护在 `docs/交接/`
- [x] release-facing `CHANGELOG.md` 已可访问
- [x] handoff brief 和 launch checklist 已更新到当前版本状态

## 4. Docs 站准备

- [x] 首页、recipes、recipe detail、installation 和 examples 页面都仍可构建
- [x] docs 示例页已同步第一轮“去卡片化”视觉收口
- [ ] 人工浏览 docs 首页、`/recipes`、`/recipes/:slug` 和三个 example 页
- [ ] 人工检查移动端留白、分隔线、hover 强度和 CTA 节奏

## 5. Example 工程准备

- [x] `examples/vite-vue-admin` 已改成更开放的 editorial layout 示例页
- [x] 示例页继续使用 6 个 category-first 入口，不依赖旧场景名 API
- [ ] 人工确认 example 页在桌面和移动端都没有视觉失衡

## 6. 共享图形检查

- [x] `SuccessState` 已移除 `sk-figure__shadow-line`
- [x] `ErrorState` 的 cross 已居中
- [x] `PermissionState` 的 lock 已重新居中
- [ ] 人工确认三组图形在 `inline` / `panel` / `page` 下都协调

## 7. 质量检查

- [x] `npm run typecheck`
- [x] `npm run build`
- [x] `npm run pack:check`
- [x] `npm run smoke:install`

## 8. npm 发布状态

- [x] npm 上最新已发布版本仍是 `0.2.0`
- [x] 本地 workspace 当前版本线已提升到 `0.2.1`
- [ ] 发布 `@statekit-vue/shared@0.2.1`
- [ ] 发布 `@statekit-vue/vue@0.2.1`
- [ ] 发布后确认两个包的 `latest` dist-tag 指向 `0.2.1`

## 9. 发布后跟进

- [ ] `npm view @statekit-vue/shared version`
- [ ] `npm view @statekit-vue/vue version`
- [ ] 更新交接文档里的“已发布状态”
- [ ] 继续补视觉回归或截图测试
