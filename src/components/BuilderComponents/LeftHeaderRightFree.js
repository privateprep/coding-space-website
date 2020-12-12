import React from "react";
import createHtml from "../MdToHtml";

const LeftHeaderRightFree = ({ data }) => {
  const { heading, mdContent } = data;
  const htmlContent = createHtml(mdContent);

  return (
    <div className="columns headerBulletSections">
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

export default LeftHeaderRightFree;
