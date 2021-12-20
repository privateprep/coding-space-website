import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Features from "../../components/Features";
import BlogRoll from "../../components/BlogRoll";
import BgSmallMp4 from "../../assets/bg_small.mp4";

export const IndexPageTemplate = ({ hero, mainpitch, intro }) => (
  <div>
    <div className="index-container">
      <div className="banner">
        <h1 className="">{hero.heading}</h1>
        <p className="">{hero.subheading}</p>
        <div className="banner__buttons">
          <a className="classes" href="https://classes.thecodingspace.com">
            Join a Class
          </a>
          <a className="classes" href="https://classes.thecodingspace.com">
            Winter Break Mini Camps
          </a>
        </div>
      </div>
      <video autoPlay muted loop id="indexVideo" className="bg-video">
        <source src={BgSmallMp4} type="video/mp4" />
      </video>
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="content">
                  <div className="tile">
                    <h1 className="title">{mainpitch.title}</h1>
                  </div>
                  <div className="tile">
                    <h3 className="subtitle">{mainpitch.description}</h3>
                  </div>
                </div>
                <Features gridItems={intro.blurbs} />
                <div className="column is-12">
                  <h3 className="has-text-weight-semibold is-size-2">
                    Latest stories
                  </h3>
                  <BlogRoll />
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/blog">
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

IndexPageTemplate.propTypes = {
  hero: PropTypes.shape({
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    heading: PropTypes.string,
    subheading: PropTypes.string,
  }),
  mainpitch: PropTypes.object,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
};
