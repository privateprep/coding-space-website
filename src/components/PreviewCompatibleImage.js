import React from "react";
import PropTypes from "prop-types";
import { GatsbyImage } from "gatsby-plugin-image";

const PreviewCompatibleImage = ({ imageInfo }) => {
  const { alt = "", image, imageStyle, url } = imageInfo;

  if (!!image?.childImageSharp?.gatsbyImageData && image?.extension === "png") {
    return (
      <GatsbyImage
        image={image.childImageSharp.gatsbyImageData}
        style={imageStyle}
        imgStyle={{ width: "100%", objectFit: "contain" }}
        alt={alt} />
    );
  }

  if (!!image?.childImageSharp?.gatsbyImageData) {
    return (
      <GatsbyImage
        image={image.childImageSharp.gatsbyImageData}
        style={imageStyle}
        imgStyle={{ width: "100%" }}
        alt={alt} />
    );
  }

  if (!!image?.childImageSharp?.gatsbyImageData) {
    return (
      <GatsbyImage
        image={image.childImageSharp.gatsbyImageData}
        style={imageStyle}
        imgStyle={{ width: "100%" }}
        alt={alt} />
    );
  }

  if (!!image && typeof image === "string")
    return <img style={imageStyle} src={image} alt={alt} />;

  if (!!image?.publicURL)
    return <img style={imageStyle} src={image.publicURL} alt={alt} />;

  // URL provided by getAsset for CMS preview.
  if (!!url) return <img style={imageStyle} src={url} alt={alt} />;

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
