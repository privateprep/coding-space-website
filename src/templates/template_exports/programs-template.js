import React from "react";
import PageBuilder from "../../components/PageBuilder";
import PreviewCompatibleImage from "../../components/PreviewCompatibleImage";

export const ProgramsTemplate = ({
  title,
  titleColor,
  heroImage,
  pageBuilder,
  helmet,
}) => {
  const data = pageBuilder ?? [];
  heroImage.wrapperStyle = { height: "100%" };

  return (
    <section className="section">
      {helmet || ""}
      <div className="hero-container">
        <PreviewCompatibleImage imageInfo={heroImage} />
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
