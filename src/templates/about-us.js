import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import Seo from "../components/seo";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { AboutUsTemplate } from "./template_exports/about-us-template.js";

const AboutUs = ({ data }) => {
  const { markdownRemark: page } = data;
  const {
    frontmatter: { seo },
  } = page;
  return (
    <Layout>
      <Seo title={seo.title} description={seo.description} />
      <AboutUsTemplate
        helmet={
          <Helmet titleTemplate="%s | About Us" />
        }
        title={page.frontmatter.title}
        titleColor={page.frontmatter.titleColor}
        heroImage={page.frontmatter.heroImage}
        pageBuilder={page.frontmatter.pageBuilder}
      />
    </Layout>
  );
};

AboutUs.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default AboutUs;

export const pageQuery = graphql`
  query AboutUsById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        titleColor
        seo {
          title
          description
        }
        heroImage {
          alt
          image {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
          }
        }
        pageBuilder {
          heading
          image {
            alt
            image {
              publicURL
              childImageSharp {
                gatsbyImageData(quality: 100, layout: CONSTRAINED)
              }
            }
          }
          buttons {
            bgColor
            fgColor
            list {
              content
              title
            }
            textColor
          }
          mdContent
          type
          leftComponent {
            bgColor
            content
            fgColor
            heading
            mdContent
            ratio
            textColor
            title
            type
          }
          list {
            content
            title
            mdContent
            fgColor
            bgColor
            textColor
            textAlign
          }
          rightComponent {
            bgColor
            content
            fgColor
            heading
            list {
              content
              title
            }
            mdContent
            mediaPosition
            ratio
            textAlign
            textColor
            title
            type
          }
          textAlign
          textColor
          title
          fgColor
          bgColor
          ratio
          content
          title
        }
      }
    }
  }
`;
