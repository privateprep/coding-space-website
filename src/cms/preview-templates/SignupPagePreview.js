import React from "react";
import PropTypes from "prop-types";
import { SignupPageTemplate } from "../../templates/signup-page";

const SignupPagePreview = ({ entry }) => {
  const entryPageBuilder = entry.getIn(["data", "pageBuilder"]);
  const pageBuilder = entryPageBuilder ? entryPageBuilder.toJS() : [];

  return (
    <SignupPageTemplate
      title={entry.getIn(["data", "title"])}
      pageBuilder={pageBuilder}
    />
  );
};

SignupPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
};

export default SignupPagePreview;
