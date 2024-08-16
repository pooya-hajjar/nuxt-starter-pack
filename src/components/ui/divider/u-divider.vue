<template>
  <div :style="getStyles" :class="[`bg-${color}`]"></div>
</template>

<script setup lang="ts">
import type { ColorsUnion, WidthAndHeightUnion } from "~/types/propTypes";

interface UDividerProps {
  isVertical?: boolean;
  stroke?: WidthAndHeightUnion;
  length?: WidthAndHeightUnion;
  color?: ColorsUnion;
}

const props = withDefaults(defineProps<UDividerProps>(), {
  isVertical: false,
  stroke: "1.5px",
  color: "neutral-700",
  length: "100%",
});

const getStyles = computed(
  (): { width: WidthAndHeightUnion; height: WidthAndHeightUnion } => {
    return props.isVertical
      ? {
          width: props.stroke,
          height: props.length,
        }
      : {
          height: props.stroke,
          width: props.length,
        };
  }
);
</script>
