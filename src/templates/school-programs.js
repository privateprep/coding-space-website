import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { SchoolProgramsTemplate } from "./template_exports/school-programs-template";

const SchoolPrograms = ({ data }) => {
  const { markdownRemark: page } = data;

  return (
    <Layout>
      <SchoolProgramsTemplate
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
        titleColor={page.frontmatter.titleColor}
        headingImage={page.frontmatter.headingImage}
        pageBuilder={page.frontmatter.pageBuilder}
      />
    </Layout>
  );
};

SchoolPrograms.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default SchoolPrograms;

export const pageQuery = graphql`
  query SchoolProgramById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        titleColor
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
