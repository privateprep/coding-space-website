import React from "react";
import PropTypes from "prop-types";
import createHtml from "../MdToHtml";
import PreviewCompatibleImage from "../PreviewCompatibleImage";
import Buttons from "./Buttons";

import "./styles/TextAndImageBlock.scss";

const TextAndImageBlock = ({ data }) => {
  const {
    bgColor,
    buttons,
    fgColor,
    image,
    mdContent,
    mediaPosition,
    textColor,
  } = data;
  const htmlContent = createHtml(mdContent);
  const imageInfo = image;
  imageInfo.wrapperStyle = fgColor ? { boxShadow: `20px 20px ${fgColor}` } : {};
  return (
    <div
      className="TextAndImageBlock component"
      style={{
        backgroundColor: bgColor,
        direction: mediaPosition === "left" ? "rtl" : "ltr",
      }}
    >
      <div
        className="TextAndImageBlock__content"
        style={{
          color: textColor,
        }}
      >
        <div
          className="TextAndImageBlock__content__md"
          dangerouslySetInnerHTML={htmlContent}
        />
        <div className="TextAndImageBlock__content_buttons">
          {!!buttons && <Buttons {...buttons} />}
        </div>
      </div>
      <div className="TextAndImageBlock__image">
        <PreviewCompatibleImage imageInfo={imageInfo} />
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
    textColor: PropTypes.string,
  }),
};

export default TextAndImageBlock;
