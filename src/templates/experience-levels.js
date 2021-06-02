import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import createHtml from "../components/MdToHtml";
import CampDetails from "../components/CampDetails";
import CtaContact from "../components/CtaContact";
import CourseOfferings from "../components/CourseOfferings";

import "./styles/experience-levels.scss";

export const ExperienceLevelsTemplate = ({
  courseOfferingEndpoint,
  details,
  title,
  helmet,
}) => {
  const isCamp = title.toLowerCase().includes("camp");
  const { age, gender, byline, mdContent, experience, skills, sellingPoints } = details;
  const htmlContent = createHtml(mdContent);

  return (
    <div className="experience-level-page">
      <section className="course-hero">
        {helmet || ""}
        <div className="course-hero__text">
          <h1>
            <span className="course-hero__text__byline">{byline}</span>
            {title}
          </h1>
          <p dangerouslySetInnerHTML={htmlContent} />
        </div>
        <div className="course-hero__card">
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
        </div>
      </section>
      <CourseOfferings
        courseOfferingEndpoint={courseOfferingEndpoint}
        isCamp={isCamp}
      />
      {!!isCamp && <CampDetails />}
      <CtaContact />
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

const ExperienceLevels = ({ data }) => {
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
        {...page.frontmatter}
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
