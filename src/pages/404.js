import React, { useEffect, createRef } from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import "./404.scss";
import rocket from "../img/rocket.png";

const NotFoundPage = () => {
  const starContainer = createRef();
  useEffect(() => {
    for (let i = 0; i < 100; i++) {
      starContainer.current.innerHTML += `<div class="star"></div>`;
    }
  });

  return (
    <Layout>
      <div className="not-found-page">
        <div className="text">
          <h1 className="text__title">NOT FOUND</h1>
          <p>
            Oh no! You landed on a page that does not exist or has moved to a
            new place.
          </p>
          <p>
            To find a class, check out our{" "}
            <Link to={`/classes`}>class catalog</Link> or{" "}
            <Link to={`/locations`}>locations</Link>!
          </p>
          <p>
            If you'd prefer, you can always{" "}
            <a href="/contact-us">contact our team</a> to speak to a human.
          </p>
        </div>
        <div className="window_group">
          <div className="window_404">
            <div className="rocket" src={rocket}>
              <img src={rocket} alt="The Coding Space Rocket Ship" />
            </div>
            <div className="stars" ref={starContainer}></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
