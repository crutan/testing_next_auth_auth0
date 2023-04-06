import React from "react";

import { RadioGroupProps } from "./RadioGroup.types";

type RadioGroupContext = Pick<RadioGroupProps, "disabled" | "groupName">;

export const RadioContext = React.createContext<RadioGroupContext | undefined>(
  undefined
);
