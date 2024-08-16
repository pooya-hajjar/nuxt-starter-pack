interface PublicStates {
  appScrolledAmount: number;
}

const defaultPublicStates = (): PublicStates => ({
  appScrolledAmount: 0,
});

export const usePublicStore = defineStore("public", {
  state: defaultPublicStates,
});
