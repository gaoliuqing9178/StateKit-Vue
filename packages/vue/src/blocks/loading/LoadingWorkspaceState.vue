<script setup lang="ts">
/**
 * 兼容层组件：
 * 1. 保留旧的 `LoadingWorkspaceState` 名称，内部映射到 `loading-workspace` 预设。
 * 2. 该文件不直接维护任何默认文案，只是把旧的组件名桥接到统一 preset 体系。
 * 3. 如果你发现需要额外的工作区加载变体，优先考虑通过 `LoadingState` 覆盖文案而不是新增包装层。
 */
import StatePresetBlock from "../../base/StatePresetBlock.vue";
import type { PresetStateBlockProps } from "../../types";
defineProps<PresetStateBlockProps>();
</script>

<template><StatePresetBlock block-id="loading-workspace" v-bind="$props" /></template>
