import React from "react";
import PropTypes from "prop-types";
import BlogRoll from "../../components/BlogRoll";
import BgSmallMp4 from "../../assets/bg_small.mp4";
import { ButtonLink, Blurb, Review } from "../../components/Atoms";

export const IndexPageTemplate = ({
  blogRoll,
  differentiators,
  hero,
  mainpitch,
  reviews,
}) => {
  return (
    <div className="homepage">
      <div className="homepage__hero">
        <div className="banner">
          <h1 className="">{hero.heading}</h1>
          <p className="">{hero.subheading}</p>
          <div className="hero__buttons">
            {hero.buttons.list.map((button, index) => (
              <ButtonLink
                {...button}
                fgColor={hero.buttons.fgColor}
                textColor={hero.buttons.textColor}
                key={index}
              />
            ))}
          </div>
        </div>
        <video autoPlay muted loop id="indexVideo" className="bg-video">
          <source src={BgSmallMp4} type="video/mp4" />
        </video>
      </div>
      <div className="homepage__main">
        <section className="main-pitch">
          <div className="content">
            <div className="tile">
              <h1 className="title">{mainpitch.title}</h1>
            </div>
            <div className="tile">
              <h3 className="subtitle">{mainpitch.description}</h3>
            </div>
            {!!mainpitch.buttons &&
              mainpitch.buttons.list.map((button, index) => (
                <ButtonLink
                  {...button}
                  fgColor={mainpitch.buttons.fgColor}
                  textColor={mainpitch.buttons.textColor}
                  key={index}
                />
              ))}
          </div>
        </section>
        <section className="differentiators">
          {differentiators.map((differentiator, index) => (
            <Blurb {...differentiator} key={index} />
          ))}
        </section>
        <section className="features">
          <div className="features__project"></div>
          <div className="features__class"></div>
          <div className="features__blogs">
            <BlogRoll blogRoll={blogRoll} />
          </div>
        </section>
        <section className="testimonials">
          <h1>What Families Are Saying About The Coding Space</h1>
          <div className="testimonials__reviews">
            {reviews.map((review, index) => (
              <Review {...review} key={index} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

IndexPageTemplate.propTypes = {
  hero: PropTypes.shape({
    heading: PropTypes.string,
    subheading: PropTypes.string,
    buttons: PropTypes.object,
  }),
  mainpitch: PropTypes.object,
};
