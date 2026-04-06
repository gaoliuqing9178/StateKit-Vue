<script setup lang="ts">
/**
 * 兼容层组件：
 * 1. 保留旧的 `TaskSuccessState` 名称，内部映射到 `task-success` 预设。
 * 2. 任务完成的默认展示逻辑仍然来自统一 preset 系统，这里只负责旧名兼容。
 * 3. 后续更推荐直接使用 `SuccessState`，再按业务结果覆盖标题与 CTA。
 */
import StatePresetBlock from "../../base/StatePresetBlock.vue";
import type { PresetStateBlockProps } from "../../types";
defineProps<PresetStateBlockProps>();
</script>

<template><StatePresetBlock block-id="task-success" v-bind="$props" /></template>
