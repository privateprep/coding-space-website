import React from "react";

import { Review } from "../Review";

export default {
  title: "Atoms/Review",
  component: Review,
  argTypes: {
    textColor: { control: "color" },
    fgColor: { control: "color" },
  },
  args: {
    fgColor: "#faf6ee",
    title: "This is the coolest!",
    content: "Alejandro",
  },
};

const Template = args => <Review {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "Review",
};

export const GreenQuote = Template.bind({});
GreenQuote.args = {
  textColor: "#264548",
};
