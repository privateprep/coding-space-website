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
        seo {
          seo_description
          title
        }
        hero {
          heading
          subheading
          buttons {
            fgColor
            textColor
            list {
              content
              title
            }
          }
        }
        mainpitch {
          title
          description
          buttons {
            fgColor
            textColor
            list {
              content
              title
            }
          }
        }
      }
    }
  }
`;
