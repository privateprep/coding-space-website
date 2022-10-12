import React from "react";
import PropTypes from "prop-types";
import Layout from "../components/Layout";
import Seo from "../components/seo";
import { ReferralPageTemplate } from "./template_exports/referral-page-template";

import { graphql } from "gatsby";

const ReferralPage = ({
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
      <ReferralPageTemplate
        title={title}
        lastUpdated={modifiedTime}
        pageBuilder={pageBuilder}
      />
    </Layout>
  );
};

ReferralPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default ReferralPage;

export const pageQuery = graphql`
  query referralPageTemplate {
    file(
      childMarkdownRemark: {
        frontmatter: { templateKey: { eq: "referral-page" } }
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
