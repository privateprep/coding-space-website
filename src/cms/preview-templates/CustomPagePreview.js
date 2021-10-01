import React from "react";
import PropTypes from "prop-types";
import { CustomPageTemplate } from "../../templates/template_exports/custom-page-template";

const CustomPagePreview = ({ entry, widgetFor, getAsset }) => {
  const entryPageBuilder = entry.getIn(["data", "pageBuilder"]);
  const pageBuilder = entryPageBuilder ? entryPageBuilder.toJS() : [];
  const headingImage = entry.getIn(["data", "headingImage"]);

  return (
    <CustomPageTemplate
      description={entry.getIn(["data", "description"])}
      title={entry.getIn(["data", "title"])}
      titleColor={entry.getIn(["data", "titleColor"])}
      headingImage={headingImage}
      pageBuilder={pageBuilder}
    />
  );
};

CustomPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
  getAsset: PropTypes.func,
};

export default CustomPagePreview;
