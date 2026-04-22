/**
 * 这里定义 StateKit 在各个包之间共享的基础协议。
 * `shared` 不关心具体渲染框架，只负责约束“一个状态组件至少应具备哪些语义和数据”。
 * 维护时如果调整这些类型，需要同步检查：
 * 1. `packages/shared/src/block-meta.ts` 中的预设元数据是否仍然满足约束。
 * 2. `packages/vue` 中的基础组件和包装组件是否仍能正确推导类型。
 * 3. README、docs 示例和对外导出是否需要一起更新。
 */
export type StateTone = "neutral" | "brand" | "danger" | "warning" | "success";
export type StateDensity = "compact" | "cozy" | "spacious";
export type StateLayout = "inline" | "panel" | "page";
export type StateCategory =
  | "empty"
  | "onboarding"
  | "loading"
  | "error"
  | "permission"
  | "upgrade"
  | "success";

/**
 * 19 个预设场景的稳定标识。
 * 这些 id 会被文档站、兼容包装组件、代码片段生成和 preset 元数据共同使用，
 * 因此一旦变更，就不只是改一个字符串，而是一次带兼容成本的公共 API 调整。
 */
export type StateBlockId =
  | "empty-collection"
  | "empty-search"
  | "first-project"
  | "onboarding-workspace"
  | "loading-table"
  | "loading-workspace"
  | "loading-import"
  | "inline-error"
  | "page-error"
  | "offline-error"
  | "no-permission"
  | "role-restricted"
  | "session-expired"
  | "upgrade-plan"
  | "trial-ending"
  | "usage-limit"
  | "task-success"
  | "invite-success"
  | "publish-success";

/**
 * 目前项目里所有 block 都已经实现，所以它暂时等价于 `StateBlockId`。
 * 单独保留这个别名，是为了以后如果只交付一部分 block，可以不破坏外部类型名。
 */
export type ImplementedBlockId = StateBlockId;

/**
 * CTA 点击处理器。
 * 允许返回 Promise，意味着业务侧可以在按钮点击后自行串接异步流程，
 * 但 loading 状态是否展示，依然由调用方显式控制。
 */
export type StateActionClickHandler = (event: MouseEvent) => void | Promise<void>;

export interface StateAction {
  /** 按钮或链接展示给用户看的文案。 */
  label: string;
  /** 传入后会把动作渲染成链接；不传则渲染为 button。 */
  href?: string;
  /** 显式禁用态，优先级高于普通可点击状态。 */
  disabled?: boolean;
  /** 业务侧自行控制的加载态；组件不会隐式帮你切换。 */
  loading?: boolean;
  /** loading 为 true 时用于替换普通文案的文本。 */
  loadingLabel?: string;
  /** 不走链接跳转时的点击处理器；链接也可以附带 onClick。 */
  onClick?: StateActionClickHandler;
}

/**
 * action slot 允许传 `null`，这是一个有意保留的能力：
 * `undefined` 代表“沿用默认值”，而 `null` 代表“显式移除这个动作”。
 */
export type StateActionSlot = StateAction | null;

export interface BaseStateProps {
  /** 主标题，是任何状态组件都必须具备的核心文案。 */
  title: string;
  /** 次级描述，用于补充上下文、给出恢复路径或说明下一步。 */
  description?: string;
  /** 控制视觉强调色，并联动图形、按钮和标签色。 */
  tone?: StateTone;
  /** 控制间距、插画尺寸和整体信息密度。 */
  density?: StateDensity;
  /** 控制组件在行内、面板或整页中的布局方式。 */
  layout?: StateLayout;
  /** 主操作，通常对应“下一步”或“最推荐动作”。 */
  primaryAction?: StateActionSlot;
  /** 次操作，通常对应“返回”“查看帮助”等辅助动作。 */
  secondaryAction?: StateActionSlot;
}

export interface StateBlockMeta {
  /** 预设场景的稳定内部 id。 */
  id: StateBlockId;
  /** 用于 docs/recipes 路由与外部链接的 slug。 */
  slug: string;
  /** 推荐业务方直接使用的统一入口组件名。 */
  componentName: string;
  /** 所属的大类，用于分类展示和决定默认插画。 */
  category: StateCategory;
  /** 对这个预设适用场景的简短描述。 */
  summary: string;
  /** 当前预设在产品计划中的优先级。 */
  priority: "launch" | "backlog";
  /** 是否在 docs 或示例里作为重点推荐展示。 */
  featured: boolean;
  /** 当前预设允许安全切换到的布局集合。 */
  supportedLayouts: StateLayout[];
  /** 该预设的默认标题、描述、配色、布局和 CTA。 */
  defaults: BaseStateProps;
}
