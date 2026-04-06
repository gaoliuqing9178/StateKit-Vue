<script setup lang="ts">
/**
 * 推荐给业务侧直接使用的成功态统一入口。
 * 它适合作为“某件事刚刚完成”的抽象反馈层，
 * 如果业务已经能明确说出是邀请成功、发布成功还是任务完成，也仍然建议优先覆盖文案，而不是再造一个新组件。
 */
import type { BaseStateProps } from "@statekit-vue/shared";
import StateBlockShell from "../../base/StateBlockShell.vue";
import { useMergedStateProps } from "../../lib/merge-state-props";
import type { PresetStateBlockProps } from "../../types";

const props = defineProps<PresetStateBlockProps>();

// 默认值强调“完成后可以去看结果或继续下一步”，适合大多数成功反馈。
const defaultProps: BaseStateProps = {
  title: "Done",
  description:
    "This step completed successfully. Review the result or continue to the next task.",
  tone: "success",
  density: "cozy",
  layout: "panel",
  primaryAction: { label: "View results" },
  secondaryAction: { label: "Continue" },
};

// 统一复用合并函数，确保所有类别入口的覆盖语义完全一致。
const mergedProps = useMergedStateProps(props, defaultProps);
</script>

<template>
  <StateBlockShell v-bind="mergedProps" category="success" />
</template>
