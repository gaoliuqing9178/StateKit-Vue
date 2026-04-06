<script setup lang="ts">
/**
 * 推荐给业务侧直接使用的权限态统一入口。
 * 当你只知道“当前用户不能继续”，但还不想拆成无权限、角色受限或会话失效三个旧场景时，
 * 直接使用这个组件会比继续新增专用组件更符合当前库的设计方向。
 */
import type { BaseStateProps } from "@statekit-vue/shared";
import StateBlockShell from "../../base/StateBlockShell.vue";
import { useMergedStateProps } from "../../lib/merge-state-props";
import type { PresetStateBlockProps } from "../../types";

const props = defineProps<PresetStateBlockProps>();

// 默认值聚焦在“请求权限或返回安全页面”的常见恢复路径。
const defaultProps: BaseStateProps = {
  title: "You do not have access",
  description:
    "Request access or return to a page you can use right now.",
  tone: "warning",
  density: "cozy",
  layout: "panel",
  primaryAction: { label: "Request access" },
  secondaryAction: { label: "Go back" },
};

// 继续使用统一的覆盖合并逻辑，避免每个入口组件出现细微差异。
const mergedProps = useMergedStateProps(props, defaultProps);
</script>

<template>
  <StateBlockShell v-bind="mergedProps" category="permission" />
</template>
