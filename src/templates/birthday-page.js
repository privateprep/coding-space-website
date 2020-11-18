import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Points from "../components/Points";
import TextImageBlock from "../components/TextImageBlock";
import BoxWithLogo from "../components/BoxWithLogo";
import Content, { HTMLContent } from "../components/Content";

export const BirthdayTemplate = ({
  boxWithLogo,
  content,
  contentComponent,
  textImageBlock,
  title,
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
          <TextImageBlock data={textImageBlock} />
          <BoxWithLogo data={boxWithLogo} />
          <Points data={points} />
          <PostContent content={content} />
        </div>
      </div>
    </section>
  );
};

BirthdayTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const Birthday = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BirthdayTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
          </Helmet>
        }
        title={post.frontmatter.title}
        points={post.frontmatter.points}
        textImageBlock={post.frontmatter.textImageBlock}
        boxWithLogo={post.frontmatter.boxWithLogo}
      />
    </Layout>
  );
};

Birthday.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default Birthday;

export const pageQuery = graphql`
  query BirthdayByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        points {
          description
          figure
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
      }
    }
  }
`;
