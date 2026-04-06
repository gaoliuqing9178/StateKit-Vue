<script setup lang="ts">
/**
 * 兼容层组件：
 * 1. 保留旧的 `InlineErrorState` 名称，内部映射到 `inline-error` 预设。
 * 2. 它只是旧 API 到 preset 系统的薄封装，真正渲染仍然走统一的 `ErrorState` 视觉壳。
 * 3. 后续维护优先从 `ErrorState` 和共享元数据入手，而不是在这里加判断。
 */
import StatePresetBlock from "../../base/StatePresetBlock.vue";
import type { PresetStateBlockProps } from "../../types";
defineProps<PresetStateBlockProps>();
</script>

<template><StatePresetBlock block-id="inline-error" v-bind="$props" /></template>
