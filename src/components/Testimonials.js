import React from "react";
import PropTypes from "prop-types";
import QuoteIcon from "../img/QuoteIcon.js";

import "./Testimonials.scss";

const Testimonials = ({
  testimonials, // fallbacks to match <Review />
  iconColor = "var(--primary-btn)", // yellow
  fgColor = "var(--backgroundAlt)", // white
}) => (
  <div className="testimonials-list">
    {testimonials.map((testimonial, testimonialIndex) => (
      <article
        key={testimonialIndex}
        className="testimonials-list__item"
        style={{ backgroundColor: fgColor }}
      >
        <QuoteIcon quoteColor={iconColor} />
        <p>{testimonial.quote || testimonial.title}</p>
        <p>
          <cite>{testimonial.author || testimonial.content}</cite>
        </p>
      </article>
    ))}
  </div>
);

Testimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      quote: PropTypes.string,
      author: PropTypes.string,
    })
  ),
  iconColor: PropTypes.string,
  fgColor: PropTypes.string,
};

export default Testimonials;
