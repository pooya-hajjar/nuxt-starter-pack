<template>
  <NuxtLoadingIndicator />
  <div
    dir="rtl"
    id="app"
    @wheel="onAppScroll"
    @scroll="onAppScroll"
    @touchmove="onAppScroll"
    class="h-full w-full fixed"
    :class="isAnyPopupOpen ? 'overflow-hidden ' : 'overflow-auto '"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { usePopupStore } from "./composables/popup/popup.store";
import { usePublic } from "./composables/public/usePublic";

const { onAppScroll } = usePublic();
const { isAnyPopupOpen } = storeToRefs(usePopupStore());
</script>
