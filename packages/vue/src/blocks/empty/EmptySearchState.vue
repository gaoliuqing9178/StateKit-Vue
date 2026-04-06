<script setup lang="ts">
/**
 * 兼容层组件：
 * 1. 保留旧的 `EmptySearchState` 名称，内部映射到 `empty-search` 预设。
 * 2. 该文件本身不承载展示逻辑，只负责把旧 API 转发到统一的 preset 桥接层。
 * 3. 如果要改默认搜索空态文案，请去 `block-meta.ts`，不要在这里复制一套默认值。
 */
import StatePresetBlock from "../../base/StatePresetBlock.vue";
import type { PresetStateBlockProps } from "../../types";
defineProps<PresetStateBlockProps>();
</script>

<template>
  <StatePresetBlock block-id="empty-search" v-bind="$props" />
</template>
