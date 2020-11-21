import React from "react";
import PropTypes from "prop-types";
import { BirthdayTemplate } from "../../templates/birthday-page";

const BirthdayPreview = ({ entry, widgetFor, getAsset }) => {
  const entryPoints = entry.getIn(["data", "points"]);
  const points = entryPoints ? entryPoints.toJS() : [];

  return (
    <BirthdayTemplate
      content={widgetFor("body")}
      title={entry.getIn(["data", "title"])}
      boxWithLogo={{
        title: entry.getIn(["data", "boxWithLogo", "title"]),
        content: entry.getIn(["data", "boxWithLogo", "content"]),
      }}
      points={points}
      textImageBlock={{
        content: entry.getIn(["data", "textImageBlock", "content"]),
        image: {
          image: getAsset(
            entry.getIn(["data", "textImageBlock", "image", "image"])
          ),
          alt: entry.getIn(["data", "textImageBlock", "image", "alt"]),
        },
      }}
    />
  );
};

BirthdayPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
  getAsset: PropTypes.func,
};

export default BirthdayPreview;
