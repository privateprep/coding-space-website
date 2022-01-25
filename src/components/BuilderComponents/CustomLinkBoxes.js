import React from "react";
import PropTypes from "prop-types";
import CustomLinkBox from "../Atoms/CustomLinkBox";

import "./styles/CustomLinkBoxes.scss";

/**
 * A clickable box that links to another page or external site. Customizable content using a
 * rich text editor.
 */
const CustomLinkBoxes = ({ list }) => {
  return (
    <div className="custom-link-boxes component">
      <ul className="custom-link-boxes__list">
        {!!list &&
          list.map((item, i) => (
            <li>
              <CustomLinkBox
                key={`custom-link-box-${i}`}
                content={item.content}
                mdContent={item.mdContent}
                fgColor={item.fgColor}
                textAlign={item.textAlign}
                textColor={item.textColor}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

CustomLinkBoxes.propTypes = {
  /**
   * The background color of the entire component, set in parent container
   */
  bgColor: PropTypes.string,
  /**
   * These items allow rich text editing, background color selection, alignment,
   * and the link to follow
   */
  list: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      fgColor: PropTypes.string,
      mdContent: PropTypes.string,
      textColor: PropTypes.string,
      textAlign: PropTypes.string,
    })
  ),
};

export default CustomLinkBoxes;
