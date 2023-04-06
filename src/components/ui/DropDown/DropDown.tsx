import React, {
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { getChildTypeName } from "@lib/utils/getChildTypeName";
import { cn } from "@lib/utils/twHelpers";

import { DropDownCloseMenuFn, DropDownContext } from "./context";
import { DropDownProps } from "./DropDown.types";

const DropDownItems = React.memo(
  ({
    children,
    id,
    itemRefs,
  }: Pick<DropDownProps, "children"> & {
    id: string;
    itemRefs: React.MutableRefObject<(HTMLElement | null)[]>;
  }) => {
    const renderDropDownItems = useCallback(() => {
      let itemIdx = 0;

      const mapDropDownItem = (menuItem: React.ReactElement) => {
        const thisItemIdx = itemIdx++;
        const itemId = `menu-${id}-item-${thisItemIdx}`;
        return React.cloneElement(menuItem, {
          ...menuItem.props,
          "data-testid": itemId,
          id: itemId,
          index: thisItemIdx,
          ref: (el: HTMLElement | null) => (itemRefs.current[thisItemIdx] = el),
        });
      };

      return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (getChildTypeName(child.type) === "DropDownSection") {
            return React.cloneElement(child as React.ReactElement, {
              ...child.props,
              children: React.Children.map(
                child.props.children as React.ReactElement[],
                mapDropDownItem
              ),
            });
          }

          return mapDropDownItem(child);
        }
        return child;
      });
    }, [id, children, itemRefs]);

    return <>{renderDropDownItems()}</>;
  }
);
DropDownItems.displayName = "DropDownItems";

const DropDown = ({
  getInitialIdxToFocus = () => 0,
  labelId,
  containerStyles,
  disabled,
  className,
  toggleChildren,
  menuRole,
  menuStyles,
  children,
  ...props
}: DropDownProps) => {
  const id = React.useId();
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const [focusedIdx, setFocusedIdx] = useState<number | undefined>();

  const toggleRef = useRef<HTMLButtonElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (!isDropDownOpen) setFocusedIdx(undefined);
  }, [isDropDownOpen]);

  useEffect(() => {
    if (focusedIdx != null) itemRefs.current[focusedIdx]?.focus();
  }, [focusedIdx]);

  const handleToggleClick: MouseEventHandler<HTMLButtonElement> = () => {
    setIsDropDownOpen(!isDropDownOpen);
    setFocusedIdx(getInitialIdxToFocus());
  };

  const handleDropDownBlur: FocusEventHandler<HTMLDivElement> = (e) => {
    if (
      !e.relatedTarget?.id.startsWith(`menu-${id}`) &&
      !e.relatedTarget?.id.startsWith(`toggle-${id}`)
    ) {
      setIsDropDownOpen(false);
    }
  };

  const handleDropDownKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (isDropDownOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        // Prevent cursor move
        e.preventDefault();
        const newFocusedIdx =
          focusedIdx != null
            ? // Math.max() & Math.min() ensure focusedIdx does not go out of bounds
              Math.max(
                Math.min(
                  // Add 1 to focusedIdx if going down or add -1 if going up
                  focusedIdx + (e.key === "ArrowDown" ? 1 : -1),
                  itemRefs.current.length - 1
                ),
                0
              )
            : // Focus 0 index since none of the options are focused yet
              0;
        setFocusedIdx(newFocusedIdx);
      } else if (e.key === "Escape" || e.key === "Tab") {
        toggleRef.current?.focus();
        setIsDropDownOpen(false);
        setFocusedIdx(undefined);
      }
    }
  };

  const closeMenu: DropDownCloseMenuFn = (keyTrigger) => {
    if (keyTrigger) toggleRef.current?.focus();
    setIsDropDownOpen(false);
  };

  return (
    <div
      className={cn("relative", containerStyles)}
      data-testid="DropDownContainer"
      onBlur={handleDropDownBlur}
      onKeyDown={handleDropDownKeyDown}
    >
      <button
        aria-controls={`menu-${id}`}
        aria-expanded={isDropDownOpen}
        aria-haspopup={menuRole}
        aria-labelledby={labelId}
        className={cn(
          "bg-onyx-800 text-onyx-200",
          "focus:outline-none focus-visible:bg-onyx-700 disabled:cursor-not-allowed disabled:text-onyx-600",
          className
        )}
        data-testid="DropDownToggle"
        disabled={disabled}
        id={`toggle-${id}`}
        onClick={handleToggleClick}
        ref={toggleRef}
        {...props}
      >
        {toggleChildren}
      </button>
      {isDropDownOpen && (
        <div
          aria-activedescendant={
            focusedIdx != null ? `menu-${id}-item-${focusedIdx}` : undefined
          }
          aria-labelledby={labelId}
          className={cn(
            "absolute z-20 mt-2 overflow-hidden rounded-md",
            "bg-onyx-800 text-onyx-100 focus-visible:outline-none",
            menuStyles
          )}
          data-testid="DropDownMenu"
          id={`menu-${id}`}
          ref={dropDownRef}
          role={menuRole}
          tabIndex={-1}
        >
          <DropDownContext.Provider
            value={{
              focusedIdx,
              setFocusedIdx,
              closeMenu,
            }}
          >
            {
              <DropDownItems id={id} itemRefs={itemRefs}>
                {children}
              </DropDownItems>
            }
          </DropDownContext.Provider>
        </div>
      )}
    </div>
  );
};
DropDown.displayName = "DropDown";

export default DropDown;
