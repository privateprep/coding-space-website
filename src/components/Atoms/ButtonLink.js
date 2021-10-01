import React from "react";
import PropTypes from "prop-types";
import "./styles/ButtonLink.scss";

export const ButtonLink = ({ fgColor, textColor, key, link, text }) => (
  <a
    class="button-link"
    href={link}
    key={key}
    style={{
      color: textColor,
      backgroundColor: fgColor,
      borderColor: textColor,
    }}
  >
    {text}
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
   The URL to link to another page or external source, this is a button in appearance only
  */
  link: PropTypes.string,
  /**
   Button text
  */
  text: PropTypes.string,
};

export default ButtonLink;
