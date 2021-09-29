import React from "react";
import PageBuilder from "../../components/PageBuilder";

export const RefundPageTemplate = ({ title, pageBuilder, lastUpdated }) => {
  return (
    <div className="refund-page">
      <section className="refund-page__title" style={{ padding: "4rem" }}>
        <h1>{title}</h1>
      </section>
      <PageBuilder data={pageBuilder ?? []} />
      {!!lastUpdated && (
        <small style={{ padding: "4rem" }}>Last Updated: {lastUpdated}</small>
      )}
    </div>
  );
};
