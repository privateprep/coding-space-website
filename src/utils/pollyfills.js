export const loadPolyfills = async () => {
  await loadIntersectionObserver();
};

const loadIntersectionObserver = () => {
  if (typeof window.IntersectionObserver === "undefined") {
    require("intersection-observer");
  }
};
