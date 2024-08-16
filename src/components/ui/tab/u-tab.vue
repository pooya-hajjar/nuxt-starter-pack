<template>
  <div class="overflow-x-hidden no-transition">
    <div
      class="flex items-center flex-nowrap"
      :style="{ gap: gap + 'px', width: headerWidth }"
      :class="[headerClasses]"
    >
      <div
        v-for="(tab, index) in tabs"
        :key="`tab_${index}_${tab.key}_header`"
        @click="model = tab"
        class="py-3 cursor-pointer flex-1 text-center"
        :class="{
          'border-b-2 border-b-primary font-medium no-transition': isActiveTab(
            tab.key
          ),
          'border-b-0': !isActiveTab(tab.key),
        }"
      >
        {{ tab.title }}
      </div>
    </div>
    <div :style="{ width: contentWidth }" :class="[contentClasses]">
      <transition :name="transitionName" :duration="150" mode="out-in">
        <div v-if="model" :key="model.key">
          <slot :name="model.key" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from "~/composables/query/useQuery";
import type { WidthAndHeightUnion } from "~/types/propTypes";

interface ZTabProps {
  tabs: Tab[];
  queryName?: string;
  gap?: number;
  headerWidth?: WidthAndHeightUnion;
  contentWidth?: WidthAndHeightUnion;
  headerClasses?: string | string[];
  contentClasses?: string | string[];
}

interface Tab {
  title: string;
  key: string;
}

const { addQuery, removeQuery, getQuery } = useQuery();

const props = withDefaults(defineProps<ZTabProps>(), {
  queryName: "tab",
  gap: 10,
  headerWidth: "500px",
  contentWidth: "100%",
  contentClasses: "",
  headerClasses: "text-sm",
});
const emit = defineEmits(["change-tab"]);
const slots = useSlots();

const prevIndex = ref(0);

const model = computed({
  get: (): Tab => {
    const val = getQuery(props.queryName);
    const currentTab =
      props.tabs.find((t) => t.key === val?.trim()) || props.tabs[0];
    return currentTab;
  },
  set: (val: Tab) => {
    prevIndex.value = props.tabs.findIndex(
      (tab) => tab.key === model.value.key
    );

    if (!val) {
      removeQuery(props.queryName)
        .then(() => {
          emit("change-tab", { current_tab: null });
        })
        .catch((err) => {
          console.error(`Error removing ${props.queryName} query: ${err}`);
        });
    } else {
      addQuery(props.queryName, val.key)
        .then(() => {
          emit("change-tab", { current_tab: val });
        })
        .catch((err) => {
          console.error(`Error adding ${props.queryName} query: ${err}`);
        });
    }
  },
});

const isActiveTab = (key: string) => {
  return model.value?.key === key;
};

const transitionName = computed(() => {
  const currentIndex = props.tabs.findIndex(
    (tab) => tab.key === model.value.key
  );
  return currentIndex < prevIndex.value ? "slide-right" : "slide-left";
});
</script>

<style scoped lang="scss">
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  opacity: 1;
  transition: all 0.2s !important;
}

.slide-right-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-leave-to,
.slide-left-enter-from {
  transform: translateX(+100%);
  opacity: 0;
}
</style>
