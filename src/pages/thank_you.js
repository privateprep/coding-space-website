import React, { useEffect } from "react";

import Layout from "../components/Layout";
import BoxWithLogo from "../components/BuilderComponents/BoxWithLogo";
import Seo from "../components/seo";

const ThankYou = ({ location }) => {
  const { adsTracking = {} } = location.state || {};
  // conversion tracking code with safeguards against non-production environments
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window?.gtag === "function") {
      window.gtag("event", "purchase", {...adsTracking});
      window.gtag("event", "conversion", {
        send_to: "AW-943271359/NoDFCMXbkuEBEL_b5MED",
        ...adsTracking,
      });
    }
  }, [adsTracking]);

  return (
    <Layout>
      <Seo title="Thank You" />
      <BoxWithLogo
        heading="See you in class!"
        mdContent="A confirmation email will be sent shortly."
      ></BoxWithLogo>
    </Layout>
  );
};

export default ThankYou;
