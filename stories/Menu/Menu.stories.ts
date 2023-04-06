import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

import { disabledRef } from "stories/shared";

import { MenuDemo } from "./MenuDemo";

const meta: Meta<typeof MenuDemo> = {
  title: "Components/Menu",
  component: MenuDemo,
  argTypes: {
    menuAnchor: {
      control: "inline-radio",
      options: ["left", "right"],
    },
    onItemClick: {
      control: "disabled",
      table: { disable: true },
    },
    ...disabledRef,
  },
};

export default meta;
type Story = StoryObj<typeof MenuDemo>;

export const Menu: Story = {
  args: {
    disabled: false,
    menuAnchor: "left",
    onItemClick: (label) => action("onItemClick")(label),
  },
};
