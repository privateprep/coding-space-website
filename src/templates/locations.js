import React from "react";
import { graphql } from "gatsby";
import Seo from "../components/seo";
import Layout from "../components/Layout";
import { LocationsPageTemplate } from "./template_exports/locations-template";

import "./styles/locations.scss";

const LocationsPage = ({ data }) => {
  const {
    frontmatter: { title, subtitle, seo, pageBuilder },
  } = data.markdownRemark;
  const experienceLevels = data.experienceLevelQuery.experienceLevels?.map(
    levelNode => {
      return {
        ...levelNode.frontmatter,
        slug: levelNode.fields.slug,
      };
    }
  );

  return (
    <Layout>
      <Seo title={seo.title} description={seo.description} />
      <LocationsPageTemplate
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
        seo {
          description
          title
        }
        subtitle
        pageBuilder {
          heading
          image {
            alt
            image
            imageFile {
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
        }
      }
    }
    allClassLocation {
      locations: nodes {
        classLocationId
        code
        name
        isOnline
        latitude
        longitude
        addressString
        categoryIds
        courseOfferingsEndpoint
        phoneNumber
      }
    }
  }
`;
