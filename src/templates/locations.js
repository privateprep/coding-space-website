import React from "react";
import { Helmet } from "react-helmet";
import { graphql} from "gatsby";
import Layout from "../components/Layout";
import { LocationsPageTemplate } from "./template_exports/locations-template"

import "./styles/locations.scss";

const LocationsPage = ({ data }) => {
  const {
    frontmatter: { title, subtitle, seoDescription, pageBuilder },
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
      <LocationsPageTemplate
        helmet={
          <Helmet>
            <title>{title}</title>
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
