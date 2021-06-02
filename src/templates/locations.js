import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import MapDisplay from "../components/MapDisplay";
import PageBuilder from "../components/PageBuilder";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

import "./styles/locations.scss";

const ExperienceLevelCards = ({ experienceLevels, location }) => {
  const { classLocationId, name, isOnline, categoryNames } = location;
  const activeLevels = experienceLevels.filter((l) =>
    categoryNames.includes(l.title)
  );

  return (
    <ul className="experience-level-cards">
      {activeLevels.map(
        (
          { title, thumbnail, slug, details: { age, byline, skills } },
          levelIndex
        ) => {
          const filteredLink = isOnline
            ? `${slug}?class_location_names[]=${name}`
            : `${slug}?class_location_ids[]=${classLocationId}`;

          return (
            <li className="experience-level-cards__item" key={levelIndex}>
              <Link className="experience-level-card" to={filteredLink}>
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

const LocationsPanel = ({ locations, experienceLevels }) => {
  const inPersonLocations = locations.filter((l) => !l.isOnline) || [];
  const [activeLocation, setActiveLocation] = useState(inPersonLocations[0]);

  return (
    <div className="LocationsPanel">
      <div className="LocationsPanel__header">
        <h2 className="LocationsPanel__header__title">Explore Locations</h2>
        <ul className="locations-list">
          {inPersonLocations.map((location) => (
            <li
              key={location.id}
              className={`locations-list__item${
                location === activeLocation
                  ? " locations-list__item--active"
                  : ""
              }`}
            >
              <button
                className="locations-list__item__button"
                onClick={() => setActiveLocation(location)}
              >
                {location.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="LocationsPanel__main">
        <div className="LocationsPanel__main__details">
          <h3>{activeLocation.name}</h3>
          {activeLocation.isOnline ? (
            <>
              <p>
                Connect to curriculum from anywhere with our suite of virtual
                courses!
              </p>
            </>
          ) : (
            <>
              <p>{activeLocation.addressString}</p>
              <MapDisplay
                addressCoords={[
                  activeLocation.latitude,
                  activeLocation.longitude,
                ]}
              />
            </>
          )}
        </div>
        <div className="LocationsPanel__main__offerings">
          <h4>Upcoming Classes</h4>
          <ExperienceLevelCards
            experienceLevels={experienceLevels}
            location={activeLocation}
          />
        </div>
      </div>
    </div>
  );
};

export const LocationsPageTemplate = ({
  helmet,
  title,
  subtitle,
  pageBuilder,
  locations,
  experienceLevels,
}) => (
  <div className="locations">
    {helmet}
    <div className="locations__hero">
      <h1 className="locations__hero__title">{title}</h1>
      <h2 className="locations__hero__subtitle">{subtitle}</h2>
    </div>
    <LocationsPanel locations={locations} experienceLevels={experienceLevels} />
    <PageBuilder data={pageBuilder ?? []} />
  </div>
);

const LocationsPage = ({ data }) => {
  const {
    frontmatter: { title, subtitle, seoDescription, pageBuilder },
  } = data.markdownRemark;
  const experienceLevels = data.experienceLevelQuery.experienceLevels?.map(
    (levelNode) => {
      return {
        ...levelNode.frontmatter,
        slug: levelNode.fields.slug,
      };
    }
  );

  return (
    <Layout>
      <LocationsPageTemplate
        helmet={
          <Helmet titleTemplate="The Coding Space Signup">
            <title>{`${title}`}</title>
            <meta name="description" content={`${seoDescription}`} />
          </Helmet>
        }
        experienceLevels={experienceLevels || []}
        locations={data.allClassLocation.locations}
        title={title}
        subtitle={subtitle}
        pageBuilder={pageBuilder}
      />
    </Layout>
  );
};

export default LocationsPage;

export const pageQuery = graphql`
  query LocationsPageTemplateAndExperienceData {
    markdownRemark(frontmatter: { templateKey: { eq: "locations" } }) {
      frontmatter {
        title
        subtitle
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
    allClassLocation {
      locations: nodes {
        classLocationId
        name
        isOnline
        categoryNames
        latitude
        longitude
        addressString
      }
    }
  }
`;
