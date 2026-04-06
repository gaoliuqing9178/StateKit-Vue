<script setup lang="ts">
/**
 * 兼容层组件：
 * 1. 保留旧的 `PublishSuccessState` 名称，内部映射到 `publish-success` 预设。
 * 2. 当前文件只负责把旧组件名连到统一元数据，不直接持有任何默认状态定义。
 * 3. 如果要扩展发布完成体验，优先通过 `SuccessState` 和外部 props 组合，而不是继续细分包装组件。
 */
import StatePresetBlock from "../../base/StatePresetBlock.vue";
import type { PresetStateBlockProps } from "../../types";
defineProps<PresetStateBlockProps>();
</script>

<template><StatePresetBlock block-id="publish-success" v-bind="$props" /></template>
