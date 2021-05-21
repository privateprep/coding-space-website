import React, { useState } from "react";
import MapDisplay from "./MapDisplay";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

import "leaflet/dist/leaflet.css";
import "./locations.scss";
import { useStaticQuery, graphql, Link } from "gatsby";

const locations = [
  {
    name: "Park Slope",
    address1: "461 6th St",
    address2: "",
    city: "Brooklyn",
    state: "NY",
    zipCode: "11215",
    coords: ["40.66903", "-73.982345"],
  },
  {
    name: "Upper East Side",
    address1: "165 E 88th St",
    address2: "Second Floor",
    city: "New York",
    state: "NY",
    zipCode: "10128",
    coords: ["40.780559", "-73.95569"],
    availableExperienceLevels: ["Advanced Code", "Beginner Code"],
  },
  {
    name: "Long Island",
    address1: "3525 Sunrise Hwy",
    address2: "",
    city: "Oakdale",
    state: "NY",
    zipCode: "11769",
    coords: ["40.767263", "-73.153151"],
    availableExperienceLevels: ["Advanced Code", "Beginner Code"],
  },
  {
    name: "Online",
    address1: "Your home",
    address2: "",
    city: "Anywhere",
    state: "",
    zipCode: "",
    coords: [],
    availableExperienceLevels: ["Advanced Code", "Beginner Code"],
  },
];

const ExperienceLevelCards = ({ levels = [], location }) => {
  return (
    <ul className="experience-level-cards">
      {levels.map(
        (
          { title, thumbnail, seo_description, slug, details: { skills } },
          i
        ) => {
          console.log(thumbnail);
          return (
            <li
              className="experience-level-card__wrapper"
              key={`${title}-${i}`}
            >
              <Link
                className="experience-level-card"
                to={slug}
                state={{ location: location }}
              >
                <div className="experience-level-card__img">
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: thumbnail,
                      alt: `image thumbnail for post ${title}`,
                    }}
                  />
                </div>
                <div className="experience-level-card__content">
                  <h2>{title}</h2>
                  <p>{seo_description}</p>
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

const Locations = () => {
  const defaultLocation = locations[0];
  const [location, setLocation] = useState(defaultLocation);

  const query = useStaticQuery(graphql`
    query experienceData {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "experience-levels" } } }
      ) {
        edges {
          node {
            frontmatter {
              courseOfferingEndpoint
              description
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
                    base64
                  }
                }
                publicURL
              }
              experienceLevels
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
  `);


  let data = [];
  query.allMarkdownRemark.edges.forEach(edge => {
    let item = edge.node.frontmatter;
    let { title, details, thumbnail,  seo_description, courseOfferingEndpoint } = item;
    data.push({
      title: title,
      details: details,
      seo_description: seo_description,
      courseOfferingEndpoint: courseOfferingEndpoint,
      thumbnail: thumbnail,
      slug: edge.node.fields.slug,
    });
  });

  return (
    <React.Fragment>
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
          <MapDisplay addressCoords={location.coords} />
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
        <ExperienceLevelCards levels={data} location={location.name} />
      </section>
    </React.Fragment>
  );
};

// export const query = graphql`
//   {
//     allMarkdownRemark(
//       filter: { frontmatter: { templateKey: { eq: "experience-levels" } } }
//     ) {
//       edges {
//         node {
//           frontmatter {
//             courseOfferingEndpoint
//             description
//             details {
//               age
//               byline
//               experience
//               gender
//               sellingPoints
//               skills
//             }
//             experienceLevels
//             heading
//             title
//             seo_description
//           }
//         }
//       }
//     }
//   }
// `;

export default Locations;
