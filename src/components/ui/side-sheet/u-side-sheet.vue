<template>
  <div
    v-if="model"
    class="z-30 flex w-full h-full fixed bottom-0"
    :class="[hasBlur && 'backdrop-blur-sm']"
    @click="handleClick"
  />
  <transition name="slide-fade">
    <div
      v-if="model"
      :style="{
        '--translate-amount': direction === 'left' ? '-100%' : '100%',
        width: width,
      }"
      :class="[
        props.direction === 'left' && 'left-0',
        props.direction === 'right' && 'right-0',
      ]"
      class="z-40 flex flex-col fixed left-0 bottom-0 h-full rounded-r-lg bg-white bs pb-3 overflow-y-scroll p-4"
      ref="sheet"
    >
      <div class="flex flex-row justify-between">
        <p class="flex-1">
          <u-icon
            :name="closeIcon"
            size="1.5"
            class="cursor-pointer"
            @click="onClose"
          />
        </p>
        <p class="flex-1 text-center font-medium whitespace-nowrap text-sm">
          {{ title }}
        </p>
        <p class="flex-1"></p>
      </div>
      <u-divider v-if="hasLine" class="mx-auto my-4" />
      <slot />
    </div>
  </transition>
</template>

<script setup lang="ts">
import UIcon from "~/components/ui/svg/u-svg.vue";
import UDivider from "~/components/ui/divider/u-divider.vue";
import type { WidthAndHeightUnion } from "~/types/propTypes";

interface ZSideSheetProps {
  modelValue: boolean;
  width?: WidthAndHeightUnion;
  title?: string;
  hasLine?: boolean;
  hasBlur?: boolean;
  direction?: "right" | "left";
  closeIcon?: string;
}

const props = withDefaults(defineProps<ZSideSheetProps>(), {
  title: "",
  hasLine: true,
  direction: "right",
  width: "85%",
  hasBlur: true,
  closeIcon: "close",
});

const emit = defineEmits(["update:modelValue", "close"]);

const model = computed({
  get() {
    return props.modelValue!;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const sheet = ref();

const handleClick = (event: Event) => {
  if (sheet.value && !sheet.value.contains(event.target)) {
    onClose();
    // console.log('Clicked outside the modal!');
  }
};

const onClose = () => {
  model.value = false;
  emit("close", {});
};
</script>

<style scoped lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(var(--translate-amount));
}

.border-btm {
  border-top-width: 1px;
  border-top-style: solid;
}

.bs {
  box-shadow: -4px 0px 4px 0px #0000001a;
}
</style>
