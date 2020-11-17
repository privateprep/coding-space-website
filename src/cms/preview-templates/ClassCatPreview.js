import React from "react";
import PropTypes from "prop-types";
import { ClassCatTemplate } from "../../templates/class-cat";

const ClassCatPreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(["data", "tags"]);

  const entryPoints = entry.getIn(["data", "points"]);
  const points = entryPoints ? entryPoints.toJS() : [];

  const entryCheckmarks = entry.getIn(["data", "checkmarks"]);
  const checkmarks = entryCheckmarks ? entryCheckmarks.toJS() : [];

  const entryReviews = entry.getIn(["data", "reviews", "reviewList"]);
  const reviewList = entryReviews ? entryReviews.toJS() : [];

  const entrySkills = entry.getIn(["data", "competencies", "skills"]);

  const skills = entrySkills ? entrySkills.toJS() : [];


  return (
    <ClassCatTemplate
      content={widgetFor("body")}
      description={entry.getIn(["data", "description"])}
      tags={tags && tags.toJS()}
      title={entry.getIn(["data", "title"])}
      checkmarks={checkmarks}
      competencies={{
        heading: entry.getIn(["data", "competencies", "heading"]),
        subheading: entry.getIn(["data", "competencies", "subheading"]),
        skills: skills,
      }}
      boxWithLogo={{
        title: entry.getIn(["data", "boxWithLogo", "title"]),
        content: entry.getIn(["data", "boxWithLogo", "content"]),
      }}
      points={points}
      reviews={{
        heading: entry.getIn(["data", "reviews", "heading"]),
        reviewList: reviewList,
      }}
    />
  );
};

ClassCatPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default ClassCatPreview;
