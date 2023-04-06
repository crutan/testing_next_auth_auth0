import React, { FormEventHandler } from "react";

import { RadioContext } from "./context";
import { RadioGroupProps } from "./RadioGroup.types";

import { cn } from "@/lib/utils/twHelpers";

const RadioGroup = ({
  legend,
  disabled,
  groupName,
  children,
  className,
  onChange,
  ...props
}: RadioGroupProps) => {
  return (
    <fieldset
      className={cn(className)}
      data-testid="RadioGroupFieldset"
      onChange={onChange as FormEventHandler<HTMLFieldSetElement> | undefined}
      {...props}
    >
      {legend && (
        <legend
          className={cn("text-onyx-50", "leading-normal", "mb-2")}
          data-testid="RadioGroupLegend"
        >
          {legend}
        </legend>
      )}
      <RadioContext.Provider
        value={{
          disabled,
          groupName,
        }}
      >
        {children}
      </RadioContext.Provider>
    </fieldset>
  );
};

export default RadioGroup;
