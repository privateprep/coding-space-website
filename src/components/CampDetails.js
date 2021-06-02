import React from "react";
import StyledChecks from "./shared/StyledChecks";
import BoxWithLogo from "./shared/BoxWithLogo";

const activities = [
  {
    title: "Project-Based Coding",
    content:
      "​All campers learn to code using the Socratic Method, allowing them to develop a newfound problem-solving stamina.​​ Beginners code in Scratch, a block based programming language created by MIT. Advanced campers code in JavaScript or other text-based programming languages. Campers receive personalized attention and curriculum customization through experienced teachers and a 4:1 camper-to-counselor ratio.",
  },
  {
    title: "Hands-On Activities",
    content:
      "​Campers take a break from their screens and discover the opportunities to create and explore that exist all around them, even in their own living rooms. The possibilities off screen are endless and will include: scavenger hunts, botany, cooking, science experiments, board games, TikTok dance parties, short story writing, and more.",
  },
  {
    title: " Electives",
    content:
      "​There are so many STEM fields to explore. From game design and physics, to coding musical sequences and sounds effects, to animations and pixel art, campers will be exposed to a wide range of fascinating material designed to help them discover and define their passions.",
  },
  {
    title: "Daily Challenges",
    content:
      "​Which house can solve a riddle first? Come up with the best algorithm? Complete a puzzle? The winning house will be awarded points for the day and a chance to win the weekly Coding Space cup!",
  },
];

const dailySchedule = {
  title: "Daily Schedule",
  lines: [
    "First 15 minutes: Camp Kick-Off",
    "Next hour: Project-Based Coding",
    "Next 30 minutes: Hands-On Activity",
    "Next hour: Electives",
    "Last 15 minutes: Daily Challenge & Reflection",
    "Full-day campers will attend two sessions between 9 AM-3:30 PM with a 12-12:30 PM break for lunch. No two sessions are alike, so campers will be engaged in unique experiences all day long.",
  ],
};
const CampDetails = () => {
  return (
    <section className="campDetails">
      <BoxWithLogo content={dailySchedule} />
      <StyledChecks items={activities} />
    </section>
  );
};

export default CampDetails;
