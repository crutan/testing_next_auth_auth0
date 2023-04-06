import { getAllByTestId, getByTestId, waitFor } from "@testing-library/react";
import {
  InteractionTaskArgs,
  PublicInteractionTask,
} from "storybook-addon-performance";

import { runInteractionTaskOnEachCopy } from "stories/shared";

const makeChangeMonthRunFn =
  (direction: "Next" | "Previous", runTimes: number) =>
  async ({ container }: InteractionTaskArgs) =>
    runInteractionTaskOnEachCopy(container, async (element) => {
      for (let i = 0; i < runTimes; i++) {
        const initialMonth = getByTestId(element, "CalendarHeader").innerText;
        getByTestId(element, `CalendarHeader${direction}IconButton`).click();
        await waitFor(() => {
          if (getByTestId(element, "CalendarHeader").innerText === initialMonth)
            throw Error(`headerInnerText === initialMonth === ${initialMonth}`);
        });
      }
    });

export const interactionTasks: PublicInteractionTask[] = [
  {
    name: "x12 - Go to next month",
    description:
      "Click the next button and wait for the next month to load, 12 times",
    run: makeChangeMonthRunFn("Next", 12),
  },
  {
    name: "x12 - Go to previous month",
    description:
      "Click the previous button and wait for the previous month to load, 12 times",
    run: makeChangeMonthRunFn("Previous", 12),
  },
  {
    name: "Navigate with keyboard",
    description: "Fires keydown events on document.activeElement",
    run: async ({ container }: InteractionTaskArgs) =>
      runInteractionTaskOnEachCopy(container, async (element) => {
        const fireKeyDownOnFocusedElem = async (
          key: string,
          shiftKey?: boolean
        ) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          document.activeElement!.dispatchEvent(
            new KeyboardEvent("keydown", {
              bubbles: true,
              cancelable: true,
              key,
              shiftKey,
            })
          );
          await new Promise((resolve) => setTimeout(resolve));
        };

        const focusableCell = (
          getAllByTestId(element, "CalendarCellButton") as HTMLButtonElement[]
        ).find((cellBtn) => cellBtn.tabIndex === 0);
        focusableCell?.focus();

        await fireKeyDownOnFocusedElem("ArrowUp");
        await fireKeyDownOnFocusedElem("ArrowRight");
        await fireKeyDownOnFocusedElem("ArrowDown");
        await fireKeyDownOnFocusedElem("ArrowDown");
        await fireKeyDownOnFocusedElem("ArrowLeft");

        await fireKeyDownOnFocusedElem("Home");
        await fireKeyDownOnFocusedElem("End");

        await fireKeyDownOnFocusedElem("PageUp");
        await fireKeyDownOnFocusedElem("PageUp");
        await fireKeyDownOnFocusedElem("PageDown");

        await fireKeyDownOnFocusedElem("PageUp", true);
        await fireKeyDownOnFocusedElem("PageUp", true);
        await fireKeyDownOnFocusedElem("PageDown", true);
      }),
  },
];
