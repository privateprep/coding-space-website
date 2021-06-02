import React from "react";
import PropTypes from "prop-types";
import Layout from "../components/Layout";
import PageBuilder from "../components/PageBuilder";
import SEO from "../components/seo";

import { graphql } from "gatsby";

export const LiabilityPageTemplate = ({ title, pageBuilder, lastUpdated }) => {
  return (
    <div className="liability-page">
      <section
        className="liability-page__title"
        style={{ padding: "4rem" }}
      >
        <h1>{title}</h1>
      </section>
      <PageBuilder data={pageBuilder ?? []} />
      {!!lastUpdated && (
        <small style={{ padding: "4rem" }}>Last Updated: {lastUpdated}</small>
      )}
    </div>
  );
};

const LiabilityPage = ({
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
