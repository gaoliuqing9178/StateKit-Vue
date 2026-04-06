<script setup lang="ts">
/**
 * 兼容层组件：
 * 1. 保留旧的 `SessionExpiredState` 名称，内部映射到 `session-expired` 预设。
 * 2. 这里本质上只是“把老名字指向新 preset 数据源”的桥接层。
 * 3. 如果后续要统一登录失效体验，优先调整 `PermissionState` 或 shared 元数据。
 */
import StatePresetBlock from "../../base/StatePresetBlock.vue";
import type { PresetStateBlockProps } from "../../types";
defineProps<PresetStateBlockProps>();
</script>

<template><StatePresetBlock block-id="session-expired" v-bind="$props" /></template>
