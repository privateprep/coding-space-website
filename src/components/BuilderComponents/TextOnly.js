import React from "react";
import PropTypes from "prop-types";
import createHtml from "../MdToHtml";

import "./styles/TextOnly.scss";

const TextOnly = ({ data }) => {
  const { textAlign, textColor, mdContent } = data;
  const htmlContent = createHtml(mdContent);

  return (
    <div className="TextOnly component">
      <div
        style={{
          textAlign: textAlign,
          color: textColor,
        }}
        dangerouslySetInnerHTML={htmlContent}
      />
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
