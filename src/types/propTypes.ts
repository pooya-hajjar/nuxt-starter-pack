import type { DefaultColors } from "./colors";

enum Sizes {
  sm,
  md,
  base,
  lg,
  xl,
  "2xl",
  "3xl",
}

enum BtnVariant {
  "filled",
  "elevated",
  "text",
  "outlined",
}

enum TextFieldVariant {
  "outlined",
  "underlined",
  "flat",
}

enum TextFieldType {
  "text",
  "email",
  "number",
  "password",
}

enum LinkTarget {
  "",
  "_blank",
  "_self",
  "_parent",
  "_top",
}

enum TextFieldInputMode {
  "text",
  "email",
  "numeric",
  "tel",
  "decimal",
  "url",
}

enum Cursors {
  "auto",
  "crosshair",
  "default",
  "e-resize",
  "help",
  "move",
  "n-resize",
  "ne-resize",
  "nw-resize",
  "pointer",
  "progress",
  "s-resize",
  "se-resize",
  "sw-resize",
  "text",
  "w-resize",
  "wait",
}

enum Currencies {
  "toman",
  "rial",
}

export type ColorsUnion = keyof typeof DefaultColors;
export type SizesUnion = keyof typeof Sizes;
export type RoundedUnion = SizesUnion | "none" | "full";
export type StrokeUnion = "0" | "1" | "2" | "base" | "4" | "8" | "inset";
export type WidthAndHeightUnion =
  | number
  | "auto"
  | `${number}rem`
  | `${number}px`
  | `${number}%`;
export type BtnVariantUnion = keyof typeof BtnVariant;
export type TextFieldVariantUnion = keyof typeof TextFieldVariant;
export type TextFieldTypeUnion = keyof typeof TextFieldType;
export type LinkTargetUnion = keyof typeof LinkTarget;
export type TextFieldModeUnion = keyof typeof TextFieldInputMode;
export type CursorsUnion = keyof typeof Cursors;
export type CurrencyUnion = keyof typeof Currencies;
