import React from "react";

import { Review } from "../Review";

export default {
  title: "Atoms/Review",
  component: Review,
  argTypes: {
    quoteColor: { control: "color" },
    reviewColor: { control: "color" },
  },
  args: {
    reviewColor: "#faf6ee",
    review: "This is the coolest!",
    name: "Alejandro",
  },
};

const Template = args => <Review {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "Review",
};

export const GreenQuote = Template.bind({});
GreenQuote.args = {
  quoteColor: "#264548",
};
