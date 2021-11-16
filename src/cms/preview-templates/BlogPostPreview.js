import React from "react";
import PropTypes from "prop-types";
import { BlogPostTemplate } from "../../templates/template_exports/blog-post-template";

const BlogPostPreview = ({ entry, widgetFor }) => {
  // Always convert extracted objects and arrays .toJS()
  // in order to access the data.

  const tags = entry.getIn(["data", "tags"]);
  const featuredImage = entry.getIn(["data", "featuredImage"]).toJS();

  return (
    <BlogPostTemplate
      bgColor={entry.getIn(["data", "bgColor"])}
      content={widgetFor("body")}
      date={entry.getIn(["data", "date"]).toString()}
      description={entry.getIn(["data", "description"])}
      featuredImage={featuredImage}
      tags={tags && tags.toJS()}
      title={entry.getIn(["data", "title"])}
      titleColor={entry.getIn(["data", "titleColor"])}
    />
  );
};

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default BlogPostPreview;
