import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { kebabCase } from "lodash";
import Content from "../../components/Content";
import PreviewCompatibleImage from "../../components/PreviewCompatibleImage";

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
}) => {
  const PostContent = contentComponent || Content;
  console.log(date);
  return (
    <React.Fragment>
      {helmet || ""}
      <div className="blog-container" style={{ backgroundColor: bgColor }}>
        <div className="blog-post">
          <div className="blog-post__info">
            {/* <span>{date}</span> */}
          </div>
          <h1 style={{ color: titleColor }}>{title}</h1>
          {/* <PreviewCompatibleImage imageInfo={featuredImage} /> */}
          <p>{description}</p>
          <PostContent content={content} />
          {tags && tags.length ? (
            <div style={{ marginTop: `4rem` }}>
              <h4>Tags</h4>
              <ul className="taglist">
                {tags.map((tag) => (
                  <li key={tag + `tag`}>
                    <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
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
