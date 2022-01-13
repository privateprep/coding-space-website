import React from "react";
import PropTypes from "prop-types";
import { Blurb } from "../../components/Atoms";


import "../styles/our-team-page.scss";

export const OurTeamPageTemplate = ({ title, description, team }) => {
  return (
    <div className="our-team-page">
      <section className="our-team-page__title">
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
      <section className="team">
        {team.map((member, index) => (
          <Blurb {...member} key={index} />
        ))}
      </section>
    </div>
  );
};


OurTeamPageTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  team: PropTypes.array,
};
