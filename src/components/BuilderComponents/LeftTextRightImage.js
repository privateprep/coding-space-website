import React from "react";
import PropTypes from "prop-types";
import createHtml from "../MdToHtml";
import PreviewCompatibleImage from "../PreviewCompatibleImage";

const LeftTextRightImage = ({ data }) => {
  const { bgColor, fgColor, image, mdContent } = data;
  const htmlContent = createHtml(mdContent);

  return (
    <div
      className="LeftTextRightImage columns"
      style={{
        display: "flex",
        flexXrap: "wrap",
        padding: "4rem",
        backgroundColor: bgColor,
      }}
    >
      <div
        className="LeftTextRightImage__content column"
        style={{
          padding: "1rem",
          color: "black",
          fontSize: "18px",
          margin: "0px",
          paddingRight: "4rem",
        }}
        dangerouslySetInnerHTML={htmlContent}
      ></div>
      <div
        className="LeftTextRightImage__image column"
        style={{ position: "relative" }}
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
