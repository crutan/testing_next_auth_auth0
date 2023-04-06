import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { formatISO } from "date-fns";

import { disabledControl, disabledRef } from "stories/shared";

import { interactionTasks } from "./Calendar.tasks";
import { CalendarDemo } from "./CalendarDemo";

const meta: Meta<typeof CalendarDemo> = {
  title: "Components/Calendar",
  component: CalendarDemo,
  argTypes: {
    minDate: {
      control: "text",
    },
    maxDate: {
      control: "text",
    },
    defaultFocusedDate: {
      control: "text",
    },
    defaultSelectedDate: {
      control: "text",
    },
    onFocusedDateChange: disabledControl,
    onSelectedDateChange: disabledControl,
    ...disabledRef,
  },
};

export default meta;
type Story = StoryObj<typeof CalendarDemo>;

const DEMO_DATE_STR_FORMAT = "yyyy-MM-dd";
export const Calendar: Story = {
  args: {
    "aria-label": "Sample Calendar",
    disabled: false,
    isReadOnly: false,
    minDate: DEMO_DATE_STR_FORMAT,
    maxDate: DEMO_DATE_STR_FORMAT,
    defaultFocusedDate: DEMO_DATE_STR_FORMAT,
    defaultSelectedDate: DEMO_DATE_STR_FORMAT,
    onFocusedDateChange: (focusedDate) =>
      action("onFocusedDateChange")(
        formatISO(focusedDate, { representation: "date" })
      ),
    onSelectedDateChange: (selectedDate) =>
      action("onSelectedDateChange")(
        formatISO(selectedDate, { representation: "date" })
      ),
  },
  parameters: {
    performance: {
      interactions: interactionTasks,
    },
  },
};
