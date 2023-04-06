import React, { useEffect, useState } from "react";
import { getChildTypeName } from "@lib/utils/getChildTypeName";
import { cn } from "@lib/utils/twHelpers";
import { ComponentIcon } from "ui/ComponentIcon";
import { DropDown } from "ui/DropDown";
import { Body, FormFieldRequiredLabel } from "ui/Text";

import { SelectContext, SelectItemOnChangeHandler } from "./context";
import { SelectProps } from "./Select.types";

const Select = ({
  label,
  required,
  multiSelect,
  disabled,
  onChange,
  dropDownContainerStyles,
  className,
  children,
  ...props
}: SelectProps) => {
  const labelId = React.useId();
  const [toggleTitle, setToggleTitle] = useState("Select");
  const [itemLabels, setItemLabels] = useState<string[]>();
  const [selectedIdxs, setSelectedIdxs] = useState(new Set<number>());

  const getInitialIdxToFocus = () =>
    selectedIdxs.size ? Math.min(...Array.from(selectedIdxs)) : 0;

  useEffect(() => {
    if (selectedIdxs.size === 1 && itemLabels != null) {
      setToggleTitle(itemLabels[Array.from(selectedIdxs)[0]]);
    } else if (selectedIdxs.size > 1) {
      setToggleTitle("Multiple selected");
    } else {
      setToggleTitle("Select");
    }
  }, [itemLabels, selectedIdxs]);

  const handleSelectItemChange: SelectItemOnChangeHandler = (index) => {
    const newSelectedIdxs = new Set(selectedIdxs);

    if (multiSelect) {
      selectedIdxs.has(index)
        ? newSelectedIdxs.delete(index)
        : newSelectedIdxs.add(index);
    } else {
      newSelectedIdxs.clear();
      newSelectedIdxs.add(index);
    }

    setSelectedIdxs(newSelectedIdxs);
    onChange && onChange(newSelectedIdxs);
  };

  useEffect(() => {
    const defaultSelectedIdxs = new Set<number>();
    const newItemLabels: string[] = [];
    let itemIdx = 0;

    const checkChild = (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      child: React.ReactElement<any, string | React.JSXElementConstructor<any>>
    ) => {
      if (
        child.props.defaultChecked &&
        (multiSelect || defaultSelectedIdxs.size === 0)
      ) {
        defaultSelectedIdxs.add(itemIdx);
      }
      newItemLabels.push(child.props.children);
      itemIdx++;
    };

    for (const child of React.Children.toArray(children)) {
      if (React.isValidElement(child)) {
        if (getChildTypeName(child.type) === "DropDownSection") {
          const grandChildren = child.props.children as React.ReactElement[];
          grandChildren.forEach(checkChild);
        } else {
          checkChild(child);
        }
      }
    }

    setSelectedIdxs(defaultSelectedIdxs);
    setItemLabels(newItemLabels);
  }, [children, multiSelect]);

  return (
    <div className="flex flex-col gap-2" data-testid="SelectContainer">
      <FormFieldRequiredLabel
        disabled={disabled}
        id={labelId}
        required={required}
      >
        {label}
      </FormFieldRequiredLabel>
      <SelectContext.Provider
        value={{
          multiSelect,
          onChange: handleSelectItemChange,
          selectedIdxs,
        }}
      >
        <DropDown
          className={cn(
            "flex w-full items-center justify-between gap-2 rounded-md p-2",
            "border border-onyx-700",
            "group",
            className
          )}
          containerStyles={dropDownContainerStyles}
          disabled={disabled}
          getInitialIdxToFocus={getInitialIdxToFocus}
          labelId={labelId}
          menuRole="listbox"
          menuStyles="inset-x-0"
          title={toggleTitle}
          toggleChildren={
            <>
              <Body as="span" className="truncate">
                {toggleTitle}
              </Body>
              <ComponentIcon
                className="group-aria-expanded:rotate-180"
                format="solid"
                icon="ChevronDownIcon"
                size="base"
              />
            </>
          }
          {...props}
        >
          {children}
        </DropDown>
      </SelectContext.Provider>
    </div>
  );
};
Select.displayName = "Select";

export default Select;
