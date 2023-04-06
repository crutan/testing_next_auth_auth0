import { Button } from "ui/Button";

import { ToastBaseProps, ToastType } from "@/components/ui/Toast/Toast.types";
import { useToast } from "@/lib/hooks/useToast/useToast";
import { Toast } from "@/lib/hooks/useToast/useToast.types";

interface ToastDemoProps extends ToastBaseProps {
  toastType: ToastType;
  title: string;
  variant: Toast["variant"];
  description: string;
  toggleAction: boolean;
}

export const ToastDemo = ({
  toastType,
  title,
  variant,
  description,
  toggleAction,
  ...props
}: ToastDemoProps) => {
  const { toast } = useToast();

  return (
    <div className="min-h-full min-w-full">
      <Button
        onClick={() =>
          toast({
            toastType,
            variant,
            title,
            description,
            action: toggleAction ? (
              <a href="http://example.com">Action Link</a>
            ) : undefined,
          })
        }
        size="xlarge"
        {...props}
      >
        Show Toast
      </Button>
    </div>
  );
};
