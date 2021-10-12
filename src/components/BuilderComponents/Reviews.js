import React from "react";
import PropTypes from "prop-types";
import Review from "../Atoms/Review";

import "./styles/Reviews.scss";

/**
 This component provides formatted quotes or reviews that display a person's name and their statement.
*/
const Reviews = ({ bgColor, fgColor, heading, list, textColor }) => {
  return (
    <div className="reviews component" style={{ backgroundColor: bgColor }}>
      {!!heading && (
        <div className="reviews__header">
          <h1>{heading}</h1>
        </div>
      )}
      <div className="reviews__list">
        {!!list &&
          list.map((item, i) => (
            <Review
              key={`review-${i}`}
              content={item.content}
              textColor={textColor}
              fgColor={fgColor}
              title={item.title}
            />
          ))}
      </div>
    </div>
  );
};

Reviews.propTypes = {
  /**
   Color for the background of the component
  */
  bgColor: PropTypes.string,
  /**
   Color of the review background
  */
  fgColor: PropTypes.string,
  /**
   Color of the quote
  */
  textColor: PropTypes.string,
  /**
   An optional header above all the reviews/quotes
  */
  heading: PropTypes.string,
  /**
   List of reviews themselves containing the name and statement.
  */
  list: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string,
    })
  ),
};

export default Reviews;
