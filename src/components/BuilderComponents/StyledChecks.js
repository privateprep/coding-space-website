import React from "react";
import PropTypes from "prop-types";

import "./styles/StyledChecks.scss";

/**
 * Nicely formatted check list items. Useful for displaying a list of information.
 */
const StyledChecks = ({
  bgColor,
  fgColor,
  mediaPosition = "column",
  textColor,
  list,
}) => {
  return (
    <div
      className="styled-checks component"
      style={{ backgroundColor: bgColor }}
    >
      <ul
        className="styled-checks__list"
        style={{
          flexDirection: mediaPosition,
        }}
      >
        {!!list &&
          list.map((item, index) => {
            const { title, content } = item;
            return (
              <li key={index} className="styled-checks__list__item">
                <div
                  className="styled-checks__list__item__head"
                  style={{ display: "flex", color: textColor }}
                >
                  <div
                    className="styled-check-mark"
                    style={{
                      backgroundColor: fgColor,
                    }}
                  >
                    ✓
                  </div>
                  <h3>{title}</h3>
                </div>
                <p className="styled-checks__list__item__content">{content}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

StyledChecks.propTypes = {
  /**
   Color for the background of the component
  */
  bgColor: PropTypes.string,
  /**
   Color of the circle behind the check
  */
  fgColor: PropTypes.string,
  /**
   Color of the check mark and header
  */
  textColor: PropTypes.string,
  /**
   Display checks in a row or column.
  */
  mediaPosition: PropTypes.oneOf(["column", "row"]),
  /**
   List of checks to display. Expects a header that appears next to the check mark
   and content that contains more details. Can be any number of checks.
  */
  list: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string,
    })
  ),
};

export default StyledChecks;
