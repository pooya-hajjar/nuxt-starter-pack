<template>
  <div>
    <Transition name="slide-fade">
      <div
        v-if="model"
        class="z-40 hide-scrollbar overflow-x-hidden overflow-y-auto flex bg-white max-h-full flex-col fixed left-0 bottom-0 w-full rounded-t-2xl pb-3"
        ref="bottomSheetBody"
      >
        <div class="p-4">
          <div
            class="flex flex-row justify-between mb-4 overflow-y-auto overflow-x-hidden"
          >
            <p class="flex-1">
              <u-svg
                class="cursor-pointer"
                @click="onClose"
                name="close"
                :size="1.3"
              />
            </p>
            <p class="flex-1 text-center whitespace-nowrap font-medium text-sm">
              {{ title }}
            </p>
            <p class="flex-1"></p>
          </div>
          <u-divider v-if="hasLine" class="mx-auto" />
          <div class="mt-4">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
    <div
      v-if="hasBackDrop && model"
      @click="onClose"
      class="fixed left-0 top-0 w-full h-full bg-black opacity-40 z-20"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import USvg from "~/components/ui/svg/u-svg.vue";
import UDivider from "~/components/ui/divider/u-divider.vue";

interface ZBottomSheetProps {
  modelValue: boolean;
  hasLine?: boolean;
  hasBackDrop?: boolean;
  title?: string;
}

const props = withDefaults(defineProps<ZBottomSheetProps>(), {
  title: "",
  hasBackDrop: true,
  hasLine: true,
});
const emit = defineEmits(["update:modelValue", "close"]);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const bottomSheetBody = ref();

const onClose = () => {
  model.value = false;
  emit("close", {});
};
</script>

<style scoped lang="scss">
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.slide-fade-enter-active {
  transition: all 0.25s ease-in-out;
}

.slide-fade-leave-active {
  transition: all 0.25s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(100%);
}

.no-scroll {
  overflow: hidden;
  height: 100vh;
}
</style>
