export const observer = (
  el: Element,
  onRenderingLastEl: () => void,
  onNotRenderingLastEl: () => void
) => {
  if (el) {
    const observe = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
          onRenderingLastEl();
        } else {
          onNotRenderingLastEl();
        }
      },
      {
        rootMargin: "0px",
        threshold: 1.0,
      }
    );
    observe.observe(el);
  }
};
