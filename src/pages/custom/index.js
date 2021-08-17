import React from "react";
import Layout from "../../components/Layout";

export default class CustomIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/sisters-doing-their-homework-orig.jpg')`,
          }}
        >
          <h1
            style={{
              boxShadow: "0.5rem 0 0 #9fe2dd, -0.5rem 0 0 #9fe2dd",
              backgroundColor: "#9fe2dd",
              color: "white",
              padding: "1rem",
            }}
          >
            Example Custom Pages
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <p>Placeholder</p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
