import React from "react";
import PropTypes from "prop-types";
import {
  BoxWithLogo,
  Buttons,
  TextOnly,
  Reviews,
  Points,
  StyledChecks,
  LeftHeaderRightFree,
  LeftTextRightImage,
} from "./BuilderComponents";

const ComponentSelector = ({ data }) => {
  switch (data.type) {
    case "boxWithLogo":
      return <BoxWithLogo data={data} />;
    case "buttons":
      return <Buttons data={data} />;
    case "textOnly":
      return <TextOnly data={data} />;
    case "leftHeaderRightFree":
      return <LeftHeaderRightFree data={data} />;
    case "leftTextRightImage":
      return <LeftTextRightImage data={data} />;
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
  })
}

const PageBuilder = ({ data = [] }) => {
  return (
    <div className="page-builder">
      {data.map(component => (
        <ComponentSelector data={component} />
      ))}
    </div>
  );
};

PageBuilder.propTypes = {
  data: PropTypes.array,
};

export default PageBuilder;
