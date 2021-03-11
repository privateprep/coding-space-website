import React from "react";
import PropTypes from "prop-types";
import createHtml from "../MdToHtml";
import PreviewCompatibleImage from "../PreviewCompatibleImage";

const LeftTextRightImage = ({ data }) => {
  const { bgColor, fgColor, image, mdContent, mediaPosition } = data;
  const htmlContent = createHtml(mdContent);

  return (
    <div
      className="LeftTextRightImage component"
      style={{
        display: "flex",
        // flexWrap: "wrap",
        padding: "4rem",
        backgroundColor: bgColor,
        flexDirection: mediaPosition == "left" ? "row-reverse" : "row",
        justifyContent: "space-between",
      }}
    >
      <div
        className="LeftTextRightImage__content"
        style={{
          padding: "1rem",
          color: "black",
          fontSize: "18px",
          margin: "0px",
          paddingRight: "4rem",
          flex: "1 1 50%",
        }}
        dangerouslySetInnerHTML={htmlContent}
      ></div>
      <div
        className="LeftTextRightImage__image"
        style={{ position: "relative", flex: "1 1 50%" }}
      >
        <PreviewCompatibleImage imageInfo={image} />
      </div>
    </div>
  );
};

LeftTextRightImage.propTypes = {
  data: PropTypes.shape({
    bgColor: PropTypes.string,
    fgColor: PropTypes.string,
    image: PropTypes.any,
    mdContent: PropTypes.string,
  }),
};

export default LeftTextRightImage;
