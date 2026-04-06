<script setup lang="ts">
/**
 * 兼容层组件：
 * 1. 保留旧的 `RoleRestrictedState` 名称，内部映射到 `role-restricted` 预设。
 * 2. 该文件不应该再演化出新分支；角色受限的差异文案应回收到元数据或统一入口。
 * 3. 所有 props 会原样透传，便于存量调用方继续覆盖标题、描述和动作。
 */
import StatePresetBlock from "../../base/StatePresetBlock.vue";
import type { PresetStateBlockProps } from "../../types";
defineProps<PresetStateBlockProps>();
</script>

<template><StatePresetBlock block-id="role-restricted" v-bind="$props" /></template>
