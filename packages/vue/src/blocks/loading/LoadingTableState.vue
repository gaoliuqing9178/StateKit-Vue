<script setup lang="ts">
/**
 * 兼容层组件：
 * 1. 保留旧的 `LoadingTableState` 名称，内部映射到 `loading-table` 预设。
 * 2. 所有默认行为都交给 `StatePresetBlock` 和 shared 元数据，当前文件只保留旧入口。
 * 3. 维护时优先考虑让业务直接使用 `LoadingState`，这里仅负责过渡兼容。
 */
import StatePresetBlock from "../../base/StatePresetBlock.vue";
import type { PresetStateBlockProps } from "../../types";
defineProps<PresetStateBlockProps>();
</script>

<template><StatePresetBlock block-id="loading-table" v-bind="$props" /></template>
