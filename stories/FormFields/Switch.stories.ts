import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

import { SwitchDemo } from "./SwitchDemo";

const meta: Meta<typeof SwitchDemo> = {
  title: "Components/Form Fields/Switch",
  component: SwitchDemo,
  argTypes: {
    childrenPosition: {
      control: "inline-radio",
    },
    size: {
      control: "inline-radio",
    },
    onChange: {
      control: "disabled",
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SwitchDemo>;

export const Switch: Story = {
  args: {
    children: "Chaos",
    childrenPosition: "right",
    size: "standard",
    withIcons: false,
    defaultChecked: false,
    disabled: false,
    // Convert boolean to string for readability
    //  When passing the boolean as-is, Storybook shows true as true but false as { name: "onIsCheckedChange", args: false }
    onChange: (e) => action("onChange")(String(e.target.checked)),
  },
};
