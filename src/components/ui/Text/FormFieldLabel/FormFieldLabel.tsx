import React from "react";
import { Body } from "ui/Text/Body";

import { FormFieldLabelProps } from "./FormFieldLabel.types";

import { cn } from "@/lib/utils/twHelpers";

const FormFieldLabel = ({
  children,
  className,
  ...rest
}: FormFieldLabelProps) => {
  return children ? (
    <Body
      as="label"
      className={cn("peer-disabled:text-onyx-500", className)}
      {...rest}
    >
      {children}
    </Body>
  ) : (
    <></>
  );
};

export default FormFieldLabel;
