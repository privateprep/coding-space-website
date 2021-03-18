import React from "react";
import PropTypes from "prop-types";
import { CustomPageTemplate } from "../../templates/custom-page";

const PartnershipsPreview = ({ entry, widgetFor, getAsset }) => {
  const entryPageBuilder = entry.getIn(["data", "pageBuilder"]);
  const pageBuilder = entryPageBuilder ? entryPageBuilder.toJS() : [];

  return (
    <CustomPageTemplate
      description={entry.getIn(["data", "description"])}
      title={entry.getIn(["data", "title"])}
      headingImage={entry.getIn(["data", "headingImage"])}
      pageBuilder={pageBuilder}
    />
  );
};

PartnershipsPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
  getAsset: PropTypes.func,
};

export default PartnershipsPreview;
