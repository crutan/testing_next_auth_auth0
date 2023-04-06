import React, { forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentIcon, IconSizes } from "ui/ComponentIcon";

import type { ButtonBaseProps } from "./Button.types";

import { cn } from "@/lib/utils/twHelpers";

export type ButtonProps = VariantProps<typeof ButtonBase> & ButtonBaseProps;

const ButtonBase = cva(
  [
    "pointer-cursor inline-flex items-center justify-center gap-2 font-semibold shadow-sm",
    "focus:outline-none focus-visible:outline focus-visible:outline-offset-2",
    "disabled:cursor-not-allowed disabled:bg-onyx-700 disabled:text-onyx-500",
  ],
  {
    variants: {
      theme: {
        primary:
          "bg-celesteal-500 hover:bg-celesteal-400 focus-visible:outline-celesteal-400",
        secondary: "bg-onyx-100 hover:bg-onyx-50 focus-visible:outline-onyx-50",
        tertiary: "rounded-none bg-transparent shadow-none",
        modalPrimaryError:
          "bg-error-500 hover:bg-error-400 focus-visible:outline-error-400",
        modalSecondary: [
          "bg-onyx-600 hover:bg-onyx-500 focus-visible:bg-onyx-500 focus-visible:outline-onyx-300",
          "border-[1px] border-solid border-onyx-300 focus-visible:border-onyx-500 disabled:border-onyx-700",
        ],
      },
      size: {
        xsmall: "px-2 py-1",
        small: "px-2 py-1.5",
        base: "px-4 py-2",
        large: "px-4 py-3",
        xlarge: "px-6 py-4",
      },
      iconOnly: {
        true: "rounded-full focus-visible:outline-2",
        false: "rounded-md focus-visible:outline-1",
      },
    },
    compoundVariants: [
      {
        theme: ["primary", "secondary"],
        className: "text-onyx-800",
      },
      {
        theme: ["modalPrimaryError", "modalSecondary", "tertiary"],
        className: "text-onyx-0",
      },
      {
        iconOnly: false,
        size: ["xsmall", "small"],
        className: "text-[0.75rem] normal-case leading-[1.2]",
      },
      {
        iconOnly: false,
        size: ["base", "large", "xlarge"],
        className: "text-base uppercase leading-none",
      },
      {
        iconOnly: false,
        theme: "tertiary",
        className: "p-0 text-base leading-none",
      },
      {
        iconOnly: true,
        size: "xsmall",
        className: "p-[5px]",
      },
      {
        iconOnly: true,
        size: "small",
        className: "p-[7px]",
      },
      {
        iconOnly: true,
        size: ["base", "large"],
        className: "p-[9px]",
      },
      {
        iconOnly: true,
        size: "xlarge",
        className: "p-[13px]",
      },
    ],
  }
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      size = "base",
      theme = "primary",
      icon,
      iconPosition = "trailing",
      iconFormat = "solid",
      className,
      ...props
    },
    ref
  ) => {
    const getIconSize = (): IconSizes => {
      if (children && (size === "xsmall" || size === "small")) {
        return "small";
      } else if (!children && (size === "large" || size === "xlarge")) {
        return "large";
      }
      return "base";
    };

    return (
      <button
        className={cn(
          ButtonBase({ theme, size, iconOnly: !children }),
          className
        )}
        data-testid={"button"}
        ref={ref}
        {...props}
      >
        {iconPosition === "trailing" && children}
        {icon && (
          <ComponentIcon
            data-testid="icon"
            format={iconFormat}
            icon={icon}
            size={getIconSize()}
          />
        )}
        {iconPosition === "leading" && children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
