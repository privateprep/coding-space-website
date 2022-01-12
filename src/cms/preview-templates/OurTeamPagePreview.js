import React from "react";
import PropTypes from "prop-types";
import { OurTeamPageTemplate } from "../../templates/template_exports/our-team-page-template";

const OurTeamPagePreview = ({ entry }) => {
  const data = entry.getIn(["data"]).toJS();
  if (data) {
    return (
      <OurTeamPageTemplate
        description={data.description || {}}
        title={data.title || {}}
        team={data.team || {}}
      />
    );
  } else {
    return <div>Loading...</div>;
  }
};

OurTeamPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
};

export default OurTeamPagePreview;
