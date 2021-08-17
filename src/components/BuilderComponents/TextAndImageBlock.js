import React from "react";
import PropTypes from "prop-types";
import createHtml from "../MdToHtml";
import PreviewCompatibleImage from "../PreviewCompatibleImage";
import Buttons from "./Buttons";

const TextAndImageBlock = ({ data }) => {
  const { bgColor, buttons, fgColor, image, mdContent, mediaPosition } = data;
  const htmlContent = createHtml(mdContent);

  return (
    <div
      className="TextAndImageBlock component"
      style={{
        display: "flex",
        flexWrap: "wrap",
        backgroundColor: bgColor,
        flexDirection: mediaPosition === "left" ? "row-reverse" : "row",
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
        style={{
          alignSelf: "center",
          boxShadow: `20px 20px ${fgColor}`,
          margin: "2rem",
          position: "relative",
          flex: "1 1 500px",
          lineHeight: ".5",
        }}
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
