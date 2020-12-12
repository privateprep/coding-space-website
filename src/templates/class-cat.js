import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Points from "../components/Points";
import HeaderBulletSections from "../components/HeaderBulletSections";
import BoxWithLogo from "../components/BoxWithLogo";
import Reviews from "../components/Reviews";
import Content, { HTMLContent } from "../components/Content";
import StyledChecks from "../components/StyledChecks";
import TextImageBlock from "../components/TextImageBlock";
import PageBuilder from "../components/PageBuilder";

export const ClassCatTemplate = ({
  boxWithLogo,
  checkmarks,
  headerBulletSections,
  content,
  contentComponent,
  description,
  reviews,
  title,
  textImageBlock,
  pageBuilder,
  points,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div
          className="full-width-image margin-top-0"
          style={{
            backgroundImage:
              "url('/static/602986bab4e3eb9b86d275153b37f58c/43a2d/tcs-header.png')",
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
          <HeaderBulletSections data={headerBulletSections} />
          <TextImageBlock data={textImageBlock} />
          <Points data={points} />
          <PostContent content={content} />
          <BoxWithLogo data={boxWithLogo} />
          <StyledChecks items={checkmarks} />
          <Reviews data={reviews} />
          <PageBuilder data={pageBuilder} />
        </div>
      </div>
    </section>
  );
};

ClassCatTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const ClassCat = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ClassCatTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        title={post.frontmatter.title}
        points={post.frontmatter.points}
        checkmarks={post.frontmatter.checkmarks}
        headerBulletSections={post.frontmatter.headerBulletSections}
        reviews={post.frontmatter.reviews}
        boxWithLogo={post.frontmatter.boxWithLogo}
        textImageBlock={post.frontmatter.textImageBlock}
        pageBuilder={post.frontmatter.pageBuilder}
      />
    </Layout>
  );
};

ClassCat.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default ClassCat;

export const pageQuery = graphql`
  query ClassCatByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        checkmarks {
          content
          title
        }
        headerBulletSections {
          heading
          subheading
          sections {
            header
            paragraph
          }
        }
        points {
          description
          figure
        }
        reviews {
          reviewList {
            review
            name
          }
          heading
        }
        boxWithLogo {
          content
          title
        }
        textImageBlock {
          content
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
        }
        pageBuilder {
          mdContent
          heading
          list {
            content
            title
          }
          type
        }
      }
    }
  }
`;
