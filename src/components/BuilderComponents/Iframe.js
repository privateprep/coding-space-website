import React from "react";
import PropTypes from "prop-types";

import "./styles/Iframe.scss";

const Iframe = ({
  bgColor,
  content,
  size: { height = 300, width = 300 },
  title,
}) => {
  return (
    <div className="iframe-container" style={{ backgroundColor: bgColor }}>
      <iframe
        title={title}
        width={width}
        height={height}
        src={content}
      ></iframe>
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
   Title of the iframe (does not appear in the UI)
  */
  title: PropTypes.string,
  /**
   Controls the size of the iframe
  */
  size: PropTypes.shape({
    /**
     height of iframe in pixels
    */
    height: PropTypes.number,
    /**
     Width of iframe in pixels
    */
    width: PropTypes.number,
  }),
};

export default Iframe;
