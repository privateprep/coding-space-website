import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Points from "../components/Points";
import Competencies from "../components/Competencies";
import BoxWithLogo from "../components/BoxWithLogo";
import Reviews from "../components/Reviews";
import Content, { HTMLContent } from "../components/Content";
import StyledChecks from "../components/StyledChecks";

export const ClassCatTemplate = ({
  boxWithLogo,
  checkmarks,
  competencies,
  content,
  contentComponent,
  description,
  reviews,
  title,
  points,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
          </div>
        </div>
        <div>
          <p>{description}</p>
          <PostContent content={content} />
          <Competencies data={competencies} />
          <Points data={points} />
          <Reviews data={reviews} />
          <BoxWithLogo data={boxWithLogo} />
          <StyledChecks items={checkmarks} />
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
        competencies={post.frontmatter.competencies}
        reviews={post.frontmatter.reviews}
        boxWithLogo={post.frontmatter.boxWithLogo}
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
        competencies {
          heading
          subheading
          skills {
            description
            skill
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
      }
    }
  }
`;
