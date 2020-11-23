import React from "react";
import PropTypes from "prop-types";

const HeaderBulletSections = ({ data }) => (
  <div className="columns headerBulletSections">
    <div className="column">
      <h1>{data.heading}</h1>
      {!!data.subheading && <h2>{data.subheading}</h2>}
    </div>
    <div className="column">
      {data.sections.map((section, i) => (
        <div key={`section-${i}`}>
          <section className="section">
            <h4 className="has-text-weight-semibold">{section.header}</h4>
            <p>{section.paragraph}</p>
          </section>
        </div>
      ))}
    </div>
  </div>
);

HeaderBulletSections.propTypes = {
  data: PropTypes.shape({
    heading: PropTypes.string,
    subheading: PropTypes.string,
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        header: PropTypes.string,
        paragraph: PropTypes.string,
      })
    ),
  }),
};

export default HeaderBulletSections;
