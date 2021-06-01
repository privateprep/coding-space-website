import React from "react";
import PropTypes from "prop-types";
import Layout from "../components/Layout";
import PageBuilder from "../components/PageBuilder";
import SEO from "../components/seo";
import CheckRewardsBalance from "../components/CheckRewardsBalance";

import { graphql } from "gatsby";

export const ReferralPageTemplate = ({ title, pageBuilder, lastUpdated }) => {
  return (
    <div className="referral-page">
      <div>
        <section
          className="referral-page__check-balance"
          style={{ padding: "4rem" }}
        >
          <h1>{title}</h1>
          <h2>Check Balance and Get Rewards Code</h2>
          <CheckRewardsBalance />
          <hr />
        </section>
        <PageBuilder data={pageBuilder ?? []} />
        {!!lastUpdated && (
          <small style={{ padding: "4rem" }}>Last Updated: {lastUpdated}</small>
        )}
      </div>
    </div>
  );
};

const ReferralPage = ({
  data: {
    file: { childMarkdownRemark, modifiedTime },
  },
}) => {
  const {
    frontmatter: { title, seoDescription, pageBuilder },
  } = childMarkdownRemark;

  return (
    <Layout>
      <SEO title={title} description={seoDescription} />
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
          seo_description
          pageBuilder {
            heading
            image {
              alt
              image {
                childImageSharp {
                  fluid(maxWidth: 2048, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
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
