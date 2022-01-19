import React from "react";
import PropTypes from "prop-types";
import PageBuilder from "../../components/PageBuilder";

export const CareersPageTemplate = ({ title, openings, pageBuilder }) => {
  return (
    <div className="careers-page">
      <section className="careers-page__title">
        <h1>{title}</h1>
      </section>
      <div className="careers-page__content">
        <PageBuilder data={pageBuilder} />
      </div>
      <section className="careers-page__openings">
        {openings.map((opening, index) => (
          <pre key={`opening-${index}`}>
            {JSON.stringify(opening, undefined, 2)}
          </pre>
        ))}
      </section>
    </div>
  );
};

CareersPageTemplate.propTypes = {
  title: PropTypes.string,
  openings: PropTypes.array,
  pageBuilder: PropTypes.array,
};
