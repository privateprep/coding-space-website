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
  return (
    <div className="points">
      <div className="has-text-centered">
        <h1>{data.heading}</h1>
      </div>
      <div className="points__list columns point-row">
        {!!data.list &&
          data.list.map((item, i) => (
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
