export const loadPolyfills = async () => {
  if (typeof window !== "undefined") {
    await loadIntersectionObserver();
  }
};

const loadIntersectionObserver = () => {
  if (typeof window.IntersectionObserver === "undefined") {
    require("intersection-observer");
  }
};
