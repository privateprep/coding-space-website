import React from "react";

import Reviews from "../Reviews";
import Review from "../../Atoms/Review";

export default {
  title: "BuilderComponents/Reviews",
  component: Reviews,
  subcomponents: { Review },
  argTypes: {
    textColor: { control: "color" },
    fgColor: { control: "color" },
    bgColor: { control: "color" },
  },
  args: {
    bgColor: "#faf6ee",
    fgColor: "#ffffff",
    textColor: "#9de2dd",
    list: [
      {
        title:
          "Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that.",
        content: "Martin Luther King Jr.",
      },
      {
        title:
          "Life is to be lived, not controlled; and humanity is won by continuing to play in face of certain defeat.",
        content: "Ralph Ellison, Invisible Man",
      },
    ],
  },
};

const Template = args => <Reviews {...args} />;

export const Example = Template.bind({});
Example.args = {
  label: "Example",
};
