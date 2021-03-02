import React from "react";
import createHtml from "../MdToHtml";
import smallLogo from "../../img/logo-small.svg";

const BoxWithLogo = ({ data }) => {
  const {
    bgColor = "#faf7f2",
    fgColor = "#274548",
    textColor = "#fff",
    heading,
    mdContent,
  } = data;
  const htmlContent = createHtml(mdContent);

  return (
    <div
      className="BoxWithLogo component"
      style={{
        padding: "4rem",
        paddingTop: "80px",
        textAlign: "center",
        position: "relative",
        backgroundColor: bgColor,
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
          backgroundColor: fgColor ,
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
            color: textColor,
          }}
        >
          {heading}
        </h3>
        <div
          className="item__content"
          style={{
            padding: "0 0 20px",
            color: textColor,
            fontSize: "18px",
            margin: "0px",
          }}
          dangerouslySetInnerHTML={htmlContent}
        ></div>
      </div>
    </div>
  );
};

export default BoxWithLogo;
