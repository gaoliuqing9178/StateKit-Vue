<script setup lang="ts">
/**
 * 推荐给业务侧直接使用的加载态统一入口。
 * 它表达的是“当前还在准备中”，而不是某一个具体的加载流程，
 * 所以默认文案保持克制，方便业务侧进一步覆盖成表格加载、导入中等具体场景。
 */
import type { BaseStateProps } from "@statekit-vue/shared";
import StateBlockShell from "../../base/StateBlockShell.vue";
import { useMergedStateProps } from "../../lib/merge-state-props";
import type { PresetStateBlockProps } from "../../types";

const props = defineProps<PresetStateBlockProps>();

// 通用加载态默认值，适合作为绝大多数“页面还没准备好”的起点。
const defaultProps: BaseStateProps = {
  title: "Loading this view",
  description: "We are preparing the latest data and layout for this screen.",
  tone: "neutral",
  density: "cozy",
  layout: "panel",
};

// 让业务侧能最小化传参，同时保留完整的默认体验。
const mergedProps = useMergedStateProps(props, defaultProps);
</script>

<template>
  <StateBlockShell v-bind="mergedProps" category="loading" />
</template>
