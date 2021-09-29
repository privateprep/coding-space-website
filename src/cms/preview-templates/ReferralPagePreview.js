import React from "react";
import PropTypes from "prop-types";
import { ReferralPageTemplate } from "../../templates/template_exports/referral-page-template";

const ReferralPagePreview = ({ entry }) => {
  const entryPageBuilder = entry.getIn(["data", "pageBuilder"]);
  const pageBuilder = entryPageBuilder ? entryPageBuilder.toJS() : [];

  return (
    <ReferralPageTemplate
      title={entry.getIn(["data", "title"])}
      pageBuilder={pageBuilder}
    />
  );
};

ReferralPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
};

export default ReferralPagePreview;
