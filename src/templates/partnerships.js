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
        heroImage={page.frontmatter.heroImage}
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
        heroImage {
          alt
          image {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
          }
        }
        pageBuilder {
          heading
          buttons {
            bgColor
            fgColor
            list {
              content
              title
            }
            textColor
          }
          image {
            alt
            image {
              childImageSharp {
                gatsbyImageData(quality: 100, layout: FULL_WIDTH)
              }
            }
          }
          mdContent
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
            list {
              content
              title
            }
            mdContent
            mediaPosition
            ratio
            textAlign
            textColor
            title
            type
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
