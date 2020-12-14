import React from "react";
import PropTypes from "prop-types";
import quote from "../../img/quote.svg";

const Review = ({ name, review }) => (
  <section className="review">
    <img
      src={quote}
      alt="gold quote mark"
      style={{ width: "3em", height: "2em" }}
    />
    <p style={{ padding: "2rem" }}>{review}</p>
    <p
      className="has-text-weight-semibold"
      style={{ paddingLeft: "2rem", position: "absolute", bottom: "1rem" }}
    >
      {name}
    </p>
  </section>
);

const Reviews = ({ data }) => {
  const { bgColor, heading, list } = data;

  return (
    <div className="reviews" style={{ backgroundColor: bgColor }}>
      <div className="has-text-centered">
        <h1>{heading}</h1>
      </div>
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
