import React from "react";
import Layout from "../../components/Layout";
import BoxWithLogo from "../../components/BuilderComponents/BoxWithLogo";
import Seo from "../../components/seo";

const Thanks = () => {
  const heading = "We'll be in touch!";
  const mdContent =
    "You've successfully inquired about The Coding Space! We're excited to help your child started on their coding journey!";
  return (
    <Layout>
      <Seo title="We'll be in touch!" />
      <section className="newsletter-success">
        <BoxWithLogo heading={heading} mdContent={mdContent} />
      </section>
    </Layout>
  );
};

export default Thanks;
