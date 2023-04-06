import { Meta, StoryObj } from "@storybook/react";

import { ColorsDemo } from "./ColorsDemo";

const meta: Meta<typeof ColorsDemo> = {
  title: "Design System/Colors",
  component: ColorsDemo,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof ColorsDemo>;

export const Colors: Story = {
  args: {},
};
