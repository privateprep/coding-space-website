import React from "react";
import PropTypes from "prop-types";
import Review from "../Atoms/Review";

import "./styles/Reviews.scss";

const Reviews = ({ bgColor, heading, list }) => {
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
              name={item.content}
              review={item.title}
            />
          ))}
      </div>
    </div>
  );
};

Reviews.propTypes = {
  data: PropTypes.shape({
    bgColor: PropTypes.string,
    heading: PropTypes.string,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        content: PropTypes.string,
      })
    ),
  }),
};

export default Reviews;
