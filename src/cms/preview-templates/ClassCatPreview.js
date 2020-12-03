import React from "react";
import PropTypes from "prop-types";
import { ClassCatTemplate } from "../../templates/class-cat";

const ClassCatPreview = ({ entry, widgetFor, getAsset }) => {
  const tags = entry.getIn(["data", "tags"]);

  const entryPoints = entry.getIn(["data", "points"]);
  const points = entryPoints ? entryPoints.toJS() : [];

  const entryCheckmarks = entry.getIn(["data", "checkmarks"]);
  const checkmarks = entryCheckmarks ? entryCheckmarks.toJS() : [];

  const entryReviews = entry.getIn(["data", "reviews", "reviewList"]);
  const reviewList = entryReviews ? entryReviews.toJS() : [];

  const entrySections = entry.getIn([
    "data",
    "headerBulletSections",
    "sections",
  ]);
  const sections = entrySections ? entrySections.toJS() : [];

  const entryPageBuilder = entry.getIn(["data", "pageBuilder"]);
  const pageBuilder = entryPageBuilder ? entryPageBuilder.toJS() : [];

  return (
    <ClassCatTemplate
      content={widgetFor("body")}
      description={entry.getIn(["data", "description"])}
      tags={tags && tags.toJS()}
      title={entry.getIn(["data", "title"])}
      checkmarks={checkmarks}
      headerBulletSections={{
        heading: entry.getIn(["data", "headerBulletSections", "heading"]),
        subheading: entry.getIn(["data", "headerBulletSections", "subheading"]),
        sections: sections,
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
      textImageBlock={{
        content: entry.getIn(["data", "textImageBlock", "content"]),
        image: {
          image: getAsset(
            entry.getIn(["data", "textImageBlock", "image", "image"])
          ),
          alt: entry.getIn(["data", "textImageBlock", "image", "alt"]),
        },
      }}
      pageBuilder={pageBuilder}
    />
  );
};

ClassCatPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
  getAsset: PropTypes.func,
};

export default ClassCatPreview;
