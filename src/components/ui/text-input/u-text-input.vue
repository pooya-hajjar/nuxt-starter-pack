<template>
  <div>
    <Field
      :validate-on-change="validateOptions.validateOnChange"
      :validate-on-mount="validateOptions.validateOnMount"
      v-slot="{ field, errors }"
      v-model="formattedValue"
      :name="name"
      :rules="rules"
    >

      <div
        ref="outlinedInputEl"
        v-if="variant === 'outlined'"
        class="relative flex items-center"
        :style="{width: width, height: height}"
      >
        <input
          :type="type"
          ref="inpRef"
          v-bind="{...getAttrs , ...field}"
          v-model="formattedValue"
          @keydown="onKeyDown"
          :class="[`items-center w-full h-full duration-300 text-sm ease-out ring-1 focus:ring-2 outline-none border-none caret-${color} ring-${props.color} focus:ring-${props.color} rounded-${rounded} text-${textColor}`, !!formattedValue ? 'ring-2' : '' , !preventLtr && 'is-ltr']"
          :id="name"
          :style="{paddingRight: rightInnerWidth + 16 + 'px', paddingLeft: leftInnerWidth + 16 + 'px'}"
          :placeholder="showOutlinedPlaceHolder && placeholder ? String(placeholder) : ''"
          @blur="onOutlinedBlur"
          @focus="onOutlinedFocus"
        />
        <label
          id="label-outline-input"
          :for="name"
          :style="{ right: rightInnerWidth + 16 + 'px !important' }"
          :class="[`transition-all rounded-full duration-[130px] ease-out absolute opacity-100 pointer-events-none scale-[.95] text-${textColor}`]"
        >
          <slot name="label" />
        </label>
        <span
          ref="leftInner"
          class="absolute left-2 select-none"
          @click="clearable && type !== 'number' && type !== 'email' ? resetModel(true) : null"
        >
      <slot name="left-inner">
        <div v-if="!!formattedValue && clearable && type !== 'number' && type !== 'email'"
             class="text-2xl cursor-pointer">
          <u-icon name="close" size="1.8" />
        </div>
      </slot>
    </span>
        <span
          ref="rightInner"
          class="absolute right-2 select-none"
          @click="clearable && (type === 'number' || type === 'email') ? resetModel(true) : null"
        >
      <slot name="right-inner">
        <div v-if="!!formattedValue && clearable && (type === 'number' || type === 'email')"
             class="text-2xl cursor-pointer">
          <u-icon name="close" size="1.8" />
        </div>
      </slot>
    </span>
      </div>

      <div
        v-if="variant === 'underlined'"
        ref="underlinedInputEl"
        class="relative w-fit"
        :style="{height: height, width: width}"
      >
        <input
          :type="type"
          ref="inpRef"
          v-bind="{...getAttrs , ...field}"
          v-model="formattedValue"
          @keydown="onKeyDown"
          :style="{paddingRight: rightInnerWidth + 16 + 'px !important', paddingLeft: leftInnerWidth + 16 + 'px !important'}"
          :placeholder="showUnderlinedPlaceholder && placeholder ? String(placeholder) : ''"
          :class="[`block bg-transparent py-3 outline-none border-none h-full w-full` ,!preventLtr && 'is-ltr']"
          :maxlength="maxLength"
          :id="name"
          @blur="onUnderlinedBlur"
          @focus="onUnderlinedFocus"
        />
        <span
          :class="`block relative after:absolute after:w-0 after:h-full after:bottom-0 after:transition-all after:transition-gpu after:ease-in-out after:duration-300 after:bg-${color} w-full min-w-full h-0.5 bg-gray rounded-${rounded}`">
    </span>
        <label :for="name" :class="`absolute pointer-events-none transition-all text-${textColor}`"
               :style="{ right: rightInnerWidth + 16 + 'px !important' }">
          <slot name="label" />
        </label>
        <span
          ref="leftInner"
          class="absolute left-2 select-none"
          @click="clearable && type !== 'number' && type !== 'email' ? resetModel(true) : null"
        >
      <slot name="left-inner">
        <div v-if="!!formattedValue && clearable && type !== 'number' && type !== 'email'"
             class="text-2xl cursor-pointer">
          <u-icon name="close" size="1.8" />
        </div>
      </slot>
    </span>
        <span
          ref="rightInner"
          class="absolute right-2 select-none"
          @click="clearable && (type === 'number' || type === 'email') ? resetModel(true) : null"
        >
      <slot name="right-inner">
        <div v-if="!!formattedValue && clearable && (type === 'number' || type === 'email')"
             class="text-2xl cursor-pointer">
          <u-icon name="close" size="1.8" />
        </div>
      </slot>
    </span>
      </div>

      <div
        v-if="variant === 'flat'"
        class="flex flex-col gap-1.5"
      >
        <label v-if="name && slots.label" :for="name" :class="`text-${textColor} cursor-pointer`">
          <slot name="label" />
        </label>
        <div ref="flatInputEl" class="relative flex items-center" :style="{height: height, width: width}">
          <input
            :type="type"
            ref="inpRef"
            v-bind="{...getAttrs , ...field}"
            v-model="formattedValue"
            @keydown="onKeyDown"
            :id="name"
            :maxlength="maxLength"
            :placeholder="placeholder ? String(placeholder) : ''"
            :style="{paddingRight: rightInnerWidth + 16 + 'px !important',paddingLeft: leftInnerWidth + 16 + 'px !important'}"
            :class="[`duration-300 w-full h-full text-sm ease-out p-3 ring-1 focus:ring-2 outline-none border-none caret-${color} ring-${props.color} focus:ring-${props.color} rounded-${rounded} text-${textColor}`, !!formattedValue ? 'ring-2' : '' , !preventLtr && 'is-ltr']"
          />
          <span
            ref="leftInner"
            class="absolute left-2 select-none"
            @click="clearable && type !== 'number' && type !== 'email' ? resetModel(true) : null"
          >
        <slot name="left-inner">
          <div v-if="!!formattedValue && clearable && type !== 'number' && type !== 'email'"
               class="text-2xl cursor-pointer">
            <u-icon name="close" size="1.8" />
          </div>
        </slot>
      </span>
          <span
            ref="rightInner"
            class="absolute right-2 select-none"
            @click="clearable && (type === 'number' || type === 'email') ? resetModel(true) : null"
          >
        <slot name="right-inner">
          <div v-if="!!formattedValue && clearable && (type === 'number' || type === 'email')"
               class="text-2xl cursor-pointer">
            <u-icon name="close" size="1.8" />
          </div>
        </slot>
      </span>
        </div>
      </div>

    </Field>
    <div v-if="rules" class="mb-4">
      <transition name="fade">
        <ErrorMessage
          as="div"
          class="mt-1"
          :name="name"
          v-slot="{ message }"
        >
                        <span class="text-xs text-error">
                          {{ message }}
                        </span>
        </ErrorMessage>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  ColorsUnion,
  RoundedUnion, TextFieldTypeUnion,
  TextFieldVariantUnion,
  WidthAndHeightUnion,
  TextFieldModeUnion
} from "~/types/propTypes";
import UIcon from "~/components/ui/u-icon/u-icon.vue";
import { ErrorMessage, Field } from "vee-validate";

