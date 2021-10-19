import React from "react";

import { AccordionItem } from "../AccordionItem";

export default {
  title: "Atoms/AccordionItem",
  component: AccordionItem,
  args: {
    ariaExpanded: true,
    displayContent: true,
    index: 1,
    mdContent: "This **content** gets revealed __after__ the title is clicked!",
    onClick,
    title: "Click to reveal",
  },
};

const Template = args => <AccordionItem {...args} />;

export const Primary = Template.bind({});
