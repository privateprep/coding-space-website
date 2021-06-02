import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";

import ClassCards from "../components/ClassCards";
import Layout from "../components/Layout";
import MapDisplay from "../components/MapDisplay";
import PageBuilder from "../components/PageBuilder";

import "./styles/locations.scss";

const LocationsPanel = ({ locations, experienceLevels }) => {
  const inPersonLocations = locations.filter((l) => !l.isOnline) || [];
  const onlineLocation = locations
    .filter((l) => l.isOnline)
    .reduce(
      (shared, l) => ({
        ...shared,
        categoryIds: Array.from(
          new Set(...shared.categoryIds, ...l.categoryIds)
        ),
      }),
      {
        classLocationId: "online",
        name: "Online",
        isOnline: true,
        categoryIds: [],
      }
    );
  const [activeLocation, setActiveLocation] = useState(inPersonLocations[0]);
  const activeLevels = experienceLevels.filter((l) => {
    const levelCategoryIds = l.categoryIds.map((str) => Number(str)); // Netlify CMS saves strings
    return activeLocation.categoryIds.some((catId) =>
      levelCategoryIds.includes(catId)
    );
  });
  const locationQueryString = activeLocation.isOnline
    ? `?class_location_names[]=${activeLocation.name}`
    : `?class_location_ids[]=${activeLocation.classLocationId}`;

  return (
    <div className="LocationsPanel">
      <div className="LocationsPanel__header">
        <h2 className="LocationsPanel__header__title">Explore Locations</h2>
        <ul className="locations-list">
          {[...inPersonLocations, onlineLocation].map((location) => (
            <li
              key={location.id}
              className={`locations-list__item${
                location.classLocationId === activeLocation?.classLocationId
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
          <h4>Offerings</h4>
          <ClassCards
            activeLevels={activeLevels}
            slugExtension={locationQueryString}
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
          categoryIds
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
        latitude
        longitude
        addressString
        categoryIds
      }
    }
  }
`;
