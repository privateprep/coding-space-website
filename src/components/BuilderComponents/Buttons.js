import React from "react";
import PropTypes from "prop-types";

const Button = ({ fgColor, textColor, key, link, text }) => (
  <a
    class="custom-button"
    href={link}
    key={key}
    style={{
      color: textColor,
      textDecoration: "none",
      borderRadius: "6px",
      margin: "10px",
      width: "250px",
      display: "inline-block",
      textAlign: "center",
      padding: "10px 0",
      fontSize: "18px",
      backgroundColor: fgColor,
      fontWeight: "bold",
      border: "2px solid",
      borderColor: textColor,
    }}
  >
    {text}
  </a>
);

const Buttons = ({ data }) => {
  const { bgColor, fgColor, textColor, list } = data;
  return (
    <div
      className="Buttons component"
      style={{
        backgroundColor: bgColor,
        padding: "0 4rem 4rem 4rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="Buttons__list"
        style={{
          backgroundColor: bgColor,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {!!list &&
          list.map((item, i) => (
            <Button
              key={`Button-${i}`}
              fgColor={fgColor}
              textColor={textColor}
              link={item.content}
              text={item.title}
            />
          ))}
      </div>
    </div>
  );
};

Buttons.propTypes = {
  data: PropTypes.shape({
    bgColor: PropTypes.string,
    fgColor: PropTypes.string,
    textColor: PropTypes.string,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        content: PropTypes.string,
      })
    ),
  }),
};

export default Buttons;
