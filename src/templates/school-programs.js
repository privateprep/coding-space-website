import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PageBuilder from "../components/PageBuilder";

export const SchoolProgramsTemplate = ({
  title,
  headingImage,
  pageBuilder,
  helmet,
}) => {
  const backgroundImage = !!headingImage
    ? headingImage.publicURL
    : "/static/602986bab4e3eb9b86d275153b37f58c/43a2d/tcs-header.png";
  const data = pageBuilder ?? [];

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div
          className="full-width-image margin-top-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: "left",
            width: "100%",
          }}
        >
          <div className="columns">
            <div className="column">
              <h1
                className="title has-text-weight-bold is-bold-light"
                style={{ color: "white", fontSize: "5em" }}
              >
                {title}
              </h1>
            </div>
          </div>
        </div>

        <div>
          <PageBuilder data={data} />
        </div>
      </div>
    </section>
  );
};

SchoolProgramsTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

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
