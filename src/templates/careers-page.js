import React from "react";
import PropTypes from "prop-types";
import Layout from "../components/Layout";
import Seo from "../components/seo";
import { CareersPageTemplate } from "./template_exports/careers-page-template.js";

import { graphql } from "gatsby";

const CareersPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <Seo
        title={frontmatter.seo.title}
        description={frontmatter.seo.description}
      />
      <CareersPageTemplate
        title={frontmatter.seo.title}
        pageBuilder={frontmatter.pageBuilder}
        openings={frontmatter.openings}
      />
    </Layout>
  );
};

CareersPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default CareersPage;

export const pageQuery = graphql`
  query CareersPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "careers-page" } }) {
      id
      frontmatter {
        seo {
          description
          title
        }
        openings {
          details {
            applyLink
            postingDate(fromNow: true)
            removalDate
          }
          info {
            title
            description
            type
            locations
          }
        }
        pageBuilder {
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
          buttons {
            bgColor
            fgColor
            list {
              content
              title
            }
            textColor
          }
        }
      }
    }
  }
`;
