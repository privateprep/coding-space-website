import React from "react";
import PropTypes from "prop-types";
import QuoteIcon from "../../img/QuoteIcon.js";

import "./styles/Review.scss";

export const Review = ({ name, review, quoteColor = "#EDC034" }) => (
  <div className="review">
    <QuoteIcon className="review__quote" quoteColor={quoteColor} />
    <p className="review__content">{review}</p>
    <p className="review__name">{name}</p>
  </div>
);

Review.propTypes = {
  /**
   Name of the review/quote
  */
  name: PropTypes.string,
  /**
   Content of the review/quote
  */
  review: PropTypes.string,
  /**
   Color of the quote icon
  */
  quoteColor: PropTypes.string,
};

export default Review;