import React from "react";
import { DropDownSection } from "ui/DropDown";
import { Menu, MenuItem, MenuProps } from "ui/Menu";

import { cn } from "@/lib/utils/twHelpers";

export const MenuDemo = ({
  menuAnchor,
  onItemClick,
  ...props
}: MenuProps & { onItemClick: (label: string) => void }) => {
  return (
    <div className={cn("flex", menuAnchor === "right" && "justify-end")}>
      <Menu aria-label="File Menu" menuAnchor={menuAnchor} {...props}>
        <DropDownSection aria-label="Text">
          <MenuItem onClick={() => onItemClick("Cut")}>Cut</MenuItem>
          <MenuItem onClick={() => onItemClick("Copy")}>Copy</MenuItem>
          <MenuItem onClick={() => onItemClick("Paste")}>Paste</MenuItem>
        </DropDownSection>
        <DropDownSection aria-label="Action">
          <MenuItem onClick={() => onItemClick("Undo")}>Undo</MenuItem>
          <MenuItem onClick={() => onItemClick("Redo")}>Redo</MenuItem>
        </DropDownSection>
        <DropDownSection aria-label="File">
          <MenuItem onClick={() => onItemClick("Save")}>Save</MenuItem>
          <MenuItem onClick={() => onItemClick("Save As")}>Save As</MenuItem>
        </DropDownSection>
      </Menu>
    </div>
  );
};
