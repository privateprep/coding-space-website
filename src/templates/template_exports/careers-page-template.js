import React from "react";
import PropTypes from "prop-types";
import PageBuilder from "../../components/PageBuilder";
import { ButtonLink } from "../../components/Atoms";
import { DateTime } from "luxon";

import "../styles/careers-page.scss";

const Opening = ({ details, info }) => {
  const { applyLink, postingDate, removalDate } = details;
  const { title, description, type, locations } = info;

  const currentDate = DateTime.now().setZone("America/New_York");
  const removalDateTime =
    DateTime.fromISO(removalDate).setZone("America/New_York");

  if (!!removalDate && currentDate > removalDateTime) {
    return null;
  }

  return (
    <div className="opening-card">
      <div className="opening-card__header">
        <h3>
          {title}{" "}
          <span>
            <em>({type})</em>
          </span>
        </h3>
      </div>

      {!!locations.length && (
        <div className="opening-card__locations">
          {locations.map((l, i) => (
            <span key={`${l}-${i}`} className="tag">
              {l}
            </span>
          ))}
        </div>
      )}
      <p>{description}</p>
      <div className="opening-card__footer">
        <span>{postingDate}</span>
        <ButtonLink content={applyLink} title="Apply Now" />
      </div>
    </div>
  );
};

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
        <div classNme="careers-page__openings__title">
          <h1>Openings</h1>
        </div>
        <div className="careers-page__openings__list">
          {!openings.length && (
            <h3>No openings at the moment. Check back soon!</h3>
          )}
          {openings.map((opening, index) => (
            <Opening
              key={index}
              details={opening.details}
              info={opening.info}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

CareersPageTemplate.propTypes = {
  title: PropTypes.string,
  openings: PropTypes.array,
  pageBuilder: PropTypes.array,
};
