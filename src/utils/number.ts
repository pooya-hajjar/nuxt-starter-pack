export function numberWithCommas(x: number): string {
  const parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export function latinNumber(val: string | number) {
  let value = val?.toString() ?? "";
  value = value.replaceAll("۰", "0");
  value = value.replaceAll("۱", "1");
  value = value.replaceAll("۲", "2");
  value = value.replaceAll("۳", "3");
  value = value.replaceAll("۴", "4");
  value = value.replaceAll("٤", "4");
  value = value.replaceAll("۵", "5");
  value = value.replaceAll("٥", "5");
  value = value.replaceAll("۶", "6");
  value = value.replaceAll("٦", "6");
  value = value.replaceAll("۷", "7");
  value = value.replaceAll("۸", "8");
  value = value.replaceAll("۹", "9");

  return value;
}
