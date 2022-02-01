import React from "react";
import PropTypes from "prop-types";
import { ProgramPageTemplate } from "../../templates/template_exports/program-page-template";

const ProgramsPreview = ({ entry }) => {
  const entryPageBuilder = entry.getIn(["data", "pageBuilder"]);
  const pageBuilder = entryPageBuilder ? entryPageBuilder.toJS() : [];

  return (
    <ProgramPageTemplate
      description={entry.getIn(["data", "description"])}
      title={entry.getIn(["data", "title"])}
      titleColor={entry.getIn(["data", "titleColor"])}
      headingImage={entry.getIn(["data", "headingImage"])}
      pageBuilder={pageBuilder}
    />
  );
};

ProgramsPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
  getAsset: PropTypes.func,
};

export default ProgramsPreview;
