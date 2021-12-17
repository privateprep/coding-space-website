import React from "react";

import Banner from "../Banner";

export default {
  title: "Atoms/Banner",
  component: Banner,
  args: {
    removalDate: "2050-12-15T15:46:17.545Z",
    mdContent: "Come try out our class starting December 6th! [Click here](#)",
  },
};

const Template = args => <Banner {...args} />;

export const Primary = Template.bind({});
