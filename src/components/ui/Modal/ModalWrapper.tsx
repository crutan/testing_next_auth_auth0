import { createRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { cva } from "class-variance-authority";

import { ModalCloseHandler, ModalWrapperProps } from "./Modal.types";
import ModalContent from "./ModalContent";

import { cn } from "@/lib/utils/twHelpers";

const _ModalWrapper = cva([
  "fixed inset-0 z-20 flex items-center justify-center",
  "bg-onyx-900/75",
]);

const ModalWrapper = ({
  isOpen,
  onClose,
  container,
  refocusRef,
  wrapperClassName,
  children,
  primaryButtonProps,
  secondaryButtonText,
  secondaryButtonProps,
  ...props
}: ModalWrapperProps) => {
  const modalWrapperRef = createRef<HTMLDivElement>();
  const primaryButtonRef = createRef<HTMLButtonElement>();
  const secondaryButtonRef = createRef<HTMLButtonElement>();

  const reFocusAndClose: ModalCloseHandler = useCallback(
    (trigger) => {
      refocusRef.current?.focus();
      onClose(trigger);
    },
    [refocusRef, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          reFocusAndClose("escKey");
        } else if (e.key === "Tab") {
          // Trap focus between buttons within modal
          const primaryButton = primaryButtonRef.current;
          const secondaryButton =
            secondaryButtonText && secondaryButtonRef.current
              ? secondaryButtonRef.current
              : undefined;

          if (
            secondaryButton == null ||
            (!e.shiftKey && document.activeElement !== primaryButton)
          ) {
            primaryButton?.focus();
            e.preventDefault();
          } else if (e.shiftKey && document.activeElement !== secondaryButton) {
            secondaryButton.focus();
            e.preventDefault();
          }
        }
      };

      const cleanup = () => {
        document.body.classList.remove("overflow-hidden");
        document.removeEventListener("keydown", handleKeydown);
      };

      cleanup();
      document.body.classList.add("overflow-hidden");
      document.addEventListener("keydown", handleKeydown);
      primaryButtonRef.current?.focus();

      return cleanup;
    }
  }, [
    isOpen,
    onClose,
    modalWrapperRef,
    primaryButtonRef,
    secondaryButtonRef,
    secondaryButtonText,
    reFocusAndClose,
  ]);

  return isOpen ? (
    createPortal(
      <div
        className={cn(_ModalWrapper(), wrapperClassName)}
        data-testid="ModalWrapper"
      >
        <ModalContent
          primaryButtonProps={{
            ...(primaryButtonProps ?? {}),
            onClick: (e) => {
              if (primaryButtonProps?.onClick) primaryButtonProps.onClick(e);
              reFocusAndClose("primaryButton");
            },
          }}
          primaryButtonRef={primaryButtonRef}
          secondaryButtonProps={
            secondaryButtonText
              ? {
                  ...(secondaryButtonProps ?? {}),
                  onClick: (e) => {
                    if (secondaryButtonProps?.onClick)
                      secondaryButtonProps.onClick(e);
                    reFocusAndClose("secondaryButton");
                  },
                }
              : secondaryButtonProps
          }
          secondaryButtonRef={secondaryButtonRef}
          secondaryButtonText={secondaryButtonText}
          {...props}
        >
          {children}
        </ModalContent>
      </div>,
      container ?? document.body
    )
  ) : (
    <></>
  );
};
ModalWrapper.displayName = "ModalWrapper";

export default ModalWrapper;
