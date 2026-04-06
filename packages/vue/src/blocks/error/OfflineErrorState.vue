<script setup lang="ts">
/**
 * 兼容层组件：
 * 1. 保留旧的 `OfflineErrorState` 名称，内部映射到 `offline-error` 预设。
 * 2. 真正的默认离线文案与布局支持仍然集中在 shared 元数据里统一维护。
 * 3. 新代码应优先使用 `ErrorState` 自定义离线提示，这里只保留向后兼容职责。
 */
import StatePresetBlock from "../../base/StatePresetBlock.vue";
import type { PresetStateBlockProps } from "../../types";
defineProps<PresetStateBlockProps>();
</script>

<template><StatePresetBlock block-id="offline-error" v-bind="$props" /></template>
