import React, { useState } from "react";
import MapDisplay from "../components/MapDisplay";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import PropTypes from "prop-types";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet";
import PageBuilder from "../components/PageBuilder";

import "leaflet/dist/leaflet.css";
import "./styles/signup.scss";
import online from "../img/online.svg";
import { graphql, Link } from "gatsby";

const ExperienceLevelCards = ({ experienceLevels, location }) => {
  const { classLocationId, name, isOnline, categoryNames } = location;
  const activeLevels = experienceLevels.filter((l) =>
    categoryNames.includes(l.title)
  );

  return (
    <ul className="experience-level-cards">
      {activeLevels.map(
        (
          { title, thumbnail, seo_description, slug, details: { skills } },
          levelIndex
        ) => {
          const filteredLink = isOnline
            ? `${slug}?class_location_names[]=${name}`
            : `${slug}?class_location_ids[]=${classLocationId}`;

          return (
            <li className="experience-level-card__wrapper" key={levelIndex}>
              <Link className="experience-level-card" to={filteredLink}>
                <div className="experience-level-card__img">
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: thumbnail,
                      alt: `Preview for Post ${title}`,
                      imageStyle: { height: "240px" },
                    }}
                  />
                </div>
                <div className="experience-level-card__content">
                  <h2>{title}</h2>
                  <p>{seo_description}</p>
                </div>
                <div className="experience-level-card__tags">
                  <ul className="pills">
                    {skills.map((skill, i) => (
                      <li className="pill" key={i}>
                        +{skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </li>
          );
        }
      )}
    </ul>
  );
};

export const SignupPageTemplate = ({
  helmet,
  title,
  pageBuilder,
  locations,
  experienceLevels,
}) => {
  const [location, setLocation] = useState();
  const inPersonLocations = locations.filter((l) => !l.isOnline);

  return (
    <div className="signup-page">
      {helmet || ""}
      {!!title && <h1 className="signup-page__title">{title}</h1>}
      <div className="locations">
        <div className="locations__buttons">
          {!!inPersonLocations &&
            inPersonLocations.map((l, i) => (
              <button
                className={`custom-button ${
                  l.name === location?.name ? "active" : ""
                }`}
                key={`location-${i}`}
                onClick={() => setLocation(l)}
              >
                {l.name}
              </button>
            ))}
        </div>
        {!!location && (
          <>
            <div className="locations__map">
              {location.isOnline ? (
                <img
                  src={online}
                  style={{ maxHeight: "300px" }}
                  alt="Online classes"
                />
              ) : (
                <MapDisplay
                  addressCoords={[location.latitude, location.longitude]}
                />
              )}
            </div>
            <div className="locations__details">
              <h2>{location.name}</h2>
              <div className="locations__details__address">
                <h3>{location.addressString}</h3>
              </div>
            </div>
          </>
        )}
      </div>
      {location && (
        <section className="offerings">
          <ExperienceLevelCards
            experienceLevels={experienceLevels}
            location={location}
          />
        </section>
      )}
      <div>
        <PageBuilder data={pageBuilder ?? []} />
      </div>
    </div>
  );
};

const SignupPage = ({ data }) => {
  // return <pre>{JSON.stringify(data, null, 2)}</pre>;

  const {
    frontmatter: { title, seoDescription, pageBuilder },
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
      <SignupPageTemplate
        helmet={
          <Helmet titleTemplate="The Coding Space Signup">
            <title>{`${title}`}</title>
            <meta name="description" content={`${seoDescription}`} />
          </Helmet>
        }
        experienceLevels={experienceLevels || []}
        locations={data.allClassLocation.locations}
        title={title}
        pageBuilder={pageBuilder}
      />
    </Layout>
  );
};

SignupPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default SignupPage;

export const pageQuery = graphql`
  query signupPageTemplateAndExperienceData {
    markdownRemark(frontmatter: { templateKey: { eq: "signup-page" } }) {
      frontmatter {
        title
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
          seo_description
          courseOfferingEndpoint
          description
          details {
            skills
          }
          thumbnail {
            childImageSharp {
              fixed(width: 480) {
                ...GatsbyImageSharpFixed
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
