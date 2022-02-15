import * as React from "react";
import { Link } from "gatsby";

import PreviewCompatibleImage from "./PreviewCompatibleImage";

import "./ClassCards.scss";

const ClassCards = ({ activeLevels, slugExtension = "" }) => {
  if (!activeLevels.length) {
    return (
      <div>
        <p>No matching courses available.</p>
        <p>Check back soon or contact our team for more information!</p>
      </div>
    );
  }

  return (
    <ul className="class-card-list">
      {activeLevels.map(
        (
          { title, thumbnail, slug, details: { age, gender, byline, skills } },
          levelIndex
        ) => {
          return (
            <li className="class-card-list__item" key={levelIndex}>
              <Link className="class-card" to={`${slug}${slugExtension}`}>
                <div className="class-card__top">
                  <p className="gender">{gender.join(", ")}</p>
                  <p className="age">{age}</p>
                </div>
                <h4 className="class-card__title">{title}</h4>
                <p className="class-card__byline">{byline}</p>
                <div className="class-card__img">
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: thumbnail,
                      alt: title,
                      wrapperStyle: { width: "100%", height: "200px" },
                    }}
                  />
                </div>
                <p className="class-card__skills">
                  {skills.map((skill, skillIndex) => (
                    <React.Fragment key={skillIndex}>
                      <em className="highlight">{skill}</em>
                      {skillIndex < skills.length - 1 && (
                        <span style={{ marginRight: `.25rem` }}>{`,`}</span>
                      )}
                    </React.Fragment>
                  ))}
                </p>
              </Link>
            </li>
          );
        }
      )}
    </ul>
  );
};

export default ClassCards;
