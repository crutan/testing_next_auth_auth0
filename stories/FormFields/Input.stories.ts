import type { Meta, StoryObj } from "@storybook/react";

import { disabledRef } from "stories/shared";

import { InputDemo } from "./InputDemo";

const meta: Meta<typeof InputDemo> = {
  title: "Components/Form Fields/Input",
  component: InputDemo,
  argTypes: {
    status: {
      control: "inline-radio",
    },
    iconFormat: {
      control: "inline-radio",
    },
    iconPlacement: {
      control: "inline-radio",
    },
    ...disabledRef,
  },
};

export default meta;
type Story = StoryObj<typeof InputDemo>;

export const Input: Story = {
  args: {
    icon: "ExclamationCircleIcon",
    iconFormat: "solid",
    iconPlacement: "right",
    status: "normal",
    label: "Label",
    helpText: "Help text",
    required: false,
    disabled: false,
  },
};
