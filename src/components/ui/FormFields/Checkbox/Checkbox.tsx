import React from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { cva, VariantProps } from "class-variance-authority";
import { FormFieldLabel } from "ui/Text";

import { CheckboxProps } from "./Checkbox.types";

import { cn } from "@/lib/utils/twHelpers";

const _CheckboxContainer = cva(["relative isolate flex gap-x-2 align-top"], {
  variants: {
    childrenPosition: { left: "justify-between", right: "justify-start" },
  },
});

const _CheckboxInput = cva([
  "peer absolute top-0 left-0 z-10 m-0 h-full w-full opacity-0",
  "focus:outline-none enabled:cursor-pointer",
]);

const _CheckboxButton = cva(
  [
    "flex shrink-0 grow-0 items-center justify-center",
    "m-0 mt-1 h-4 w-4 rounded bg-onyx-800",
    "peer-enabled:peer-hover:bg-onyx-700 peer-enabled:peer-focus-visible:bg-onyx-700",
    "peer-enabled:peer-checked:bg-celesteal-500 peer-enabled:peer-checked:peer-hover:bg-celesteal-400 peer-enabled:peer-checked:peer-focus-visible:bg-celesteal-400",
    "border border-solid border-onyx-700 peer-enabled:border-onyx-400",
    "peer-enabled:peer-checked:border-celesteal-500 peer-enabled:peer-checked:peer-hover:border-celesteal-400 peer-enabled:peer-checked:peer-focus-visible:border-celesteal-400",
    "peer-enabled:peer-focus-visible:outline peer-enabled:peer-focus-visible:outline-1 peer-enabled:peer-focus-visible:outline-offset-2 peer-enabled:peer-focus-visible:outline-celesteal-400",
    "group",
  ],
  {
    variants: {
      treatFocusLikeHover: {
        true: "peer-enabled:peer-focus:bg-onyx-700 peer-enabled:peer-checked:peer-focus:bg-celesteal-400",
      },
    },
  }
);

const _CheckboxButtonIcon = cva([
  "hidden h-3 text-onyx-600",
  "group-peer-checked:block group-peer-enabled:text-onyx-800",
]);

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      labelStyles,
      treatFocusLikeHover,
      childrenPosition = "right",
      children,
      className,
      ...props
    }: CheckboxProps & VariantProps<typeof _CheckboxContainer>,
    ref
  ) => {
    return (
      <label
        className={cn(_CheckboxContainer({ childrenPosition }), className)}
        data-testid="CheckboxContainer"
      >
        <input
          className={_CheckboxInput()}
          data-testid="CheckboxInput"
          ref={ref}
          type="checkbox"
          {...props}
        />
        {childrenPosition === "left" && (
          <FormFieldLabel className={labelStyles}>{children}</FormFieldLabel>
        )}
        <div
          className={_CheckboxButton({ treatFocusLikeHover })}
          data-testid="CheckboxButton"
        >
          <CheckIcon
            className={_CheckboxButtonIcon()}
            data-testid="CheckboxButtonIcon"
          />
        </div>
        {childrenPosition === "right" && (
          <FormFieldLabel className={labelStyles}>{children}</FormFieldLabel>
        )}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";

export default Checkbox;
