import React from "react";

import Accordion from "../Accordion";
import AccordionItem from "../../Atoms/AccordionItem";

export default {
  title: "BuilderComponents/Accordion",
  component: Accordion,
  subcomponents: { AccordionItem },
  argTypes: {
    textColor: { control: "color" },
    fgColor: { control: "color" },
    bgColor: { control: "color" },
  },
  args: {
    bgColor: "#faf6ee",
    fgColor: "#ffffff",
    heading: "FAQ",
    textColor: "#264548",
    list: [
      {
        activeItem: true,
        index: 0,
        mdContent:
          "Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that.",
        title: "Martin Luther King Jr.",
      },
      {
        activeItem: false,
        index: 1,
        mdContent:
          "Life is to be lived, not controlled; and humanity is won by continuing to play in face of certain defeat.",
        title: "Ralph Ellison, Invisible Man",
      },
    ],
  },
};

const Template = args => <Accordion {...args} />;

export const Example = Template.bind({});
Example.args = {
  label: "Example",
};
