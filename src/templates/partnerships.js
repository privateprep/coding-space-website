import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { PartnershipsTemplate } from "./template_exports/partnerships-template";

const Partnerships = ({ data }) => {
  const { markdownRemark: page } = data;
  return (
    <Layout>
      <PartnershipsTemplate
        description={page.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Partnerships">
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

Partnerships.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default Partnerships;

export const pageQuery = graphql`
  query PartnershipsById($id: String!) {
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
          heading
          image {
            alt
            image {
              childImageSharp {
                gatsbyImageData(
                  height: 500
                  width: 500
                  quality: 100
                  layout: CONSTRAINED
                )
              }
            }
          }
          mdContent
          type
          list {
            content
            title
            mdContent
            fgColor
            bgColor
            textColor
            textAlign
          }
          textAlign
          textColor
          fgColor
          bgColor
        }
      }
    }
  }
`;
