/**
 * Vue 包入口：
 * 1. 导出推荐的类别优先入口组件。
 * 2. 继续导出旧的场景化组件名，作为兼容层，方便存量项目平滑迁移。
 * 3. 样式在入口统一注入，因此大多数消费方只需要导入这个包即可拿到完整体验。
 */

import "./styles/index.css";
import StateBlockShellComponent from "./base/StateBlockShell.vue";
import EmptyStateComponent from "./blocks/empty/EmptyState.vue";
import EmptyCollectionStateComponent from "./blocks/empty/EmptyCollectionState.vue";
import EmptySearchStateComponent from "./blocks/empty/EmptySearchState.vue";
import FirstProjectStateComponent from "./blocks/empty/FirstProjectState.vue";
import OnboardingStateComponent from "./blocks/onboarding/OnboardingState.vue";
import LoadingStateComponent from "./blocks/loading/LoadingState.vue";
import LoadingTableStateComponent from "./blocks/loading/LoadingTableState.vue";
import LoadingWorkspaceStateComponent from "./blocks/loading/LoadingWorkspaceState.vue";
import LoadingImportStateComponent from "./blocks/loading/LoadingImportState.vue";
import ErrorStateComponent from "./blocks/error/ErrorState.vue";
import InlineErrorStateComponent from "./blocks/error/InlineErrorState.vue";
import PageErrorStateComponent from "./blocks/error/PageErrorState.vue";
import OfflineErrorStateComponent from "./blocks/error/OfflineErrorState.vue";
import PermissionStateComponent from "./blocks/permission/PermissionState.vue";
import NoPermissionStateComponent from "./blocks/permission/NoPermissionState.vue";
import RoleRestrictedStateComponent from "./blocks/permission/RoleRestrictedState.vue";
import SessionExpiredStateComponent from "./blocks/permission/SessionExpiredState.vue";
import UpgradeStateComponent from "./blocks/upgrade/UpgradeState.vue";
import UpgradePlanStateComponent from "./blocks/upgrade/UpgradePlanState.vue";
import TrialEndingStateComponent from "./blocks/upgrade/TrialEndingState.vue";
import UsageLimitStateComponent from "./blocks/upgrade/UsageLimitState.vue";
import SuccessStateComponent from "./blocks/success/SuccessState.vue";
import TaskSuccessStateComponent from "./blocks/success/TaskSuccessState.vue";
import InviteSuccessStateComponent from "./blocks/success/InviteSuccessState.vue";
import PublishSuccessStateComponent from "./blocks/success/PublishSuccessState.vue";

export const StateBlockShell: typeof StateBlockShellComponent =
  StateBlockShellComponent;
export const EmptyState: typeof EmptyStateComponent = EmptyStateComponent;
export const OnboardingState: typeof OnboardingStateComponent =
  OnboardingStateComponent;
export const LoadingState: typeof LoadingStateComponent = LoadingStateComponent;
export const ErrorState: typeof ErrorStateComponent = ErrorStateComponent;
export const PermissionState: typeof PermissionStateComponent =
  PermissionStateComponent;
export const UpgradeState: typeof UpgradeStateComponent = UpgradeStateComponent;
export const SuccessState: typeof SuccessStateComponent = SuccessStateComponent;

/**
 * @deprecated 请改用 `EmptyState`，并通过内容、布局和动作参数自行定制。
 */
export const EmptyCollectionState: typeof EmptyCollectionStateComponent =
  EmptyCollectionStateComponent;
/**
 * @deprecated 请改用 `EmptyState`，并通过内容、布局和动作参数自行定制。
 */
export const EmptySearchState: typeof EmptySearchStateComponent =
  EmptySearchStateComponent;
/**
 * @deprecated 请改用 `EmptyState`，并通过内容、布局和动作参数自行定制。
 */
export const FirstProjectState: typeof FirstProjectStateComponent =
  FirstProjectStateComponent;
/**
 * @deprecated 请改用 `LoadingState`，并通过内容、布局和动作参数自行定制。
 */
export const LoadingTableState: typeof LoadingTableStateComponent =
  LoadingTableStateComponent;
/**
 * @deprecated 请改用 `LoadingState`，并通过内容、布局和动作参数自行定制。
 */
export const LoadingWorkspaceState: typeof LoadingWorkspaceStateComponent =
  LoadingWorkspaceStateComponent;
/**
 * @deprecated 请改用 `LoadingState`，并通过内容、布局和动作参数自行定制。
 */
export const LoadingImportState: typeof LoadingImportStateComponent =
  LoadingImportStateComponent;
/**
 * @deprecated 请改用 `ErrorState`，并通过内容、布局和动作参数自行定制。
 */
export const InlineErrorState: typeof InlineErrorStateComponent =
  InlineErrorStateComponent;
/**
 * @deprecated 请改用 `ErrorState`，并通过内容、布局和动作参数自行定制。
 */
export const PageErrorState: typeof PageErrorStateComponent =
  PageErrorStateComponent;
/**
 * @deprecated 请改用 `ErrorState`，并通过内容、布局和动作参数自行定制。
 */
export const OfflineErrorState: typeof OfflineErrorStateComponent =
  OfflineErrorStateComponent;
/**
 * @deprecated 请改用 `PermissionState`，并通过内容、布局和动作参数自行定制。
 */
export const NoPermissionState: typeof NoPermissionStateComponent =
  NoPermissionStateComponent;
/**
 * @deprecated 请改用 `PermissionState`，并通过内容、布局和动作参数自行定制。
 */
export const RoleRestrictedState: typeof RoleRestrictedStateComponent =
  RoleRestrictedStateComponent;
/**
 * @deprecated 请改用 `PermissionState`，并通过内容、布局和动作参数自行定制。
 */
export const SessionExpiredState: typeof SessionExpiredStateComponent =
  SessionExpiredStateComponent;
/**
 * @deprecated 请改用 `UpgradeState`，并通过内容、布局和动作参数自行定制。
 */
export const UpgradePlanState: typeof UpgradePlanStateComponent =
  UpgradePlanStateComponent;
/**
 * @deprecated 请改用 `UpgradeState`，并通过内容、布局和动作参数自行定制。
 */
export const TrialEndingState: typeof TrialEndingStateComponent =
  TrialEndingStateComponent;
/**
 * @deprecated 请改用 `UpgradeState`，并通过内容、布局和动作参数自行定制。
 */
export const UsageLimitState: typeof UsageLimitStateComponent =
  UsageLimitStateComponent;
/**
 * @deprecated 请改用 `SuccessState`，并通过内容、布局和动作参数自行定制。
 */
export const TaskSuccessState: typeof TaskSuccessStateComponent =
  TaskSuccessStateComponent;
/**
 * @deprecated 请改用 `SuccessState`，并通过内容、布局和动作参数自行定制。
 */
export const InviteSuccessState: typeof InviteSuccessStateComponent =
  InviteSuccessStateComponent;
/**
 * @deprecated 请改用 `SuccessState`，并通过内容、布局和动作参数自行定制。
 */
export const PublishSuccessState: typeof PublishSuccessStateComponent =
  PublishSuccessStateComponent;

export type { PresetStateBlockProps } from "./types";
export * from "@statekit-vue/shared";
