import React from "react";

import BlogPreview from "../BlogPreview";

export default {
  title: "Atoms/BlogPreview",
  component: BlogPreview,
  args: {
    id: "1",
    excerpt:
      "From schools moving to remote or hybrid learning environments to families losing jobs and income as a result of the COVID-19 pandemic, 2020 has been a year full of challenges. Here at The Coding Space, we are committed to offering support to families and students in need through our scholarship program. With the season of giving just around the corner, we wanted to take a moment and highlight how",
    frontmatter: {
      date: "2050-12-15T15:46:17.545Z",
      featuredImage: "/img/coder.jpg",
      featuredPost: false,
      tags: ["coding", "programming", "learning"],
      title: "Blog Post Title",
    },
    fields: {
      slug: "#",
    },
  },
};

const Template = args => <BlogPreview {...args} />;

export const Standard = Template.bind({});
