import React from "react";
import PropTypes from "prop-types";
import createHtml from "../MdToHtml";

const HeaderAndMarkDownBlock = ({ data }) => {
  const { bgColor, fgColor, heading, mdContent, mediaPosition } = data;
  const htmlContent = createHtml(mdContent);

  return (
    <div
      className="component HeaderAndMarkDownBlock"
      style={{
        display: "flex",
        flexWrap: "wrap",
        backgroundColor: bgColor,
        color: fgColor,
        flexDirection: mediaPosition == "left" ? "row-reverse" : "row",
        justifyContent: "space-between",
      }}
    >
      <div
        className="HeaderAndMarkDownBlock__heading"
        style={{
          padding: "1rem",
          margin: "0px",
          flex: "1 1 500px",
        }}
      >
        <h1>{heading}</h1>
      </div>
      <div className="HeaderAndMarkDownBlock__content">
        <div
          className="section"
          style={{
            padding: "1rem",
            fontSize: "18px",
            margin: "0px",
            flex: "1 1 500px",
          }}
          dangerouslySetInnerHTML={htmlContent}
        />
      </div>
    </div>
  );
};

HeaderAndMarkDownBlock.propTypes = {
  data: PropTypes.shape({
    bgColor: PropTypes.string,
    heading: PropTypes.string,
    mdContent: PropTypes.string,
  }),
};

export default HeaderAndMarkDownBlock;
