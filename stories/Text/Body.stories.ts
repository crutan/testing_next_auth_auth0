import type { Meta, StoryObj } from "@storybook/react";

import { BodyDemo } from "./BodyDemo";

const meta: Meta<typeof BodyDemo> = {
  title: "Components/Text/Body",
  component: BodyDemo,
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
type Story = StoryObj<typeof BodyDemo>;

export const Body: Story = {
  args: {
    size: "base",
    as: "p",
    weight: "book",
    children: "",
  },
};
