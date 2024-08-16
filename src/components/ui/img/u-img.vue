<template>
  <lazy-nuxt-img
    :provider="shouldHasProvider ? 'imageProvider' : undefined"
    :alt="alt"
    :src="src"
    v-bind="attrs"
    :style="{ width, height }"
    placeholder
    :class="[fit && 'object-cover']"
  />
</template>

<script setup lang="ts">
interface UImgProps {
  src: string;
  alt?: string;
  fit?: boolean;
  width?: string;
  height?: string;
}

const props = withDefaults(defineProps<UImgProps>(), {
  fit: false,
  height: "auto",
  width: "auto",
  src: "default.png",
});
const attrs = useAttrs();

const shouldHasProvider = computed((): boolean => {
  return props.src?.slice(0, 4) !== "http";
});
</script>

<style scoped></style>