interface ZTextFieldProps {
  modelValue?: string | number
  name?: string
  type?: TextFieldTypeUnion
  placeholder?: string
  variant?: TextFieldVariantUnion
  color?: ColorsUnion
  textColor?: ColorsUnion
  clearable?: boolean
  rounded?: RoundedUnion
  height?: WidthAndHeightUnion
  width?: WidthAndHeightUnion
  maxLength?: number
  isPrice?: boolean
  rules?: string
  defaultValue?: string
  preventLtr?: false,
  validateOptions?: {
    validateOnMount?: boolean
    validateOnChange?: boolean
  }
}

const props = withDefaults(defineProps<ZTextFieldProps>(), {
  variant: "outlined",
  textColor: "black",
  color: "primary",
  clearable: false,
  rounded: "lg",
  width: "100%",
  height: "48px",
  type: "text",
  isPrice: false,
  rules: "",
  name: "undefined",
  preventLtr: false,
  validateOptions: () => ({
    validateOnMount: false,
    validateOnChange: true
  })
});
const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get: (): string | number => {
    if (props.modelValue) {
      val.value = props.modelValue;
    }
    return val.value;
  },
  set: (newVal: string | number) => {
    val.value = newVal;
    emit("update:modelValue", val.value);
  }
});

const formattedValue = computed({
  get: () => {
    return props.isPrice ? formatNumber(model.value)
      : model.value;
  },
  set: (newVal: string | number) => {
    if (!newVal) {
      val.value = "";
    } else if (props.isPrice) {
      val.value = parseNumber(newVal);
    } else {
      val.value = newVal;
    }
    val.value = latinNumber(val.value);
    emit("update:modelValue", val.value);
  }
});

const attrs = useAttrs();
const slots = useSlots();

const inpRef = ref();

