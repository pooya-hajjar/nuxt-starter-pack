<template>
  <nuxt-link :target="target" v-bind="getAttrs" class="contents">
    <slot />
  </nuxt-link>
</template>

<script setup lang="ts">
import type { LinkTargetUnion } from "~/types/propTypes";

interface ULinkProps {
  to:
    | {
        name?: string;
        params?: { [key: string]: any };
        query?: { [key: string]: any };
        replace?: boolean;
        force?: boolean;
        hash?: string;
        path?: string;
      }
    | string;
  absolute?: boolean;
  target?: LinkTargetUnion;
}

const props = withDefaults(defineProps<ULinkProps>(), {
  absolute: false,
  target: "",
});

const attrs = useAttrs();
const getAttrs = computed(() => ({
  ...attrs,
  ...(props.absolute
    ? { href: typeof props.to === "string" ? props.to : props.to.path }
    : { to: props.to }),
}));
</script>

<style scoped></style>
