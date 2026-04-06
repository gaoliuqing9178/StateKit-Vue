<script setup lang="ts">
/**
 * 推荐给业务侧直接使用的错误态统一入口。
 * 它承接了过去多个细分错误组件的职责，调用方只需要决定：
 * 1. 是否覆盖文案；
 * 2. 是否切换布局；
 * 3. CTA 是重试、返回还是联系支持。
 */
import type { BaseStateProps } from "@statekit-vue/shared";
import StateBlockShell from "../../base/StateBlockShell.vue";
import { useMergedStateProps } from "../../lib/merge-state-props";
import type { PresetStateBlockProps } from "../../types";

const props = defineProps<PresetStateBlockProps>();

// 默认值偏向“可恢复的一般错误”，不会强绑定离线、整页失败等旧场景。
const defaultProps: BaseStateProps = {
  title: "Something went wrong",
  description:
    "Try again or return to a stable place while we recover this view.",
  tone: "danger",
  density: "cozy",
  layout: "panel",
  primaryAction: { label: "Try again" },
  secondaryAction: { label: "Go back" },
};

// 具体业务只需要传入差异点，不必重复声明完整错误态结构。
const mergedProps = useMergedStateProps(props, defaultProps);
</script>

<template>
  <StateBlockShell v-bind="mergedProps" category="error" />
</template>
