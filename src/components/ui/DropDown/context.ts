import React from "react";

export type DropDownCloseMenuFn = (keyTrigger?: boolean) => void;

export interface DropDownContextProps {
  focusedIdx?: number;
  setFocusedIdx: React.Dispatch<React.SetStateAction<number | undefined>>;
  closeMenu: DropDownCloseMenuFn;
}

export const DropDownContext = React.createContext<
  DropDownContextProps | undefined
>(undefined);
