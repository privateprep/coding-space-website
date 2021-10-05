import React from "react";
import PropTypes from "prop-types";
import createHtml from "../MdToHtml";
import Buttons from "./Buttons";

import "./styles/HeaderAndMarkDownBlock.scss";

const HeaderAndMarkDownBlock = ({
  bgColor,
  buttons,
  heading,
  mdContent,
  mediaPosition = "right",
  textAlign,
  textColor,
}) => {
  const htmlContent = createHtml(mdContent);

  return (
    <div
      className="header-and-markdown-block component"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        flexDirection: mediaPosition === "left" ? "row-reverse" : "row",
      }}
    >
      <div
        className="header-and-markdown-block__heading"
        style={{
          textAlign: textAlign,
        }}
      >
        <h1>{heading}</h1>
        {!!buttons && (
          <div className="header-and-markdown-block__heading__buttons">
            <Buttons {...buttons} />
          </div>
        )}
      </div>
      <div className="header-and-markdown-block__content">
        <div dangerouslySetInnerHTML={htmlContent} />
      </div>
    </div>
  );
};

HeaderAndMarkDownBlock.propTypes = {
  /**
   Color for the background of the component
  */
  bgColor: PropTypes.string,
  /**
   Color of the check mark and header
  */
  textColor: PropTypes.string,
  /**
   Determines if the header is placed on the left or right hand column
  */
  mediaPosition: PropTypes.oneOf(["left", "right"]),
  /**
   Content of the header
  */
  heading: PropTypes.string,
  /**
   Rich text displayed on the other side of the header
  */
  mdContent: PropTypes.string,
  /**
   [optional] call to action
  */
  buttons: PropTypes.object,
};

export default HeaderAndMarkDownBlock;
