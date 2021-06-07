import * as React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import { isMobile } from "../utils/helpers";

import { useFilters } from "../hooks";

import Layout from "../components/Layout";

import CtaContact from "../components/CtaContact";
import ClassCards from "../components/ClassCards";

import "./classes.scss";

const seasonScore = {
  Spring: 1,
  Summer: 2,
  Fall: 3
}

const sortSemester = (a, b) => {
  const [aSeason, aYear] = a.value.split(" ");
  const [bSeason, bYear] = b.value.split(" ");

  if (aYear > bYear) return 1;
  if (aYear < bYear) return -1;

  const aSeasonScore = seasonScore[aSeason] || 4;
  const bSeasonScore = seasonScore[bSeason] || 4;

  if (aSeasonScore > bSeasonScore) return 1;
  if (aSeasonScore < bSeasonScore) return -1;

  return 0

}

const filterTemplate = [
  {
    label: "EXPERIENCE",
    filterKey: "experiences",
    type: "checkbox",
    optionValueKeys: ["details", "experience"],
  },
  {
    label: "SEMESTER",
    filterKey: "semesters",
    type: "checkbox",
    optionValueKeys: ["extras", "semesters"],
    sort: sortSemester
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

const FilterForm = ({ filters, updateActiveFilter, activeFilter }) => {
  return (
      <form
        className="ClassPanel__filter-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {filters.map((filter, filterIndex) => (
          <div className="filter-group" key={filterIndex}>
            <h4 className="filter-group__label">{filter.label}</h4>
            <ul className="filter-group__options">
              {filter.options.map((opt) => (
                <li className="filter-group__options__item" key={opt.id}>
                  <input
                    type={filter.type}
                    id={opt.id}
                    name={opt.name}
                    value={opt.value}
                    onChange={(event) => updateActiveFilter(filter, event)}
                    checked={activeFilter[filter.filterKey].includes(opt.value)}
                  />
                  <label htmlFor={opt.id}>{opt.label}</label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </form>
  );
};

const ClassPanel = ({ experienceLevels }) => {
  const [filters, activeFilter, updateActiveFilter, activeLevels] = useFilters(
    filterTemplate,
    experienceLevels
  );

  return (
    <div className="ClassPanel">
      {!!isMobile() ? (
        <details className="custom-details-tag">
          <summary>Filter By </summary>
          <FilterForm
            activeFilter={activeFilter}
            filters={filters}
            updateActiveFilter={updateActiveFilter}
          />
        </details>
      ) : (
        <FilterForm
          activeFilter={activeFilter}
          filters={filters}
          updateActiveFilter={updateActiveFilter}
        />
      )}
      <ClassCards activeLevels={activeLevels} />
    </div>
  );
};

const ClassesPage = ({ data }) => {
  const experienceLevels = data.experienceLevelQuery.experienceLevels?.map(
    levelNode => {
      return {
        ...levelNode.frontmatter, // most MD file things
        ...levelNode.fields // slug, extras
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
        <ClassPanel experienceLevels={experienceLevels || []} />
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
          heading
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
              fluid(maxWidth: 480, quality: 80) {
                ...GatsbyImageSharpFluid
              }
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
