<template>
  <div class="select-none p-3">
    <div
      class="flex flex-col relative overflow-hidden gap-4"
      :class="wrapperClasses"
    >
      <!--      <div @click="goToday"-->
      <!--           class="absolute top-2 flex items-center justify-center cursor-pointer text-primary font-medium">-->
      <!--        رفتن به امروز-->
      <!--      </div>-->
      <div class="m-auto w-56 flex justify-between items-center gap-1">
        <u-icon
          @click="updateMonth(month.value - 1)"
          class="cursor-pointer mx-2"
          name="chevron-r-primary"
          size="1.7"
        />
        <p class="text-black">{{ month.name }}</p>
        <p class="text-black">{{ year.value }}</p>
        <u-icon
          @click="updateMonth(month.value + 1)"
          class="cursor-pointer mx-2"
          name="chevron-l-primary"
          size="1.7"
        />
      </div>

      <div
        class="grid grid-cols-7 justify-center items-center w-full overflow-hidden m-auto"
      >
        <div
          v-for="(day, index) in [
            'شنبه',
            'یک',
            'دو',
            'سه',
            'چهار',
            'پنج',
            'جمعه',
          ]"
          :key="`week_day_${index}`"
        >
          <span
            class="text-sm text-black text-center flex justify-center items-center font-medium rounded-full"
          >
            {{ day }}
          </span>
        </div>
        <div
          v-for="emptyDay in month.startWeekDay - 1"
          :key="`empty_day_${emptyDay}`"
        />
        <div v-for="day in month.countOfDays" :key="`day_${day}`">
          <span
            ref="day"
            @click="handleSelection(day)"
            class="relative rounded-full cursor-pointer flex items-center justify-center"
          >
            <span
              class="w-7 h-7 rounded-full m-2 z-[1] flex items-center justify-center no-transition"
              :class="{
                'bg-secondary':
                  (firstDate.DD === day &&
                    firstDate.MM === month.value &&
                    firstDate.YYYY === year.value) ||
                  (secondDate.DD === day &&
                    secondDate.MM === month.value &&
                    secondDate.YYYY === year.value),
                'border border-black-very-light ': +today.format('D') === day,
              }"
            >
              {{ day }}
            </span>

            <span
              v-if="inTheRange({ year: year.value, month: month.value, day })"
              class="absolute w-[200%] h-6 rounded-full bg-secondary-light"
              :class="{ saturday: isSaturday(day), friday: isFriday(day) }"
            ></span>
          </span>
        </div>
      </div>
      <div v-if="hasSuggestion" class="flex items-center gap-2 overflew-scroll">
        <span
          v-for="(s, index) in suggestions"
          :key="'date_picker_suggest_' + index"
          @click="s.handler()"
          class="p-2 bg-gray-very-light text-sm font-medium rounded-lg text-black cursor-pointer"
        >
          {{ s.title }}
        </span>
      </div>
      <div @click="submit">
        <slot name="submit">
          <u-btn :id="submitId" color="primary" custom-classes="w-full ">
            <div class="flex items-center justify-center">
              <u-icon name="tick-square" size="1.3" />
              <p class="text-14 mx-2">اعمال</p>
            </div>
          </u-btn>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PersianDate from "persian-date";
import type {
  DPDates as Dates,
  DPMonth as Month,
  DPYear as Year,
  DPDate as Date,
} from "~/types/propTypes";

import UIcon from "~/components/ui/svg/u-svg.vue";
import UBtn from "~/components/ui/btn/u-btn.vue";

// TODO: Make this component ts error-free
interface UDatePickerProp{

}

const props = defineProps({
  modelValue: Object,
  onSubmit: {
    type: Function,
    default: () => {},
  },
  isRangeSelection: {
    type: Boolean,
    default: false,
  },
  hasSuggestion: {
    type: Boolean,
    default: false,
  },
  timeStampOutput: {
    type: Boolean,
    default: false,
  },
  wrapperClasses: {
    type: String,
    default: "w-full",
  },
  autoSubmit: {
    type: Boolean,
    default: false,
  },
  submitId: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get: () => props.modelValue as any,
  set: (value: Dates | null | string) => emit("update:modelValue", value),
});

const toDay = new PersianDate().toLocale("en");
// const tomorrow = new PersianDate().toLocale("en").add("d", 1).toLocale("en");
// const yesterday = new PersianDate().toLocale("en").add("d", -1).toLocale("en");

type Suggestions = {
  title: string;
  handler: Function;
}[];

