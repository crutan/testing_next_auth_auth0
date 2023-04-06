import { forwardRef, useId } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { FormFieldRequiredLabel } from "ui/Text";

import { ComponentIcon } from "../../ComponentIcon";

import type { InputRef, StandardInputBaseProps } from "./Input.types";

import { cn } from "@/lib/utils/twHelpers";

export type InputProps = VariantProps<typeof InputWrapper> &
  StandardInputBaseProps;

const InputWrapper = cva(
  [
    "flex items-center gap-2 rounded-md border bg-onyx-800 px-3 py-2 text-onyx-200",
    "focus-within:bg-onyx-700",
  ],
  {
    variants: {
      status: {
        normal: "border-onyx-700",
        error: "border-error-500 text-error-500",
        success: "border-success-500 text-success-500",
        warning: "border-warning-500 text-warning-500",
      },
      disabled: {
        true: "cursor-not-allowed resize-none border-onyx-700 bg-onyx-800 text-onyx-600",
      },
    },
    defaultVariants: {
      status: "normal",
    },
  }
);

const _InputStyles = cva([
  "peer bg-transparent",
  "focus:placeholder-transparent focus:outline-none",
  "disabled:placeholder-onyx-600",
]);

const Input = forwardRef<InputRef, InputProps>(
  (
    {
      status = "normal",
      icon,
      iconPlacement = "right",
      iconFormat,
      inputWrapperStyles,
      wrapperStyles,
      label,
      helpText,
      required = false,
      className,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const inputId = useId();
    return (
      <div
        className={cn("flex w-fit flex-col gap-2", wrapperStyles)}
        data-testid="labelWrapper"
      >
        <FormFieldRequiredLabel
          disabled={disabled}
          id={inputId}
          required={required}
        >
          {label}
        </FormFieldRequiredLabel>
        <div
          className={cn(InputWrapper({ status, disabled }), inputWrapperStyles)}
          data-testid="inputWrapper"
        >
          {icon && iconPlacement === "left" && (
            <ComponentIcon data-testid="icon" format={iconFormat} icon={icon} />
          )}
          <input
            aria-describedby={`help-text-${inputId}`}
            aria-labelledby={`label-${inputId}`}
            aria-required={required}
            className={cn(_InputStyles(), className)}
            data-testid="input"
            disabled={disabled}
            ref={ref}
            required={required}
            {...rest}
          />
          {icon && iconPlacement === "right" && (
            <ComponentIcon data-testid="icon" format={iconFormat} icon={icon} />
          )}
        </div>
        {helpText && (
          <p
            className={cn(
              "w-full text-sm text-onyx-300",
              disabled && "text-onyx-600"
            )}
            data-testid="helpText"
            id={`help-text-${inputId}`}
          >
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
