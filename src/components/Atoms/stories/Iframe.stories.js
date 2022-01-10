import React from "react";

import Iframe from "../Iframe";

export default {
  title: "BuilderComponents/Iframe",
  component: Iframe,
  argTypes: {
    bgColor: { control: "color" },
  },
  args: {
    bgColor: "#faf6ee",
    content:
      "https://www.openstreetmap.org/export/embed.html?bbox=-86.31421566009521%2C32.37072817408418%2C-86.3112571835518%2C32.37363010224323&amp;layer=mapnik&amp;marker=32.37217914981055%2C-86.3127364218235",
    size: {
      height: 300,
      width: 500,
    },
    title: "Iframe map of National Memorial for Peace and Justice",
  },
};

const Template = (args) => <Iframe {...args} />;

export const Map = Template.bind({});
Map.args = {
  label: "Map Iframe",
};

export const CodeProject = Template.bind({});
CodeProject.args = {
  label: "Code Project",
  content: "https://scratch.mit.edu/projects/510001177/embed",
  title: "Iframe of kids code project",
  size: {
    height: 500,
    width: 800,
  },
};
