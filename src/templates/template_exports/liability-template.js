import React from "react";
import PageBuilder from "../../components/PageBuilder";

export const LiabilityPageTemplate = ({ title, pageBuilder, lastUpdated }) => {
  return (
    <div className="liability-page">
      <section className="liability-page__title" style={{ padding: "4rem" }}>
        <h1>{title}</h1>
      </section>
      <PageBuilder data={pageBuilder ?? []} />
      {!!lastUpdated && (
        <small style={{ padding: "4rem" }}>Last Updated: {lastUpdated}</small>
      )}
    </div>
  );
};

export default LiabilityPageTemplate;
