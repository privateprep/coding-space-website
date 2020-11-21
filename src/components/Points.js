import React from "react";
import PropTypes from "prop-types";

const Points = ({ data }) => (
  <div className="columns point-row">
    {data.map((point) => (
      <div key={`point`} className="column">
        <section className="section">
          <h2 className="is-size-1 has-text-weight-bold has-text-primary has-text-centered">
            {point.figure}
          </h2>
          <p className="has-text-weight-semibold has-text-centered">
            {point.description}
          </p>
        </section>
      </div>
    ))}
  </div>
);

Points.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      figure: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      description: PropTypes.string,
    })
  ),
};

export default Points;
