<template>
  <span>
    {{ text }}
  </span>
</template>

<script setup lang="ts">
interface UTimerProps {
  modelValue: number;
}

const props = withDefaults(defineProps<UTimerProps>(), {});

const emit = defineEmits(["update:modelValue", "end"]);

const model = computed({
  get() {
    return props.modelValue!;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const start = () => {
  const cooldown = setInterval(() => {
    if (model.value > 0) model.value--;
    else {
      clearInterval(cooldown);
      emit("end", {});
    }
  }, 1000);
};

onMounted(() => {
  start();
});

const text = computed(() => {
  const hours = Math.floor(model.value / 3600);
  const minutes = Math.floor((model.value % 3600) / 60);
  const remainingSeconds = model.value % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return hours === 0
    ? `${formattedMinutes}:${formattedSeconds}`
    : `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
});
</script>
