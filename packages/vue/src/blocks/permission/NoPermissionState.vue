<script setup lang="ts">
/**
 * 兼容层组件：
 * 1. 保留旧的 `NoPermissionState` 名称，内部映射到 `no-permission` 预设。
 * 2. 默认权限文案与按钮交由 `StatePresetBlock` 从 shared 元数据里读取。
 * 3. 维护时优先考虑使用统一入口 `PermissionState`，这里只是兼容旧写法。
 */
import StatePresetBlock from "../../base/StatePresetBlock.vue";
import type { PresetStateBlockProps } from "../../types";
defineProps<PresetStateBlockProps>();
</script>

<template><StatePresetBlock block-id="no-permission" v-bind="$props" /></template>
