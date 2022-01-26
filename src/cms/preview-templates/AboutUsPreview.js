import React from "react";
import PropTypes from "prop-types";
import { AboutUsTemplate } from "../../templates/template_exports/about-us-template";

const AboutUsPreview = ({ entry, getAsset }) => {
  const entryPageBuilder = entry.getIn(["data", "pageBuilder"]);
  const pageBuilder = entryPageBuilder ? entryPageBuilder.toJS() : [];
  const heroImage = getAsset(entry.getIn(["data", "heroImage"]));
  return (
    <AboutUsTemplate
      description={entry.getIn(["data", "description"])}
      title={entry.getIn(["data", "title"])}
      titleColor={entry.getIn(["data", "titleColor"])}
      heroImage={heroImage}
      pageBuilder={pageBuilder}
    />
  );
};

AboutUsPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
};

export default AboutUsPreview;
