import React from "react";
import Layout from "../../components/Layout";
import { Helmet } from "react-helmet";
import { StaticImage } from "gatsby-plugin-image";
import ContactUsForm from "../../components/ContactUsForm";

export default class Index extends React.Component {
  render() {
    return (
      <Layout>
        <Helmet titleTemplate="Contact Us">
          <title>"Contact The Coding Space"</title>
          <meta
            name="description"
            content="Get in touch with the Coding Space team to get help on finding the right class for your student!"
          />
        </Helmet>
        <div className="contact-us-page">
          <div className="hero-container">
            <StaticImage
              src="../../img/tcs-header.png"
              alt="Light blue hero image with animated computer and code"
              layout="fullWidth"
              style={{ height: "25vh", maxHeight: "200px" }}
            />
            <h1 className="hero-container__title">Contact Us</h1>
          </div>
          <div className="container">
            <ContactUsForm />
          </div>
        </div>
      </Layout>
    );
  }
}
