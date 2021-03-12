import React from "react";
import PropTypes from "prop-types";
import createHtml from "../MdToHtml";
import PreviewCompatibleImage from "../PreviewCompatibleImage";

const TextAndImageBlock = ({ data }) => {
  const { bgColor, fgColor, image, mdContent, mediaPosition } = data;
  const htmlContent = createHtml(mdContent);

  return (
    <div
      className="TextAndImageBlock component"
      style={{
        display: "flex",
        flexWrap: "wrap",
        padding: "4rem",
        backgroundColor: bgColor,
        flexDirection: mediaPosition == "left" ? "row-reverse" : "row",
        justifyContent: "space-between",
      }}
    >
      <div
        className="TextAndImageBlock__content"
        style={{
          padding: "1rem",
          color: "black",
          fontSize: "18px",
          margin: "0px",
          flex: "1 1 500px",
        }}
        dangerouslySetInnerHTML={htmlContent}
      ></div>
      <div
        className="TextAndImageBlock__image"
        style={{ alignSelf: "center", padding: "2rem", position: "relative", flex: "1 1 500px" }}
      >
        <PreviewCompatibleImage imageInfo={image} />
      </div>
    </div>
  );
};

TextAndImageBlock.propTypes = {
  data: PropTypes.shape({
    bgColor: PropTypes.string,
    fgColor: PropTypes.string,
    image: PropTypes.any,
    mdContent: PropTypes.string,
  }),
};

export default TextAndImageBlock;
