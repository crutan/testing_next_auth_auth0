import React, { useId } from "react";
import { cva } from "class-variance-authority";
import { Button } from "ui/Button";
import { ComponentIcon } from "ui/ComponentIcon";
import { Body, Heading } from "ui/Text";

import { ModalContentProps } from "./Modal.types";

import { cn } from "@/lib/utils/twHelpers";

const _ModalContentIcon = cva(
  ["flex h-12 w-12 items-center justify-center rounded-full"],
  {
    variants: {
      type: {
        error: ["bg-error-100 text-error-400"],
        success: ["bg-success-100 text-success-400"],
      },
    },
  }
);

const ModalContent = ({
  type = "success",
  showIcon = false,
  subHeading,
  heading,
  children,
  primaryButtonText,
  primaryButtonProps,
  primaryButtonRef,
  secondaryButtonText,
  secondaryButtonProps,
  secondaryButtonRef,
  className,
  ...props
}: ModalContentProps) => {
  const describedById = useId();

  const { className: primaryButtonClassName = "", ...primaryButtonRest } =
    primaryButtonProps ?? {};
  const { className: secondaryButtonClassName = "", ...secondaryButtonRest } =
    secondaryButtonProps ?? {};

  return (
    <div
      aria-describedby={describedById}
      aria-label={heading ?? subHeading}
      aria-modal="true"
      className={cn(
        "flex max-w-[344px] flex-col items-center gap-4 rounded-lg p-6",
        "bg-onyx-700 text-center text-onyx-50",
        className
      )}
      data-testid="ModalContentContainer"
      role="dialog"
      {...props}
    >
      {showIcon && (
        <div
          className={cn(_ModalContentIcon({ type }))}
          data-testid="ModalContentIcon"
        >
          {type === "success" ? (
            <ComponentIcon format="solid" icon="CheckIcon" size="large" />
          ) : (
            <ComponentIcon
              format="outline"
              icon="ExclamationTriangleIcon"
              size="large"
            />
          )}
        </div>
      )}
      {(heading || subHeading) && (
        <div
          className={cn("flex flex-col items-center gap-2")}
          data-testid="ModalContentHeadingsContainer"
        >
          {subHeading && (
            <Body as="h2" className="uppercase" size="micro" weight="bold">
              {subHeading}
            </Body>
          )}
          {heading && (
            <Heading as="h1" size="h5" weight="book">
              {heading}
            </Heading>
          )}
        </div>
      )}
      <Body className="my-2" id={describedById}>
        {children}
      </Body>
      <Button
        className={cn("w-full", primaryButtonClassName)}
        ref={primaryButtonRef}
        size="xlarge"
        theme={type === "error" ? "modalPrimaryError" : "primary"}
        {...primaryButtonRest}
      >
        {primaryButtonText}
      </Button>
      {secondaryButtonText && (
        <Button
          className={cn("w-full", secondaryButtonClassName)}
          ref={secondaryButtonRef}
          size="xlarge"
          theme="modalSecondary"
          {...secondaryButtonRest}
        >
          {secondaryButtonText}
        </Button>
      )}
    </div>
  );
};
ModalContent.displayName = "ModalContent";

export default ModalContent;
