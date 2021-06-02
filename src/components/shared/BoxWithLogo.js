import React from "react";
import logoSmall from "../../img/logo-small.svg";
import "./BoxWithLogo.scss";
const BoxWithLogo = ({ children }) => {
  return (
    <div className="BoxWithLogo">
      <img src={logoSmall} alt="The Coding Space Logo" />
      <div className="BoxWithLogo__content">{children}</div>
    </div>
  );
};

export default BoxWithLogo;
