import React from "react";

const HowToDocs = () => {
  return (
    <div>
      <h1>Tips on creating docs for individual stories</h1>
      <p>Be careful where your backticks go!</p>
      <p>See examples below</p>
    </div>
  );
};

export default {
  title: "Example/HowToDocs",
  component: HowToDocs,
};

const Template = args => <HowToDocs {...args} />;


export const Example = Template.bind({});

export const CompiledHTML = Template.bind({});
CompiledHTML.parameters = {
  docs: {
    storyDescription: `<div>
        <h4>Testing header</h4>
        <p>Ensure that the backtick and opening tag are on the same line</p>
        <p>Note that <em>code tag</em> does not work here</p>
      </div>
      `,
  },
};

export const CodeBlock = Template.bind({});
CodeBlock.parameters = {
  docs: {
    storyDescription: `
      <div>
        <h4>Testing header</h4>
        <p>Ensure that the backtick and opening tag are on the same line</p>
        <p>Note that <em>code tag</em> does not work here</p>
      </div>
      `,
  },
};

export const OneLiner = Template.bind({});
 OneLiner.parameters = {
   docs: {
     storyDescription: "One 'line' that _is_ compatible with **markdown** and can `display_code`.",
   },
 };
