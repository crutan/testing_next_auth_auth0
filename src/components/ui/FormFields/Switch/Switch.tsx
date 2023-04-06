import React from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { cva } from "class-variance-authority";
import { FormFieldLabel } from "ui/Text";

import { SwitchProps } from "./Switch.types";

import { cn } from "@/lib/utils/twHelpers";

const _SwitchContainer = cva(
  ["flex", "items-center", "relative", "align-top", "isolate"],
  {
    variants: {
      size: { standard: "gap-x-3", small: "gap-x-2" },
      childrenPosition: { left: "justify-between", right: "justify-start" },
    },
  }
);

const _SwitchInput = cva([
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

const _SwitchToggle = cva(
  [
    "m-0",
    "rounded-xl",
    "grow-0",
    "shrink-0",
    "bg-onyx-600",
    "peer-enabled:bg-onyx-800",
    "peer-enabled:peer-hover:bg-onyx-700",
    "peer-enabled:peer-focus-visible:bg-onyx-700",
    "peer-enabled:peer-checked:bg-celesteal-500",
    "peer-enabled:peer-checked:peer-hover:bg-celesteal-500",
    "peer-enabled:peer-checked:peer-focus-visible:bg-celesteal-500",
    "peer-enabled:peer-focus-visible:outline",
    "peer-enabled:peer-focus-visible:outline-1",
    "peer-enabled:peer-focus-visible:outline-offset-2",
    "peer-enabled:peer-focus-visible:outline-onyx-600",
    "peer-enabled:peer-focus-visible:peer-checked:outline-celesteal-400",
    "group",
  ],
  {
    variants: {
      size: { standard: ["w-11", "h-6"], small: ["w-9", "h-5"] },
    },
  }
);

const _SwitchToggleCircle = cva(
  [
    "w-5",
    "h-5",
    "mx-auto",
    "group-peer-checked:ml-auto",
    "rounded-[50%]",
    "bg-onyx-100",
    "group-peer-enabled:bg-onyx-0",
    "text-onyx-600",
    "group-peer-enabled:text-onyx-700",
    "shadow",
  ],
  {
    variants: {
      size: {
        standard: ["my-0.5", "ml-0.5", "group-peer-checked:mr-0.5"],
        small: ["my-0", "ml-0", "group-peer-checked:mr-0"],
      },
      withIcons: {
        true: ["flex", "justify-center", "items-center"],
      },
    },
  }
);

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    size = "standard",
    withIcons = false,
    childrenPosition = "right",
    children,
    className,
    ...rest
  }: SwitchProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <label
      className={cn(_SwitchContainer({ size, childrenPosition }), className)}
      data-testid="SwitchContainer"
    >
      <input
        className={cn(_SwitchInput())}
        data-testid="SwitchInput"
        ref={ref}
        role="switch"
        type="checkbox"
        {...rest}
      />
      {childrenPosition === "left" && (
        <FormFieldLabel>{children}</FormFieldLabel>
      )}
      <div className={cn(_SwitchToggle({ size }))} data-testid="SwitchToggle">
        <div
          className={cn(
            _SwitchToggleCircle({
              size,
              withIcons,
            })
          )}
          data-testid="SwitchToggleCircle"
        >
          {withIcons ? (
            <>
              <CheckIcon
                className={cn("h-3", "hidden", "group-peer-checked:block")}
                data-testid="SwitchToggleCircleIcon_Check"
              />
              <XMarkIcon
                className={cn("h-3", "group-peer-checked:hidden")}
                data-testid="SwitchToggleCircleIcon_XMark"
              />
            </>
          ) : undefined}
        </div>
      </div>
      {childrenPosition === "right" && (
        <FormFieldLabel>{children}</FormFieldLabel>
      )}
    </label>
  );
});

export default Switch;
