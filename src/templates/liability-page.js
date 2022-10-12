import React from "react";
import PropTypes from "prop-types";
import Layout from "../components/Layout";
import Seo from "../components/seo";
import { LiabilityPageTemplate } from "./template_exports/liability-page-template";
import { graphql } from "gatsby";

const LiabilityPage = ({
  data: {
    file: { childMarkdownRemark, modifiedTime },
  },
}) => {
  const {
    frontmatter: { title, seo, pageBuilder },
  } = childMarkdownRemark;

  return (
    <Layout>
      <Seo title={seo.title} description={seo.seo_description} />
      <LiabilityPageTemplate
        title={title}
        lastUpdated={modifiedTime}
        pageBuilder={pageBuilder}
      />
    </Layout>
  );
};

LiabilityPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default LiabilityPage;

export const pageQuery = graphql`
  query LiabilityPageTemplate {
    file(
      childMarkdownRemark: {
        frontmatter: { templateKey: { eq: "liability-page" } }
      }
    ) {
      childMarkdownRemark {
        frontmatter {
          title
          seo {
            title
            seo_description
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
      modifiedTime(formatString: "MMMM Do, YYYY")
    }
  }
`;
