import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

import { disabledControl } from "stories/shared";

import { ModalDemo } from "./ModalDemo";

const meta: Meta<typeof ModalDemo> = {
  title: "Components/Modal",
  component: ModalDemo,
  argTypes: {
    type: {
      control: "inline-radio",
    },
    primaryButtonProps: disabledControl,
    secondaryButtonProps: disabledControl,
    onClose: disabledControl,
    refocusRef: disabledControl,
  },
};

export default meta;
type Story = StoryObj<typeof ModalDemo>;

export const Modal: Story = {
  args: {
    type: "success",
    showIcon: true,
    heading: "You're eligible!",
    subHeading: "Onboarding",
    children:
      "You can start your free trial and enjoy the benefits once you add your payment info.",
    primaryButtonText: "Add Payment Info",
    primaryButtonProps: {
      onClick: (e) => action("primaryButton.onClick")(e),
    },
    secondaryButtonText: "Cancel",
    secondaryButtonProps: {
      onClick: (e) => action("secondaryButton.onClick")(e),
    },
    onClose: (trigger) => action("onClose")(trigger),
  },
};
