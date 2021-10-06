import React from "react";

import Reviews from "../Reviews";

export default {
  title: "BuilderComponents/Reviews",
  component: Reviews,
  argTypes: {
    fgColor: { control: "color" },
    bgColor: { control: "color" },
    textColor: { control: "color" },
  },
  args: {
    bgColor: "#faf6ee",
    fgColor: "#9de2dd",
    list: [
      { title: "Check 1", content: "mic..." },
      { title: "Check 2", content: "mic..." },
    ],
  },
};

const Template = args => <Reviews {...args} />;

export const Example = Template.bind({});
Example.args = {
  label: "Example",
};
