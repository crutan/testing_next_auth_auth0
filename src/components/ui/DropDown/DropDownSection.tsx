import React from "react";

import { DropDownSectionProps } from "./DropDown.types";

import { cn } from "@/lib/utils/twHelpers";

const DropDownSection = ({ children, ...props }: DropDownSectionProps) => {
  return children != null ? (
    <div
      className={cn("border-b border-onyx-700 last:border-b-0")}
      data-testid="DropDownSection"
      role="group"
      {...props}
    >
      {children}
    </div>
  ) : (
    <></>
  );
};

DropDownSection.displayName = "DropDownSection";

export default DropDownSection;
