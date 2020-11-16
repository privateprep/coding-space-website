import React from "react";
import PropTypes from "prop-types";
import quote from "../img/quote.svg";

const Review = ({ name, review }) => (
  <section className="review">
    <img
      src={quote}
      alt="gold quote mark"
      style={{ width: "3em", height: "2em" }}
    />
    <p style={{ padding: "2rem" }}>{review}</p>
    <p className="has-text-weight-semibold" style={{ paddingLeft: "2rem", position: "absolute", bottom: "1rem" }}>
      {name}
    </p>
  </section>
);

const Reviews = ({ data }) => {
  return (
    <div className="reviews">
      <div className="has-text-centered">
        <h1>{data.heading}</h1>
      </div>
      <div className="reviews__list">
        {data.reviewList.map((review, i) => (
          <Review
            key={`review-${i}`}
            name={review.name}
            review={review.review}
          />
        ))}
      </div>
    </div>
  );
};

Reviews.propTypes = {
  data: PropTypes.shape({
    heading: PropTypes.string,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        reviewList: PropTypes.string,
        name: PropTypes.string,
      })
    ),
  }),
};

export default Reviews;
