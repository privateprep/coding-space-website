import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";

const PreviewCompatibleImage = ({ imageInfo }) => {
  const { alt = "", image, imageStyle } = imageInfo;

  if (!!image?.childImageSharp?.fixed && image?.extension === "png") {
    return (
      <Img
        style={imageStyle}
        imgStyle={{ width: "100%", objectFit: "contain" }}
        fixed={image.childImageSharp.fixed}
        alt={alt}
      />
    );
  }

  if (!!image?.childImageSharp?.fixed) {
    return (
      <Img
        style={imageStyle}
        imgStyle={{ width: "100%" }}
        fixed={image.childImageSharp.fixed}
        alt={alt}
      />
    );
  }

  if (!!image?.childImageSharp?.fluid) {
    return (
      <Img
        style={imageStyle}
        imgStyle={{ width: "100%" }}
        fluid={image.childImageSharp.fluid}
        alt={alt}
      />
    );
  }

  if (!!image && typeof image === "string")
    return <img style={imageStyle} src={image} alt={alt} />;

  if (!!image.publicURL)
    return <img style={imageStyle} src={image.publicURL} alt={alt} />;

  return null;
};

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    style: PropTypes.object,
  }).isRequired,
};

export default PreviewCompatibleImage;
