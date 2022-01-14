import React from "react";
import PropTypes from "prop-types";
import { OurTeamPageTemplate } from "../../templates/template_exports/our-team-page-template";

const OurTeamPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(["data"]).toJS();
  const teamData = entry.getIn(["data", "team"]).toJS();
  // get asset for live image preview
  const team = teamData.map(member => ({
    ...member,
    image: getAsset(member.image.image),
  }));

  if (data) {
    return (
      <OurTeamPageTemplate
        description={data.description || {}}
        title={data.title || {}}
        team={team || {}}
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
