import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

import { RadioGroupDemo } from "./RadioGroupDemo";

const meta: Meta<typeof RadioGroupDemo> = {
  title: "Components/Form Fields/RadioGroup",
  component: RadioGroupDemo,
  argTypes: {
    onChange: {
      control: "disabled",
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroupDemo>;

export const RadioGroup: Story = {
  args: {
    children: ["Vanilla", "Chocolate", "Strawberry", "Chocolate Chip"],
    groupName: "favIceCreamFlavor",
    legend: "Favorite Ice Cream Flavor",
    defaultCheckedIndex: undefined,
    groupDisabled: false,
    individuallyDisabledIndex: 3,
    onChange: (e) => action("onChange")(e.target.value),
  },
};
