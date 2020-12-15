import React from "react";
import PropTypes from "prop-types";

const Point = ({ key, description, figure }) => (
  <div key={key} className="column">
    <section className="section">
      <h2 className="is-size-1 has-text-weight-bold has-text-primary has-text-centered">
        {figure}
      </h2>
      <p className="has-text-weight-semibold has-text-centered">
        {description}
      </p>
    </section>
  </div>
);

const Points = ({ data }) => {
  const { bgColor, heading, list } = data;
  return (
    <div className="points" style={{ backgroundColor: bgColor }}>
      <div className="has-text-centered">
        <h1>{heading}</h1>
      </div>
      <div
        className="points__list columns point-row"
        style={{ backgroundColor: bgColor }}
      >
        {!!list &&
          list.map((item, i) => (
            <Point
              key={`point-${i}`}
              description={item.content}
              figure={item.title}
            />
          ))}
      </div>
    </div>
  );
};

Points.propTypes = {
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

export default Points;
