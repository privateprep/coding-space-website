import React from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  BoxWithLogo,
  Buttons,
  TextOnly,
  Reviews,
  Points,
  SideBySide,
  StyledChecks,
  HeaderAndMarkDownBlock,
  TextAndImageBlock,
  CustomLinkBoxes,
} from "./BuilderComponents";
import { Iframe } from "./Atoms";

import "./BuilderComponents/styles/BuilderComponent.scss";

const ComponentSelector = ({ data }) => {
  switch (data.type) {
    case "accordion":
      return <Accordion {...data} />;
    case "boxWithLogo":
      return <BoxWithLogo {...data} />;
    case "buttons":
      return <Buttons {...data} />;
    case "customLinkBoxes":
      return <CustomLinkBoxes {...data} />;
    case "iframe":
      return <Iframe {...data} />;
    case "textOnly":
      return <TextOnly data={data} />;
    case "headerAndMarkDownBlock":
      return <HeaderAndMarkDownBlock {...data} />;
    case "textAndImageBlock":
      return <TextAndImageBlock data={data} />;
    case "sideBySide":
      return <SideBySide {...data} />;
    case "reviews":
      return <Reviews {...data} />;
    case "points":
      return <Points data={data} />;
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

const PageBuilder = ({ data = [] }) => {
  return (
    <div className="page-builder">
      {data.map((component, componentIndex) => {
        return (
          <div
            className="container"
            style={{ backgroundColor: component.bgColor }}
            key={componentIndex}
          >
            <ComponentSelector data={component} />
          </div>
        );
      })}
    </div>
  );
};

PageBuilder.propTypes = {
  data: PropTypes.array,
};

export default PageBuilder;
