import React from "react";

import { ButtonLink } from "../ButtonLink";

export default {
  title: "Atoms/ButtonLink",
  component: ButtonLink,
  argTypes: {
    fgColor: { control: "color" },
    textColor: { control: "color" },
  },
  args: {
    fgColor: "#9de2dd",
    textColor: "#264548",
    title: "Click Me!",
    content: "#",
    key: "1",
  },
};

const Template = args => <ButtonLink {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "ButtonLink",
};
