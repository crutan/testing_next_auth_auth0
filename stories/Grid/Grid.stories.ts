import type { Meta, StoryObj } from "@storybook/react";

import { GridDemo } from "./GridDemo";

const meta: Meta<typeof GridDemo> = {
  title: "Components/Grid",
  component: GridDemo,
  argTypes: {
    size: {
      control: "select",
    },
    breakpoints: {
      control: "select",
    },
    as: {
      control: "select",
    },
    columns: {
      control: "select",
    },
    gap: {
      control: "select",
    },
  },
};

export default meta;
type Story = StoryObj<typeof GridDemo>;

export const Grid: Story = {
  args: {
    size: "fullBleed",
    as: "section",
    breakpoints: "standard",
    columns: 8,
    gap: "minimal",
  },
};
