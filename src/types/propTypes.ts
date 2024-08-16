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

export type CursorsUnion = keyof typeof Cursors;
