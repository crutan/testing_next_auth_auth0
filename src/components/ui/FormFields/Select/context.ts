import React from "react";

export type SelectItemOnChangeHandler = (index: number) => void;

export interface SelectContextProps {
  multiSelect?: boolean;
  selectedIdxs: Set<number>;
  onChange: SelectItemOnChangeHandler;
}

export const SelectContext = React.createContext<
  SelectContextProps | undefined
>(undefined);
