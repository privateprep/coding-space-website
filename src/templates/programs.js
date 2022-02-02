import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { ProgramsTemplate } from "./template_exports/programs-template";

const Programs = ({ data }) => {
  const { markdownRemark: page } = data;

  return (
    <Layout>
      <ProgramsTemplate
        description={page.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Programs">
            <title>{`${page.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${page.frontmatter.description}`}
            />
          </Helmet>
        }
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
