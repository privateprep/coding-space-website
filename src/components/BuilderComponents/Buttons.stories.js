import React from "react";

import Buttons from "./Buttons";

export default {
  title: "BuilderComponents/Buttons",
  component: Buttons,
  argTypes: {
    fgColor: { control: "color" },
    bgColor: { control: "color" },
    textColor: { control: "color" },
  },
  args: {
    bgColor: "#faf6ee",
    fgColor: "#9de2dd",
    textColor: "#264548",
    list: [
      { title: "Link 1", content: "#" },
      { title: "Link 2", content: "#" },
      { title: "Link 3", content: "#" },
    ],
  },
};

const Template = args => <Buttons {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  label: "Standard",
};