const outlinedInputEl = ref();
const underlinedInputEl = ref();
const flatInputEl = ref();

const val = ref("" as string | number);

const leftInner = ref();
const rightInner = ref();

const rightInnerWidth = ref(0);
const leftInnerWidth = ref(0);

const showOutlinedPlaceHolder = ref(false);
const showUnderlinedPlaceholder = ref(false);

const getAttrs = computed(() => ({
  ...attrs,
  type: props.type === "number" ? "text" : props.type,
  inputmode: getInputMode(props.type)
}));

const getInputMode = (type: TextFieldTypeUnion): TextFieldModeUnion => {
  if (attrs?.inputmode) return attrs.inputmode as TextFieldModeUnion;
  switch (type) {
    case "number":
      return "numeric";
    case "email":
      return "email";
    default:
      return "text";
  }
};

const onUnderlinedBlur = () => {
  showUnderlinedPlaceholder.value = false;
  if (!formattedValue.value) {
    const label = underlinedInputEl.value.children[2];
    const bar = underlinedInputEl.value.children[1];

    label.classList.remove(
      "-top-3",
      "scale-75",
      "right-2",
      `text-${props.color}`
    );
    bar.classList.replace("after:w-full", "after:w-0");
  }
};

const onUnderlinedFocus = () => {
  showUnderlinedPlaceholder.value = true;
  const label = underlinedInputEl.value.children[2];
  const bar = underlinedInputEl.value.children[1];

  label.classList.add("-top-3", "scale-75", "right-2", `text-${props.color}`);
  bar.classList.replace("after:w-0", "after:w-full");
};

const onOutlinedBlur = () => {
  showOutlinedPlaceHolder.value = false;
  if (!formattedValue.value) {
    const label = outlinedInputEl.value.children[1];
    label.classList.remove(
      "-top-3.5",
      "right-2",
      "scale-75",
      "bg-white",
      "px-1.5"
    );
  }
};

const onOutlinedFocus = () => {
  showOutlinedPlaceHolder.value = true;
  const label = outlinedInputEl.value.children[1];

  label.classList.add("-top-3.5", "right-2", "scale-75", "bg-white", "px-1.5");
};

const resetModel = (blur = false) => {
  formattedValue.value = "";

  if (blur) {
    if (props.variant === "flat") flatInputEl.value.blur();

    if (props.variant === "outlined") {
      outlinedInputEl.value.focusout;
      onOutlinedBlur();
    }
    if (props.variant === "underlined") {
      underlinedInputEl.value.blur();
      onUnderlinedBlur();
    }
  }
};

const formatNumber = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const parseNumber = (value) => {
  return parseFloat(value.toString().replace(/,/g, ""));
};

const onKeyDown = (event) => {
  if (props.type === "number" && !numberTypeValidKeys(event.key)) {
    event.preventDefault();
  }
};

const isNumber = (val: string) => {
  return !!val.match(/^[\u06F0-\u06F90-9]+$/);
};

const numberTypeValidKeys = (pressedKey: string) => {
  return (
    pressedKey === "Backspace" ||
    pressedKey === "Delete" ||
    isNumber(pressedKey) ||
    pressedKey === "ArrowRight" ||
    pressedKey === "ArrowLeft"
  );
};

onMounted(() => {
  formattedValue.value = model.value;

  if (slots["right-inner"] || props.clearable) {
    rightInnerWidth.value = rightInner.value.offsetWidth;
  }
  if (slots["left-inner"] || props.clearable) {
    leftInnerWidth.value = leftInner.value.offsetWidth;
  }
  if (props.variant === "outlined") {
    const label = outlinedInputEl.value.children[1];
    const labelHeight = label.offsetHeight;
    label.style.top = `calc(50% - ${labelHeight / 2}px)`;
    if (formattedValue.value) {
      label.classList.add(
        "-top-3.5",
        "right-2",
        "scale-75",
        "bg-white",
        "px-1.5"
      );
    }
  } else if (props.variant === "underlined") {
    const label = underlinedInputEl.value.children[2];
    const labelHeight = label.offsetHeight;
    const elTop = `calc(50% - ${labelHeight / 2}px)`;

    label.style.top = elTop;
    leftInner.value.style.top = elTop;
    rightInner.value.style.top = elTop;
    if (formattedValue.value) {
      label.classList.add(
        "-top-3",
        "scale-75",
        "right-2",
        `text-${props.color}`
      );
    }
  }
});

</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease !important;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

input.is-ltr[type="email"],
input.is-ltr[type="number"],
input.is-ltr[inputmode="numeric"] {
  direction: ltr !important;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
