import React from "react";
import PropTypes from "prop-types";
import { LiabilityPageTemplate } from "../../templates/liability-page";

const LiabilityPagePreview = ({ entry }) => {
  const entryPageBuilder = entry.getIn(["data", "pageBuilder"]);
  const pageBuilder = entryPageBuilder ? entryPageBuilder.toJS() : [];

  return (
    <LiabilityPageTemplate
      title={entry.getIn(["data", "title"])}
      pageBuilder={pageBuilder}
    />
  );
};

LiabilityPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
};

export default LiabilityPagePreview;
