import type { Meta, StoryObj } from "@storybook/react";

import { HeadingDemo } from "./HeadingDemo";

const meta: Meta<typeof HeadingDemo> = {
  title: "Components/Text/Heading",
  component: HeadingDemo,
  argTypes: {
    size: {
      control: "inline-radio",
    },
    as: {
      control: "inline-radio",
    },
    weight: {
      control: "inline-radio",
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeadingDemo>;

export const Heading: Story = {
  args: {
    size: "h1",
    as: "h1",
    weight: "bold",
    children: "",
  },
};
