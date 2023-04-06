import React from "react";
import { Transition } from "@headlessui/react";
import { cva, VariantProps } from "class-variance-authority";
import { Button, ComponentIcon, Heading } from "interface";

import { VariantIcons } from "../shared.types";

import { CalloutBaseProps } from "./Callout.types";

import { cn } from "@/lib/utils/twHelpers";

export type CalloutProps = VariantProps<typeof CalloutBase> & CalloutBaseProps;

const CalloutBase = cva(["flex gap-x-3 rounded-lg p-4"], {
  variants: {
    variant: {
      info: "bg-info-100 text-info-500",
      success: "bg-success-100 text-success-500",
      warning: "bg-warning-100 text-warning-500",
      error: "bg-error-100 text-error-500",
    },
    size: {
      normal: "max-w-[600px]",
      full: "w-full",
    },
  },
});

const _CalloutIconColor = cva([], {
  variants: {
    variant: {
      info: "fill-info-400 text-info-500",
      success: "fill-success-400 text-success-500",
      warning: "fill-warning-400 text-warning-500",
      error: "fill-error-400 text-error-500",
    },
  },
});

const Callout = ({
  copy,
  size = "normal",
  header,
  variant = "info",
  className,
  actionLabel,
  action,
  dismissible = true,
  dismissLabel = "Dismiss",
  linkLabel,
  linkUrl,
  ...rest
}: CalloutProps) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(true);
  return (
    <Transition
      data-testid="callout-transition"
      leave="transition-opacity duration-1000"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      show={isVisible}
    >
      <div
        aria-hidden={!isVisible}
        className={cn(CalloutBase({ variant, size }), className)}
        data-testid="callout-container"
        {...rest}
      >
        <ComponentIcon
          className={_CalloutIconColor({ variant })}
          icon={VariantIcons[variant]}
          size="large"
        />
        <div className="flex flex-1 flex-col">
          <Heading className="mb-3" noColor size="h6" weight="bold">
            {header}
          </Heading>
          <p>{copy}</p>
          <div className="mt-[.875rem] flex gap-6 font-semibold">
            {actionLabel && action && (
              <Button
                className={cn(_CalloutIconColor({ variant }), "capitalize")}
                data-testid="callout-button-action"
                onClickCapture={() => action()}
                theme="tertiary"
              >
                {actionLabel}
              </Button>
            )}
            {linkLabel && linkUrl && !actionLabel && (
              <a
                aria-label={linkLabel}
                className={cn(
                  _CalloutIconColor({ variant }),
                  "flex items-center gap-1"
                )}
                data-testid="callout-link-url"
                href={linkUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {linkLabel}
                <ComponentIcon icon="ArrowLongRightIcon" size="base" />
              </a>
            )}
            {dismissible && (
              <button
                data-testid="dismiss-button"
                onClickCapture={() => setIsVisible(false)}
              >
                {dismissLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Callout;
