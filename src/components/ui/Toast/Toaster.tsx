import { ComponentIcon } from "../ComponentIcon";
import { VariantIcons } from "../shared.types";

import {
  _IconColor,
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./ToastCore";

import { useToast } from "@/lib/hooks/useToast/useToast";

const Toaster = () => {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        toastType,
        ...props
      }) {
        return (
          <Toast key={id} toastType={toastType} {...props}>
            {toastType && toastType !== "celesteal" && (
              <div className="flex flex-col" data-testid="toast-icon-wrapper">
                <ComponentIcon
                  className={_IconColor({ toastType })}
                  icon={VariantIcons[toastType]}
                />
              </div>
            )}
            <div className="flex min-h-full w-full flex-col flex-wrap justify-start gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              <div className="flex gap-1 font-semibold">
                {description && (
                  <ToastDescription>
                    {description}{" "}
                    {action && (
                      <ToastAction altText="toast action">{action}</ToastAction>
                    )}
                  </ToastDescription>
                )}
              </div>
            </div>
            <ToastClose toastType={toastType} />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
};

export default Toaster;
