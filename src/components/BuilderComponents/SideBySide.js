import React from "react";
import PropTypes from "prop-types";
import { BoxWithLogo, TextOnly, StyledChecks } from "./index";

import "./styles/SideBySide.scss";

const ComponentSelector = ({ data }) => {
  switch (data.type) {
    case "boxWithLogo":
      return <BoxWithLogo {...data} />;
    case "textOnly":
      return <TextOnly data={data} />;
    case "styledChecks":
      return <StyledChecks {...data} />;
    default:
      return <p>Unknown Type</p>;
  }
};

ComponentSelector.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string.isRequired,
    header: PropTypes.string,
    list: PropTypes.array,
  }),
};

/**
 This component provides additional flexibility in allowing for preselected side by side items like check marks and a block of text. If you require more options, talk to the Dashboard team.
*/
const SideBySide = ({ bgColor, leftComponent = [], rightComponent = [] }) => {
  return (
    <div className="side-by-side" style={{ backgroundColor: bgColor }}>
      {!leftComponent.length && !rightComponent.length && (
        <p>Add left and right items to view.</p>
      )}
      {!!leftComponent.length && (
        <div className="side-by-side__left-component">
          <ComponentSelector data={leftComponent[0]} />
        </div>
      )}
      {!!rightComponent.length && (
        <div className="side-by-side__right-component">
          <ComponentSelector data={rightComponent[0]} />
        </div>
      )}
    </div>
  );
};

SideBySide.propTypes = {
  /**
   Color for the background of the component
  */
  bgColor: PropTypes.string,
  /**
   Item appearing on the left side or top if on a mobile screen. Select only one!
  */
  leftComponent: PropTypes.array,
  /**
   Item appearing on the right side or bottom if on a mobile screen. Select only one!
  */
  rightComponent: PropTypes.array,
};

export default SideBySide;
