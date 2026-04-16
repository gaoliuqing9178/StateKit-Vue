<script setup lang="ts">
/**
 * `StateBlockShell` 是 Vue 包里真正负责渲染 UI 的统一壳组件。
 * 六个类别入口组件和所有旧场景包装组件，最终都会收敛到这里。
 *
 * 维护建议：
 * 1. 如果要调整按钮可访问性、布局切换、图形占位符或交互细节，优先改这里。
 * 2. 如果只是改某个 preset 的默认文案，不应该在这里写分支，而应该去改元数据或对应入口组件。
 */
import { computed } from "vue";
import type {
  BaseStateProps,
  StateAction,
  StateCategory,
  StateDensity,
  StateLayout,
  StateTone,
} from "@statekit-vue/shared";

interface Props extends BaseStateProps {
  /** 用于切换默认插画、背景风格以及顶部 kicker 文案。 */
  category?: StateCategory;
}

interface RenderedAction {
  /** 用于 v-for 的稳定 key。 */
  key: string;
  /** 保留原始 action，点击时仍然回调调用方传入的处理器。 */
  source: StateAction;
  /** 根据是否传入 href 决定渲染为链接还是按钮。 */
  component: "a" | "button";
  /** 仅在可用状态下保留 href，避免禁用中的链接仍然可跳转。 */
  href?: string;
  /** 最终显示在按钮上的文案，loading 时会替换。 */
  label: string;
  /** 第二个动作会被标记成次按钮，方便样式区分。 */
  isSecondary: boolean;
  /** 业务层显式传入的禁用态。 */
  isDisabled: boolean;
  /** 统一的“当前不可交互”标记，包含 disabled 和 loading。 */
  isUnavailable: boolean;
  /** 当前是否处于加载中。 */
  isLoading: boolean;
  /** 禁用链接时把它移出 Tab 顺序，避免键盘还能聚焦到不可用项。 */
  tabIndex?: number;
}

const props = withDefaults(defineProps<Props>(), {
  tone: "neutral" as StateTone,
  density: "cozy" as StateDensity,
  layout: "panel" as StateLayout,
  category: "empty" as StateCategory,
});

// 把主次 action 统一归一化成一个数组，模板就只负责渲染，不再关心来源差异。
const actions = computed<RenderedAction[]>(() =>
  [props.primaryAction, props.secondaryAction]
    .filter((action): action is StateAction => action != null)
    .map((action, index) => {
      const isDisabled = Boolean(action.disabled);
      const isLoading = Boolean(action.loading);
      const isUnavailable = isDisabled || isLoading;

      return {
        key: `${index}-${action.label}`,
        source: action,
        component: action.href ? "a" : "button",
        href: isUnavailable ? undefined : action.href,
        label: action.loading ? action.loadingLabel ?? "Working..." : action.label,
        isSecondary: index > 0,
        isDisabled,
        isUnavailable,
        isLoading,
        tabIndex: action.href && isUnavailable ? -1 : undefined,
      };
    }),
);

// 顶部 kicker 直接从类别生成，避免每个入口组件再各自维护一份重复文案。
const categoryLabel = computed(
  () => props.category.charAt(0).toUpperCase() + props.category.slice(1),
);

/**
 * 统一处理按钮与链接的点击行为。
 * 这里不主动 await `onClick`，因为 loading 生命周期应该由业务方自己控制，
 * 否则组件层很容易和外部状态管理产生双向耦合。
 */
function handleActionClick(action: RenderedAction, event: MouseEvent) {
  if (action.isUnavailable) {
    event.preventDefault();
    return;
  }

  action.source.onClick?.(event);
}
</script>

<template>
  <section
    class="sk-shell"
    :data-category="props.category"
    :data-density="props.density"
    :data-layout="props.layout"
    :data-tone="props.tone"
  >
    <div class="sk-shell__inner">
      <div class="sk-shell__media" aria-hidden="true">
        <div class="sk-shell__media-frame">
          <slot name="media">
            <div
              v-if="props.category === 'loading'"
              class="sk-figure sk-figure--loading"
            >
              <span class="sk-figure__ring" />
            </div>
            <div
              v-else-if="props.category === 'error'"
              class="sk-figure sk-figure--error"
            >
              <span class="sk-figure__badge" />
              <span class="sk-figure__cross" />
              <span class="sk-figure__cross is-secondary" />
              <span class="sk-figure__shadow-line" />
            </div>
            <div
              v-else-if="props.category === 'permission'"
              class="sk-figure sk-figure--permission"
            >
              <span class="sk-figure__panel" />
              <span class="sk-figure__panel is-back" />
              <span class="sk-figure__lock-body" />
              <span class="sk-figure__lock-arch" />
            </div>
            <div
              v-else-if="props.category === 'upgrade'"
              class="sk-figure sk-figure--upgrade"
            >
              <span class="sk-figure__panel" />
              <span class="sk-figure__panel is-back" />
              <span class="sk-figure__spark" />
              <span class="sk-figure__spark is-secondary" />
            </div>
            <div
              v-else-if="props.category === 'success'"
              class="sk-figure sk-figure--success"
            >
              <span class="sk-figure__badge" />
              <span class="sk-figure__check" />
              <span class="sk-figure__check is-secondary" />
            </div>
            <div v-else class="sk-figure sk-figure--empty">
              <span class="sk-figure__panel" />
              <span class="sk-figure__panel is-back" />
            </div>
          </slot>
        </div>
      </div>

      <div class="sk-shell__content">
        <p class="sk-shell__kicker">{{ categoryLabel }}</p>
        <h2 class="sk-shell__title">{{ props.title }}</h2>
        <p v-if="props.description" class="sk-shell__description">
          {{ props.description }}
        </p>

        <div v-if="actions.length" class="sk-shell__actions">
          <component
            :is="action.component"
            v-for="action in actions"
            :key="action.key"
            class="sk-shell__action"
            :class="{
              'is-secondary': action.isSecondary,
              'is-disabled': action.isDisabled,
              'is-loading': action.isLoading,
            }"
            :aria-busy="action.isLoading ? 'true' : undefined"
            :aria-disabled="action.isUnavailable ? 'true' : undefined"
            :disabled="action.component === 'button' ? action.isUnavailable : undefined"
            :href="action.href"
            :tabindex="action.tabIndex"
            :type="action.component === 'button' ? 'button' : undefined"
            @click="handleActionClick(action, $event)"
          >
            {{ action.label }}
          </component>
        </div>
      </div>
    </div>
  </section>
</template>
