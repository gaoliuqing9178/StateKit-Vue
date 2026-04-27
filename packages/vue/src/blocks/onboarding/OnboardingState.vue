<script setup lang="ts">
/**
 * 推荐给业务侧直接使用的 onboarding 统一入口。
 * 它表达的是“首次进入产品，需要完成启动动作”的语义，
 * 不再把 first-run 激活场景继续混在通用 empty state 里。
 */
import type { BaseStateProps } from "@statekit-vue/shared";
import StateBlockShell from "../../base/StateBlockShell.vue";
import { useMergedStateProps } from "../../lib/merge-state-props";
import type { PresetStateBlockProps } from "../../types";

const props = defineProps<PresetStateBlockProps>();
const slots = defineSlots<{
  media?: () => unknown;
  actions?: () => unknown;
}>();

// 这组默认值代表 onboarding 的推荐起点：先完成第一步激活，再进入真实内容流。
const defaultProps: BaseStateProps = {
  title: "Welcome to your launch workspace",
  description:
    "Bring projects, approvals, and teammates into one guided flow so the team can start shipping without rebuilding the basics.",
  tone: "brand",
  density: "spacious",
  layout: "page",
  primaryAction: { label: "Start guided setup" },
  secondaryAction: { label: "Watch quick walkthrough" },
};

// 调用方只覆盖自己的产品文案和动作，其余视觉结构继续沿用 onboarding 默认语义。
const mergedProps = useMergedStateProps(props, defaultProps);
</script>

<template>
  <Transition appear name="sk-onboarding-transition">
    <StateBlockShell v-bind="mergedProps" category="onboarding">
      <template v-if="slots.media" #media>
        <slot name="media" />
      </template>

      <template v-if="slots.actions" #actions>
        <slot name="actions" />
      </template>
    </StateBlockShell>
  </Transition>
</template>
