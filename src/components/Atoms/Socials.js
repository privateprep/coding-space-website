import React from "react";
import PropTypes from "prop-types";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";

import facebook from "../../img/social/facebook.svg";
import twitter from "../../img/social/twitter.svg";
import email from "../../img/social/email.svg";

import "./styles/Socials.scss";

const Socials = ({ url }) => {
  return (
    <div className="socials">
      <EmailShareButton url={url}>
        <img
          src={email}
          alt="Email icon"
          style={{ width: "2em", height: "2em" }}
        />
      </EmailShareButton>
      <FacebookShareButton url={url}>
        <img
          src={facebook}
          alt="Facebook"
          style={{ width: "2em", height: "2em" }}
        />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <img
          src={twitter}
          alt="Twitter logo"
          style={{ width: "2em", height: "2em" }}
        />
      </TwitterShareButton>
    </div>
  );
};

Socials.propTypes = {
  /**
   * The url to the page
   */
  url: PropTypes.string,
};

export default Socials;
