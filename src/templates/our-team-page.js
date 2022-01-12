import React from "react";
import PropTypes from "prop-types";
import Layout from "../components/Layout";
import Seo from "../components/seo";
import { OurTeamPageTemplate } from "./template_exports/our-team-page-template.js";

import { graphql } from "gatsby";

const OurTeamPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <Seo
        title={frontmatter.seo.title}
        description={frontmatter.seo.seo_description}
      />
      <OurTeamPageTemplate
        title={frontmatter.title}
        description={frontmatter.description}
        team={frontmatter.team}
      />
    </Layout>
  );
};

OurTeamPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default OurTeamPage;

export const pageQuery = graphql`
  query ourTeamPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "our-team-page" } }) {
      id
      frontmatter {
        seo {
          seo_description
          title
        }
        description
        team {
          image {
            alt
            image {
              childImageSharp {
                fluid(maxHeight: 500, maxWidth: 500, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          mdContent
        }
        title
      }
    }
  }
`;
