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

// this info should be fetched at build time
// https://www.gatsbyjs.com/docs/conceptual/data-fetching/#:~:text=full%20example%20here.-,Fetching%20data%20at%20build%20time,that%20becomes%20queryable%20in%20pages.
const locations = [
  {
    name: "Park Slope",
    id: 3,
    address1: "461 6th St",
    address2: "",
    city: "Brooklyn",
    state: "NY",
    zipCode: "11215",
    coords: ["40.66903", "-73.982345"],
    availableExperienceLevels: ["GirlCode", "Beginner Code", "Advanced Code"],
  },
  {
    name: "Upper East Side",
    id: 1,
    address1: "165 E 88th St",
    address2: "Second Floor",
    city: "New York",
    state: "NY",
    zipCode: "10128",
    coords: ["40.780559", "-73.95569"],
    availableExperienceLevels: ["Beginner Code"],
  },
  {
    name: "Long Island",
    id: 12,
    address1: "3525 Sunrise Hwy",
    address2: "",
    city: "Oakdale",
    state: "NY",
    zipCode: "11769",
    coords: ["40.767263", "-73.153151"],
    availableExperienceLevels: ["Advanced Code", "Beginner Code"],
  },
  {
    name: "Westchester",
    id: 6,
    address1: "150 Grand Street",
    address2: "3rd Floor",
    city: "White Plains",
    state: "NY",
    zipCode: "10601",
    coords: ["41.028949", "-73.767677"],
    availableExperienceLevels: ["GirlCode", "Beginner Code", "Advanced Code"],
  },
  {
    name: "Online",
    id: 10,
    address1: "Your home",
    address2: "",
    city: "Anywhere",
    state: "",
    zipCode: "",
    coords: [],
    availableExperienceLevels: [
      "Advanced Code",
      "Beginner Code",
      "GirlCode",
      "Young Beginner Code",
    ],
  },
];

const ExperienceLevelCards = ({ levels = [], location }) => {
  const { name, availableExperienceLevels, id } = location;

  const activeLevels = levels.filter(l =>
    availableExperienceLevels.includes(l.title)
  );

  return (
    <ul className="experience-level-cards">
      {activeLevels.map(
        (
          { title, thumbnail, seo_description, slug, details: { skills } },
          i
        ) => {
          return (
            <li
              className="experience-level-card__wrapper"
              key={`${title}-${i}`}
            >
              <Link
                className="experience-level-card"
                to={`${slug}?location=${name}&location-id=${id}`}
                state={{ location: name, id: id }}
              >
                <div className="experience-level-card__img">
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: thumbnail,
                      alt: `image thumbnail for post ${title}`,
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
  experienceData = [],
  helmet,
  title,
  pageBuilder,
}) => {
  const defaultLocation = locations[0];
  const [location, setLocation] = useState(defaultLocation);

  let levels = [];
  experienceData.forEach(edge => {
    let item = edge.node.frontmatter;
    let {
      title,
      details,
      thumbnail,
      seo_description,
      courseOfferingEndpoint,
    } = item;
    levels.push({
      title: title,
      details: details,
      seo_description: seo_description,
      courseOfferingEndpoint: courseOfferingEndpoint,
      thumbnail: thumbnail,
      slug: edge.node.fields.slug,
    });
  });

  return (
    <div className="signup-page">
      {helmet || ""}
      {!!title && <h1 className="signup-page__title">{title}</h1>}
      <div className="locations">
        <div className="locations__buttons">
          {!!locations &&
            locations.map((l, i) => (
              <button
                className={`custom-button ${
                  l.name === location.name ? "active" : ""
                }`}
                key={`location-${i}`}
                onClick={() => setLocation(l)}
              >
                {l.name}
              </button>
            ))}
        </div>
        <div className="locations__map">
          {!!location.coords.length ? (
            <MapDisplay addressCoords={location.coords} />
          ) : (
            <img
              src={online}
              style={{ maxHeight: "300px" }}
              alt="Online classes"
            />
          )}
        </div>
        <div className="locations__details">
          <h2>{location.name}</h2>
          <div className="locations__details__address">
            <h3>{location.address1}</h3>
            {!!location.address2 && <h3>{location.address2}</h3>}
            <h3>{`${location.city}, ${location.state} ${location.zipCode}`}</h3>
          </div>
        </div>
      </div>
      <section className="offerings">
        <ExperienceLevelCards levels={levels} location={location} />
      </section>
      <div>
        <PageBuilder data={pageBuilder ?? []} />
      </div>
    </div>
  );
};

const SignupPage = ({ data }) => {
  const {
    frontmatter: { title, seoDescription, pageBuilder },
  } = data.markdownRemark;
  const { edges } = data.allMarkdownRemark;

  return (
    <Layout>
      <SignupPageTemplate
        helmet={
          <Helmet titleTemplate="The Coding Space Signup">
            <title>{`${title}`}</title>
            <meta name="description" content={`${seoDescription}`} />
          </Helmet>
        }
        experienceData={edges}
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
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "experience-levels" } } }
    ) {
      edges {
        node {
          frontmatter {
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
            heading
            title
            seo_description
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
