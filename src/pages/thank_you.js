import React from "react";

import Helmet from "react-helmet";
import { withPrefix } from "gatsby";
import { useSearchParams } from "../hooks";

import Layout from "../components/Layout";
import BoxWithLogo from "../components/shared/BoxWithLogo";
import Seo from "../components/seo";

// scripts provided by Google Ad Words Team
const GTag = ({ adsTracking }) =>
  true ? (
    <Helmet>
      <script src={withPrefix("ad-words-tracking.js")} type="text/javascript" />
      <script>
        {typeof window !== "undefined" &&
          window.gtag("event", "conversion", {
            send_to: "AW-943271359/NoDFCMXbkuEBEL_b5MED",
            ...adsTracking,
          })}
      </script>
    </Helmet>
  ) : null;

const ThankYou = _ => {
  const adsTracking = useSearchParams();

  return (
    <Layout>
      <GTag adsTracking={adsTracking} />
      <Seo title="Thank You" />
      <BoxWithLogo>
        <h2>See you in class!</h2>
        <p>A confirmation email will be sent shortly.</p>
      </BoxWithLogo>
    </Layout>
  );
};

export default ThankYou;
