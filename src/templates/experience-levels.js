import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

import "./styles/experience-levels.scss";

export const ExperienceLevelsTemplate = ({
  details,
  title,
  helmet,
  location = "",
}) => {
  const { age, gender, byline, experience, skills, sellingPoints } = details;
  return (
    <div className="experience-level-page">
      <section className="course-hero">
        {helmet || ""}
        <div className="course-hero__text">
          <h1>
            <span className="course-hero__text__byline">{byline}</span>
            {title}
          </h1>
        </div>
        <div className="course-hero__card">
          <React.Fragment>
            <header className="course-hero__card__header">
              <span>{gender}</span>
              <span>{age}</span>
            </header>
            <p className="course-hero__card__detail-title">Includes</p>
            <p className="course-hero__card__detail-content">
              {skills.map((skill, skillIndex) => (
                <React.Fragment key={skillIndex}>
                  <em className="highlight">{skill}</em>
                  {skillIndex < skills.length - 1 && (
                    <span style={{ marginRight: `.25rem` }}>{`,`}</span>
                  )}
                </React.Fragment>
              ))}
            </p>
            <p className="course-hero__card__detail-title">Experience</p>
            <p className="course-hero__card__detail-content">{experience}</p>
            <p className="course-hero__card__detail-title">
              Ideal for those looking for
            </p>
            <ul className="course-hero__card__detail-content">
              {sellingPoints.map(point => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </React.Fragment>
        </div>
      </section>
      <section>{!!location && <h1>Offerings at {location}</h1>}</section>
    </div>
  );
};

ExperienceLevelsTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const ExperienceLevels = ({ location, data }) => {
  const { markdownRemark: page } = data;

  return (
    <Layout>
      <ExperienceLevelsTemplate
        description={page.frontmatter.seo_description}
        helmet={
          <Helmet titleTemplate="%s | Experience Level">
            <title>{`${page.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${page.frontmatter.seo_description}`}
            />
          </Helmet>
        }
        title={page.frontmatter.title}
        details={page.frontmatter.details}
        location={location.state.location}
      />
    </Layout>
  );
};

ExperienceLevels.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default ExperienceLevels;

export const pageQuery = graphql`
  query ExperienceLevelsById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        courseOfferingEndpoint
        details {
          age
          byline
          experience
          gender
          sellingPoints
          skills
        }
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 2080, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        seo_description
        title
      }
    }
  }
`;
