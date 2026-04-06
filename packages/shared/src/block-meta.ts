/**
 * 这里维护所有 preset block 的单一事实来源。
 * Vue 包里的兼容包装组件、docs 的 recipes 列表、以及对外展示的默认文案，
 * 最终都应该从这里读取，而不是分别在多个地方手写一份。
 *
 * 维护原则：
 * 1. 如果只是想调整某个预设的默认标题、描述、布局或按钮，优先改这里。
 * 2. `componentName` 指向推荐给业务方使用的统一类别入口，`id`/`slug` 才是具体 preset。
 * 3. `supportedLayouts` 决定某个 preset 能否安全切换布局，`StatePresetBlock` 会据此兜底。
 */

import type {
  ImplementedBlockId,
  StateBlockId,
  StateBlockMeta,
  StateLayout,
} from "./types";
const allLayouts: StateLayout[] = ["inline", "panel", "page"];
const panelAndPage: StateLayout[] = ["panel", "page"];
const inlineAndPanel: StateLayout[] = ["inline", "panel"];

/**
 * 所有预设场景的元数据清单。
 * 顺序本身也有意义：docs 与部分消费方会按这里的顺序展示内容，
 * 所以调整顺序前要先确认是否会影响展示优先级。
 */
export const stateBlockMetaList: StateBlockMeta[] = [
  // empty 类预设：没有内容、没有搜索结果或首次进入时的空态。
  {
    id: "empty-collection",
    slug: "empty-collection-state",
    componentName: "EmptyState",
    category: "empty",
    summary: "Use when a collection has not been started yet.",
    priority: "backlog",
    featured: false,
    supportedLayouts: panelAndPage,
    defaults: {
      title: "No items yet",
      description: "Create your first item to start filling this collection.",
      tone: "neutral",
      density: "cozy",
      layout: "panel",
      primaryAction: { label: "Create item" },
      secondaryAction: { label: "Import" },
    },
  },
  {
    id: "empty-search",
    slug: "empty-search-state",
    componentName: "EmptyState",
    category: "empty",
    summary: "Use when search or filters return zero results.",
    priority: "launch",
    featured: true,
    supportedLayouts: allLayouts,
    defaults: {
      title: "No results found",
      description: "Try a different keyword or clear your filters.",
      tone: "neutral",
      density: "cozy",
      layout: "panel",
      primaryAction: { label: "Clear filters" },
      secondaryAction: { label: "Create item" },
    },
  },
  {
    id: "first-project",
    slug: "first-project-state",
    componentName: "EmptyState",
    category: "empty",
    summary: "Use as an onboarding-ready first-run state for a workspace.",
    priority: "launch",
    featured: true,
    supportedLayouts: panelAndPage,
    defaults: {
      title: "Create your first project",
      description:
        "Start with a project space to organize files, teammates, and tasks.",
      tone: "brand",
      density: "spacious",
      layout: "page",
      primaryAction: { label: "Create project" },
      secondaryAction: { label: "View example" },
    },
  },
  // loading 类预设：数据、工作区或导入任务尚未完成时的过渡状态。
  {
    id: "loading-table",
    slug: "loading-table-state",
    componentName: "LoadingState",
    category: "loading",
    summary:
      "Use when table rows are loading and structure should stay visible.",
    priority: "backlog",
    featured: false,
    supportedLayouts: inlineAndPanel,
    defaults: {
      title: "Loading records",
      description: "Fetching the latest records for this view.",
      tone: "neutral",
      density: "compact",
      layout: "inline",
    },
  },
  {
    id: "loading-workspace",
    slug: "loading-workspace-state",
    componentName: "LoadingState",
    category: "loading",
    summary: "Use while preparing a workspace or editor surface.",
    priority: "backlog",
    featured: false,
    supportedLayouts: panelAndPage,
    defaults: {
      title: "Preparing your workspace",
      description:
        "We are setting up the structure so you can get back to work.",
      tone: "neutral",
      density: "spacious",
      layout: "page",
    },
  },
  {
    id: "loading-import",
    slug: "loading-import-state",
    componentName: "LoadingState",
    category: "loading",
    summary: "Use during import, sync, or bulk-processing tasks.",
    priority: "backlog",
    featured: false,
    supportedLayouts: allLayouts,
    defaults: {
      title: "Import in progress",
      description:
        "Large uploads can take a moment. You can keep working while we process this task.",
      tone: "brand",
      density: "cozy",
      layout: "panel",
      primaryAction: { label: "View tasks" },
    },
  },
  // error 类预设：局部失败、整页失败或离线错误。
  {
    id: "inline-error",
    slug: "inline-error-state",
    componentName: "ErrorState",
    category: "error",
    summary: "Use for localized failures inside a table, list, or panel.",
    priority: "backlog",
    featured: false,
    supportedLayouts: inlineAndPanel,
    defaults: {
      title: "Something went wrong",
      description:
        "Try loading this section again or contact support if the issue keeps happening.",
      tone: "danger",
      density: "compact",
      layout: "inline",
      primaryAction: { label: "Try again" },
      secondaryAction: { label: "Contact support" },
    },
  },
  {
    id: "page-error",
    slug: "page-error-state",
    componentName: "ErrorState",
    category: "error",
    summary: "Use when a full page fails to load essential data.",
    priority: "launch",
    featured: true,
    supportedLayouts: panelAndPage,
    defaults: {
      title: "We could not load this page",
      description:
        "The data needed for this view is unavailable right now. Reload or go back to a safe place.",
      tone: "danger",
      density: "spacious",
      layout: "page",
      primaryAction: { label: "Reload" },
      secondaryAction: { label: "Go back" },
    },
  },
  {
    id: "offline-error",
    slug: "offline-error-state",
    componentName: "ErrorState",
    category: "error",
    summary:
      "Use when the user is offline or the network connection is interrupted.",
    priority: "backlog",
    featured: false,
    supportedLayouts: panelAndPage,
    defaults: {
      title: "You are offline",
      description:
        "Check your connection and try again once you are back online.",
      tone: "danger",
      density: "cozy",
      layout: "panel",
      primaryAction: { label: "Try again" },
    },
  },
  // permission 类预设：无权限、角色受限或登录态失效。
  {
    id: "no-permission",
    slug: "no-permission-state",
    componentName: "PermissionState",
    category: "permission",
    summary:
      "Use when a page or resource is not accessible to the current user.",
    priority: "launch",
    featured: true,
    supportedLayouts: panelAndPage,
    defaults: {
      title: "You do not have access",
      description:
        "Ask an administrator for access to this workspace or return to a page you can use.",
      tone: "warning",
      density: "cozy",
      layout: "panel",
      primaryAction: { label: "Request access" },
      secondaryAction: { label: "Go back" },
    },
  },
  {
    id: "role-restricted",
    slug: "role-restricted-state",
    componentName: "PermissionState",
    category: "permission",
    summary: "Use when a user can view the page but cannot perform the action.",
    priority: "backlog",
    featured: false,
    supportedLayouts: inlineAndPanel,
    defaults: {
      title: "Your role cannot perform this action",
      description:
        "You can view this information, but an administrator must complete this step.",
      tone: "warning",
      density: "compact",
      layout: "inline",
      primaryAction: { label: "Contact admin" },
    },
  },
  {
    id: "session-expired",
    slug: "session-expired-state",
    componentName: "PermissionState",
    category: "permission",
    summary:
      "Use when the user session has expired and re-authentication is required.",
    priority: "backlog",
    featured: false,
    supportedLayouts: panelAndPage,
    defaults: {
      title: "Your session has expired",
      description: "Sign in again to continue where you left off.",
      tone: "warning",
      density: "cozy",
      layout: "panel",
      primaryAction: { label: "Sign in again" },
    },
  },
  // upgrade 类预设：功能受套餐限制、试用即将结束或配额达到上限。
  {
    id: "upgrade-plan",
    slug: "upgrade-plan-state",
    componentName: "UpgradeState",
    category: "upgrade",
    summary: "Use when a feature is gated by plan or subscription tier.",
    priority: "launch",
    featured: true,
    supportedLayouts: panelAndPage,
    defaults: {
      title: "Upgrade to unlock this feature",
      description:
        "Move to a higher plan to access advanced workflows, higher limits, and collaboration controls.",
      tone: "brand",
      density: "spacious",
      layout: "page",
      primaryAction: { label: "Upgrade plan" },
      secondaryAction: { label: "Compare plans" },
    },
  },
  {
    id: "trial-ending",
    slug: "trial-ending-state",
    componentName: "UpgradeState",
    category: "upgrade",
    summary: "Use when a free trial is close to its expiration date.",
    priority: "backlog",
    featured: false,
    supportedLayouts: panelAndPage,
    defaults: {
      title: "Your trial ends soon",
      description:
        "Choose a plan now to keep your projects, teammates, and automation running without interruption.",
      tone: "warning",
      density: "cozy",
      layout: "panel",
      primaryAction: { label: "Choose a plan" },
      secondaryAction: { label: "Talk to sales" },
    },
  },
  {
    id: "usage-limit",
    slug: "usage-limit-state",
    componentName: "UpgradeState",
    category: "upgrade",
    summary: "Use when a team has reached a quota or plan limit.",
    priority: "backlog",
    featured: false,
    supportedLayouts: allLayouts,
    defaults: {
      title: "You have reached your limit",
      description:
        "Increase your limit or review usage to keep work moving without interruptions.",
      tone: "warning",
      density: "cozy",
      layout: "panel",
      primaryAction: { label: "Increase limit" },
      secondaryAction: { label: "View usage" },
    },
  },
  // success 类预设：任务完成、邀请成功或发布成功后的反馈。
  {
    id: "task-success",
    slug: "task-success-state",
    componentName: "SuccessState",
    category: "success",
    summary:
      "Use when an import, export, or background task completes successfully.",
    priority: "launch",
    featured: true,
    supportedLayouts: panelAndPage,
    defaults: {
      title: "Task completed",
      description:
        "Your task finished successfully. Review the results or start the next one.",
      tone: "success",
      density: "spacious",
      layout: "page",
      primaryAction: { label: "View results" },
      secondaryAction: { label: "Start another" },
    },
  },
  {
    id: "invite-success",
    slug: "invite-success-state",
    componentName: "SuccessState",
    category: "success",
    summary: "Use when team invitations have been sent.",
    priority: "backlog",
    featured: false,
    supportedLayouts: panelAndPage,
    defaults: {
      title: "Invitations sent",
      description:
        "Your teammates will receive an email shortly. Keep organizing your workspace while they join.",
      tone: "success",
      density: "cozy",
      layout: "panel",
      primaryAction: { label: "Manage members" },
      secondaryAction: { label: "Invite more" },
    },
  },
  {
    id: "publish-success",
    slug: "publish-success-state",
    componentName: "SuccessState",
    category: "success",
    summary:
      "Use when content, configuration, or a page is published successfully.",
    priority: "backlog",
    featured: false,
    supportedLayouts: panelAndPage,
    defaults: {
      title: "Published successfully",
      description:
        "Your changes are live. Review the published page or head back to the dashboard.",
      tone: "success",
      density: "cozy",
      layout: "panel",
      primaryAction: { label: "View live page" },
      secondaryAction: { label: "Back to dashboard" },
    },
  },
];

