<script setup lang="ts">
/**
 * 推荐给业务侧直接使用的空态统一入口。
 * 这里提供的是“无特定场景约束”的通用默认值，
 * 适合在你已经接受 category-first 设计，但暂时还不想绑定某个 preset 时使用。
 */
import type { BaseStateProps } from "@statekit-vue/shared";
import StateBlockShell from "../../base/StateBlockShell.vue";
import { useMergedStateProps } from "../../lib/merge-state-props";
import type { PresetStateBlockProps } from "../../types";

const props = defineProps<PresetStateBlockProps>();

// 这组默认文案是通用起点，不应承载越来越多的场景分支。
const defaultProps: BaseStateProps = {
  title: "Nothing here yet",
  description:
    "Create your first item or change the current view to keep moving.",
  tone: "neutral",
  density: "cozy",
  layout: "panel",
  primaryAction: { label: "Create item" },
  secondaryAction: { label: "Import" },
};

// 调用方只覆盖关心的字段，其余配置继续沿用默认值。
const mergedProps = useMergedStateProps(props, defaultProps);
</script>

<template>
  <StateBlockShell v-bind="mergedProps" category="empty" />
</template>
