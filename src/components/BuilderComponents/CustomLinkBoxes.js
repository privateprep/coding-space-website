import React from "react";
import PropTypes from "prop-types";
import createHtml from "../MdToHtml";

const CustomLinkBox = ({
  boxColor,
  mdContent,
  link,
  textAlign,
  textColor,
}) => {
  const htmlContent = createHtml(mdContent);

  return (
    <li
      className="custom-link-box"
      style={{
        backgroundColor: boxColor,
        color: textColor,
        border: `solid 2px ${textColor}`,
        borderRadius: "5px",
      }}
    >
      <a className="custom-link-box__link" href={link}>
        <div
          className="custom-link-box__content"
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
              link={item.content}
              mdContent={item.mdContent}
              boxColor={item.fgColor}
              textAlign={item.textAlign}
              textColor={item.textColor}
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
