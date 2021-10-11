import React from "react";
import PropTypes from "prop-types";
import "./styles/ButtonLink.scss";

/**
 This is a button in appearance only and is actually a link to another page, either internal or external.
*/
export const ButtonLink = ({ fgColor, textColor, key, content, title }) => (
  <a
    class="button-link"
    href={content}
    key={key}
    style={{
      color: textColor,
      backgroundColor: fgColor,
      borderColor: textColor,
    }}
  >
    {title}
  </a>
);

ButtonLink.propTypes = {
  /**
   The fill color of the button
  */
  fgColor: PropTypes.string,
  /**
   The text and border color
  */
  textColor: PropTypes.string,
  /**
   Key necessary if used in a a ButtonLinkList
  */
  key: PropTypes.string,
  /**
   The URL to link to another page or external source
  */
  content: PropTypes.string,
  /**
   Button text
  */
  title: PropTypes.string,
};

export default ButtonLink;
