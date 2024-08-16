<template>
  <div v-if="loading" class="flex justify-center mt-3">
    <u-spinner wrapper-classes="w-6 h-6" />
  </div>
  <transition name="slide-fade">
    <div
      v-if="scrollTopShouldBeFix && appScrolledAmount > 500"
      class="mt-5 z-20 fixed left-1/2 -translate-x-1/2 bottom-24"
    >
      <u-icon @click="scrollTop" name="arrow-square-up" size="1.6" />
    </div>
  </transition>
  <div class="mt-5 flex items-center justify-center" ref="scrollTopEl">
    <u-icon @click="scrollTop" name="arrow-square-up" size="1.6" />
  </div>
</template>
<script setup lang="ts">
import UIcon from "~/components/ui/svg/u-svg.vue";
import USpinner from "~/components/ui/spinner/u-spinner.vue";
import { observer } from "~/utils/observer";
import { storeToRefs } from "pinia";
import { usePublicStore } from "~/composables/public/public.store";

const { appScrolledAmount } = storeToRefs(usePublicStore());

const props = defineProps<{
  // this func must append new items at end of list
  fetchFunction: () => Promise<any>;
}>();

const scrollTopShouldBeFix = ref(false);
const scrollTopEl = ref();
const loading = ref(false);

onMounted(() => {
  observer(
    scrollTopEl.value,
    () => {
      scrollTopShouldBeFix.value = false;

      loadNextSegment();
    },
    () => {
      scrollTopShouldBeFix.value = true;
    }
  );
});

const scrollTop = () => {
  scrollTo({ top: 0, behavior: "smooth" });
};

const loadNextSegment = () => {
  if (!loading.value) {
    loading.value = true;
    props.fetchFunction()?.finally(() => {
      loading.value = false;
    });
  }
};
</script>

<style scoped lang="scss">
.slide-fade-enter-active {
  transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
