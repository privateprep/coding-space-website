import React from "react";
import PropTypes from "prop-types";
import createHtml from "../MdToHtml";

const LeftHeaderRightFree = ({ data }) => {
  const { bgColor, heading, mdContent } = data;
  const htmlContent = createHtml(mdContent);

  return (
    <div
      className="columns component headerBulletSections"
      style={{ backgroundColor: bgColor }}
    >
      <div className="column">
        <h1>{heading}</h1>
      </div>
      <div className="column">
        <div
          className="section"
          style={{
            padding: "1rem",
          }}
          dangerouslySetInnerHTML={htmlContent}
        />
      </div>
    </div>
  );
};

LeftHeaderRightFree.propTypes = {
  data: PropTypes.shape({
    bgColor: PropTypes.string,
    heading: PropTypes.string,
    mdContent: PropTypes.string,
  }),
};

export default LeftHeaderRightFree;
