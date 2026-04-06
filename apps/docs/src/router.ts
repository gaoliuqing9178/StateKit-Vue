import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import RecipesView from "./views/RecipesView.vue";
import RecipeDetailView from "./views/RecipeDetailView.vue";
import InstallationView from "./views/InstallationView.vue";
import AdminEmptyStatesView from "./views/examples/AdminEmptyStatesView.vue";
import PermissionsAndUpgradeView from "./views/examples/PermissionsAndUpgradeView.vue";
import TaskFlowView from "./views/examples/TaskFlowView.vue";

export default createRouter({
  // 跟随 Vite 的 BASE_URL，当前在 Vercel 根路径部署时会是 "/"
  // 以后如果切到子路径部署，只需要改 Vite base，不必再改路由代码。
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: HomeView },
    { path: "/recipes", component: RecipesView },
    { path: "/recipes/:slug", component: RecipeDetailView },
    { path: "/blocks", redirect: "/recipes" },
    {
      path: "/blocks/:slug",
      redirect: (to) => `/recipes/${String(to.params.slug ?? "")}`,
    },
    { path: "/docs/installation", component: InstallationView },
    { path: "/examples/admin-empty-states", component: AdminEmptyStatesView },
    {
      path: "/examples/permissions-and-upgrade",
      component: PermissionsAndUpgradeView,
    },
    { path: "/examples/task-flow", component: TaskFlowView },
  ],
});
