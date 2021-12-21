import React from "react";

import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";

import "./styles/index.scss";

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className="blog-page">
          <div className="blog-page__header">
            <h1
              style={{
                backgroundColor: "transparent",
                color: "white",
                padding: "1rem",
              }}
            >
              Latest Stories
            </h1>
          </div>
          <section className="blog-page__content">
            <BlogRoll />
          </section>
        </div>
      </Layout>
    );
  }
}
