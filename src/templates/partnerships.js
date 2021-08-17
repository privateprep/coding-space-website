import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PageBuilder from "../components/PageBuilder";

export const PartnershipsTemplate = ({
  title,
  titleColor,
  headingImage,
  pageBuilder,
  helmet,
}) => {
  const data = pageBuilder ?? [];
  const backgroundImage = !!headingImage
    ? headingImage.publicURL
    : "/static/602986bab4e3eb9b86d275153b37f58c/43a2d/tcs-header.png";

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
              <h1 className="title" style={{ color: titleColor, fontSize: "5em" }}>
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

PartnershipsTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const Partnerships = ({ data }) => {
  const { markdownRemark: page } = data;
  return (
    <Layout>
      <PartnershipsTemplate
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

Partnerships.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default Partnerships;

export const pageQuery = graphql`
  query PartnershipsById($id: String!) {
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
