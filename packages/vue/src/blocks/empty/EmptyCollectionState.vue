<script setup lang="ts">
/**
 * 兼容层组件：
 * 1. 保留旧的 `EmptyCollectionState` 名称，内部映射到 `empty-collection` 预设。
 * 2. 真正的默认文案、布局支持范围和 props 合并逻辑都在 `StatePresetBlock` 中处理。
 * 3. 维护时优先修改共享元数据或统一入口 `EmptyState`，不要继续把专用逻辑堆到这个文件里。
 */
import StatePresetBlock from "../../base/StatePresetBlock.vue";
import type { PresetStateBlockProps } from "../../types";
defineProps<PresetStateBlockProps>();
</script>

<template><StatePresetBlock block-id="empty-collection" v-bind="$props" /></template>
