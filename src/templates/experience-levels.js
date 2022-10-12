import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";

import Seo from "../components/seo";
import Layout from "../components/Layout";
import { ExperienceLevelsTemplate } from "./template_exports/experience-levels-template";

import "./styles/experience-levels.scss";

const ExperienceLevels = ({ data }) => {
  const { markdownRemark: page } = data;

  return (
    <Layout>
      <Seo
        title={page.frontmatter.seo.title}
        description={page.frontmatter.seo.description}
      />
      <Helmet titleTemplate="%s | Experience Level" />
      <ExperienceLevelsTemplate
        description={page.frontmatter.seo.description}
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
        seo {
          description
          title
        }
        title
      }
    }
  }
`;
