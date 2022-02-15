import React from "react";
import PropTypes from "prop-types";
import PreviewCompatibleImage from "../PreviewCompatibleImage";
import createHtml from "../MdToHtml";
import FadeIn from "../shared/FadeIn";

import "./styles/Blurb.scss";

const Blurb = ({ mdContent, image }) => {
  image.wrapperStyle = { borderRadius: "50%" };
  const htmlContent = createHtml(mdContent);

  return (
    <FadeIn>
      <div className="blurb">
        <div className="blurb__image">
          <PreviewCompatibleImage imageInfo={image} />
        </div>
        <div
          className="blurb__content"
          dangerouslySetInnerHTML={htmlContent}
        ></div>
      </div>
    </FadeIn>
  );
};

Blurb.propTypes = {
  /**
   markdown content for flexible rich text
  */
  mdContent: PropTypes.string,
  /**
   Image object containing image path and alt text, renders as a circle
  */
  image: PropTypes.object,
};

export default Blurb;
