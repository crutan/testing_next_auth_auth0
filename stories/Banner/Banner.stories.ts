import type { Meta, StoryObj } from "@storybook/react";

import { BannerDemo } from "./BannerDemo";

const meta: Meta<typeof BannerDemo> = {
  title: "Components/Banner",
  component: BannerDemo,
};

export default meta;
type Story = StoryObj<typeof BannerDemo>;

export const Banner: Story = {
  args: {
    variant: "info",
    bannerId: 1,
    linkLabel: "Link",
    linkUrl: "https://www.google.com",
    fixed: false,
    initValue: true,
    children:
      "Mollit ipsum enim reprehenderit ullamco fugiat cupidatat occaecat dolor Labore occaecat excepteur dolor enim cillum Lorem id sit irure. Doloranim enim culpa deserunt voluptate ipsum nisi occaecat.Mollit ipsum enim reprehenderit ullamco fugiat cupidatat occaecat dolor. Labore occaeca excepteur dolor enim cillum Lorem id sit irure. Dolor anim enim culpa deserunt voluptate ipsum nisi occaecat.",
  },
};
