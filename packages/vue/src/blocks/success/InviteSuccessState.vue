<script setup lang="ts">
/**
 * 兼容层组件：
 * 1. 保留旧的 `InviteSuccessState` 名称，内部映射到 `invite-success` 预设。
 * 2. 它不是一个独立演化的能力点，只是把旧的邀请成功组件名接到新预设体系。
 * 3. 维护时优先修改 shared 元数据或统一 `SuccessState`，而不是在这里写重复逻辑。
 */
import StatePresetBlock from "../../base/StatePresetBlock.vue";
import type { PresetStateBlockProps } from "../../types";
defineProps<PresetStateBlockProps>();
</script>

<template><StatePresetBlock block-id="invite-success" v-bind="$props" /></template>