/**
 * 首批重点展示的预设 id。
 * 一般用于首页推荐、示例优先级或发版阶段的重点能力说明。
 */
export const priorityStateBlockIds = [
  "empty-search",
  "no-permission",
  "upgrade-plan",
  "page-error",
  "task-success",
  "first-project",
] as const satisfies readonly ImplementedBlockId[];

/**
 * 当前仓库里已经实现的全部 preset id。
 * 保留这个列表是为了在“规划中但尚未交付”的场景出现时仍能区分已实现范围。
 */
export const implementedBlockIds = [
  "empty-collection",
  "empty-search",
  "first-project",
  "loading-table",
  "loading-workspace",
  "loading-import",
  "inline-error",
  "page-error",
  "offline-error",
  "no-permission",
  "role-restricted",
  "session-expired",
  "upgrade-plan",
  "trial-ending",
  "usage-limit",
  "task-success",
  "invite-success",
  "publish-success",
] as const satisfies readonly ImplementedBlockId[];

/** 方便按 id 直接取元数据，避免每次都线性遍历列表。 */
export const stateBlockMetaById = Object.fromEntries(
  stateBlockMetaList.map((meta) => [meta.id, meta]),
) as Record<StateBlockId, StateBlockMeta>;

/** docs 和路由场景更常按 slug 检索，所以单独维护一份索引。 */
export const stateBlockMetaBySlug = Object.fromEntries(
  stateBlockMetaList.map((meta) => [meta.slug, meta]),
) as Record<string, StateBlockMeta>;

/** 已排序的重点预设详情列表，供界面直接消费。 */
export const priorityStateBlocks = priorityStateBlockIds.map(
  (id) => stateBlockMetaById[id],
);

const implementedBlockSet = new Set<string>(implementedBlockIds);

/**
 * 运行时类型守卫。
 * 主要用于把来自路由、配置或外部输入的字符串收窄为已实现的 preset id。
 */
export function isImplementedBlockId(
  value: string,
): value is ImplementedBlockId {
  return implementedBlockSet.has(value);
}
