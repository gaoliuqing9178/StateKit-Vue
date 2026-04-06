<script setup lang="ts">
/**
 * 兼容层组件：
 * 1. 保留旧的 `UsageLimitState` 名称，内部映射到 `usage-limit` 预设。
 * 2. 额度上限相关的默认文案统一从 shared 元数据继承，避免多处漂移。
 * 3. 若业务需要更具体的额度说明，建议使用 `UpgradeState` 加自定义文案，而不是继续复制组件。
 */
import StatePresetBlock from "../../base/StatePresetBlock.vue";
import type { PresetStateBlockProps } from "../../types";
defineProps<PresetStateBlockProps>();
</script>

<template><StatePresetBlock block-id="usage-limit" v-bind="$props" /></template>
