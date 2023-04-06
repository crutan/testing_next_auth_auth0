import React from "react";
import { cva } from "class-variance-authority";
import { ComponentIcon } from "ui/ComponentIcon";
import { DropDown } from "ui/DropDown";

import { MenuProps } from "./Menu.types";

import { cn } from "@/lib/utils/twHelpers";

const _Menu = cva(["w-40"], {
  variants: {
    menuAnchor: {
      left: "left-0",
      right: "right-0",
    },
  },
});

const Menu = ({
  menuAnchor = "left",
  className,
  children,
  ...props
}: MenuProps) => {
  return (
    <DropDown
      className={cn("block rounded-full p-0.5", className)}
      menuRole="menu"
      menuStyles={_Menu({ menuAnchor })}
      toggleChildren={
        <ComponentIcon
          data-testid="MenuIcon"
          format="solid"
          icon="EllipsisVerticalIcon"
          size="base"
        />
      }
      {...props}
    >
      {children}
    </DropDown>
  );
};
Menu.displayName = "Menu";

export default Menu;
