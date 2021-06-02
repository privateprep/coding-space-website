import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

import "./classes.scss";

const ClassCards = ({ activeClasses }) => {
  if (!activeClasses.length) {
    return (
      <>
        <p>No matching courses available.</p>
        <p>Check back soon or contact our team for more information!</p>
      </>
    );
  }

  return (
    <ul className="experience-level-cards">
      {activeClasses.map(
        (
          { title, thumbnail, slug, details: { age, byline, skills } },
          levelIndex
        ) => {
          return (
            <li className="experience-level-cards__item" key={levelIndex}>
              <Link className="experience-level-card" to={slug}>
                <p className="experience-level-card__age">{age}</p>
                <h4 className="experience-level-card__title">{title}</h4>
                <p className="experience-level-card__byline">{byline}</p>
                <div className="experience-level-card__img">
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: thumbnail,
                      alt: title,
                      imageStyle: { width: "100%", height: "auto" },
                    }}
                  />
                </div>
                <p className="experience-level-card__skills">
                  {skills.map((skill, skillIndex) => (
                    <React.Fragment key={skillIndex}>
                      <em className="highlight">{skill}</em>
                      {skillIndex < skills.length - 1 && (
                        <span style={{ marginRight: `.25rem` }}>{`,`}</span>
                      )}
                    </React.Fragment>
                  ))}
                </p>
              </Link>
            </li>
          );
        }
      )}
    </ul>
  );
};

const collectDetail = (experienceLevels, detailKey) => {
  let items = [];

  for (let level of experienceLevels) {
    const value = level.details[detailKey];

    if (Array.isArray(value)) {
      for (let item of value) {
        if (!!item && !items.includes(item)) {
          items.push(item);
        }
      }
    } else {
      // likely 'just' string
      if (!!value && !items.includes(value)) {
        items.push(value);
      }
    }
  }

  return items.sort((a, b) => a.localeCompare(b)); // ABC order
};

const buildStringOption = (name, string) => {
  const id = `${name}_${string.toLowerCase().split(" ").join("_")}`;

  return { id, name, value: string };
};

const filterClasses = (allLevels, activeFilter) => {
  let filteredClasses = allLevels;

  if (activeFilter.skills.length) {
    // filter for any class skill overlap
    const filteredSkills = activeFilter.skills;
    filteredClasses = filteredClasses.filter((level) =>
      filteredSkills.some((skill) => level.details.skills.includes(skill))
    )
  }

  if (activeFilter.experiences.length) {
    // filter for matching experience
    const filteredExps = activeFilter.experiences;
    filteredClasses = filteredClasses.filter((level) => {
      const levelExp = level.details.experience;
      return filteredExps.some((exp) => levelExp === exp)
    });
  }

  if (activeFilter.sellingPoints.length) {
    // filter for any sellingPoint overlap
    const filteredPoints = activeFilter.sellingPoints;
    filteredClasses = filteredClasses.filter((level) =>
      filteredPoints.some((point) => level.details.sellingPoints.includes(point))
    );
  }

  return filteredClasses;
};

const ClassPanel = ({ experienceLevels }) => {
  const filters = [
    {
      label: "EXPERIENCE",
      filterKey: "experiences",
      type: "checkbox",
      options: collectDetail(experienceLevels, "experience").map((exp) =>
        buildStringOption("experiences", exp)
      ),
    },
    {
      label: "SKILLS",
      filterKey: "skills",
      type: "checkbox",
      options: collectDetail(experienceLevels, "skills").map((skill) =>
        buildStringOption("skills", skill)
      ),
    },
    {
      label: "LOOKING FOR",
      filterKey: "sellingPoints",
      type: "checkbox",
      options: collectDetail(experienceLevels, "sellingPoints").map((point) =>
        buildStringOption("sellingPoint", point)
      ),
    },
  ];
  const [activeFilter, setActiveFilter] = useState({ experiences: [], skills: [], sellingPoints: [] });
  const activeClasses = filterClasses(experienceLevels, activeFilter);

  // NOTE: currently only checkbox supported
  const updateActiveFilter = (filter, event) => {
    const value = event.target.value;

    if (event.target.checked) {
      setActiveFilter(current => ({
        ...current,
        [filter.filterKey]: [...current[filter.filterKey], value] // add item
      }))
    } else {
      setActiveFilter(current => ({
        ...current,
        [filter.filterKey]: current[filter.filterKey].filter(val => val !== value) // filter item
      }))
    }
  }

  return (
    <div className="ClassPanel">
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
                  <label htmlFor={opt.id}>{opt.value}</label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </form>
      <ClassCards activeClasses={activeClasses} />
    </div>
  );
};

const ClassesPage = ({ data }) => {
  const experienceLevels = data.experienceLevelQuery.experienceLevels?.map(
    (levelNode) => {
      return {
        ...levelNode.frontmatter,
        slug: levelNode.fields.slug,
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
        }
      }
    }
  }
`;
