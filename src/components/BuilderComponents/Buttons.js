import React from "react";
import PropTypes from "prop-types";
import ButtonLink from "../Atoms/ButtonLink";

import "./styles/Buttons.scss";

/**
 * Provide quick access to other pages in the app via these button styled links
 */
const Buttons = ({ bgColor, fgColor, textColor, list }) => {
  if (!Array.isArray(list) && !list?.length) {
    return null;
  }

  return (
    <div
      className="Buttons component"
      style={{
        backgroundColor: bgColor,
        paddingTop: "0",
      }}
    >
      <div
        className="Buttons__list"
        style={{
          backgroundColor: bgColor,
        }}
      >
        {!!list &&
          list.map((item, i) => (
            <ButtonLink
              key={`button-link-${i}`}
              fgColor={fgColor}
              textColor={textColor}
              content={item.content}
              title={item.title}
            />
          ))}
      </div>
    </div>
  );
};

Buttons.propTypes = {
  /**
   Color for the background of the component
  */
  bgColor: PropTypes.string,
  /**
   The fill color of the button
  */
  fgColor: PropTypes.string,
  /**
   The text and border color
  */
  textColor: PropTypes.string,
  /**
   List of buttons to display. Can be any 1 - 3 buttons. Due to limitations of the standardization of prop names by the page builder, the list item's title corresponds to the button's text, and the list item's content corresponds to the button's link.
  */
  list: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       Label/Button text
      */
      title: PropTypes.string,
      /**
       Url
      */
      content: PropTypes.string,
    })
  ),
};

export default Buttons;
