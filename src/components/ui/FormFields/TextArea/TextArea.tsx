import { forwardRef, useId } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { FormFieldRequiredLabel } from "ui/Text";

import type { TextAreaBaseProps, TextAreaRef } from "./TextArea.types";

import { cn } from "@/lib/utils/twHelpers";

export type TextAreaProps = VariantProps<typeof TextAreaWrapper> &
  TextAreaBaseProps;

const TextAreaWrapper = cva(
  [
    "group peer flex items-center gap-2 rounded-md border bg-onyx-800 px-3 py-2 text-onyx-200",
    "focus-within:bg-onyx-700",
    "disabled:cursor-not-allowed disabled:resize-none disabled:border-onyx-700 disabled:bg-onyx-800 disabled:text-onyx-600",
  ],
  {
    variants: {
      status: {
        normal: "border-onyx-700",
        error: "border-error-500 text-error-500",
        success: "border-success-500 text-success-500",
        warning: "border-warning-500 text-warning-500",
      },
    },
    defaultVariants: {
      status: "normal",
    },
  }
);

const _TextAreaStyles = cva([
  "bg-transparent",
  "focus:placeholder-transparent focus:outline-none",
  "disabled:placeholder-onyx-600",
]);

const TextArea = forwardRef<TextAreaRef, TextAreaProps>(
  (
    {
      status = "normal",
      textAreaWrapperStyles,
      wrapperStyles,
      label,
      helpText,
      required = false,
      className,
      rows = 5,
      cols = 40,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const textAreaId = useId();

    return (
      <div
        className={cn("flex w-fit flex-col gap-2 text-onyx-50", wrapperStyles)}
        data-testid="labelWrapper"
      >
        <FormFieldRequiredLabel
          disabled={disabled}
          id={textAreaId}
          required={required}
        >
          {label}
        </FormFieldRequiredLabel>
        <fieldset
          className={cn(TextAreaWrapper({ status }), textAreaWrapperStyles)}
          data-testid="textareaWrapper"
          disabled={disabled}
        >
          <textarea
            aria-describedby={`help-text-${textAreaId}`}
            aria-labelledby={`label-${textAreaId}`}
            aria-required={required}
            autoCorrect="on"
            className={cn(_TextAreaStyles(), className)}
            cols={cols}
            data-testid="textarea"
            ref={ref}
            required={required}
            rows={rows}
            {...rest}
          />
        </fieldset>
        {helpText && (
          <p
            className={cn(
              "w-full text-sm text-onyx-300 peer-disabled:text-onyx-600"
            )}
            data-testid="helpText"
            id={`help-text-${textAreaId}`}
          >
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
