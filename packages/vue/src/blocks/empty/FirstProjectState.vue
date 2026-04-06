<script setup lang="ts">
/**
 * 兼容层组件：
 * 1. 保留旧的 `FirstProjectState` 名称，内部映射到 `first-project` 预设。
 * 2. 这个组件的价值主要在于兼容旧调用方，而不是继续扩展一个新的公共入口。
 * 3. 若要调整首次引导文案或默认按钮，优先修改预设元数据，再让这里自动继承。
 */
import StatePresetBlock from "../../base/StatePresetBlock.vue";
import type { PresetStateBlockProps } from "../../types";
defineProps<PresetStateBlockProps>();
</script>

<template><StatePresetBlock block-id="first-project" v-bind="$props" /></template>
