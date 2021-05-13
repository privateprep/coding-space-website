import React from "react";
import PropTypes from "prop-types";
import createHtml from "../MdToHtml";

const HeaderAndMarkDownBlock = ({ data }) => {
  const { bgColor, heading, mdContent, mediaPosition, textAlign, textColor } = data;
  const htmlContent = createHtml(mdContent);

  return (
    <div
      className="component HeaderAndMarkDownBlock"
      style={{
        display: "flex",
        flexWrap: "wrap",
        backgroundColor: bgColor,
        color: textColor,
        flexDirection: mediaPosition === "left" ? "row-reverse" : "row",
        justifyContent: "space-between",
      }}
    >
      <div
        className="HeaderAndMarkDownBlock__heading"
        style={{
          padding: "1rem",
          margin: "0px",
          flex: "1 1 500px",
          textAlign: textAlign,
        }}
      >
        <h1>{heading}</h1>
      </div>
      <div
        className="HeaderAndMarkDownBlock__content"
        style={{
          padding: "1rem",
          fontSize: "18px",
          margin: "0px",
          flex: "1 1 500px",
        }}
      >
        <div dangerouslySetInnerHTML={htmlContent} />
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
