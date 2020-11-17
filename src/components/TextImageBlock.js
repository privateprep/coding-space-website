import React from "react";
import remark from "remark";
import remarkHTML from "remark-html";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

const toHTML = value => remark().use(remarkHTML).processSync(value).toString();
function createMarkup(value) {
  return { __html: toHTML(value) };
}
const TextImageBlock = ({ data }) => {
  const { image, content } = data;

  return (
    <div
      className="TextImageBlock columns"
      style={{
        display: "flex",
        flexXrap: "wrap",
      }}
    >
      <div
        className="item__content column"
        style={{
          padding: "1rem",
          color: "black",
          fontSize: "18px",
          margin: "0px",
          padding: "0 0 20px",
        }}
        dangerouslySetInnerHTML={createMarkup(content)}
      ></div>
      <div className="item__image column">
        <PreviewCompatibleImage
          imageInfo={image}
        />
      </div>
    </div>
  );
};

export default TextImageBlock;
