import { getDate, getDay, getMonth, getYear } from "date-fns";

export const DAY_NAMES = Object.freeze([
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]);

export const MONTH_NAMES = Object.freeze([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);

export const dateToHumanReadableStr = (date: Date) =>
  `${DAY_NAMES[getDay(date)]}, ${MONTH_NAMES[getMonth(date)]} ${getDate(
    date
  )}, ${getYear(date)}`;
