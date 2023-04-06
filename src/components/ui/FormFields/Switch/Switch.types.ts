import { ComponentPropsWithoutRef } from "react";

type SwitchChildrenPosition = "left" | "right";
type SwitchSize = "standard" | "small";

export interface SwitchVariant {
  size?: SwitchSize;
  withIcons?: boolean;
  childrenPosition?: SwitchChildrenPosition;
  children?: string;
}

export type SwitchProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "children" | "size"
> &
  SwitchVariant;
