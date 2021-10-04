import React from "react";

import CustomLinkBox from "../CustomLinkBox";

export default {
  title: "Atoms/CustomLinkBox",
  component: CustomLinkBox,
  argTypes: {
    boxColor: { control: "color" },
    textColor: { control: "color" },
  },
  args: {
    boxColor: "#9de2dd",
    textColor: "#264548",
    mdContent: "My **whole** box is _clickable_!",
    link: "#",
    textAlign: "center",
  },
};

const Template = args => <CustomLinkBox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "CustomLinkBox",
};
