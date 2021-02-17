import React from "react";
import PropTypes from "prop-types";
import { CustomPageTemplate } from "../../templates/custom-page";

const AboutPagePreview = ({ entry, widgetFor, getAsset }) => {
  const entryPageBuilder = entry.getIn(["data", "pageBuilder"]);
  const pageBuilder = entryPageBuilder ? entryPageBuilder.toJS() : [];

  return (
    <CustomPageTemplate
      description={entry.getIn(["data", "description"])}
      title={entry.getIn(["data", "title"])}
      pageBuilder={pageBuilder}
    />
  );
};

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
  getAsset: PropTypes.func,
};

export default AboutPagePreview;
