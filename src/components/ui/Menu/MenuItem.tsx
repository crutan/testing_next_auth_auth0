import React, {
  KeyboardEventHandler,
  MouseEventHandler,
  useContext,
} from "react";
import { _DropDownItem, DropDownContext } from "ui/DropDown";

import { MenuItemProps } from "./Menu.types";

import { cn } from "@/lib/utils/twHelpers";

const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
  (
    { children, index, onClick, onKeyDown, onMouseEnter, className, ...props },
    ref
  ) => {
    const DropDownProps = useContext(DropDownContext);

    const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
      DropDownProps?.closeMenu && DropDownProps.closeMenu();
      onClick && onClick(e);
    };
    const handleKeyDown: KeyboardEventHandler<HTMLButtonElement> = (e) => {
      if (DropDownProps?.closeMenu && (e.key === "Enter" || e.key === " ")) {
        DropDownProps.closeMenu(true);
        e.preventDefault();
        e.stopPropagation();
      }
      onKeyDown && onKeyDown(e);
    };
    const handleMouseEnter: MouseEventHandler<HTMLButtonElement> = (e) => {
      DropDownProps?.setFocusedIdx && DropDownProps.setFocusedIdx(index);
      onMouseEnter && onMouseEnter(e);
    };

    return (
      <button
        className={cn(_DropDownItem, "w-full text-left", className)}
        data-testid="MenuItem"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        ref={ref}
        role="menuitem"
        tabIndex={index === DropDownProps?.focusedIdx ? 0 : -1}
        {...props}
      >
        {children}
      </button>
    );
  }
);
MenuItem.displayName = "MenuItem";

export default MenuItem;
