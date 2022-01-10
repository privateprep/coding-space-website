import React from "react";
import PropTypes from "prop-types";
import { IndexPageTemplate } from "../../templates/template_exports/index-page-template";

const IndexPagePreview = ({ entry }) => {
  const data = entry.getIn(["data"]).toJS();
  if (data) {
    return (
      <IndexPageTemplate
        title={data.title}
        mainpitch={data.mainpitch || {}}
        hero={data.hero || {}}
        differentiators={data.differentiators || {}}
        featuredProject={data.featuredProject || {}}
        reviews={data.reviews || {}}
      />
    );
  } else {
    return <div>Loading...</div>;
  }
};

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
};

export default IndexPagePreview;
