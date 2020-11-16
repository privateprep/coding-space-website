import React from "react";
import PropTypes from "prop-types";

const Competencies = ({ data }) => (
  <div className="columns competencies">
    <div className="column">
      <h1>{data.heading}</h1>
      {!!data.subheading && <h2>{data.subheading}</h2>}
    </div>
    <div className="column">
      {data.skills.map((skill, i) => (
        <div key={`skill-${i}`}>
          <section className="section">
            <h4 className="has-text-weight-semibold">{skill.skill}</h4>
            <p>{skill.description}</p>
          </section>
        </div>
      ))}
    </div>
  </div>
);

Competencies.propTypes = {
  data: PropTypes.shape({
    heading: PropTypes.string,
    subheading: PropTypes.string,
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        skill: PropTypes.string,
        description: PropTypes.string,
      })
    ),
  }),
};

export default Competencies;
