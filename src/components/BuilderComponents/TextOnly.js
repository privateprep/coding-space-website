import React from "react";
import PropTypes from "prop-types";
import createHtml from "../MdToHtml";

const TextOnly = ({ data }) => {
  const { bgColor, textAlign, textColor, mdContent } = data;
  const htmlContent = createHtml(mdContent);

  return (
    <div
      className="columns component"
      style={{ backgroundColor: bgColor, padding: "4rem" }}
    >
      <div className="column">
        <div
          style={{
            textAlign: textAlign,
            padding: "1rem",
            color: textColor,
          }}
          dangerouslySetInnerHTML={htmlContent}
        />
      </div>
    </div>
  );
};

TextOnly.propTypes = {
  data: PropTypes.shape({
    bgColor: PropTypes.string,
    textAlign: PropTypes.string,
    textColor: PropTypes.string,
    mdContent: PropTypes.string,
  }),
};

export default TextOnly;
