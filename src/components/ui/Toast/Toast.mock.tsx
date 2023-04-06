import { ReactNode } from "react";

import { ToastType, ToastVariants } from "./Toast.types";
import Toaster from "./Toaster";

import { useToast } from "@/lib/hooks/useToast/useToast";

interface MockToastProps {
  title?: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action?: any;
  variant?: ToastVariants;
  toastType?: ToastType;
}

export const MockProviderTest = ({ children }: { children: ReactNode }) => {
  return <MockProvider>{children}</MockProvider>;
};

export const MockProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export const MockToast = ({
  variant,
  toastType,
  title,
  description,
  action,
}: MockToastProps) => {
  const { toast } = useToast();

  return (
    <MockProvider>
      <button
        data-testid="mock-button"
        onClick={() => {
          toast({
            description: description ?? "test",
            title: title ?? "hello World!",
            variant: variant,
            toastType: toastType,
            action: action,
          });
        }}
      >
        Open Toast
      </button>
    </MockProvider>
  );
};
