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

  return (
    <div
      className="TextAndImageBlock"
      style={{
        backgroundColor: bgColor,
        flexDirection: mediaPosition === "left" ? "row-reverse" : "row",
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
          {!!buttons && (
            <div
              className="HeaderAndMarkDownBlock__heading_buttons"
              style={{ paddingTop: "1rem" }}
            >
              <Buttons data={buttons} />
            </div>
          )}
        </div>
      </div>
      <div
        className="TextAndImageBlock__image"
        style={fgColor ? { boxShadow: `20px 20px ${fgColor}` } : {}}
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
    textColor: PropTypes.string,
  }),
};

export default TextAndImageBlock;
