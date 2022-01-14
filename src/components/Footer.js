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
        <h4 style={{ margin: "0 0 1.75rem" }}>SITE LINKS</h4>
        <ul className="Footer__list">
          {[
            ["/our_team", "Our Team"],
            ["/classes", "Classes"],
            ["/locations", "Locations"],
            ["/referral_program", "Referral and Rewards Program"],
          ].map(([route, label], linkIndex) => (
            <li key={linkIndex} className="Footer__list__link">
              <Link
                to={route}
                style={{ color: `var(--dark)`, marginLeft: `1rem` }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="Footer__content__center" />
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
    <div className="Footer__content" style={{ padding: 0 }}>
      <p>© {new Date().getFullYear()}, The Coding Space</p>
    </div>
  </footer>
);

export default Footer;
