import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { CustomPageTemplate } from "./template_exports/custom-page-template";

const CustomPage = ({ data }) => {
  const { markdownRemark: page } = data;
  return (
    <Layout>
      <CustomPageTemplate
        description={page.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s">
            <title>{`${page.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${page.frontmatter.description}`}
            />
          </Helmet>
        }
        title={page.frontmatter.title}
        titleColor={page.frontmatter.titleColor}
        headingImage={page.frontmatter.headingImage}
        pageBuilder={page.frontmatter.pageBuilder}
      />
    </Layout>
  );
};

CustomPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default CustomPage;

export const pageQuery = graphql`
  query PageByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        titleColor
        headingImage {
          publicURL
        }
        pageBuilder {
          content
          heading
          image {
            alt
            image {
              childImageSharp {
                gatsbyImageData(quality: 100, layout: FIXED)
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
