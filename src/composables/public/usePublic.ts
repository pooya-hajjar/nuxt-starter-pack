import { usePublicStore } from "~/composables/public/public.store";

export const usePublic = () => {
  const { appScrolledAmount } = storeToRefs(usePublicStore());

  const onAppScroll = () => {
    appScrolledAmount.value =
      window?.pageYOffset ?? document?.documentElement?.scrollTop;
  };

  return { onAppScroll };
};
