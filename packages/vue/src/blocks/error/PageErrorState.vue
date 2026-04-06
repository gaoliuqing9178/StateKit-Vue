<script setup lang="ts">
/**
 * 兼容层组件：
 * 1. 保留旧的 `PageErrorState` 名称，内部映射到 `page-error` 预设。
 * 2. 默认整页错误文案来自 shared 元数据，这里只负责承接旧组件名。
 * 3. 如果你希望用户自定义整页错误体验，推荐直接改用 `ErrorState` 并覆盖 layout/文案。
 */
import StatePresetBlock from "../../base/StatePresetBlock.vue";
import type { PresetStateBlockProps } from "../../types";
defineProps<PresetStateBlockProps>();
</script>

<template><StatePresetBlock block-id="page-error" v-bind="$props" /></template>
