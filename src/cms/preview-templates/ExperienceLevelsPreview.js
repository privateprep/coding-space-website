import React from "react";
import PropTypes from "prop-types";
import { ExperienceLevelsTemplate } from "../../templates/experience-levels";

const ExperienceLevelsPreview = ({ entry, widgetFor, getAsset }) => {
  // const entryPageBuilder = entry.getIn(["data", "pageBuilder"]);
  // const pageBuilder = entryPageBuilder ? entryPageBuilder.toJS() : [];
  const entryDetails = entry.getIn(["data", "details"]);
  const details = entryDetails.toJS();

  return (
    <ExperienceLevelsTemplate
      title={entry.getIn(["data", "title"])}
      details={details}
      location=""
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
