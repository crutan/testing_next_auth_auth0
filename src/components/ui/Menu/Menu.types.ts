import { ComponentPropsWithRef } from "react";
import { DropDownItemProps, DropDownSection } from "ui/DropDown";

import MenuItem from "./MenuItem";

export type MenuAnchor = "left" | "right";

export interface MenuVariant {
  menuAnchor?: MenuAnchor;
  children: React.ReactElement<typeof DropDownSection | typeof MenuItem>[];
}

export type MenuProps = Omit<ComponentPropsWithRef<"button">, "children"> &
  MenuVariant;

export type MenuItemProps = Omit<
  ComponentPropsWithRef<"button">,
  "children"
> & { children: string } & Partial<DropDownItemProps>;
