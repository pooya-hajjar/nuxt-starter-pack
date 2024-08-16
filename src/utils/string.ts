export default function formatString(
  template: string,
  ...args: Array<any>
): string {
  if (typeof args[0] === "object") {
    // If the first argument is an object, treat it as key-value pairs
    const data: object = args[0];
    return template.replace(/{([^{}]+)}/g, (match, key: string) => {
      // @ts-ignore
      const value = data[key.trim()];
      return typeof value !== "undefined" ? value : match;
    });
  } else {
    // If the first argument is not an object, treat the arguments as individual values
    return template.replace(/{(\d+)}/g, (match: string, index) => {
      return typeof args[index] !== "undefined" ? args[index] : match;
    });
  }
}

export function snakeToKebab(str: string): string {
  return str.replace(/_/g, "-");
}

export function snakeToCamel(str: string) {
  const arr = str.split("-");
  const capital = arr.map((item, index) =>
    index
      ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
      : item.toLowerCase()
  );
  // ^-- change here.
  capital[0] = capital[0].toLowerCase();
  return capital.join("");
}

export function camelToSnake(str: string) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function camelToKebab(str: string) {
  return str.replace(/([a-z])(A-Z)/g, "$1-$2").toLowerCase();
}

export function kebabToSnake(str: string): string {
  return str.replace(/-/g, "_");
}

export function kebabToCamel(str: string): string {
  const arr = str.split("-");
  const capital = arr.map(
    (item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
  );
  capital[0] = capital[0].toLowerCase();
  return capital.join("");
}
