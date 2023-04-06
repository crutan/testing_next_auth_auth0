import { ComponentPropsWithRef } from "react";
import { DropDownItemProps } from "ui/DropDown";

import SelectItem from "./SelectItem";

export interface SelectOption {
  value: string;
  defaultChecked?: boolean;
}

export interface SelectVariant {
  label?: string;
  required?: boolean;
  multiSelect?: boolean;
  onChange?: (optionsSelected: Set<number>) => void;
  dropDownContainerStyles?: string;
  children: React.ReactElement<typeof SelectItem>[];
}

export type SelectProps = Omit<
  ComponentPropsWithRef<"button">,
  "children" | "onChange"
> &
  SelectVariant;

export type SelectItemProps = Omit<ComponentPropsWithRef<"div">, "children"> &
  Pick<ComponentPropsWithRef<"input">, "ref"> &
  Omit<ComponentPropsWithRef<"input">, "checked"> & {
    children: string;
  } & Partial<DropDownItemProps>;
