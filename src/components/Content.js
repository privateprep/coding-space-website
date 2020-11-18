import React from 'react'
import PropTypes from 'prop-types'

export const HTMLContent = ({ content, className }) => (
  <div
    className={className}
    style={{
      backgroundColor: "#9fe2dd",
      padding: "4rem",
      fontSize: "18px",
    }}
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

const Content = ({ content, className }) => (
  <div
    className={className}
    style={{
      backgroundColor: "#9fe2dd",
      padding: "4rem",
      fontSize: "18px",
    }}
  >
    {content}
  </div>
);

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
}

HTMLContent.propTypes = Content.propTypes

export default Content
