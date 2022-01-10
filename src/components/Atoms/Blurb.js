import React from "react";
import PropTypes from "prop-types";
import PreviewCompatibleImage from "../PreviewCompatibleImage";
import FadeIn from "../shared/FadeIn";

import "./styles/Blurb.scss";

const Blurb = ({ title, description, image }) => {
  image.imageStyle = { borderRadius: "50%" };
  return (
    <FadeIn>
      <div className="blurb">
        <div className="blurb__image">
          <PreviewCompatibleImage imageInfo={image} />
        </div>
        <div className="blurb__content">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </FadeIn>
  );
};

Blurb.propTypes = {
  /**
   Blurb content
  */
  description: PropTypes.string,
  /**
   Image object containing image path and alt text, renders as a circle
  */
  image: PropTypes.object,
  /**
   Heading of the blurb
  */
  title: PropTypes.string,
};

export default Blurb;
