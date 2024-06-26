import React from "react";
import PropTypes from "prop-types";
import Seo from "../components/seo";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { ProgramsTemplate } from "./template_exports/programs-template";

const Programs = ({ data }) => {
  const { markdownRemark: page } = data;
  const {
    frontmatter: { seo },
  } = page;
  return (
    <Layout>
      <Seo title={seo.title} description={seo.description} />
      <ProgramsTemplate
        helmet={<Helmet titleTemplate="%s | Programs" />}
        title={page.frontmatter.title}
        titleColor={page.frontmatter.titleColor}
        heroImage={page.frontmatter.heroImage}
        pageBuilder={page.frontmatter.pageBuilder}
      />
    </Layout>
  );
};

Programs.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default Programs;

export const pageQuery = graphql`
  query ProgramById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        seo {
          title
          description
        }
        titleColor
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
          buttons {
            bgColor
            fgColor
            list {
              content
              title
            }
            textColor
          }
          image {
            alt
            image {
              childImageSharp {
                gatsbyImageData(quality: 100, layout: CONSTRAINED)
              }
            }
          }
          mdContent
          mediaPosition
          type
          leftComponent {
            bgColor
            content
            fgColor
            heading
            list {
              content
              title
            }
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
