import React from "react";
import PropTypes from "prop-types";
import "./styles/ButtonLink.scss";

/**
 This is a button in appearance only and is actually a link to another page, either internal or external.
*/
export const ButtonLink = ({
  fgColor = "#9de2dd",
  textColor = "#264548",
  content,
  title,
}) => (
  <a
    className="button-link"
    href={content}
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
   The URL to link to another page or external source
  */
  content: PropTypes.string,
  /**
   Button text
  */
  title: PropTypes.string,
};

export default ButtonLink;
