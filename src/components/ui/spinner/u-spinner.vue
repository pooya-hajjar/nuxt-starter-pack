<template>
  <div role="status">
    <svg
      ref="spinnerEl"
      class="animate-spin"
      :width="size + 'rem'"
      :height="size + 'rem'"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        :class="[!isPureColor && `stroke-${color}`]"
        d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612"
        :stroke-width="width"
        :stroke="isPureColor ? props.color : undefined"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import type { ColorsUnion } from "~/types/propTypes.ts";
interface USpinnerProps {
  color: ColorsUnion;
  width: number | string;
  size: number | string;
}

const props = withDefaults(defineProps<USpinnerProps>(), {
  color: "black",
  size: 5,
  width: 3.55,
});

const spinnerEl = ref();

const isPureColor = computed(
  (): boolean =>
    props.color.includes("#") ||
    props.color.includes("rgb") ||
    props.color.includes("rgba")
);

onMounted(() => {
  if (isPureColor.value) {
    spinnerEl.value.children[0].stroke = props.color;
  }
});
</script>
