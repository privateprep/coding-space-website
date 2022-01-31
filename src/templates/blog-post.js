import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { HTMLContent } from "../components/Content";
import { BlogPostTemplate } from "./template_exports/blog-post-template";
import { withPrefix } from "gatsby";

const BlogPost = ({ data, location }) => {
  const { markdownRemark: post } = data;
  const {
    bgColor,
    date,
    description,
    featuredImage,
    tags,
    title,
    titleColor,
    pageBuilder,
  } = post.frontmatter;
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
            <meta name="title" content={`${title}`} />
            <meta name="description" content={`${description}`} />
            <meta property="og:title" content={`${title}`} />
            <meta property="og:description" content={`${description}`} />
            <meta
              property="og:image"
              content={`${withPrefix("")}${
                featuredImage.image.childImageSharp.gatsbyImageData.images
                  .fallback.src
              }`}
            />
            <meta
              property="twitter:image"
              content={`${withPrefix("")}${
                featuredImage.image.childImageSharp.gatsbyImageData.images
                  .fallback.src
              }`}
            />
            <meta property="og:image:alt" content={featuredImage.alt} />
          </Helmet>
        }
        pageBuilder={pageBuilder}
        postUrl={location?.href}
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
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
          }
        }
        title
        titleColor
        description
        tags
        pageBuilder {
          content
          heading
          image {
            alt
            image {
              childImageSharp {
                gatsbyImageData(quality: 100, layout: CONSTRAINED)
              }
            }
          }
          mdContent
          mediaPosition
          type
          leftComponent {
            bgColor
            content
            fgColor
            heading
            mdContent
            ratio
            textColor
            title
            type
          }
          list {
            content
            title
            mdContent
            fgColor
            bgColor
            textColor
            textAlign
          }
          rightComponent {
            bgColor
            content
            fgColor
            heading
            mdContent
            ratio
            textColor
            title
            type
          }
          textAlign
          textColor
          title
          fgColor
          bgColor
        }
      }
    }
  }
`;
