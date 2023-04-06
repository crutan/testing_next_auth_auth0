import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

import { disabledControl } from "stories/shared";

import { CalloutDemo } from "./CalloutDemo";

const meta: Meta<typeof CalloutDemo> = {
  title: "Components/Callout",
  component: CalloutDemo,
  argTypes: {
    variant: {
      control: "inline-radio",
    },
    size: { control: "inline-radio" },
    action: disabledControl,
    dismissLabel: { control: "text", if: { arg: "dismissible" } },
  },
};

export default meta;
type Story = StoryObj<typeof CalloutDemo>;

export const Callout: Story = {
  args: {
    variant: "info",
    size: "normal",
    header: "Attention Needed",
    copy: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam quo totam eius aperiam dolorum.",
    action: action("action clicked"),
    actionLabel: "Action",
    dismissible: true,
    dismissLabel: "Dismiss",
    linkLabel: "Link",
    linkUrl: "https://www.google.com",
  },
};
