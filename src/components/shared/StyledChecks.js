import React from "react";

const StyledChecks = ({ items }) => {
  return (
    <div className="styledChecks" style={{ padding: "4rem" }}>
      <ul
        className="styledChecks__list"
        style={{ maxWidth: "1000px", margin: "auto" }}
      >
        {items.map((item, index) => {
          const { title, content } = item;
          return (
            <li key={index} className="item" style={{ listStyle: "none" }}>
              <div className="item__head" style={{ display: "flex" }}>
                <div
                  className="item__head__check"
                  style={{
                    backgroundColor: "#9fe2dd",
                    width: "25px",
                    height: "25px",
                    fontWeight: "bold",
                    borderRadius: "25px",
                    textAlign: "center",
                    padding: "15px",
                    fontSize: "2rem",
                    marginRight: "5px",
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  ✓
                </div>
                <h3
                  className="item__head__title"
                  style={{
                    fontSize: "1.8rem",
                    margin: "0",
                    lineHeight: "2.2rem",
                  }}
                >
                  {title}
                </h3>
              </div>
              <p className="item__content" style={{ padding: "1rem" }}>
                {content}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StyledChecks;
