import React, { ChangeEvent, ComponentPropsWithoutRef } from "react";

import Radio from "./Radio";

export interface RadioGroupVariant {
  legend?: React.ReactNode;
  groupName: string;
  children: React.ReactElement<typeof Radio>[];
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export type RadioGroupProps = Omit<
  ComponentPropsWithoutRef<"fieldset">,
  "children" | "onChange"
> &
  RadioGroupVariant;
