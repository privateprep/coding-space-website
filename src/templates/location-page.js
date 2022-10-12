import * as React from "react";
import { Helmet } from "react-helmet";
import Seo from "../components/seo";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import { LocationPageTemplate } from "./template_exports/location-page-template";
import CtaContact from "../components/CtaContact";

import "./styles/location.scss";

const LocationPage = ({ data }) => {
  const activeLocation = data.classLocation;
  const { customInfo = {} } = data;
  const { frontmatter: { seo } } = customInfo;
  // mimic transformation in LocationsPanel
  const experienceLevels = data.experienceLevelQuery.experienceLevels.map(
    levelNode => {
      return {
        ...levelNode.frontmatter, // most MD file things
        ...levelNode.fields, // slug, extras
      };
    }
  );

  return (
    <Layout>
      <Seo title={seo.title} description={seo.seo_description} />
      <Helmet titleTemplate="%s | Locations" />
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
        seo {
          seo_description
          title
        }
        pageBuilder {
          content
          buttons {
            bgColor
            fgColor
            list {
              content
              title
            }
            textColor
          }
          heading
          image {
            alt
            image {
              childImageSharp {
                gatsbyImageData(
                  height: 500
                  width: 500
                  quality: 100
                  layout: CONSTRAINED
                )
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
              gatsbyImageData(width: 480, quality: 80, layout: CONSTRAINED)
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
