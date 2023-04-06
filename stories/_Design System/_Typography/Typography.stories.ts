import { Meta, StoryObj } from "@storybook/react";

import { TypographyDemo } from "./TypographyDemo";

const meta: Meta<typeof TypographyDemo> = {
  title: "Design System/Typography",
  component: TypographyDemo,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof TypographyDemo>;

export const Typography: Story = {
  args: {},
};
