import { ComponentPropsWithoutRef, ComponentPropsWithRef } from "react";

export interface DropDownVariant {
  getInitialIdxToFocus?: () => number;
  labelId?: string;
  containerStyles?: string;
  toggleChildren: React.ReactNode;
  menuRole: "menu" | "listbox";
  menuStyles?: string;
  children: React.ReactNode;
}

export type DropDownProps = Omit<ComponentPropsWithRef<"button">, "children"> &
  DropDownVariant;

export type DropDownSectionProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children"
> &
  Pick<DropDownProps, "children">;

export interface DropDownItemProps {
  index: number;
}