const suggestions: Suggestions = [
  {
    title: "امروز",
    handler: () => {
      resetDays();
      if (!props.isRangeSelection) {
        daySetter(
          "first",
          true,
          toDay.format("D"),
          toDay.format("M"),
          toDay.format("YYYY"),
          toDay.unix()
        );
      } else {
        daySetter(
          "first",
          true,
          toDay.format("D"),
          toDay.format("M"),
          toDay.format("YYYY"),
          toDay.unix()
        );
      }
      submit();
    },
  },
];

const day = ref();
const today = ref();

const year = reactive({
  value: 0,
} as Year);
const month = reactive({
  name: "",
  value: 0,
  startWeekDay: 0,
  countOfDays: 0,
} as Month);

const firstDate = reactive({
  isSet: false,
  YYYY: 0,
  MM: 0,
  DD: 0,
  unix: 0,
} as Date);
const secondDate = reactive({
  isSet: false,
  YYYY: 0,
  MM: 0,
  DD: 0,
  unix: 0,
} as Date);

const daySetter = (
  day: "first" | "second",
  isSet: boolean,
  dayOfMonth: number,
  month: number,
  year: number,
  unix: number
): void => {
  const aDay = day === "first" ? firstDate : secondDate;

  aDay.isSet = true;
  aDay.DD = dayOfMonth;
  aDay.MM = month;
  aDay.YYYY = year;
  aDay.unix = unix;

  if (
    props.autoSubmit &&
    ((!props.isRangeSelection && firstDate.isSet) ||
      (props.isRangeSelection && firstDate.isSet && secondDate.isSet))
  ) {
    submit();
  }
};

const setMonthProperties = (): void => {
  const date = new PersianDate([year.value, month.value, 1]).toLocale("en");
  month.name = date.toLocale("fa").format("MMMM");
  month.startWeekDay = date.day();
  month.countOfDays = date.daysInMonth();
};

const setInitialDates = () => {
  if (model.value !== null && !props.isRangeSelection) {
    if (props.timeStampOutput) {
      const date = new PersianDate(model.value.finish).toLocale("en");
      daySetter(
        "first",
        true,
        date.format("D"),
        date.format("M"),
        date.format("YYYY"),
        date.unix()
      );
    } else {
      const firstParts = model.value.split("/");
      const first = new PersianDate([
        +firstParts[0],
        +firstParts[1],
        +firstParts[2],
      ]).toLocale("en");
      daySetter(
        "first",
        true,
        +firstParts[2],
        +firstParts[1],
        +firstParts[0],
        first.unix()
      );
    }
  } else if (
    !!model.value &&
    typeof model.value === "object" &&
    props.isRangeSelection
  ) {
    if (props.timeStampOutput) {
      const start = new PersianDate(model.value.start).toLocale("en");
      const finish = new PersianDate(model.value.finish).toLocale("en");
      daySetter(
        "first",
        true,
        start.format("D"),
        start.format("M"),
        start.format("YYYY"),
        start.unix()
      );
      daySetter(
        "second",
        true,
        finish.format("D"),
        finish.format("M"),
        finish.format("YYYY"),
        finish.unix()
      );
    } else {
      const firstParts = model.value.start.split("/");
      const secParts = model.value.finish.split("/");
      const first = new PersianDate([
        +firstParts[0],
        +firstParts[1],
        +firstParts[2],
      ]).toLocale("en");
      const sec = new PersianDate([
        +secParts[0],
        +secParts[1],
        +secParts[2],
      ]).toLocale("en");
      daySetter(
        "first",
        true,
        +firstParts[2],
        +firstParts[1],
        +firstParts[0],
        first.unix()
      );
      daySetter(
        "second",
        true,
        +secParts[2],
        +secParts[1],
        +secParts[0],
        sec.unix()
      );
    }
  }
};

onBeforeMount(() => {
  const now = new PersianDate().toLocale("en");
  today.value = now;
  year.value = now.year();
  month.value = now.month();
  setMonthProperties();
  setInitialDates();
  setInitialDates();
});

const updateMonth = (value: number): void => {
  if (value > 12) {
    year.value++;
    month.value = 1;
  } else if (value < 1) {
    year.value--;
    month.value = 12;
  } else {
    month.value = value;
  }
  setMonthProperties();
};

const resetDays = (): void => {
  firstDate.isSet = false;
  firstDate.DD = 0;
  firstDate.MM = 0;
  firstDate.YYYY = 0;
  firstDate.unix = 0;
  secondDate.isSet = false;
  secondDate.DD = 0;
  secondDate.MM = 0;
  secondDate.YYYY = 0;
  secondDate.unix = 0;
};

