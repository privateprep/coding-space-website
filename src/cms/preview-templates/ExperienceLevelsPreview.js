import React from "react";
import PropTypes from "prop-types";
import { ExperienceLevelsTemplate } from "../../templates/experience-levels";
import { Router } from "@reach/router";

const ExperienceLevelsPreview = ({ entry, widgetFor, getAsset }) => {
  // const entryPageBuilder = entry.getIn(["data", "pageBuilder"]);
  // const pageBuilder = entryPageBuilder ? entryPageBuilder.toJS() : [];
  const entryDetails = entry.getIn(["data", "details"]);
  const details = entryDetails.toJS();

  // must wrap in router for useLocation hook
  return (
    <Router>
      <ExperienceLevelsTemplate
        title={entry.getIn(["data", "title"])}
        titleColor={entry.getIn(["data", "titleColor"])}
        details={details}
        location=""
        default
      />
    </Router>
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
