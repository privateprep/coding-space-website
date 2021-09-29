import React from "react";
import PropTypes from "prop-types";
import PageBuilder from "../../components/PageBuilder";

export const PartnershipsTemplate = ({
  title,
  titleColor,
  headingImage,
  pageBuilder,
  helmet,
}) => {
  const data = pageBuilder ?? [];
  const backgroundImage = !!headingImage
    ? headingImage.publicURL
    : "/static/602986bab4e3eb9b86d275153b37f58c/43a2d/tcs-header.png";

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div
          className="full-width-image margin-top-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: "left",
            width: "100%",
          }}
        >
          <div className="columns">
            <div className="column">
              <h1
                className="title"
                style={{ color: titleColor, fontSize: "5em" }}
              >
                {title}
              </h1>
            </div>
          </div>
        </div>

        <div>
          <PageBuilder data={data} />
        </div>
      </div>
    </section>
  );
};

PartnershipsTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};
