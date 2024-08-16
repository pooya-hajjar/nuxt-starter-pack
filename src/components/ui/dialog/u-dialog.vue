<template>
  <transition name="bounce">
    <div
      v-if="model"
      class="z-50 fixed w-full h-full top-0 left-0 flex justify-center items-center p-3 bg pointer-events-none"
    >
      <div
        v-if="model"
        class="bg-white min-w-48 rounded-lg pointer-events-auto p-4"
        ref="dialog"
        :class="[attrs.class]"
      >
        <div class="flex flex-row justify-between mb-4">
          <p class="flex-1">
            <u-svg
              name="close"
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
        <u-divider v-if="hasLine" class="mb-4" />
        <slot />
      </div>
    </div>
  </transition>
  <div
    v-if="model && hasBackdrop"
    class="bg-black h-full top-0 left-0 w-full opacity-40 fixed z-10 pointer-events-auto"
    @click="handleClick"
  />
</template>

<script setup lang="ts">
import USvg from "~/components/ui/svg/u-svg.vue";
import UDivider from "~/components/ui/divider/u-divider.vue";

interface ZDialogProps {
  modelValue: boolean;
  title?: string;
  hasLine?: boolean;
  hasClose?: boolean;
  hasBackdrop?: boolean;
  persistent?: boolean;
}

const props = withDefaults(defineProps<ZDialogProps>(), {
  title: "",
  hasBackdrop: true,
  hasClose: true,
  hasLine: false,
  persistent: false,
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

const attrs = useAttrs();
const dialog = ref();

const handleClick = () => {
  if (!props.persistent) onClose();
  else {
    dialog.value.classList.add("persistent");
    setTimeout(() => {
      dialog.value.classList.remove("persistent");
    }, 200);
  }
};

const onClose = () => {
  model.value = false;
  emit("close", {});
};
</script>

<style scoped lang="scss">
.bounce-enter-active {
  animation: bounce-in 0.4s;
}

.bounce-leave-active {
  animation: bounce-in 0.4s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.border-btm {
  border-top-width: 1px;
  border-top-style: solid;
}
</style>

<style lang="scss">
.persistent {
  animation: pers 0.2s ease-in-out;
}

@keyframes pers {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}
</style>
