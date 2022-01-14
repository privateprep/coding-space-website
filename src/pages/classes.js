import * as React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import { sortSemester } from "../utils/helpers";

import Layout from "../components/Layout";

import ClassPanel from "../components/ClassPanel";
import CtaContact from "../components/CtaContact";

import "./classes.scss";

const classesFilterTemplate = [
  {
    label: "SEMESTER",
    filterKey: "semesters",
    type: "checkbox",
    optionValueKeys: ["extras", "semesters"],
    sort: sortSemester,
  },
  {
    label: "EXPERIENCE",
    filterKey: "experiences",
    type: "checkbox",
    optionValueKeys: ["details", "experience"],
  },
  {
    label: "GENDER",
    filterKey: "genders",
    type: "checkbox",
    optionValueKeys: ["details", "gender"],
  },
  {
    label: "SKILLS",
    filterKey: "skills",
    type: "checkbox",
    optionValueKeys: ["details", "skills"],
  },
  {
    label: "LOOKING FOR",
    filterKey: "sellingPoints",
    type: "checkbox",
    optionValueKeys: ["details", "sellingPoints"],
  },
];

const ClassesPage = ({ data }) => {
  const experienceLevels = data.experienceLevelQuery.experienceLevels?.map(
    levelNode => {
      return {
        ...levelNode.frontmatter, // most MD file things
        ...levelNode.fields, // slug, extras
      };
    }
  );

  const title = "Our Classes";
  const description =
    "If you’re not sure where to begin, this is a great place to start.";

  return (
    <Layout>
      <Helmet titleTemplate={title}>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="classes">
        <div className="classes__hero">
          <h1 className="classes__hero__title">{title}</h1>
          <h2 className="classes__hero__subtitle">{description}</h2>
        </div>
        <ClassPanel
          experienceLevels={experienceLevels || []}
          filterTemplate={classesFilterTemplate}
        />
      </div>
      <CtaContact />
    </Layout>
  );
};

export default ClassesPage;

export const pageQuery = graphql`
  query CoursesPageAndExperienceData {
    experienceLevelQuery: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "experience-levels" } } }
    ) {
      experienceLevels: nodes {
        frontmatter {
          title
          details {
            age
            gender
            byline
            skills
            experience
            sellingPoints
          }
          thumbnail {
            childImageSharp {
              gatsbyImageData(height: 200, quality: 80, layout: FIXED)
            }
            extension
            publicURL
          }
        }
        fields {
          slug
          extras {
            semesters
          }
        }
      }
    }
  }
`;
