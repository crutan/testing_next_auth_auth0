import * as React from "react";
import * as ToastElement from "@radix-ui/react-toast";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentIcon } from "ui/ComponentIcon";

import { ToastBaseProps } from "./Toast.types";

import { cn } from "@/lib/utils/twHelpers";

export const ToastProvider = ToastElement.Provider;

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastElement.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastElement.Viewport>
>(({ className, ...props }, ref) => (
  <ToastElement.Viewport
    className={cn(
      "fixed top-0 z-50 flex max-h-screen w-full flex-col-reverse p-4 sm:top-auto sm:bottom-0 sm:right-0 sm:flex-col md:max-w-[420px]",
      className
    )}
    data-testid="toast-viewport"
    ref={ref}
    {...props}
  />
));
ToastViewport.displayName = ToastElement.Viewport.displayName;

export type ToastProps = ToastBaseProps &
  React.ComponentPropsWithoutRef<typeof Toast>;

const ToastVariants = cva(
  [
    "grow-1 group pointer-events-auto relative mt-4 flex w-full justify-between space-x-4 overflow-hidden p-4 transition-all last:mt-0 sm:last:mt-4",
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full data-[state=closed]:slide-out-to-right-full",
    "data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[vars(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none",
  ],
  {
    variants: {
      variant: {
        default: "rounded-lg",
        accentBorder: "accentBorder rounded-r-lg border-l-4",
      },
      toastType: {
        celesteal:
          "border-celesteal-700 bg-celesteal-100 text-celesteal-700 shadow-celesteal-700",
        info: "border-info-500 bg-info-100 text-info-500",
        success:
          "border-success-500 bg-success-100 text-success-500 shadow-success-500",
        warning:
          "border-warning-500 bg-warning-100 text-warning-500 shadow-warning-500",
        error: "border-error-500 bg-error-100 text-error-500 shadow-error-500",
      },
    },

    defaultVariants: {
      variant: "default",
      toastType: "celesteal",
    },
  }
);

export const _IconColor = cva([], {
  variants: {
    toastType: {
      celesteal: "fill-celesteal-500 text-celesteal-500",
      info: "fill-info-500 text-info-500",
      success: "fill-success-500 text-success-500",
      warning: "fill-warning-500 text-warning-500",
      error: "fill-error-500 text-error-500",
    },
  },
});

export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastElement.Root>,
  React.ComponentPropsWithoutRef<typeof ToastElement.Root> &
    VariantProps<typeof ToastVariants>
>(({ className, variant, toastType, ...props }, ref) => {
  return (
    <ToastElement.Root
      className={cn(ToastVariants({ variant, toastType }), className)}
      data-testid="toast-element"
      ref={ref}
      {...props}
    />
  );
});

Toast.displayName = ToastElement.Root.displayName;

export type ToastActionElement = React.ReactElement<typeof ToastAction>;

export const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastElement.Action>,
  React.ComponentPropsWithoutRef<typeof ToastElement.Action>
>(({ className, ...props }, ref) => (
  <ToastElement.Action
    className={cn("underline", className)}
    data-testid="toast-action"
    ref={ref}
    {...props}
  />
));

ToastAction.displayName = ToastElement.Action.displayName;

export const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastElement.Close>,
  React.ComponentPropsWithoutRef<typeof ToastElement.Close> &
    VariantProps<typeof _IconColor>
>(({ className, toastType = "celesteal", ...props }, ref) => (
  <ToastElement.Close
    aria-label="Toast Closes"
    className={cn(
      "flex h-full flex-col items-end",
      _IconColor({ toastType }),
      className
    )}
    data-testid="toast-close"
    ref={ref}
    toast-close=""
    {...props}
  >
    <ComponentIcon
      className={cn(_IconColor({ toastType }), "h-5 w-5")}
      format="solid"
      icon="XMarkIcon"
    />
  </ToastElement.Close>
));
ToastClose.displayName = ToastElement.Close.displayName;

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastElement.Title>,
  React.ComponentPropsWithoutRef<typeof ToastElement.Title>
>(({ className, ...props }, ref) => (
  <ToastElement.Title
    className={cn("font-semibold", className)}
    data-testid="toast-title"
    ref={ref}
    {...props}
  />
));
ToastTitle.displayName = ToastElement.Title.displayName;

export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastElement.Description>,
  React.ComponentPropsWithoutRef<typeof ToastElement.Description> &
    VariantProps<typeof _IconColor>
>(({ className, toastType, ...props }, ref) => (
  <ToastElement.Description
    className={cn(_IconColor({ toastType }), "font-semibold", className)}
    data-testid="toast-description"
    ref={ref}
    {...props}
  />
));
ToastDescription.displayName = ToastElement.Description.displayName;
