import React from "react";
import PropTypes from "prop-types";
import { BlogPostTemplate } from "../../templates/template_exports/blog-post-template";

const BlogPostPreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(["data", "tags"]);
  return (
    <BlogPostTemplate
      bgColor={entry.getIn(["data", "bgColor"])}
      content={widgetFor("body")}
      date={entry.getIn(["data", "date"])}
      description={entry.getIn(["data", "description"])}
      featuredImage={entry.getIn(["data", "featuredImage"])}
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