const handleSelection = (dayOfMonth: number): void => {
  if (props.isRangeSelection) {
    if (!firstDate.isSet) {
      const unix = new PersianDate([
        year.value,
        month.value,
        dayOfMonth,
      ]).unix();
      daySetter("first", true, dayOfMonth, month.value, year.value, unix);
    } else if (!secondDate.isSet) {
      const unix = new PersianDate([
        year.value,
        month.value,
        dayOfMonth,
      ]).unix();
      if (unix !== firstDate.unix) {
        daySetter("second", true, dayOfMonth, month.value, year.value, unix);
      }
    } else resetDays();
  } else {
    if (!firstDate.isSet) {
      const unix = new PersianDate([
        year.value,
        month.value,
        dayOfMonth,
      ]).unix();
      daySetter("first", true, dayOfMonth, month.value, year.value, unix);
    } else {
      resetDays();
    }
  }
};

const inTheRange = (date: {
  year: number;
  month: number;
  day: number;
}): boolean => {
  const thisDate = new PersianDate([date.year, date.month, date.day]);
  if (firstDate.isSet && secondDate.isSet) {
    if (firstDate.unix < secondDate.unix) {
      return betweenOf(firstDate, secondDate, thisDate.unix());
    } else {
      return betweenOf(secondDate, firstDate, thisDate.unix());
    }
  }
  return false;
};

const betweenOf = (first: Date, second: Date, value: number): boolean => {
  return value > first.unix && value < second.unix;
};

const isSaturday = (d: number): boolean => {
  return (d + month.startWeekDay - 1) % 7 === 0;
};
const isFriday = (d: number): boolean => {
  return (d + month.startWeekDay - 1) % 7 === 1;
};

const getMaskedDate = (year: number, month: number, day: number): string => {
  const twoDigitDay = day.toString().padStart(2, "0");
  const twoDigitMonth = month.toString().padStart(2, "0");

  return `${year}/${twoDigitMonth}/${twoDigitDay}`;
};

const submit = (): void => {
  if (props.isRangeSelection) {
    if (firstDate.isSet && secondDate.isSet) {
      if (firstDate.unix < secondDate.unix) {
        model.value = {
          start: props.timeStampOutput
            ? firstDate.unix
            : getMaskedDate(firstDate.YYYY, firstDate.MM, firstDate.DD),
          finish: props.timeStampOutput
            ? secondDate.unix
            : getMaskedDate(secondDate.YYYY, secondDate.MM, secondDate.DD),
        };
      } else if (firstDate.unix > secondDate.unix) {
        model.value = {
          start: props.timeStampOutput
            ? secondDate.unix
            : getMaskedDate(secondDate.YYYY, secondDate.MM, secondDate.DD),
          finish: props.timeStampOutput
            ? firstDate.unix
            : getMaskedDate(firstDate.YYYY, firstDate.MM, firstDate.DD),
        };
      }
      if (props.onSubmit) props.onSubmit();
    } else {
      if (firstDate.isSet) {
        model.value = {
          start: props.timeStampOutput
            ? firstDate.unix.toString()
            : getMaskedDate(firstDate.YYYY, firstDate.MM, firstDate.DD),
          finish: props.timeStampOutput
            ? firstDate.unix.toString()
            : getMaskedDate(firstDate.YYYY, firstDate.MM, firstDate.DD),
        };
        if (props.onSubmit) props.onSubmit();
      } else {
        model.value = undefined;
        if (props.onSubmit) props.onSubmit();
      }
    }
  } else {
    if (firstDate.isSet) {
      model.value = props.timeStampOutput
        ? firstDate.unix
        : getMaskedDate(firstDate.YYYY, firstDate.MM, firstDate.DD);
      if (props.onSubmit) props.onSubmit();
    }
  }
};

// const goToday = (): void => {
//   month.value = today.value.month()
//   year.value = today.value.year()
//   setMonthProperties()
//   if (firstDate.isSet) {
//     resetDays()
//     submit()
//   } else {
//     day.value[today.value.day() - 1].children[0].classList.add("focus-today")
//     setTimeout(() => {
//       day.value[today.value.day() - 1].children[0].classList.remove("focus-today")
//     }, 2000)
//   }
// }
</script>

<style scoped lang="scss">
.bg-secondary-light {
  background-color: #fff8e5;
}

.saturday {
  width: 120% !important;
  left: 30%;
}

.friday {
  width: 120% !important;
  right: 30%;
}

//.focus-today {
//  transition: all 2s;
//  animation: scale 2s;
//  border-color: var(--color-secondary);
//}
//
//@keyframes scale {
//  0% {
//    //transform: scale(1);
//    border-width: 1px;
//  }
//  25% {
//    //transform: scale(2);
//    border-width: 4px;
//  }
//  50% {
//    //transform: scale(1);
//    border-width: 1.5px;
//  }
//  75% {
//    //transform: scale(2);
//    border-width: 4px;
//  }
//  100% {
//    //transform: scale(1);
//    border-width: 1px;
//  }
//}
</style>
