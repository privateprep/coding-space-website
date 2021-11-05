import React from "react";

import SideBySide from "../SideBySide";
import StyledChecks from "../StyledChecks";
import BoxWithLogo from "../BoxWithLogo";

export default {
  title: "BuilderComponents/SideBySide",
  component: SideBySide,
  subcomponents: { StyledChecks, BoxWithLogo },
  argTypes: {
    bgColor: { control: "color" },
  },
  args: {
    bgColor: "#faf6ee",
    leftComponent: [
      {
        type: "boxWithLogo",
        textAlign: "left",
        bgColor: "transparent",
        textColor: "#faf6ee",
        mdContent: "**Rich** text can be found _here_.",
      },
    ],
    rightComponent: [
      {
        type: "styledChecks",
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
    ],
  },
};

const Template = args => <SideBySide {...args} />;

export const Example = Template.bind({});
Example.args = {
  label: "Example",
};
