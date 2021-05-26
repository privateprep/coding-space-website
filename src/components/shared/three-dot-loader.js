import React from "react";
import "./three-dot-loader.css";

const ThreeDotLoader = props => (
  <div aria-hidden="true" className="three-dot-loader" {...props}>
    <span className="dot-1" />
    <span className="dot-2" />
    <span className="dot-3" />
  </div>
);

export default ThreeDotLoader;
