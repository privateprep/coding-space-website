import React from "react";
import PropTypes from "prop-types";
import { graphql, useStaticQuery } from "gatsby";
import BlogPreview from "./Atoms/BlogPreview";

const BlogRoll = () => {
  const data = useStaticQuery(graphql`
    query BlogRollQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      ) {
        edges {
          node {
            excerpt(pruneLength: 400)
            id
            fields {
              slug
            }
            frontmatter {
              tags
              title
              templateKey
              date(formatString: "MMMM DD, YYYY")
              featuredPost
              featuredImage {
                alt
                image {
                  childImageSharp {
                    fluid(maxWidth: 2048, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  if (typeof data === "undefined") {
    return null;
  }

  const { edges: posts } = data?.allMarkdownRemark;

  return (
    <React.Fragment>
      {posts && posts.map(({ node: post }) => <BlogPreview {...post} />)}
    </React.Fragment>
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
