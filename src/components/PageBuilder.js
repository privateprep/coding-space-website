import React from "react";
import PropTypes from "prop-types";
import { Reviews, Points } from "./BuilderComponents";

const ComponentSelector = ({ data }) => {
  switch (data.type) {
    case "reviews":
      return <Reviews data={data} />;
    case "points":
      return <Points data={data} />;
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
