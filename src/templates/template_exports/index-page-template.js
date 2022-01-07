import React from "react";
import PropTypes from "prop-types";
import BlogRoll from "../../components/BlogRoll";
import BgSmallMp4 from "../../assets/bg_small.mp4";
import { ButtonLink } from "../../components/Atoms";

export const IndexPageTemplate = ({
  blogRoll,
  differentiators,
  hero,
  mainpitch,
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
            <div>{differentiator.title}</div>
          ))}
        </section>
        <section className="features">
          <div className="features__project"></div>
          <div className="features__class"></div>
          <div className="features__blogs">
            <BlogRoll blogRoll={blogRoll} />
          </div>
        </section>
        <section className="testimonials"></section>
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
