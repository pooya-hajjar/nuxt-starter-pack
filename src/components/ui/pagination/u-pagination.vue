<template>
  <div class="flex items-center justify-center">
    <span
      class="w-8 h-8 rounded-lg flex justify-center items-center bg-gray-very-light aspect-square cursor-pointer mx-0.5"
      @click="changeModel(model - 1)"
    >
      <u-svg name="chevron-r" />
    </span>
    <span
      class="h-8 rounded-lg flex justify-center items-center bg-gray-very-light aspect-square cursor-pointer text-xs px-7 mx-0.5"
      @click="changeModel(1)"
    >
      اولین
    </span>

    <span v-for="i in count" :key="'pagination_' + i">
      <span v-if="!showNumber(i) && (i === 2 || i === count - 1)" class="mx-1"
        >...</span
      >
      <span
        v-else-if="showNumber(i)"
        @click="changeModel(i)"
        class="h8 h-8 rounded-lg text-black text-sm flex justify-center items-center bg-gray-very-light cursor-pointer mx-0.5"
        :class="[
          model === i && 'ring-1 ring-primary',
          i.toString().length < 3 ? 'aspect-square' : 'px-2',
        ]"
      >
        {{ i }}
      </span>
    </span>

    <span
      class="h-8 rounded-lg flex justify-center items-center bg-gray-very-light aspect-square cursor-pointer text-xs px-7 mx-0.5"
      @click="changeModel(count)"
    >
      آخرین
    </span>
    <span
      class="w-8 h-8 rounded-lg flex justify-center items-center bg-gray-very-light aspect-square cursor-pointer mx-0.5"
      @click="changeModel(model + 1)"
    >
      <u-svg name="chevron-l" />
    </span>
  </div>
</template>
<script setup lang="ts">
import USvg from "~/components/ui/svg/u-svg.vue";
import { useQuery } from "~/composables/query/useQuery";

interface ZPaginationProps {
  modelValue: number;
  count: number;
  maxShow?: number;
  onChange?: () => void;
  stashInQueryParam?: {
    enabled?: boolean;
    name?: string;
  };
}

const props = withDefaults(defineProps<ZPaginationProps>(), {
  maxShow: 4,
  stashInQueryParam: () => ({
    enabled: true,
    name: "pagination",
  }),
});

const { addQuery, getQuery } = useQuery();
const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const showNumber = (i: number): boolean => {
  return (
    (i >= model.value - props.maxShow / 2 &&
      i <= model.value + props.maxShow / 2) ||
    i === 1 ||
    i === props.count
  );
};

const changeModel = (i: number) => {
  if (i === 0 || i > props.count) return;
  model.value = i;

  if (props?.stashInQueryParam?.enabled) {
    addQuery(props.stashInQueryParam?.name ?? "pagination", i.toString())?.then(
      () => {
        if (props.onChange) props.onChange();
      }
    );
  } else {
    if (props.onChange) props.onChange();
  }
};

onMounted(() => {
  if (props?.stashInQueryParam?.enabled) {
    const pagination = getQuery(props.stashInQueryParam?.name ?? "pagination");
    if (pagination) {
      model.value = +pagination;
    }
  }
});
</script>
