import React from "react";
import createHtml from "../../components/MdToHtml";
import CtaContact from "../../components/CtaContact";
import CourseOfferings from "../../components/CourseOfferings";

export const ExperienceLevelsTemplate = ({
  courseOfferingEndpoint,
  details,
  title,
  helmet,
}) => {
  const { age, gender, byline, mdContent, experience, skills, sellingPoints } =
    details;
  const htmlContent = createHtml(mdContent);

  return (
    <div className="experience-level-page">
      <section className="course-hero">
        {helmet || ""}
        <div className="course-hero__text">
          <h1>
            <span className="course-hero__text__byline">{byline}</span>
            {title}
          </h1>
          <div
            className="course-hero__text__content"
            dangerouslySetInnerHTML={htmlContent}
          />
        </div>
        <div className="course-hero__card">
          <header className="course-hero__card__header">
            <span>{gender.join(", ")}</span>
            <span>{age}</span>
          </header>
          <p className="course-hero__card__detail-title">Includes</p>
          <p className="course-hero__card__detail-content">
            {skills.map((skill, skillIndex) => (
              <React.Fragment key={skillIndex}>
                <em className="highlight">{skill}</em>
                {skillIndex < skills.length - 1 && (
                  <span style={{ marginRight: `.25rem` }}>{`,`}</span>
                )}
              </React.Fragment>
            ))}
          </p>
          <p className="course-hero__card__detail-title">Experience</p>
          <p className="course-hero__card__detail-content">{experience}</p>
          <p className="course-hero__card__detail-title">
            Ideal for those looking for
          </p>
          <ul className="course-hero__card__detail-content">
            {sellingPoints.map(point => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>
      <CourseOfferings courseOfferingEndpoint={courseOfferingEndpoint} />
      <CtaContact />
    </div>
  );
};
