import type { Meta, StoryObj } from "@storybook/react";

import { ToastDemo } from "./ToastDemo";

const meta: Meta<typeof ToastDemo> = {
  title: "Components/Toast",
  component: ToastDemo,
  argTypes: {
    toastType: {
      control: "inline-radio",
    },
    variant: {
      control: "inline-radio",
    },
    toggleAction: {
      type: "boolean",
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToastDemo>;

export const Toast: Story = {
  args: {
    toastType: "celesteal",
    variant: "default",
    title: "Example Toast",
    description: "This is an example toast",
    toggleAction: true,
  },
};
