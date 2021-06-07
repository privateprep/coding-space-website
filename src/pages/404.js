import React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";

const NotFoundPage = () => (
  <Layout>
    <div style={{ width: "100%", maxWidth: 760, padding: "3rem 1rem 6rem", margin: "auto" }}>
      <h1>NOT FOUND</h1>
      <p>Oh no! You landed on a page that does not exist or has moved to a new place.</p>
      <p>To find for a class, check out our <Link to={`/classes`}>class catalog</Link> or <Link to={`/locations`}>locations</Link>!</p>
      <p>If you'd prefer, you can always <a href="//thecodingspace.com/contact.html">contact our team</a> to speak to a human.</p>
    </div>
    <hr />
  </Layout>
)

export default NotFoundPage;
