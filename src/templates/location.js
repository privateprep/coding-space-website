import * as React from "react";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";

import ClassCards from "../components/ClassCards";
import Layout from "../components/Layout";
import MapDisplay from "../components/MapDisplay";

const LocationPage = ({ data }) => {
  const activeLocation = data.classLocation;

  const description = activeLocation.isOnline
    ? `Connect to curriculum from anywhere with our suite of virtual courses!`
    : `Our ${activeLocation.name} location is located at ${data.addressString}.`;

  // mimic transformation in LocationsPanel
  const experienceLevels = data.experienceLevelQuery.experienceLevels?.map(
    (levelNode) => {
      return {
        ...levelNode.frontmatter,
        slug: levelNode.fields.slug,
      };
    }
  );
  const activeLevels = experienceLevels.filter((l) => {
    const levelCategoryIds = l.categoryIds.map((str) => Number(str)); // Netlify CMS saves strings
    return activeLocation.categoryIds.some((catId) =>
      levelCategoryIds.includes(catId)
    );
  });

  const locationQueryString = !!activeLocation.courseOfferingsEndpoint
    ? new URL(activeLocation.courseOfferingsEndpoint).search
    : "";

  return (
    <Layout>
      <Helmet titleTemplate="%s | Locations">
        <title>{activeLocation.name}</title>
        <meta
          name="description"
          content={`${description}.`}
        />
      </Helmet>
      <div className="Location">
        <div className="Location__hero">
          <h1>{activeLocation.name}</h1>
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
        <section>
          <h2>Current Offerings</h2>
            <ClassCards
              activeLevels={activeLevels}
              slugExtension={locationQueryString}
            />
        </section>
        <hr />
        <details>
          <summary>Show Data Props</summary>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </details>
      </div>
    </Layout>
  );
};

export default LocationPage;

export const pageQuery = graphql`
  query LocationsByCode($code: String!) {
    classLocation(code: { eq: $code }) {
      classLocationId
      code
      name
      isOnline
      latitude
      longitude
      addressString
      categoryIds
      courseOfferingsEndpoint
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
            gender
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
  }
`;
