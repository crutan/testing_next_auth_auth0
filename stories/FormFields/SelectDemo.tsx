import React from "react";
import { Select, SelectItem, SelectProps } from "ui/FormFields";

export const SelectDemo = (props: SelectProps) => {
  return (
    <Select dropDownContainerStyles="max-w-xs" {...props}>
      <SelectItem>Boston</SelectItem>
      <SelectItem>New York City</SelectItem>
      <SelectItem defaultChecked>Philadelphia</SelectItem>
      <SelectItem>Washington DC</SelectItem>
    </Select>
  );
};
