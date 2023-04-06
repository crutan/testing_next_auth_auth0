import { ComponentPropsWithoutRef } from "react";

type CheckboxChildrenPosition = "left" | "right";

export interface CheckboxVariant {
  labelStyles?: string;
  treatFocusLikeHover?: boolean;
  childrenPosition?: CheckboxChildrenPosition;
  children: string;
}

export type CheckboxProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "children"
> &
  CheckboxVariant;
