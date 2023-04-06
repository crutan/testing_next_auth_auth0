import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

import { CheckboxDemo } from "./CheckboxDemo";

const meta: Meta<typeof CheckboxDemo> = {
  title: "Components/Form Fields/Checkbox",
  component: CheckboxDemo,
  argTypes: {
    childrenPosition: {
      control: "inline-radio",
    },
    onChange: {
      control: "disabled",
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxDemo>;

export const Checkbox: Story = {
  args: {
    children: "Remember me",
    childrenPosition: "right",
    defaultChecked: false,
    disabled: false,
    // Convert boolean to string for readability
    //  When passing the boolean as-is, Storybook shows true as true but false as { name: "onIsCheckedChange", args: false }
    onChange: (e) => action("onChange")(String(e.target.checked)),
  },
};
