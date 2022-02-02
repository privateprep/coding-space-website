import React from "react";
import PropTypes from "prop-types";
import { ProgramsTemplate } from "../../templates/template_exports/programs-template";

const ProgramsPreview = ({ entry, getAsset }) => {
  const entryPageBuilder = entry.getIn(["data", "pageBuilder"]);
  const pageBuilder = entryPageBuilder ? entryPageBuilder.toJS() : [];
  // extracts image url from the entry
  const heroImage = getAsset(entry.getIn(["data", "heroImage"]).toJS().image);

  return (
    <ProgramsTemplate
      description={entry.getIn(["data", "description"])}
      title={entry.getIn(["data", "title"])}
      titleColor={entry.getIn(["data", "titleColor"])}
      heroImage={heroImage}
      pageBuilder={pageBuilder}
    />
  );
};

ProgramsPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
};

export default ProgramsPreview;
