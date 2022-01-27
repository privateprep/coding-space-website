import React, { useState } from "react";
import PropTypes from "prop-types";
import { AccordionItem } from "../Atoms/AccordionItem";

import "./styles/Accordion.scss";

/**
 This component is ideal for displaying FAQ or other bulk information.
*/
const AccordionItems = ({ bgColor, heading, fgColor, list, textColor }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      className="accordion component"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {!!heading && (
        <div className="accordionItems__header">
          <h1>{heading}</h1>
        </div>
      )}
      <dl className="accordionItems__list">
        {!!list &&
          list.map((item, i) => {
            const activeItem = activeIndex === i;
            return (
              <AccordionItem
                key={`${item}-${i}`}
                activeItem={activeItem}
                fgColor={fgColor}
                index={i}
                mdContent={item.mdContent}
                textColor={textColor}
                title={item.title}
                onClick={() => setActiveIndex(i)}
              />
            );
          })}
      </dl>
    </div>
  );
};

AccordionItems.propTypes = {
  /**
   Color for the background of the component
  */
  bgColor: PropTypes.string,
  /**
   Color of the Accordion Item title background
  */
  fgColor: PropTypes.string,
  /**
   Color of the text
  */
  textColor: PropTypes.string,
  /**
   An optional header above all the Accordion quotes
  */
  heading: PropTypes.string,
  /**
   List of AccordionItems themselves containing the title and the hidden content.
  */
  list: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      mdContent: PropTypes.string,
    })
  ),
};

export default AccordionItems;
