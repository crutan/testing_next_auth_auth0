import React from "react";
import { Body } from "ui/Text/Body";

import { FormFieldRequiredLabelProps } from "./FormFieldRequiredLabel.types";

import { cn } from "@/lib/utils/twHelpers";

const FormFieldRequiredLabel = ({
  required,
  disabled,
  id,
  children,
  className,
  ...rest
}: FormFieldRequiredLabelProps) => {
  return children ? (
    <Body
      as="label"
      className={cn("flex gap-1", disabled && "text-onyx-500", className)}
      data-testid="FormFieldRequiredLabel"
      id={`label-${id}`}
      {...rest}
    >
      {children}
      {required && (
        <span
          className="text-error-300"
          data-testid="FormFieldRequiredLabelRequiredSpan"
        >
          *
        </span>
      )}
    </Body>
  ) : (
    <></>
  );
};

export default FormFieldRequiredLabel;
