import React from "react";
import PropTypes from "prop-types";
import { PartnershipsTemplate } from "../../templates/template_exports/partnerships-template";

const PartnershipsPreview = ({ entry, getAsset }) => {
  const entryPageBuilder = entry.getIn(["data", "pageBuilder"]);
  const pageBuilder = entryPageBuilder ? entryPageBuilder.toJS() : [];
  // extracts image url from the entry
  const image = entry.getIn(["data", "heroImage"]);
  const heroImage = image ? getAsset(image).toJS().image : {};

  return (
    <PartnershipsTemplate
      description={entry.getIn(["data", "description"])}
      title={entry.getIn(["data", "title"])}
      heroImage={heroImage}
      pageBuilder={pageBuilder}
    />
  );
};

PartnershipsPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default PartnershipsPreview;
