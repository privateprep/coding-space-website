import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { kebabCase } from "lodash";
import Content from "../../components/Content";
import PreviewCompatibleImage from "../../components/PreviewCompatibleImage";
import facebook from "../../img/social/facebook.svg";

export const BlogPostTemplate = ({
  bgColor,
  content,
  contentComponent,
  date,
  description,
  featuredImage,
  tags,
  title,
  titleColor,
  helmet,
  postUrl,
}) => {
  const PostContent = contentComponent || Content;
  const isBrowser = typeof window !== "undefined";
  let fbURL = "";

  if (!!isBrowser) {
    fbURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`;
  }
  return (
    <React.Fragment>
      {helmet || ""}
      <div className="blog-container" style={{ backgroundColor: bgColor }}>
        {tags && tags.length ? (
          <div className="tags">
            <ul className="taglist">
              {tags.map((tag) => (
                <li key={tag + `tag`}>
                  <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="blog-post">
          <div className="blog-post__details">
            <span>{date}</span>
          </div>
          <div className="blog-post__heading">
            <h1 style={{ color: titleColor }}>{title}</h1>
            <PreviewCompatibleImage imageInfo={featuredImage} />
            <h2>{description}</h2>
          </div>
          <div className="blog-post__content">
            <PostContent content={content} />
          </div>
          <hr />
          <div className="blog-post__footer">
            {!!fbURL && (
              <a title="facebook" href={fbURL}>
                <img
                  src={facebook}
                  alt="Facebook"
                  style={{ width: "2em", height: "2em" }}
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};
