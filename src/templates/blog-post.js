import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { HTMLContent } from "../components/Content";
import { BlogPostTemplate } from "./template_exports/blog-post-template";

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;
  const { bgColor, date, description, featuredImage, tags, title, titleColor } = post.frontmatter;
  console.log(post.frontmatter);
  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        bgColor={bgColor}
        date={date}
        description={description}
        featuredImage={featuredImage}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${title}`}</title>
            <meta name="description" content={`${description}`} />
          </Helmet>
        }
        tags={tags}
        title={title}
        titleColor={titleColor}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        bgColor
        date(formatString: "MMMM DD, YYYY")
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
        title
        titleColor
        description
        tags
      }
    }
  }
`;
