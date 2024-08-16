interface PopupStates {
  showXPopup: boolean;
}

const defaultPopupStates = (): PopupStates => ({
  showXPopup: false,
});

export const usePopupStore = defineStore("popup", {
  state: defaultPopupStates,

  getters: {
    isAnyPopupOpen(state) {
      for (let key in defaultPopupStates()) {
        // @ts-ignore
        if (state[key]) return true;
      }
      return false;
    },
  },
});
