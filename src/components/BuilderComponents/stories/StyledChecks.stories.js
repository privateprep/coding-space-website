import React from "react";

import StyledChecks from "../StyledChecks";

export default {
  title: "BuilderComponents/StyledChecks",
  component: StyledChecks,
  argTypes: {
    fgColor: { control: "color" },
    bgColor: { control: "color" },
    textColor: { control: "color" },
  },
  args: {
    bgColor: "#faf6ee",
    fgColor: "#9de2dd",
    textColor: "#264548",
    mediaPosition: "column",
    list: [
      { title: "Check 1", content: "mic..." },
      { title: "Check 2", content: "mic..." },
      { title: "Check 3", content: "mic..." },
    ],
  },
};

const Template = args => <StyledChecks {...args} />;

export const Example = Template.bind({});
Example.args = {
  label: "Example",
};
