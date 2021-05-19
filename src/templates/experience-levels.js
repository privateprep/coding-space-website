import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PageBuilder from "../components/PageBuilder";

export const ExperienceLevelTemplate = ({ title, helmet }) => {
  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="full-width-image margin-top-0">
          <div className="columns">
            <div className="column">
              <h1
                className="title has-text-weight-bold is-bold-light"
                style={{ color: "white", fontSize: "5em" }}
              >
                {title}
              </h1>
            </div>
          </div>
        </div>

        <div>
          <p>Placeholder</p>
        </div>
      </div>
    </section>
  );
};

ExperienceLevelTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const ExperienceLevel = ({ data }) => {
  const { markdownRemark: page } = data;

  return (
    <Layout>
      <ExperienceLevelTemplate
        description={page.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${page.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${page.frontmatter.description}`}
            />
          </Helmet>
        }
        title={page.frontmatter.title}
      />
    </Layout>
  );
};

ExperienceLevel.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default ExperienceLevel;

export const pageQuery = graphql`
  query ExperienceLevelById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        headingImage {
          publicURL
        }
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
        }
      }
    }
  }
`;
