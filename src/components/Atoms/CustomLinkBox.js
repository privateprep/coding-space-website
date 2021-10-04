import React from "react";
import PropTypes from "prop-types";
import createHtml from "../MdToHtml";

import "./styles/CustomLinkBox.scss";

/**
 * A clickable box that links to another page or external site. Customizable content using a
 * rich text editor.
 */
export const CustomLinkBox = ({
  boxColor,
  mdContent,
  link,
  textAlign,
  textColor,
}) => {
  const htmlContent = createHtml(mdContent);

  return (
    <a
      className="custom-link-box"
      style={{
        backgroundColor: boxColor,
        color: textColor,
        border: `solid 2px ${textColor}`,
      }}
      href={link}
    >
      <div
        className="custom-link-box__content"
        dangerouslySetInnerHTML={htmlContent}
        style={{ color: textColor, textAlign: textAlign }}
      />
    </a>
  );
};

CustomLinkBox.propTypes = {
  /**
   * This is the complete url of the link. Can be "/about-us" if it's an internal link,
   * provide the full url for an external link "https://www.google.com"
   */
  content: PropTypes.string.isRequired,
  /**
   * The background color of the box
   */
  boxColor: PropTypes.string,
  /**
   * Rich text
   */
  mdContent: PropTypes.string,
  /**
   * Text color
   */
  textColor: PropTypes.string,
  /**
   * Text alignment options ("left", "center", "right")
   */
  textAlign: PropTypes.string,
};

export default CustomLinkBox;
