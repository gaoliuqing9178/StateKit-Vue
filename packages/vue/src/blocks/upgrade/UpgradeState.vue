<script setup lang="ts">
/**
 * 推荐给业务侧直接使用的升级态统一入口。
 * 它覆盖了套餐受限、试用到期、额度不足等“需要升级或扩容”的共性表达，
 * 具体是哪一种限制，交给调用方通过文案和 CTA 自行解释。
 */
import type { BaseStateProps } from "@statekit-vue/shared";
import StateBlockShell from "../../base/StateBlockShell.vue";
import { useMergedStateProps } from "../../lib/merge-state-props";
import type { PresetStateBlockProps } from "../../types";

const props = defineProps<PresetStateBlockProps>();

// 默认值故意保持通用，避免把某个业务套餐模型写死进公共组件。
const defaultProps: BaseStateProps = {
  title: "Upgrade to continue",
  description:
    "Move to a higher plan to unlock this workflow and higher limits.",
  tone: "brand",
  density: "cozy",
  layout: "panel",
  primaryAction: { label: "Upgrade plan" },
  secondaryAction: { label: "Compare plans" },
};

// 统一合并逻辑可以保证 `null` 移除动作这类细节行为在所有入口上一致。
const mergedProps = useMergedStateProps(props, defaultProps);
</script>

<template>
  <StateBlockShell v-bind="mergedProps" category="upgrade" />
</template>
