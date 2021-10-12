import React from "react";

import CustomLinkBox from "../CustomLinkBox";

export default {
  title: "Atoms/CustomLinkBox",
  component: CustomLinkBox,
  argTypes: {
    fgColor: { control: "color" },
    textColor: { control: "color" },
  },
  args: {
    fgColor: "#9de2dd",
    textColor: "#264548",
    mdContent: "My **whole** box is _clickable_!",
    content: "#",
    textAlign: "center",
  },
};

const Template = args => <CustomLinkBox {...args} />;

export const Primary = Template.bind({});
