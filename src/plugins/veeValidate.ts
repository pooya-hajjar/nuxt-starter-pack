import { defineRule, configure } from "vee-validate";
import * as roules from "@vee-validate/rules";

export default defineNuxtPlugin(() => {
  Object.keys(roules.all).forEach((rule) => {
    // @ts-ignore
    defineRule(rule, roules[rule]);
  });

  defineRule("phone-number", (val: string | number) => {
    return !(
      val?.toString()?.length !== 11 ||
      !val.toString().startsWith("09") ||
      isNaN(+val)
    );
  });

  //? uncomment this function to customize your messages
  //   configure({
  //     generateMessage: localize("en", {    //? import the localize from "@vee-validate/i18n";
  //       messages,    // a json file
  //     }),
  //   });
});
