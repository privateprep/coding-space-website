import React from "react";
import PropTypes from "prop-types";
import { RefundPageTemplate } from "../../templates/Refund-page";

const RefundPagePreview = (props) => {
  const { entry } = props;
  const entryPageBuilder = entry.getIn(["data", "pageBuilder"]);
  const pageBuilder = entryPageBuilder ? entryPageBuilder.toJS() : [];
  debugger;
  return (
    <RefundPageTemplate
      title={entry.getIn(["data", "title"])}
      pageBuilder={pageBuilder}
    />
  );
};

RefundPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
};

export default RefundPagePreview;
