import React from "react";
import { Link } from "gatsby";

import logo from "../img/logo.svg";
import facebook from "../img/social/facebook.svg";
import instagram from "../img/social/instagram.svg";
import twitter from "../img/social/twitter.svg";

import "./Footer.scss"

const Footer = () => (
  <footer className="Footer">
    <img
      src={logo}
      alt="The Coding Space"
      className="Footer__logo"
    />
    <div className="Footer__content">
      <div className="Footer__content__left">
        <ul className="Footer__list">
          <li>
            <Link to="/" className="Footer__list__link">
              Home
            </Link>
          </li>
          <li>
            <Link className="Footer__list__link" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="Footer__list__link" to="/contact/examples">
              Form Examples
            </Link>
          </li>
          <li>
            <a
              className="Footer__list__link"
              href="/admin/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Admin
            </a>
          </li>
        </ul>
      </div>
      <div className="Footer__content__center">
        <ul className="Footer__list">
          <li>
            <Link className="Footer__list__link" to="/blog">
              Latest Stories
            </Link>
          </li>
          <li>
            <Link className="Footer__list__link" to="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className="Footer__content__right social-links">
        <a title="facebook" href="https://facebook.com/thecodingspace">
          <img
            src={facebook}
            alt="Facebook"
            style={{ width: "1em", height: "1em" }}
          />
        </a>
        <a title="twitter" href="https://twitter.com/thecodingspace">
          <img
            className="fas fa-lg"
            src={twitter}
            alt="Twitter"
            style={{ width: "1em", height: "1em" }}
          />
        </a>
        <a title="instagram" href="https://instagram.com/thecodingspace">
          <img
            src={instagram}
            alt="Instagram"
            style={{ width: "1em", height: "1em" }}
          />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
