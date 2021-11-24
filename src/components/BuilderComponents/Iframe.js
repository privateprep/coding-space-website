import React from "react";
import PropTypes from "prop-types";

import "./styles/Iframe.scss";

const Iframe = ({ bgColor, content, ratio, title }) => {
  return (
    <div className="component">
      <div
        className={`iframe-container ${ratio}`}
        style={{ backgroundColor: bgColor }}
      >
        <iframe
          className="iframe-responsive"
          title={title}
          src={content}
        ></iframe>
      </div>
    </div>
  );
};

Iframe.propTypes = {
  /**
   Color for the background of the component
  */
  bgColor: PropTypes.string,
  /**
   Source URL of the iframe (can be of kid's code projects or other documents)
  */
  content: PropTypes.string,
  /**
   Aspect ratio of the iframe
  */
  ratio: PropTypes.string,
  /**
   Title of the iframe (does not appear in the UI)
  */
  title: PropTypes.string,
};

export default Iframe;
