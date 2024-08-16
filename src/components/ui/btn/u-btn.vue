<template>
  <button
    ref="btnEl"
    v-bind="attrs"
    @click="onClick"
    :disabled="isDisabled"
    :class="[
      `relative flex items-center justify-center px-4 py-2 overflow-hidden font-medium user-select-none
         text-${textSize} rounded-${rounded} ${getVariantClass}`,
      isDisabled ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90',
    ]"
    :style="{ width: width, height: height }"
  >
    <span
      v-if="loading"
      class="absolute w-[calc(100%-10px)] h-[calc(100%-10px)] flex justify-center items-center backdrop-blur-[3px] opacity-100"
    >
      <u-spinner
        size="1.5"
        :color="computedStyles?.color ?? 'white'"
        width="5"
      />
    </span>
    <template v-else>
      <slot />
    </template>
  </button>
</template>

<script setup lang="ts">
import type {
  BtnVariantUnion,
  ColorsUnion,
  RoundedUnion,
  SizesUnion,
  StrokeUnion,
  WidthAndHeightUnion,
} from "~/types/propTypes.ts";
import USpinner from "~/components/ui/spinner/u-spinner.vue";

interface UBtnProps {
  color?: ColorsUnion;
  variant?: BtnVariantUnion;
  rounded?: RoundedUnion;
  hasRipple?: boolean;
  stroke?: StrokeUnion;
  textSize?: SizesUnion;
  disabled?: boolean;
  loading?: boolean;
  width?: WidthAndHeightUnion;
  height?: WidthAndHeightUnion;
}

const props = withDefaults(defineProps<UBtnProps>(), {
  color: "indigo-900",
  variant: "filled",
  rounded: "xl",
  hasRipple: true,
  stroke: "1",
  textSize: "md",
  disabled: false,
  loading: false,
  height: "2rem",
  width: "4rem",
});

const attrs = useAttrs();

const btnEl = ref();
const computedStyles = ref();
const isDisabled = computed(() => props.loading || props.disabled);

const getVariantClass = computed(() => {
  switch (props.variant) {
    case "text":
      return `text-${props.color} before:absolute before:w-full before:h-full before:top-0 before:transition-all before:ease-out before:left-0 before:z before:opacity-0 before-z-10 before:hover:opacity-10 before:bg-${props.color}`;
    case "outlined":
      return `text-${props.color} ring-${props.color} ring-${props.stroke} before:absolute before:transition-all before:duration-300 before:ease-out before:w-full before:h-full before:top-0 before:left-0 before:z before:bg-${props.color} before:opacity-0 before:hover:opacity-10`;
    case "elevated":
      return `shadow hover:shadow-md text-${props.color} `;
    case "filled":
    default:
      return `bg-${props.color} text-white opacity-100`;
  }
});

const onClick = (e: MouseEvent) => {
  if (props.hasRipple && !props.loading) {
    let ripple: HTMLSpanElement = document.createElement("span");
    ripple.classList.add("ripple");
    ripple.style.backgroundColor = computedStyles.value.color;
    btnEl.value.appendChild(ripple);
    let buttonRect = btnEl.value.getBoundingClientRect();
    let buttonTop = buttonRect.top;
    let buttonLeft = buttonRect.left;
    let clickY = e.clientY;
    let clickX = e.clientX;
    let x = clickX - buttonLeft;
    let y = clickY - buttonTop;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    setTimeout(() => {
      ripple.remove();
    }, 2000);
  }
};

onMounted(() => {
  computedStyles.value = window.getComputedStyle(btnEl.value);
});
</script>

<style>
.ripple {
  position: absolute;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-top: -50px;
  margin-left: -50px;
  animation: ripple 2s;
}

@keyframes ripple {
  from {
    opacity: 0.2;
    transform: scale(0);
  }

  to {
    opacity: 0;
    transform: scale(30);
  }
}
</style>
