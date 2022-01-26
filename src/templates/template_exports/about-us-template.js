import React from "react";
import PropTypes from "prop-types";
import PageBuilder from "../../components/PageBuilder";
import PreviewCompatibleImage from "../../components/PreviewCompatibleImage";

export const AboutUsTemplate = ({
  title,
  titleColor,
  heroImage,
  pageBuilder,
  helmet,
}) => {
  const data = pageBuilder ?? [];
  return (
    <section className="section">
      {helmet || ""}
      <div className="hero-container">
        <PreviewCompatibleImage
          imageInfo={heroImage}
        />
        <h1 className="hero-container__title" style={{ color: titleColor }}>
          {title}
        </h1>
      </div>
      <div>
        <PageBuilder data={data} />
      </div>
    </section>
  );
};

AboutUsTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};
