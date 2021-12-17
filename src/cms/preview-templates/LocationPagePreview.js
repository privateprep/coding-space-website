import React from "react";
import PropTypes from "prop-types";
import Banner from "../../components/Atoms/Banner";
import MapDisplay from "../../components/MapDisplay";
import PageBuilder from "../../components/PageBuilder";

// Keep this file up to date with the Location Page Template! We can't access graphql data in
// previews and thus need a separate copy of it.

const LocationPagePreview = ({ entry }) => {
  // Always convert extracted objects and arrays .toJS()
  // in order to access the data.

  const entryTitle = entry.getIn(["data", "title"]);
  const title = entryTitle ? entryTitle : "";

  const entryBanner = entry.getIn(["data", "banner"]);
  const banner = entryBanner ? entryBanner.toJS() : [];

  const entryContactInfo = entry.getIn(["data", "contactInfo"]);
  const contactInfo = entryContactInfo ? entryContactInfo.toJS() : [];

  const entryPageBuilder = entry.getIn(["data", "pageBuilder"]);
  const pageBuilder = entryPageBuilder ? entryPageBuilder.toJS() : [];

  // placeholder data
  const activeLocation = {
    isOnline: title.toLowerCase().includes("online"),
    addressLink: "#",
    addressString: "10346 CO-347, Montrose, CO 81401",
    addressNotes:
      "These notes are populated via Dashboard. What you are seeing here is placeholder text. To make changes here, you must visit Class Locations in Dashboard and click edit!",
    name: "Place Holder Name",
    latitude: "38.4783",
    longitude: "-107.8762",
  };

  return (
    <div className="Location">
      {!!banner?.mdContent && <Banner {...banner} />}
      <div
        className={`Location__hero${
          activeLocation.isOnline ? " Location__hero--online" : ""
        }`}
      >
        {!activeLocation.isOnline && (
          <MapDisplay
            addressCoords={[activeLocation.latitude, activeLocation.longitude]}
          />
        )}
        <div className="Location__hero__text">
          <h1 className="title">{activeLocation.name}</h1>
          {contactInfo?.phone && (
            <p>
              <strong>Phone Number:</strong>{" "}
              <a
                href={`tel:${contactInfo.phone}`}
                target="_blank"
                rel="noreferrer"
                style={{ color: "currentColor" }}
              >
                {contactInfo.phone}
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
      {!!pageBuilder && (
        <div className="Location__customInfo">
          <PageBuilder data={pageBuilder} />
        </div>
      )}
    </div>
  );
};

LocationPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default LocationPagePreview;
