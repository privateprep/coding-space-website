import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import { ExperienceLevelsTemplate } from "./template_exports/experience-levels-template";

import "./styles/experience-levels.scss";

const ExperienceLevels = ({ data }) => {
  const { markdownRemark: page } = data;

  return (
    <Layout>
      <Helmet titleTemplate="%s | Experience Level">
        <title>{`${page.frontmatter.title}`}</title>
        <meta
          name="description"
          content={`${page.frontmatter.seo_description}`}
        />
      </Helmet>
      <ExperienceLevelsTemplate
        description={page.frontmatter.seo_description}
        {...page.frontmatter}
      />
    </Layout>
  );
};

export default ExperienceLevels;

export const pageQuery = graphql`
  query ExperienceLevelsById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        courseOfferingEndpoint
        details {
          age
          byline
          experience
          gender
          mdContent
          sellingPoints
          skills
        }
        thumbnail {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FIXED)
          }
        }
        seo_description
        title
      }
    }
  }
`;
