import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import BlogPreview from "../components/Atoms/BlogPreview";

import "./styles/BlogList.scss";

const BlogList = ({ data, pageContext }) => {
  const { edges: posts } = data?.allMarkdownRemark;

  return (
    <Layout>
      <div className="blog-page">
        <div className="blog-page__header">
          <h1
            style={{
              backgroundColor: "transparent",
              color: "white",
              padding: "1rem",
            }}
          >
            Latest Stories
          </h1>
        </div>
        <section className="blog-page__content">
          {posts && posts.map(({ node: post }) => <BlogPreview {...post} />)}
        </section>
      </div>
    </Layout>
  );
};

BlogList.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default BlogList;

export const pageQuery = graphql`
  query BlogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      limit: $limit
      skip: $skip
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
`;
