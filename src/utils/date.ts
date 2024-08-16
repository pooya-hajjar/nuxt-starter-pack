export const getPerisanTimeText = (
  unix: number,
  withDate: boolean = false,
  withSecond: boolean = false
) => {
  const date = new Date(unix * 1000);

  const localeDate = date.toLocaleDateString("fa-IR");

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");

  const time = withSecond
    ? `${hours}:${minutes}:${second}`
    : `${hours}:${minutes}`;
  if (withDate) {
    return `${time} ${localeDate}`;
  } else {
    return time;
  }
};
