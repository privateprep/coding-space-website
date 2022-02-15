import React from "react";
import createHtml from "../MdToHtml";
import PropTypes from "prop-types";
import smallLogo from "../../img/logo-small.svg";

import "./styles/BoxWithLogo.scss";

/**
 * Renders a styled container to display information like a schedule, instructions, or list.
 */
const BoxWithLogo = ({
  bgColor = "#faf6ee",
  fgColor = "#264548",
  textColor = "#fff",
  heading,
  mdContent,
}) => {
  const htmlContent = createHtml(mdContent);

  return (
    <div
      className="BoxWithLogo component"
      style={{
        paddingTop: "40px",
        backgroundColor: bgColor,
      }}
    >
      <img
        src={smallLogo}
        alt="Rocket Ship Logo"
        className="BoxWithLogo__logo"
      />
      <div
        className="BoxWithLogo__content"
        style={{
          backgroundColor: fgColor,
          color: textColor,
        }}
      >
        {!!heading && (
          <h2 className="BoxWithLogo__content__title">{heading}</h2>
        )}
        <div
          className="BoxWithLogo__content__md"
          dangerouslySetInnerHTML={htmlContent}
        ></div>
      </div>
    </div>
  );
};

export default BoxWithLogo;

BoxWithLogo.propTypes = {
  /**
   Color for the background of the component
  */
  bgColor: PropTypes.string,
  /**
   The fill color of the box
  */
  fgColor: PropTypes.string,
  /**
   The text and header color
  */
  textColor: PropTypes.string,
  /**
   Header of the content
  */
  heading: PropTypes.string,
  /**
   A rich text editor is provided for flexibility in content. This markdown
   content is then converted to HTML.
  */
  mdContent: PropTypes.string,
};
