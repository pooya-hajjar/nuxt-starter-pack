export const deleteElementsByKey = <T>(arr: T[], el: T): T[] => {
  return arr.filter((e) => e !== el);
};

export const deleteElementByIndex = <T>(arr: T[], index: number): T[] => {
  return arr.filter((e, idx) => idx !== index);
};
