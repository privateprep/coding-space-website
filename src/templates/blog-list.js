import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import BlogPreview from "../components/Atoms/BlogPreview";

import "./styles/BlogList.scss";

const BlogList = ({ data, pageContext }) => {
  const { edges: posts } = data?.allMarkdownRemark;
  const { currentPage, numBlogListPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numBlogListPages;
  const prevPage =
    currentPage - 1 === 1 ? "/blog" : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();

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
          {posts &&
            posts.map(({ node: post }) => (
              <BlogPreview key={post.id} {...post} />
            ))}
        </section>
        <div className="blog-page__footer">
          <ul className="pagination">
            {!isFirst && (
              <Link to={prevPage} rel="prev">
                ← Previous Page
              </Link>
            )}
            {Array.from({ length: numBlogListPages }, (_, i) => (
              <li key={`pagination-number${i + 1}`}>
                <Link
                  to={`/blog/${i === 0 ? "" : i + 1}`}
                  activeClassName={i + 1 === currentPage ? "active" : ""}
                >
                  {i + 1}
                </Link>
              </li>
            ))}
            {!isLast && (
              <Link to={nextPage} rel="next">
                Next Page →
              </Link>
            )}
          </ul>
        </div>
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
                  gatsbyImageData(quality: 100, layout: CONSTRAINED)
                }
              }
            }
          }
        }
      }
    }
  }
`;
