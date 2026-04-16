# StateKit Changelog

Canonical handoff notes now live in [`docs/交接/CHANGELOG.md`](./docs/%E4%BA%A4%E6%8E%A5/CHANGELOG.md).

## 2026-04-16 Release Prep (0.2.1)

### Changed

- Prepared `@statekit-vue/shared` and `@statekit-vue/vue` for the `0.2.1` patch release.
- Aligned workspace consumers on the `0.2.1` line for docs and example verification.
- Carried the latest design refresh into release prep, including the example/docs de-carding work and shared illustration fixes for error, permission, and success states.

### Verified

- `npm run typecheck`
- `npm run build`
- `npm run pack:check`
- `npm run smoke:install`

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
