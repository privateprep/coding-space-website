import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import PreviewCompatibleImage from "../PreviewCompatibleImage";

import "./styles/BlogPreview.scss";

const BlogPreview = ({ id, excerpt, fields, frontmatter }) => {
  return (
    <div
      className={`blog-preview ${frontmatter.featuredPost ? "featured" : ""}`}
      key={id}
    >
      <div className="blog-preview__header">
        {frontmatter.featuredImage ? (
          <div className="featured-thumbnail">
            <PreviewCompatibleImage
              imageInfo={{
                imageStyle: { height: "30vh" },
                image: frontmatter.featuredImage.image,
                alt: `featured image thumbnail for post ${frontmatter.title}`,
              }}
            />
          </div>
        ) : null}
      </div>
      <div className="blog-preview__content">
        {!!frontmatter?.tags?.length && (
          <div className="blog-preview__content__tags">
            {frontmatter.tags.map(tag => (
              <span className="tag">{tag}</span>
            ))}
          </div>
        )}
        <h3 className="blog-preview__content__title">{frontmatter.title}</h3>
        <span className="date">
          <em>{frontmatter.date}</em>
        </span>
        <p className="blog-preview__content__excerpt">{excerpt}</p>
      </div>
      <div className="blog-preview__footer">
        <Link className="button" to={fields.slug}>
          Keep Reading →
        </Link>
      </div>
    </div>
  );
};

BlogPreview.propTypes = {
  /**
   * Blog post id used as a key in a list of blog previews
   */
  id: PropTypes.string,
  /**
   * Content pulled from the blog post
   */
  /**
   * Takes first 400 characters of the post as a preview
   */
  excerpt: PropTypes.string,
  frontmatter: PropTypes.shape({
    /**
     * Published date of the blog post
     */
    date: PropTypes.string,
    /**
     * The primary image for the blog post
     */
    featuredImage: PropTypes.string,
    /**
     * Indicates if the post should be featured on the homepage, also highlighted on the blog page
     */
    featuredPost: PropTypes.bool,
    /**
     * Tags associated with the post
     */
    tags: PropTypes.array,
    /**
     * Title of the blog post
     */
    title: PropTypes.string,
  }),
  /**
   * Provides the url to the blog post
   */
  fields: PropTypes.shape({ slug: PropTypes.string }),
};

export default BlogPreview;
