<script setup lang="ts">
/**
 * `StatePresetBlock` 是旧场景包装组件共用的桥接层。
 * 它根据 `blockId` 从 shared 元数据里取出默认配置，再和调用方传入的覆盖 props 合并，
 * 这样每个兼容层组件只需要固定一个 id，而不必各自复制一份默认文案。
 */
import { computed } from "vue";
import {
  stateBlockMetaById,
  type BaseStateProps,
  type StateBlockId,
} from "@statekit-vue/shared";
import StateBlockShell from "./StateBlockShell.vue";
import type { PresetStateBlockProps } from "../types";

interface Props extends PresetStateBlockProps {
  /** 指向某个预设元数据的稳定 id，是这个桥接层的唯一必填字段。 */
  blockId: StateBlockId;
}

const props = defineProps<Props>();

// 先把 block id 解析成完整元数据，后续所有默认值都从这里拿。
const blockMeta = computed(() => stateBlockMetaById[props.blockId]);

/**
 * preset 允许调用方覆盖布局，但并不是所有预设都适合三种布局随意切换。
 * 如果外部传入了一个当前 preset 不支持的布局，这里会给出告警并回退到默认布局。
 */
const resolvedLayout = computed(() => {
  const requestedLayout = props.layout;
  const defaultLayout = blockMeta.value.defaults.layout ?? "panel";

  if (
    !requestedLayout ||
    blockMeta.value.supportedLayouts.includes(requestedLayout)
  ) {
    return requestedLayout ?? defaultLayout;
  }

  console.warn(
    `[StateKit] "${blockMeta.value.componentName}" does not support the "${requestedLayout}" layout. Falling back to "${defaultLayout}".`,
  );

  return defaultLayout;
});

// 合并逻辑与统一入口组件类似，但这里额外接入了 preset 元数据和布局兜底能力。
const mergedProps = computed<BaseStateProps>(() => ({
  ...blockMeta.value.defaults,
  title: props.title ?? blockMeta.value.defaults.title,
  description: props.description ?? blockMeta.value.defaults.description,
  tone: props.tone ?? blockMeta.value.defaults.tone ?? "neutral",
  density: props.density ?? blockMeta.value.defaults.density ?? "cozy",
  layout: resolvedLayout.value,
  primaryAction:
    props.primaryAction === undefined
      ? blockMeta.value.defaults.primaryAction
      : props.primaryAction,
  secondaryAction:
    props.secondaryAction === undefined
      ? blockMeta.value.defaults.secondaryAction
      : props.secondaryAction,
}));
</script>

<template>
  <StateBlockShell v-bind="mergedProps" :category="blockMeta.category" />
</template>
