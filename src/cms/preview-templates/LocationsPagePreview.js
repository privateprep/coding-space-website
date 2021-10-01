import React from "react";
import PropTypes from "prop-types";
import { LocationsPageTemplate } from "../../templates/template_exports/locations-template";

const LocationsPagePreview = ({ entry }) => {
  const entryPageBuilder = entry.getIn(["data", "pageBuilder"]);
  const pageBuilder = entryPageBuilder ? entryPageBuilder.toJS() : [];

  return (
    <LocationsPageTemplate
      title={entry.getIn(["data", "title"])}
      pageBuilder={pageBuilder}
    />
  );
};

LocationsPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
};

export default LocationsPagePreview;
