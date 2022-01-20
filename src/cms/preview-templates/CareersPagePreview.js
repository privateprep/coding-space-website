import React from "react";
import PropTypes from "prop-types";
import { CareersPageTemplate } from "../../templates/template_exports/careers-page-template";

const CareersPagePreview = ({ entry }) => {
  const data = entry.getIn(["data"]).toJS();

  if (data) {
    return (
      <CareersPageTemplate
        pageBuilder={data.pageBuilder}
        title={data.seo.title || {}}
        openings={data.openings || {}}
      />
    );
  } else {
    return <div>Loading...</div>;
  }
};

CareersPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
};

export default CareersPagePreview;
