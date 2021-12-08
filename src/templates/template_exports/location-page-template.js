import React from "react";
import PropTypes from "prop-types";
import Banner from "../../components/Atoms/Banner";
import PageBuilder from "../../components/PageBuilder";
import ClassPanel from "../../components/ClassPanel";
import MapDisplay from "../../components/MapDisplay";

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

export const LocationPageTemplate = ({
  activeLocation,
  customInfo,
  experienceLevels,
}) => {
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
    <React.Fragment>
      <div className="Location">
        {!!customInfo?.frontmatter && customInfo?.frontmatter?.banner && (
          <Banner {...customInfo.frontmatter.banner} />
        )}
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
            <PageBuilder data={customInfo.frontmatter.pageBuilder} />
          </div>
        )}
        <ClassPanel
          title={`${activeLocation.name} Catalog`}
          experienceLevels={activeLevels}
          slugExtension={locationQueryString}
          filterTemplate={locationFilterTemplate}
        />
      </div>
    </React.Fragment>
  );
};

LocationPageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};
