import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";

import logo from "../img/logo.svg";

// NOTE: ./NavBar is a bit more built out!

const BasicHeader = () => {
  const homeLink =
    process.env.NODE_ENV === "production" ? "https://thecodingspace.com" : "/";

  return (
    <header
      style={{
        background: `#fff`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 1170,
          padding: `1.45rem 1.0875rem`,
          display: `flex`,
          flexFlow: `row wrap`,
          justifyContent: `space-between`,
          alignItems: `center`,
        }}
      >
        <a
          href={homeLink}
          style={{
            color: `#274548`,
            textDecoration: `none`,
            display: `block`,
          }}
        >
          <img
            src={logo}
            alt="The Coding Space"
            style={{
              width: 260,
              fill: `#274548`,
              marginRight: `2rem`,
            }}
          />
        </a>
        <div style={{ display: "flex", flexFlow: "row wrap" }}>
          <Link
            to={"/classes"}
            style={{ color: `var(--dark)`, marginLeft: `1rem` }}
          >
            Classes
          </Link>
          <Link
            to={"/locations"}
            style={{ color: `var(--dark)`, marginLeft: `1rem` }}
          >
            Locations
          </Link>
          <a style={{ color: `var(--dark)`, marginLeft: `1rem` }} href="https://www.thecodingspace.com/contact.html">Contact</a>
        </div>
      </div>
    </header>
  );
};

export default BasicHeader;
