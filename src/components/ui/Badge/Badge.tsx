import React, { useId } from "react";
import { cva, VariantProps } from "class-variance-authority";

import { ComponentIcon } from "../ComponentIcon";

import { BadgeProps } from "./Badge.types";

import { cn } from "@/lib/utils/twHelpers";

const _BadgeContainer = cva(
  [
    "inline-flex",
    "justify-center",
    "items-center",
    "gap-x-1",
    "px-3",
    "py-0.5",
    "rounded-xl",
    "font-semibold",
  ],
  {
    variants: {
      size: {
        large: ["text-base", "leading-normal"],
        small: ["text-sm", "leading-[1.2]"],
      },
      color: {
        onyx: ["bg-onyx-100", "text-onyx-800"],
        celesteal: ["bg-celesteal-100", "text-celesteal-800"],
        melon: ["bg-melon-100", "text-melon-800"],
        success: ["bg-success-100", "text-success-500"],
        warning: ["bg-warning-100", "text-warning-500"],
        error: ["bg-error-100", "text-error-500"],
        info: ["bg-info-100", "text-info-500"],
      },
      hasIconInPosition: {
        leading: ["pl-2"],
        trailing: ["pr-2"],
      },
    },
  }
);

const _BadgeIcon = cva([], {
  variants: {
    color: {
      onyx: ["text-onyx-500"],
      celesteal: ["text-celesteal-600"],
      melon: ["text-melon-600"],
      success: ["text-success-500"],
      warning: ["text-warning-500"],
      error: ["text-error-500"],
      info: ["text-info-500"],
    },
  },
});

const Badge = ({
  icon,
  iconFormat,
  iconPosition = "leading",
  size = "large",
  color = "onyx",
  children,
  className,
  ...props
}: BadgeProps & VariantProps<typeof _BadgeContainer>) => {
  const labelId = useId();

  return (
    <div
      aria-labelledby={labelId}
      className={cn(
        _BadgeContainer({
          size,
          color,
          hasIconInPosition: icon ? iconPosition : undefined,
        }),
        className
      )}
      data-testid="BadgeContainer"
      role="status"
      {...props}
    >
      {iconPosition === "trailing" && <label id={labelId}>{children}</label>}
      {icon && (
        <ComponentIcon
          className={_BadgeIcon({
            color,
          })}
          data-testid="BadgeIcon"
          format={iconFormat}
          icon={icon}
          size="small"
        />
      )}
      {iconPosition === "leading" && <label id={labelId}>{children}</label>}
    </div>
  );
};
Badge.displayName = "Badge";

export default Badge;
