import { ComponentPropsWithoutRef, Ref, RefObject } from "react";
import { ButtonProps } from "ui/Button";

export type ModalType = "error" | "success";
export type ModalCloseTrigger = "primaryButton" | "secondaryButton" | "escKey";
export type ModalCloseHandler = (trigger: ModalCloseTrigger) => void;

export interface ModalVariant {
  type?: ModalType;
  showIcon?: boolean;
  subHeading?: string;
  heading?: string;
  children?: string;
  primaryButtonText: string;
  primaryButtonProps?: ButtonProps;
  primaryButtonRef: Ref<HTMLButtonElement>;
  secondaryButtonText?: string;
  secondaryButtonProps?: ButtonProps;
  secondaryButtonRef: Ref<HTMLButtonElement>;
}

export type ModalContentProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children"
> &
  ModalVariant;

export interface ModalWrapperProps
  extends Omit<ModalContentProps, "primaryButtonRef" | "secondaryButtonRef"> {
  isOpen: boolean;
  onClose: ModalCloseHandler;
  container?: Element | DocumentFragment;
  refocusRef: RefObject<HTMLButtonElement>;
  wrapperClassName?: string;
}
