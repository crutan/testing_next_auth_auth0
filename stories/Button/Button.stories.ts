import type { Meta, StoryObj } from "@storybook/react";

import { disabledRef } from "stories/shared";

import { ButtonDemo } from "./ButtonDemo";

const meta: Meta<typeof ButtonDemo> = {
  title: "Components/Button",
  component: ButtonDemo,
  argTypes: {
    theme: {
      control: "inline-radio",
    },
    size: {
      control: "inline-radio",
      options: ["xsmall", "small", "base", "large", "xlarge"],
    },
    iconFormat: {
      control: "inline-radio",
    },
    iconPosition: {
      control: "inline-radio",
    },
    ...disabledRef,
  },
};

export default meta;
type Story = StoryObj<typeof ButtonDemo>;

export const Button: Story = {
  args: {
    size: "base",
    theme: "primary",
    icon: undefined,
    iconFormat: "solid",
    iconPosition: "leading",
    children: "Button",
    disabled: false,
  },
};
