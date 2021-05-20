import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

import "./styles/experience-levels.scss";

export const ExperienceLevelsTemplate = ({ title, helmet }) => {
  return (
    <section className="section">
      {helmet || ""}
      <div className="container course-hero">
        <div className="course-hero__text">
          <h1>
            <span className="course-hero__text__byline">"Byline"</span>
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
};

ExperienceLevelsTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const ExperienceLevels = ({ data }) => {
  const { markdownRemark: page } = data;
  return (
    <Layout>
      <ExperienceLevelsTemplate
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

ExperienceLevels.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default ExperienceLevels;

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
