import React from "react";
import { Link } from "gatsby";
import { NewsletterForm } from "./NewsletterForm";

import logo from "../../img/logo.svg";
import facebook from "../../img/social/facebook.svg";
import instagram from "../../img/social/instagram.svg";
import twitter from "../../img/social/twitter.svg";

import "./Footer.scss";

const Footer = () => {
  const prodLinks = [
    ["/classes", "Classes"],
    ["/locations", "Locations"],
    ["/referral_program", "Referral and Rewards Program"],
  ];

  const devLinks = [
    ["/our_team", "Our Team"],
    ["/careers", "Careers"],
    ...prodLinks,
  ];

  const links = devLinks;
  return (
    <footer className="Footer">
      <div className="Footer__content">
        <div className="Footer__content__left">
          <img src={logo} alt="The Coding Space" className="Footer__logo" />
          <div className="social-links">
            <a title="facebook" href="https://facebook.com/thecodingspace">
              <img src={facebook} alt="Facebook" />
            </a>
            <a title="twitter" href="https://twitter.com/thecodingspace">
              <img className="fas fa-lg" src={twitter} alt="Twitter" />
            </a>
            <a title="instagram" href="https://instagram.com/thecodingspace">
              <img src={instagram} alt="Instagram" />
            </a>
          </div>
        </div>
        <div className="Footer__content__center">
          <h4 style={{ margin: "0 0 0.75rem" }}>SITE LINKS</h4>
          <ul className="Footer__list">
            {links.map(([route, label], linkIndex) => (
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
        <div className="Footer__content__right">
          <NewsletterForm />
        </div>
      </div>
      <div className="Footer__bottom" style={{ padding: 0 }}>
        <p>© {new Date().getFullYear()}, The Coding Space</p>
      </div>
    </footer>
  );
};

export default Footer;
