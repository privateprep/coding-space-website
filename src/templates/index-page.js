import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Redirect } from "@reach/router";
import { IndexPageTemplate } from "./template_exports/index-page-template";
import Layout from "../components/Layout";

import "./styles/IndexPage.scss";

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      {process.env.NODE_ENV === "production" ? (
        <Redirect noThrow to="/locations" />
      ) : (
        <IndexPageTemplate
          hero={frontmatter.hero}
          mainpitch={frontmatter.mainpitch}
        />
      )}
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        hero {
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          heading
          subheading
        }
        mainpitch {
          title
          description
        }
      }
    }
  }
`;
