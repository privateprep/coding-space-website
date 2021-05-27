import React from "react";
import logoSmall from "../../img/logo-small.svg";

const BoxWithLogo = ({ content }) => {
  const { title, lines } = content;
  return (
    <div
      className="BoxWithLogo"
      style={{
        padding: "4rem",
        paddingTop: "80px",
        textAlign: "center",
        position: "relative",
        backgroundColor: "#FBF6EE",
      }}
    >
      <img
        src={logoSmall}
        alt="The Coding Space Logo"
        style={{
          width: "85px",
          height: "85px",
          position: "absolute",
          left: "0",
          right: "0",
          margin: "0 auto",
          top: "30px",
        }}
      />
      <div
        className="BoxWithLogo__content"
        style={{
          backgroundColor: "#274548",
          padding: "2rem",
          textAlign: "left",
          borderRadius: "8px",
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        <h3
          className="item__head__title"
          style={{
            fontSize: "1.8rem",
            margin: "0",
            marginBottom: "1rem",
            lineHeight: "2.2rem",
            color: "white",
          }}
        >
          {title}
        </h3>
        <ul className="BoxWithLogo__list">
          {lines.map((line, index) => {
            return (
              <p
                key={index}
                className="item__content"
                style={{
                  color: "white",
                  fontSize: "18px",
                  margin: "0px",
                  padding: "0 0 20px",
                }}
              >
                {line}
              </p>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default BoxWithLogo;
