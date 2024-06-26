import React from "react";
import PropTypes from "prop-types";
import BlogPreview from "./Atoms/BlogPreview";

import "./BlogRoll.scss";

const BlogRoll = ({ blogRoll }) => {
  if (typeof blogRoll === "undefined") {
    return null;
  }

  const { edges: posts } = blogRoll;

  return (
    <div className="blog-roll">
      {posts && posts.map(({ node: post }) => <BlogPreview {...post} />)}
    </div>
  );
};

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default BlogRoll;
