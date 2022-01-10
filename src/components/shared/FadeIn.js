import React, { useState, useEffect, useRef } from "react";

const FadeIn = props => {
  const fadeRef = useRef();
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });
    observer.observe(fadeRef.current);
    return () => observer.unobserve(fadeRef.current);
  }, []);

  return (
    <div className={`fade-in ${isVisible ? "is-visible" : ""}`} ref={fadeRef}>
      {props.children}
    </div>
  );
};

export default FadeIn;
