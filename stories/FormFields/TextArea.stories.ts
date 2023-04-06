import type { Meta, StoryObj } from "@storybook/react";
import { TextArea as TextAreaComponent } from "ui/FormFields";

import { disabledRef } from "stories/shared";

const meta: Meta<typeof TextAreaComponent> = {
  title: "Components/Form Fields/TextArea",
  component: TextAreaComponent,
  argTypes: {
    status: {
      control: "inline-radio",
    },
    textAreaWrapperStyles: {
      control: "disabled",
      table: { disable: true },
    },
    wrapperStyles: {
      control: "disabled",
      table: { disable: true },
    },
    ...disabledRef,
  },
};

export default meta;
type Story = StoryObj<typeof TextAreaComponent>;

export const TextArea: Story = {
  args: {
    status: "normal",
    label: "Label",
    helpText: "Help Text",
    required: false,
    disabled: false,
    placeholder: "Placeholder",
  },
};
