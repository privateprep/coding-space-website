import React from "react";
import PropTypes from "prop-types";
import {
  BoxWithLogo,
  Buttons,
  TextOnly,
  Reviews,
  Points,
  StyledChecks,
  HeaderAndMarkDownBlock,
  TextAndImageBlock,
  CustomLinkBoxes,
} from "./BuilderComponents";

const ComponentSelector = ({ data }) => {
  switch (data.type) {
    case "boxWithLogo":
      return <BoxWithLogo data={data} />;
    case "buttons":
      return <Buttons {...data} />;
    case "customLinkBoxes":
      return <CustomLinkBoxes data={data} />;
    case "textOnly":
      return <TextOnly data={data} />;
    case "headerAndMarkDownBlock":
      return <HeaderAndMarkDownBlock data={data} />;
    case "textAndImageBlock":
      return <TextAndImageBlock data={data} />;
    case "reviews":
      return <Reviews data={data} />;
    case "points":
      return <Points data={data} />;
    case "styledChecks":
      return <StyledChecks data={data} />;
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
