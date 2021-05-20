import React from "react";
import PropTypes from "prop-types";
import { ExperienceLevelsTemplate } from "../../templates/experience-levels";

const ExperienceLevelsPreview = ({ entry, widgetFor, getAsset }) => {
  const entryPageBuilder = entry.getIn(["data", "pageBuilder"]);
  const pageBuilder = entryPageBuilder ? entryPageBuilder.toJS() : [];
  const headingImage = entry.getIn(["data", "headingImage"]);

  return (
    <ExperienceLevelsTemplate
      description={entry.getIn(["data", "description"])}
      title={entry.getIn(["data", "title"])}
      headingImage={headingImage}
      pageBuilder={pageBuilder}
    />
  );
};

ExperienceLevelsPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
  getAsset: PropTypes.func,
};

export default ExperienceLevelsPreview;
