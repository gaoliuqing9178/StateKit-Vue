<script setup lang="ts">
/**
 * 兼容层组件：
 * 1. 保留旧的 `TrialEndingState` 名称，内部映射到 `trial-ending` 预设。
 * 2. 它仍然通过统一桥接层获取元数据，不单独维护自己的默认 props。
 * 3. 维护时如果发现试用到期和升级提示越来越接近，优先收敛到统一 `UpgradeState`。
 */
import StatePresetBlock from "../../base/StatePresetBlock.vue";
import type { PresetStateBlockProps } from "../../types";
defineProps<PresetStateBlockProps>();
</script>

<template><StatePresetBlock block-id="trial-ending" v-bind="$props" /></template>
