import React from "react";
import PropTypes from "prop-types";
import createHtml from "../MdToHtml";
import { DateTime } from "luxon";

import "./styles/Banner.scss";

const Banner = ({ mdContent, removalDate }) => {
  const htmlContent = createHtml(mdContent);
  const currentDate = DateTime.now().setZone("America/New_York");
  const removalDateTime =
    DateTime.fromISO(removalDate).setZone("America/New_York");

  if (!!removalDate && currentDate > removalDateTime) {
    return null;
  }

  return (
    <div className="Banner">
      <div dangerouslySetInnerHTML={htmlContent} />
    </div>
  );
};

Banner.propTypes = {
  /**
   * The datetime that the banner will be removed from the page
   */
  removalDate: PropTypes.string,
  /**
   * Rich text to allow links
   */
  mdContent: PropTypes.string,
};

export default Banner;
