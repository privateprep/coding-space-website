import React from "react";
import PageBuilder from "../../components/PageBuilder";
import CheckRewardsBalance from "../../components/CheckRewardsBalance";


export const ReferralPageTemplate = ({ title, pageBuilder, lastUpdated }) => {
  return (
    <div className="referral-page">
      <section
        className="referral-page__check-balance"
        style={{ padding: "4rem" }}
      >
        <h1>{title}</h1>
        <h2>Check Balance and Get Rewards Code</h2>
        <CheckRewardsBalance />
      </section>
      <hr />
      <PageBuilder data={pageBuilder ?? []} />
      {!!lastUpdated && (
        <small style={{ padding: "4rem" }}>Last Updated: {lastUpdated}</small>
      )}
    </div>
  );
};
