# StateKit Changelog

## 2026-04-22 Onboarding Category Pilot (Unreleased)

### Added

- Added `OnboardingState` as the seventh category-first public entry and introduced `onboarding-workspace` as the first dedicated onboarding recipe.
- Added `packages/vue/src/blocks/onboarding/OnboardingState.test.ts` so the onboarding entry now has explicit coverage for default rendering and override behavior.

### Changed

- Reframed `first-project` as an empty-state bridge for workspaces that already exist but still have no project, instead of treating it as the primary onboarding surface.
- Updated the shared shell, docs app, and `examples/vite-vue-admin` so the public product story now reads as `7` category-first entries backed by `19` preset recipes.

### Verified

- `npm run typecheck`
- `npm run build`
- `npm run test:unit`
- `npm run test:ui`
- `npm run pack:check`

## 2026-04-20 UI Test Coverage (Unreleased)

### Added

- Added `playwright.config.ts` plus `apps/docs/tests/admin-empty-states.spec.ts` to cover one `inline`, one `panel`, and one `page` docs scenario at the browser level.
- Added `vitest.config.ts`, `packages/vue/src/base/StateBlockShell.test.ts`, and `packages/vue/src/base/StatePresetBlock.test.ts` to cover CTA semantics, preset merge behavior, and unsupported layout fallback at the component level.

### Changed

- Added stable `data-testid` hooks to `apps/docs/src/views/examples/AdminEmptyStatesView.vue` so the docs example page can act as a reliable browser-level regression surface without changing the public package API.

### Verified

- `npm run test:unit`
- `npm run test:ui`
- `npm run typecheck`

## 2026-04-16 Release (0.2.1)

### Changed

- Bumped `@statekit-vue/shared` from `0.2.0` to `0.2.1`.
- Bumped `@statekit-vue/vue` from `0.2.0` to `0.2.1` and aligned its dependency on `@statekit-vue/shared` to `0.2.1`.
- Aligned `apps/docs` and `examples/vite-vue-admin` on the `0.2.1` workspace line for release verification.

### Published

- Published `@statekit-vue/shared@0.2.1`.
- Published `@statekit-vue/vue@0.2.1`.
- Confirmed the `0.2.1` release has been completed.

### Verified

- `npm run typecheck`
- `npm run build`
- `npm run pack:check`
- `npm run smoke:install`
- `npm run test:unit`
- `npm run test:ui`

## 2026-04-16 Design Refresh (Unreleased)

### Changed

- Redesigned `examples/vite-vue-admin` around a quieter, more editorial direction built from the six category-first public entries instead of the earlier admin-style card stack.
- Reworked `apps/docs/src/demo-styles.css` so the docs example pages now use more open section spacing, divider-led grouping, and lighter supporting chrome instead of stacked glass cards.
- Reduced card treatment across the docs shell in `apps/docs/src/styles.css`, including the homepage hero support area, recipe/detail/install outer containers, navigation chrome, and metadata treatments.
- Refined the shared state-shell illustrations in `packages/vue/src/base/StateBlockShell.vue` and `packages/vue/src/styles/base.css`: removed the success shadow line, centered the error cross, and rebalanced the permission lock.
- Kept the package API, preset metadata, and public component surface unchanged in this round. The work here is visual polish and documentation/example alignment only.

### Verified

- `npm run typecheck`
- `npm run build`

## 2026-04-06 Release (0.2.0)

### Added

- Added six category-first public Vue entry components: `EmptyState`, `LoadingState`, `ErrorState`, `PermissionState`, `UpgradeState`, and `SuccessState`.
- Kept the older scenario-specific exports as deprecated compatibility exports so existing consumers can migrate gradually instead of rewriting in one pass.

### Changed

- Reframed the public package surface around category-first entries backed by 18 preset recipes across six state categories.
- Renamed the docs app's primary route family from `/blocks` to `/recipes` and added redirects from the old `/blocks` URLs for compatibility.
- Renamed docs-internal helpers, data modules, and views from `block*` to `recipe*` so the docs codebase matches the current public terminology.
- Refreshed the root README, Chinese README, package README copy, and handoff notes to use the current category-first and recipe-first language consistently.
- Updated release metadata for `@statekit-vue/shared` and `@statekit-vue/vue`, including package descriptions and the `0.2.0` version line.
- Bumped `@statekit-vue/shared` and `@statekit-vue/vue` from `0.1.2` to `0.2.0`, and aligned workspace consumers on the same version line.

### Deprecated

- Scenario-specific component exports remain available, but new code should prefer the unified category-first entries.

### Published

- Published `@statekit-vue/shared@0.2.0`.
- Published `@statekit-vue/vue@0.2.0`.
- Confirmed both packages expose `0.2.0` on npm after release.

### Verified

- `npm run typecheck`
- `npm run build`
- `npm run pack:check`
- `npm run smoke:install`
- `npm view @statekit-vue/shared version`
- `npm view @statekit-vue/vue version`

## 2026-04-02 Release (0.1.2)

### Changed

- Published `@statekit-vue/shared@0.1.2` and `@statekit-vue/vue@0.1.2`.
- Finalized the CTA action object with `label`, `href`, `onClick`, `loading`, `loadingLabel`, and `disabled`.
- Added explicit `null` handling for `primaryAction` and `secondaryAction` so preset buttons can be removed intentionally.
- Updated docs, examples, and package pages to match the action API and install flow at the time of release.

### Verified

- `npm run typecheck`
- `npm run build`
- `npm run pack:check`
- `npm run smoke:install`

## 2026-04-02 Patch Release Prep (0.1.1)

### Changed

- Bumped `@statekit-vue/shared` from `0.1.0` to `0.1.1`.
- Bumped `@statekit-vue/vue` from `0.1.0` to `0.1.1` and aligned its dependency on `@statekit-vue/shared` to `0.1.1`.
- Updated the docs app, example app, and lockfile so the workspace resolved against the `0.1.1` line before publish.
