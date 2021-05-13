import React from "react";
import PropTypes from "prop-types";
import createHtml from "../MdToHtml";

const CustomLinkBox = ({
  fgColor,
  mdContent,
  content,
  textAlign,
  textColor,
}) => {
  const htmlContent = createHtml(mdContent);
  return (
    <li
      className="custom-link-box"
      style={{ backgroundColor: fgColor, color: textColor }}
    >
      <a href={content}>
        <div
          dangerouslySetInnerHTML={htmlContent}
          style={{ color: textColor, textAlign: textAlign }}
        />
      </a>
    </li>
  );
};

const CustomLinkBoxes = ({ data }) => {
  const { bgColor, list } = data;
  return (
    <div
      className="custom-link-boxes component"
      style={{ backgroundColor: bgColor }}
    >
      <ul className="custom-link-boxes__list">
        {!!list &&
          list.map((item, i) => (
            <CustomLinkBox
              key={`custom-link-box-${i}`}
              link={item.link}
              mdContent={item.mdContent}
            />
          ))}
      </ul>
    </div>
  );
};

CustomLinkBoxes.propTypes = {
  data: PropTypes.shape({
    bgColor: PropTypes.string,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string.isRequired,
        fgColor: PropTypes.string,
        mdContent: PropTypes.string,
        textColor: PropTypes.string,
        textAlign: PropTypes.string,
      })
    ),
  }),
};

export default CustomLinkBoxes;
