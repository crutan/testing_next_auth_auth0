import type { Meta, StoryObj } from "@storybook/react";
import { Badge as BadgeComponent } from "ui/Badge";

const meta: Meta<typeof BadgeComponent> = {
  title: "Components/Badge",
  component: BadgeComponent,
  argTypes: {
    size: {
      control: "inline-radio",
    },
    color: {
      control: "select",
      options: [
        "onyx",
        "celesteal",
        "melon",
        "error",
        "warning",
        "success",
        "info",
      ],
    },
    iconFormat: {
      control: "inline-radio",
    },
    iconPosition: {
      control: "inline-radio",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BadgeComponent>;

export const Badge: Story = {
  args: {
    children: "Badge",
    size: "large",
    color: "onyx",
    iconFormat: "solid",
    iconPosition: "leading",
  },
};
