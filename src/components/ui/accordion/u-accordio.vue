<template>
  <div
    class="w-full max-w-full mx-auto mt-6 rounded-lg"
    :class="[hasDefaultShadow && 'shadow-md']"
  >
    <div v-for="(item, index) in items" :key="index">
      <button
        @click="toggle(index)"
        class="w-full text-left focus:outline-none"
        :class="[
          hasDefaultPadding && 'p-4',
          hasDefaultHover && 'hover:bg-gray-200',
          headerClasses,
        ]"
      >
        <slot
          name="header"
          :item="{ ...item, isSelected: activeIndex === index }"
        >
          <h2 class="text-lg font-semibold">{{ item.title }}</h2>
        </slot>
      </button>
      <transition
        name="accordion"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <div
          v-if="activeIndex === index"
          class="overflow-hidden"
          ref="accordionContent"
          :class="[hasDefaultPadding && 'p-4', contentClasses]"
        >
          <slot
            name="content"
            :item="{ ...item, isSelected: activeIndex === index }"
          ></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    items?: { title: string; content?: string; extra?: string }[];
    hasDefaultPadding?: boolean;
    hasDefaultShadow?: boolean;
    hasDefaultHover?: boolean;
    headerClasses?: string | string[];
    contentClasses?: string | string[];
  }>(),
  {
    items() {
      return [{ title: "title", content: "content" }];
    },
    hasDefaultPadding: false,
    hasDefaultShadow: false,
    hasDefaultHover: false,
    headerClasses: "",
    contentClasses: "",
  }
);

const activeIndex = ref(-1);

const toggle = (index: number) => {
  activeIndex.value = activeIndex.value === index ? -1 : index;
};

const beforeEnter = (el: any) => {
  el.style.height = "0";
  el.style.opacity = "0";
};

const enter = (el: any) => {
  nextTick(() => {
    el.style.transition = "all 300ms ease-in-out";
    el.style.height = el.scrollHeight + "px";
    el.style.opacity = "1";
  });
};

const leave = (el: any) => {
  el.style.transition = "all 300ms ease-in-out";
  el.style.height = "0";
  el.style.opacity = "0";
};
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  height: 0;
  opacity: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  height: auto;
  opacity: 1;
}
</style>
