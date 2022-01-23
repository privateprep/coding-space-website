import React from "react";
import Layout from "../components/Layout";
import BoxWithLogo from "../components/BuilderComponents/BoxWithLogo";

const NewsletterSuccess = () => {
  const heading = "Thank you for subscribing!";
  const mdContent =
    "You've successfully signed up to receive our newsletter! Looking forward to sharing exciting news from The Coding Space. Happy coding!";
  return (
    <Layout>
      <section className="newsletter-success">
        <BoxWithLogo heading={heading} mdContent={mdContent} />
      </section>
    </Layout>
  );
};

export default NewsletterSuccess;
