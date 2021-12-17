import * as React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import { LocationPageTemplate } from "./template_exports/location-page-template";
import CtaContact from "../components/CtaContact";

import "./styles/location.scss";

const LocationPage = ({ data }) => {
  const activeLocation = data.classLocation;
  const { customInfo = {} } = data;

  // mimic transformation in LocationsPanel
  const experienceLevels = data.experienceLevelQuery.experienceLevels.map(
    levelNode => {
      return {
        ...levelNode.frontmatter, // most MD file things
        ...levelNode.fields, // slug, extras
      };
    }
  );

  const description = activeLocation.isOnline
    ? `Connect to curriculum from anywhere with our suite of virtual courses!`
    : `Our ${activeLocation.name} location is located at ${data.addressString}.`;

  return (
    <Layout>
      <Helmet titleTemplate="%s | Locations">
        <title>{activeLocation.name}</title>
        <meta name="description" content={description} />
      </Helmet>
      <LocationPageTemplate
        activeLocation={activeLocation}
        customInfo={customInfo}
        experienceLevels={experienceLevels}
      />
      <CtaContact />
    </Layout>
  );
};

export default LocationPage;

export const pageQuery = graphql`
  query LocationsByCode($code: String, $classLocationId: Int) {
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
