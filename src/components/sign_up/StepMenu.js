import React from "react";

const StepMenu = ({ items, activeStep }) => (
  <ul className="StepMenu">
    {items.map((item, i) => (
      <li
        key={i}
        className={`StepMenu__item ${
          activeStep === item ? "StepMenu__item--active" : ""
        }`}
      >
        {item}
      </li>
    ))}
  </ul>
);

export default StepMenu;
