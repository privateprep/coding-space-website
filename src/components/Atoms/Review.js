import React from "react";
import PropTypes from "prop-types";
import QuoteIcon from "../../img/QuoteIcon.js";

import "./styles/Review.scss";

export const Review = ({
  content,
  title,
  textColor = "#EDC034",
  fgColor = "#ffffff",
}) => (
  <div className="review" style={{ backgroundColor: fgColor }}>
    <QuoteIcon className="review__quote" quoteColor={textColor} />
    <p className="review__text">{title}</p>
    <p className="review__name">{content}</p>
  </div>
);

Review.propTypes = {
  /**
   Name of the reviewer or person who said the quote
  */
  content: PropTypes.string,
  /**
   The review/quote itself
  */
  title: PropTypes.string,
  /**
   Color of the quote icon
  */
  textColor: PropTypes.string,
  /**
   Background color of the review/quote
  */
  fgColor: PropTypes.string,
};

export default Review;
