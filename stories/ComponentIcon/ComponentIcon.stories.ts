import type { Meta, StoryObj } from "@storybook/react";

import { disabledRef } from "stories/shared";

import { ComponentIconDemo } from "./ComponentIconDemo";

const meta: Meta<typeof ComponentIconDemo> = {
  title: "Components/ComponentIcon",
  component: ComponentIconDemo,
  argTypes: {
    format: {
      control: "inline-radio",
    },
    size: {
      control: "select",
      options: ["xsmall", "small", "base", "large", "xlarge"],
    },
    className: {
      control: "disabled",
      table: { disable: true },
    },
    ...disabledRef,
  },
};

export default meta;
type Story = StoryObj<typeof ComponentIconDemo>;

export const ComponentIcon: Story = {
  args: {
    icon: "DotIcon",
    format: "solid",
    size: "xlarge",
    className: "text-onyx-0",
  },
};
