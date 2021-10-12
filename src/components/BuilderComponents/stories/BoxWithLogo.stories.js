import React from "react";

import BoxWithLogo from "../BoxWithLogo";

export default {
  title: "BuilderComponents/BoxWithLogo",
  component: BoxWithLogo,
  argTypes: {
    fgColor: { control: "color" },
    bgColor: { control: "color" },
    textColor: { control: "color" },
  },
  args: {
    bgColor: "#faf6ee",
    fgColor: "#9de2dd",
    textColor: "#264548",
    heading: "Hello!",
    mdContent: "### Rich MD Text"
  },
};

const Template = args => <BoxWithLogo {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  label: "Standard",
};
