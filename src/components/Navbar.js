import React from "react";
import { Link } from "gatsby";
import logo from "../img/logo.svg";
import "./Navbar.scss";

const Navbar = props => (
  <nav
    className="Navbar"
    role="navigation"
    aria-label="main-navigation"
  >
    <div className="Navbar__container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item" title="Logo">
          <img
            src={logo}
            alt="The Coding Space Logo"
            style={{ width: "100%" }}
          />
        </Link>
      </div>
      <div
        id="navMenu"
        className="Navbar__container__menu"
      >
        <Link className="navbar-item" to="/classes">
          Classes
        </Link>
        <Link className="navbar-item" to="/birthday">
          Birthday Parties
        </Link>
        <Link className="navbar-item" to="/blog">
          Blog
        </Link>
        <Link className="navbar-item" to="/about">
          About
        </Link>
        <Link className="navbar-item" to="/contact">
          Contact
        </Link>
        <Link className="navbar-item" to="/contact/examples">
          Forms
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
