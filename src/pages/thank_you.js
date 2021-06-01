import React from "react";

import Helmet from "react-helmet";
import { withPrefix } from "gatsby";

import Layout from "../components/Layout";
import BoxWithLogo from "../components/shared/BoxWithLogo";
import SEO from "../components/seo";

// scripts provided by Google Ad Words Team
const GTag = () =>
  true ? (
    <Helmet>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-943271359"
      />
      <script src={withPrefix("ad-words-event.js")} type="text/javascript" />
      <script src={withPrefix("ad-words-tracking.js")} type="text/javascript" />
    </Helmet>
  ) : null;

const ThankYou = _ => {
  return (
    <Layout>
      <GTag />
      <SEO title="Thank You" />
      <BoxWithLogo
        content={{
          title: "See you in class!",
          lines: ["A confirmation email will be sent shortly."],
        }}
      />
    </Layout>
  );
};

export default ThankYou;
