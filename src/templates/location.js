import * as React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";

import Layout from "../components/Layout";

import ClassPanel from "../components/ClassPanel";
import MapDisplay from "../components/MapDisplay";
import CtaContact from "../components/CtaContact";
import PageBuilder from "../components/PageBuilder";

import "./styles/location.scss";

// omit semesters that don't accurately represent what's in locations
const locationFilterTemplate = [
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

const LocationPage = ({ data }) => {
  const activeLocation = data.classLocation;
  const { customInfo = {} } = data;

  const description = activeLocation.isOnline
    ? `Connect to curriculum from anywhere with our suite of virtual courses!`
    : `Our ${activeLocation.name} location is located at ${data.addressString}.`;

  // mimic transformation in LocationsPanel
  const experienceLevels = data.experienceLevelQuery.experienceLevels?.map(
    levelNode => {
      return {
        ...levelNode.frontmatter, // most MD file things
        ...levelNode.fields, // slug, extras
      };
    }
  );
  const activeLevels = experienceLevels.filter(l => {
    const levelCategoryIds = l.categoryIds.map(str => Number(str)); // Netlify CMS saves strings
    return activeLocation.categoryIds.some(catId =>
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
        <meta name="description" content={description} />
      </Helmet>
      <div className="Location">
        <div
          className={`Location__hero${
            activeLocation.isOnline ? " Location__hero--online" : ""
          }`}
        >
          {!activeLocation.isOnline && (
            <MapDisplay
              addressCoords={[
                activeLocation.latitude,
                activeLocation.longitude,
              ]}
            />
          )}
          <div className="Location__hero__text">
            <h1 className="title">{activeLocation.name}</h1>
            {!!customInfo?.frontmatter?.contactInfo?.phone && (
              <p>
                <strong>Phone Number:</strong>{" "}
                <a
                  href={`tel:${customInfo.frontmatter.contactInfo.phone}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "currentColor" }}
                >
                  {customInfo.frontmatter.contactInfo.phone}
                </a>
              </p>
            )}
            {activeLocation.isOnline ? (
              <p>
                Connect to curriculum from anywhere with our suite of virtual
                courses!
              </p>
            ) : (
              <>
                <p>
                  <strong>Address:</strong>{" "}
                  <a
                    href={activeLocation.addressLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "currentColor" }}
                  >
                    {activeLocation.addressString}
                  </a>
                </p>
                {!!activeLocation.addressNotes && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: activeLocation.addressNotes,
                    }}
                  />
                )}
              </>
            )}
          </div>
        </div>
        {!!customInfo?.frontmatter && customInfo?.frontmatter?.pageBuilder && (
          <div className="Location__customInfo">
            <PageBuilder data={customInfo.pageBuilder} />
          </div>
        )}
        <ClassPanel
          title={`${activeLocation.name} Catalog`}
          experienceLevels={activeLevels}
          slugExtension={locationQueryString}
          filterTemplate={locationFilterTemplate}
        />
      </div>
      <CtaContact />
    </Layout>
  );
};

export default LocationPage;

export const pageQuery = graphql`
  query LocationsByCode($code: String!, $classLocationId: Int!) {
    classLocation(code: { eq: $code }) {
      classLocationId
      code
      name
      isOnline
      latitude
      longitude
      addressString
      addressNotes
      addressLink
      categoryIds
      courseOfferingsEndpoint
      phoneNumber
    }
    customInfo: markdownRemark(
      frontmatter: { classLocationId: { eq: $classLocationId } }
    ) {
      frontmatter {
        banner {
          mdContent
          removalDate
        }
        contactInfo {
          email
          phone
        }
        pageBuilder {
          content
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
          mediaPosition
          type
          leftComponent {
            bgColor
            content
            fgColor
            heading
            mdContent
            ratio
            textColor
            title
            type
          }
          list {
            content
            title
            mdContent
            fgColor
            bgColor
            textColor
            textAlign
          }
          rightComponent {
            bgColor
            content
            fgColor
            heading
            mdContent
            ratio
            textColor
            title
            type
          }
          textAlign
          textColor
          title
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
