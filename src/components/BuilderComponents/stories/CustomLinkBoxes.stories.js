import React from "react";

import CustomLinkBoxes from "../CustomLinkBoxes";
import CustomLinkBox from "../../Atoms/CustomLinkBox";

export default {
  title: "BuilderComponents/CustomLinkBoxes",
  component: CustomLinkBoxes,
  subcomponents: { CustomLinkBox },
  argTypes: {
    bgColor: { control: "color" },
  },
  args: {
    bgColor: "#faf6ee",
    list: [
      {
        content: "#",
        mdContent: "### Test Content",
        fgColor: "#9de2dd",
        textColor: "#264548",
        textAlign: "center",
      },
      {
        content: "#",
        mdContent: "### Test Content",
        fgColor: "#9de2dd",
        textColor: "#264548",
        textAlign: "center",
      },
    ],
  },
};

const Template = args => <CustomLinkBoxes {...args} />;

export const Example = Template.bind({});
Example.args = {
  label: "Example",
};
