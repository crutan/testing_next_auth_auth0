import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

import { disabledControl, disabledRef } from "stories/shared";

import { SelectDemo } from "./SelectDemo";

const meta: Meta<typeof SelectDemo> = {
  title: "Components/Form Fields/Select",
  component: SelectDemo,
  argTypes: {
    onChange: {
      control: "disabled",
      table: { disable: true },
    },
    dropDownContainerStyles: disabledControl,
    ...disabledRef,
  },
};

export default meta;
type Story = StoryObj<typeof SelectDemo>;

export const Select: Story = {
  args: {
    label: "City",
    required: false,
    disabled: false,
    multiSelect: true,
    onChange: (optionsSelected) =>
      action("onChange")(Array.from(optionsSelected).sort()),
  },
};
