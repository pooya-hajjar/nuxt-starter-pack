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
        <textarea

            ref="inpRef"
            v-bind="{...getAttrs , ...field}"
            v-model="formattedValue"
            :class="[`py-2.5 items-center w-full h-full duration-300 text-sm ease-out ring-1 focus:ring-2 outline-none border-none caret-${color} ring-${props.color} focus:ring-${props.color} rounded-${rounded} text-${textColor}`, !!formattedValue ? 'ring-2' : '' , !preventLtr && 'is-ltr']"
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
          <slot name="label"/>
        </label>
        <span
            ref="leftInner"
            class="absolute left-2 select-none"
            @click="clearable ? resetModel(true) : null"
        >
      <slot name="left-inner">
        <div v-if="!!formattedValue && clearable "
             class="text-2xl cursor-pointer">
          <u-icon name="close" size="1.8"/>
        </div>
      </slot>
    </span>
        <span
            ref="rightInner"
            class="absolute right-2 select-none"
            @click="clearable ? resetModel(true) : null"
        >
      <slot name="right-inner">
        <div v-if="!!formattedValue && clearable"
             class="text-2xl cursor-pointer">
          <u-icon name="close" size="1.8"/>
        </div>
      </slot>
    </span>
      </div>

      <div
          v-if="variant === 'flat'"
          class="flex flex-col gap-1.5"
      >
        <label v-if="name && slots.label" :for="name" :class="`text-${textColor} cursor-pointer`">
          <slot name="label"/>
        </label>
        <div ref="flatInputEl" class="relative flex items-center" :style="{height: height, width: width}">
          <textarea
              ref="inpRef"
              v-bind="{...getAttrs , ...field}"
              v-model="formattedValue"
              :id="name"
              :maxlength="maxLength"
              :placeholder="placeholder ? String(placeholder) : ''"
              :style="{paddingRight: rightInnerWidth + 16 + 'px !important',paddingLeft: leftInnerWidth + 16 + 'px !important'}"
              :class="[`break-all duration-300 w-full h-full text-sm ease-out p-3 ring-1 focus:ring-2 outline-none border-none caret-${color} ring-${props.color} focus:ring-${props.color} rounded-${rounded} text-${textColor}`, !!formattedValue ? 'ring-2' : '' , !preventLtr && 'is-ltr']"
          />
          <span
              ref="leftInner"
              class="absolute left-2 select-none"
              @click="clearable  ? resetModel(true) : null"
          >
        <slot name="left-inner">
          <div v-if="!!formattedValue && clearable"
               class="text-2xl cursor-pointer">
            <u-icon name="close" size="1.8"/>
          </div>
        </slot>
      </span>
          <span
              ref="rightInner"
              class="absolute right-2 select-none"
              @click="clearable  ? resetModel(true) : null"
          >
        <slot name="right-inner">
          <div v-if="!!formattedValue && clearable"
               class="text-2xl cursor-pointer">
            <u-icon name="close" size="1.8"/>
          </div>
        </slot>
      </span>
        </div>
      </div>

    </Field>
    <div class="mb-4">
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
  RoundedUnion,
  WidthAndHeightUnion,
  TextAreaVariantUnion
} from "~/types/propTypes";
import UIcon from "~/components/ui/u-icon/u-icon.vue";
import {ErrorMessage, Field} from "vee-validate";

interface ZTextFieldProps {
  modelValue?: string | number
  name?: string
  placeholder?: string
  variant?: TextAreaVariantUnion
  color?: ColorsUnion
  textColor?: ColorsUnion
  clearable?: boolean
  rounded?: RoundedUnion
  height?: WidthAndHeightUnion
  width?: WidthAndHeightUnion
  maxLength?: number
  rules?: string
  defaultValue?:string
  preventLtr ?: false,
  validateOptions ?: {
    validateOnMount ?: boolean
    validateOnChange ?: boolean
  }
}

const props = withDefaults(defineProps<ZTextFieldProps>(), {
  variant: "flat",
  textColor: "black",
  color: "primary",
  clearable: false,
  rounded: "lg",
  width: "100%",
  height: "48px",
  rules: "",
  name: "undefined",
  preventLtr : false,
  validateOptions : () => ({
    validateOnMount : false,
    validateOnChange : true
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
    return model.value;
  },
  set: (newVal: string | number) => {
    if (!newVal) {
      val.value = "";
    } else {
      val.value = newVal;
    }
    val.value = latinNumber(val.value);
    emit("update:modelValue", val.value);
  }
});

const attrs = useAttrs()
const slots = useSlots()

const inpRef = ref()

const outlinedInputEl = ref()
const flatInputEl = ref()

const val = ref("" as string | number)

const leftInner = ref()
const rightInner = ref()

const rightInnerWidth = ref(0)
const leftInnerWidth = ref(0)

const showOutlinedPlaceHolder = ref(false)

const getAttrs = computed(() => ({
  ...attrs,
}))



const onOutlinedBlur = () => {
  showOutlinedPlaceHolder.value = false
  if (!formattedValue.value) {
    const label = outlinedInputEl.value.children[1]
    label.classList.remove(
        "-top-3.5",
        "right-2",
        "scale-75",
        "bg-white",
        "px-1.5",
    )
  }
}

const onOutlinedFocus = () => {
  showOutlinedPlaceHolder.value = true
  const label = outlinedInputEl.value.children[1]

  label.classList.add("-top-3.5", "right-2", "scale-75", "bg-white", "px-1.5")
};

const resetModel = (blur = false) => {
  formattedValue.value = ""

  if (blur) {
    if (props.variant === "flat") flatInputEl.value.blur()

    if (props.variant === "outlined") {
      outlinedInputEl.value.focusout
      onOutlinedBlur()
    }

  }
};

onMounted(() => {
  formattedValue.value = model.value

  if (slots["right-inner"] || props.clearable) {
    rightInnerWidth.value = rightInner.value.offsetWidth
  }
  if (slots["left-inner"] || props.clearable) {
    leftInnerWidth.value = leftInner.value.offsetWidth
  }
  if (props.variant === "outlined") {
    const label = outlinedInputEl.value.children[1]
    label.style.top = `10px`
    if (formattedValue.value) {
      label.classList.add(
          "-top-3.5",
          "right-2",
          "scale-75",
          "bg-white",
          "px-1.5",
      );
    }
  }
});

</script>

<style scoped lang="scss">
.fade-enter-active ,
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
