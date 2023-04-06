import { ArgTypes } from "@storybook/react";

export const disabledControl = {
  control: "disabled",
  table: { disable: true },
};

export const disabledRef: Partial<ArgTypes> = {
  ref: {
    control: "disabled",
    table: { disable: true },
  },
};

export const runInteractionTaskOnEachCopy = async (
  container: HTMLElement,
  task: (element: HTMLElement) => Promise<void>
) => {
  if (container.children.length > 0) {
    for (let i = 0; i < container.children.length; i++) {
      await task(container.children[i] as HTMLElement);
    }
  } else {
    await task(container);
  }
};
