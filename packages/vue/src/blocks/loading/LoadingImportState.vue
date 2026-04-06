<script setup lang="ts">
/**
 * 兼容层组件：
 * 1. 保留旧的 `LoadingImportState` 名称，内部映射到 `loading-import` 预设。
 * 2. 预设详情、支持布局与按钮默认值都由 shared 元数据统一提供。
 * 3. 这里不要继续增长业务分支；需要更多导入态变化时，优先回到统一入口组件处理。
 */
import StatePresetBlock from "../../base/StatePresetBlock.vue";
import type { PresetStateBlockProps } from "../../types";
defineProps<PresetStateBlockProps>();
</script>

<template><StatePresetBlock block-id="loading-import" v-bind="$props" /></template>
