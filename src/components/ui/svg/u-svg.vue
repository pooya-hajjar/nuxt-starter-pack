<template>
  <lazy-nuxt-img
    :provider="shouldHasProvider ? 'svgProvider' : undefined"
    v-bind="attrs"
    :src="path"
    :style="{ cursor, width: size + 'rem' }"
    :alt="name"
  />
</template>

<script setup lang="ts">
import type { CursorsUnion } from "~/types/propTypes";

interface USvgProps {
  name: string;
  size?: number | string; // rem
  cursor?: CursorsUnion;
}

const props = withDefaults(defineProps<USvgProps>(), {
  name: "default",
  size: 1,
  cursor: "pointer",
});
const attrs = useAttrs();

const path = computed(() => {
  return `${props.name}.svg`;
});

const shouldHasProvider = computed((): boolean => {
  return props.name?.slice(0, 4) !== "http";
});
</script>

<style scoped></style>
