import React from "react";
import PropTypes from "prop-types";
import { GatsbyImage } from "gatsby-plugin-image";

const PreviewCompatibleImage = ({ imageInfo }) => {
  const {
    alt = "",
    image,
    imageFile,
    wrapperStyle,
    imgStyle = { width: "100%" },
    url,
  } = imageInfo;
  const resolvedImage = imageFile ?? image;
  if (
    !!resolvedImage?.childImageSharp?.gatsbyImageData &&
    resolvedImage?.extension === "png"
  ) {
    return (
      <GatsbyImage
        image={resolvedImage.childImageSharp.gatsbyImageData}
        style={wrapperStyle}
        imgStyle={imgStyle}
        alt={alt}
      />
    );
  }

  if (!!resolvedImage?.childImageSharp?.gatsbyImageData) {
    return (
      <GatsbyImage
        image={resolvedImage.childImageSharp.gatsbyImageData}
        style={wrapperStyle}
        imgStyle={imgStyle}
        alt={alt}
      />
    );
  }

  if (!!resolvedImage?.childImageSharp?.gatsbyImageData) {
    return (
      <GatsbyImage
        image={resolvedImage.childImageSharp.gatsbyImageData}
        style={wrapperStyle}
        imgStyle={imgStyle}
        alt={alt}
      />
    );
  }

  if (!!resolvedImage && typeof resolvedImage === "string")
    return <img style={wrapperStyle} src={resolvedImage} alt={alt} />;

  if (!!resolvedImage?.publicURL)
    return (
      <img style={wrapperStyle} src={resolvedImage.publicURL} alt={alt} />
    );

  // URL provided by getAsset for CMS preview.
  if (!!url) return <img style={wrapperStyle} src={url} alt={alt} />;

  return null;
};

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    imageFile: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    imgStyle: PropTypes.object,
    wrapperStyle: PropTypes.object,
  }).isRequired,
};

export default PreviewCompatibleImage;
