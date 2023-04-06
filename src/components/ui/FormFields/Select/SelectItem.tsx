import React, {
  ChangeEvent,
  KeyboardEventHandler,
  MouseEventHandler,
  useContext,
} from "react";
import { cn } from "@lib/utils/twHelpers";
import { ComponentIcon } from "ui/ComponentIcon";
import { _DropDownItem, DropDownContext } from "ui/DropDown";
import { Checkbox } from "ui/FormFields/Checkbox";
import { Body } from "ui/Text";

import { SelectContext } from "./context";
import { SelectItemProps } from "./Select.types";

const _SelectItemBase = cn("gap-x-3");

type SelectItemElementType = HTMLDivElement | HTMLInputElement;

const SelectItem = React.forwardRef<SelectItemElementType, SelectItemProps>(
  (
    {
      children,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      defaultChecked,
      index,
      onChange,
      onKeyDown,
      onMouseEnter,
      className,
      ...props
    },
    ref
  ) => {
    const DropDownProps = useContext(DropDownContext);
    const SelectProps = useContext(SelectContext);

    const callOnChangeAndCloseIfNotMulti = () => {
      if (index != null && SelectProps?.onChange) {
        SelectProps.onChange(index);
        if (!SelectProps?.multiSelect) {
          DropDownProps?.closeMenu && DropDownProps.closeMenu();
        }
      }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      callOnChangeAndCloseIfNotMulti();
      onChange && onChange(e);
    };
    const handleKeyDown: KeyboardEventHandler<SelectItemElementType> = (e) => {
      if (
        index != null &&
        SelectProps?.onChange &&
        (e.key === "Enter" || (!SelectProps.multiSelect && e.key === " "))
      ) {
        callOnChangeAndCloseIfNotMulti();
        e.preventDefault();
        e.stopPropagation();
      }
      onKeyDown && onKeyDown(e);
    };
    const handleMouseEnter: MouseEventHandler<SelectItemElementType> = (e) => {
      DropDownProps?.setFocusedIdx && DropDownProps.setFocusedIdx(index);
      onMouseEnter && onMouseEnter(e);
    };

    return SelectProps?.multiSelect ? (
      <Checkbox
        aria-selected={Boolean(
          index != null && SelectProps?.selectedIdxs.has(index)
        )}
        checked={Boolean(index != null && SelectProps?.selectedIdxs.has(index))}
        className={cn(_DropDownItem, _SelectItemBase, className)}
        labelStyles="truncate"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        ref={ref as React.ForwardedRef<HTMLInputElement>}
        role="option"
        tabIndex={index === DropDownProps?.focusedIdx ? 0 : -1}
        treatFocusLikeHover
        {...props}
      >
        {children}
      </Checkbox>
    ) : (
      <div
        aria-selected={Boolean(
          index != null && SelectProps?.selectedIdxs.has(index)
        )}
        className={cn(
          _DropDownItem,
          _SelectItemBase,
          "flex select-none items-center",
          "group",
          className
        )}
        data-testid="SelectItemContainer"
        onClick={handleChange as unknown as MouseEventHandler<HTMLDivElement>}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        ref={ref as React.ForwardedRef<HTMLDivElement>}
        role="option"
        tabIndex={index === DropDownProps?.focusedIdx ? 0 : -1}
        {...props}
      >
        <ComponentIcon
          className={cn("invisible shrink-0 group-aria-selected:visible")}
          data-testid="SelectItemCheckIcon"
          format="solid"
          icon="CheckIcon"
          size="base"
        />
        <Body as="span" className="truncate">
          {children}
        </Body>
      </div>
    );
  }
);
SelectItem.displayName = "SelectItem";

export default SelectItem;
