import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Points from "../components/Points";
import Competencies from "../components/Competencies";
import Content, { HTMLContent } from "../components/Content";

export const ClassCatTemplate = ({
  competencies,
  content,
  contentComponent,
  description,
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
        competencies={post.frontmatter.competencies}
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
      }
    }
  }
`;
