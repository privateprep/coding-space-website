import React from "react";
import PropTypes from "prop-types";
import createHtml from "../MdToHtml";

import "./styles/AccordionItem.scss";

export const AccordionItem = ({
  activeItem,
  index,
  fgColor,
  mdContent,
  onClick,
  textColor,
  title,
}) => {
  const htmlContent = createHtml(mdContent);

  return (
    <div
      className={`accordion-item ${!!activeItem ? "display-content" : ""}`}
      key={`accordion-item${index}`}
    >
      <dt>
        <button
          aria-expanded={activeItem}
          aria-controls={`accordion-item${index}_desc`}
          className={`accordion-item__button ${
            !!activeItem ? "display-content" : ""
          }`}
          style={{
            color: textColor,
            backgroundColor: activeItem ? fgColor : "transparent",
          }}
          onClick={onClick}
        >
          <p>{title}</p>
        </button>
      </dt>
      <dd>
        <div
          id={`accordion-item${index}_desc`}
          className={`accordion-item__desc ${
            !!activeItem ? "display-content" : ""
          }`}
          dangerouslySetInnerHTML={htmlContent}
        />
      </dd>
    </div>
  );
};

AccordionItem.propTypes = {
  /**
   Indicate if the item is expanded or not.
  */
  activeItem: PropTypes.bool,
  /**
   Used as key prop to identify the item.
  */
  index: PropTypes.number,
  /**
   Rich content display in the accordion item after clicking on the title.
  */
  mdContent: PropTypes.string,
  /**
    Callback function to be executed when the title is clicked in order to set display.
  */
  onClick: PropTypes.func,
  /**
   The title of the accordion item, always displayed.
  */
  title: PropTypes.string,
};

export default AccordionItem;
