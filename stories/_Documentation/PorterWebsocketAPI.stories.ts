import { Meta, StoryObj } from "@storybook/react";

import { disabledControl } from "stories/shared";

import { DocumentationDemo } from "./_DocumentationDemo";

const meta: Meta<typeof DocumentationDemo> = {
  title: "Documentation/Porter Websocket API",
  component: DocumentationDemo,
  argTypes: {
    folderName: disabledControl,
  },
  parameters: {
    options: { showPanel: false },
    controls: {
      hideNoControlsWarning: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof DocumentationDemo>;

export const PorterWebsocketAPI: Story = {
  args: {
    folderName: "PorterWebsocketAPI",
  },
};
