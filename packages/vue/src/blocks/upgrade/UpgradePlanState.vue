<script setup lang="ts">
/**
 * 兼容层组件：
 * 1. 保留旧的 `UpgradePlanState` 名称，内部映射到 `upgrade-plan` 预设。
 * 2. 套餐升级的默认文案、布局与动作都由 preset 元数据集中管理。
 * 3. 新增升级提示时优先使用 `UpgradeState`，不要在这里继续扩展特例。
 */
import StatePresetBlock from "../../base/StatePresetBlock.vue";
import type { PresetStateBlockProps } from "../../types";
defineProps<PresetStateBlockProps>();
</script>

<template><StatePresetBlock block-id="upgrade-plan" v-bind="$props" /></template>
