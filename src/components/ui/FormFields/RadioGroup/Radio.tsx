import React, { useContext } from "react";
import { cva } from "class-variance-authority";
import { FormFieldLabel } from "ui/Text";

import { RadioContext } from "./context";
import { RadioProps } from "./Radio.types";

import { cn } from "@/lib/utils/twHelpers";

const _RadioContainer = cva([
  "flex",
  "gap-x-2",
  "relative",
  "align-top",
  "isolate",
]);

const _RadioInput = cva([
  "m-0",
  "w-full",
  "h-full",
  "absolute",
  "top-0",
  "left-0",
  "opacity-0",
  "z-10",
  "enabled:cursor-pointer",
  "focus:outline-none",
  "peer",
]);

const _RadioButton = cva([
  "m-0",
  "h-4",
  "w-4",
  "mt-1",
  "rounded-full",
  "grow-0",
  "shrink-0",
  "bg-onyx-800",
  "peer-enabled:peer-hover:bg-onyx-700",
  "peer-enabled:peer-focus-visible:bg-onyx-700",
  "peer-enabled:peer-checked:bg-onyx-800",
  "peer-enabled:peer-checked:peer-hover:bg-onyx-800",
  "peer-enabled:peer-checked:peer-focus-visible:bg-onyx-800",
  "peer-disabled:peer-checked:bg-onyx-600",
  "border-solid",
  "border-[1px]",
  "peer-checked:border-[5px]",
  "border-onyx-700",
  "peer-enabled:border-onyx-400",
  "peer-enabled:peer-checked:border-celesteal-500",
  "peer-disabled:peer-checked:border-onyx-800",
  "peer-enabled:peer-focus-visible:outline",
  "peer-enabled:peer-focus-visible:outline-1",
  "peer-enabled:peer-focus-visible:outline-offset-2",
  "peer-enabled:peer-focus-visible:outline-celesteal-400",
  "peer-disabled:peer-checked:outline",
  "peer-disabled:peer-checked:outline-1",
  "peer-disabled:peer-checked:outline-offset-[-1px]",
  "peer-disabled:peer-checked:outline-onyx-700",
]);

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { children, className, disabled, ...props }: RadioProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const radioGroupProps = useContext(RadioContext);

  return (
    <label
      className={cn(_RadioContainer(), className)}
      data-testid="RadioContainer"
    >
      <input
        className={cn(_RadioInput())}
        data-testid="RadioInput"
        disabled={radioGroupProps?.disabled || disabled}
        name={radioGroupProps?.groupName}
        ref={ref}
        type="radio"
        value={children}
        {...props}
      />
      <div className={cn(_RadioButton())} data-testid="RadioButton" />
      {children && <FormFieldLabel>{children}</FormFieldLabel>}
    </label>
  );
});

export default Radio;
