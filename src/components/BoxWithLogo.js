import React from "react";
import remark from "remark";
import remarkHTML from "remark-html";
import smallLogo from "../img/logo-small.svg";

const toHTML = (value) =>
  remark().use(remarkHTML).processSync(value).toString();
function createMarkup(value) {
  return { __html: toHTML(value) };
}
const BoxWithLogo = ({ data }) => {
  const { title, content } = data;

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
        src={smallLogo}
        alt="Rocket Ship Logo"
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
        <div
          className="item__content"
          style={{
            padding: "1rem",
            color: "white",
            fontSize: "18px",
            margin: "0px",
            padding: "0 0 20px",
          }}
          dangerouslySetInnerHTML={createMarkup(content)}
        ></div>
      </div>
    </div>
  );
};

export default BoxWithLogo;
