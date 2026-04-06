/**
 * docs 站点的 Vite 配置。
 * 这里主要做两件事：
 * 1. 把 docs 中对 `@statekit-vue/shared` / `@statekit-vue/vue` 的引用指回 monorepo 源码，
 *    这样文档站始终展示当前工作区里的最新实现，而不是某个已发布的 dist 产物。
 * 2. 配合根目录 `vercel.json` 做静态部署；当前默认以根路径 `/` 作为站点 base。
 */

import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
export default defineConfig({
  plugins: [vue()],
  // Vercel 当前按根路径部署 docs，保留显式 base 便于后续迁移到子路径时统一收口。
  base: "/",
  resolve: {
    alias: [
      {
        find: "@statekit-vue/vue/styles.css",
        replacement: fileURLToPath(new URL("../../packages/vue/src/styles/index.css", import.meta.url)),
      },
      {
        find: "@statekit-vue/shared",
        replacement: fileURLToPath(new URL("../../packages/shared/src/index.ts", import.meta.url)),
      },
      {
        find: "@statekit-vue/vue",
        replacement: fileURLToPath(new URL("../../packages/vue/src/index.ts", import.meta.url)),
      },
    ],
  },
});
