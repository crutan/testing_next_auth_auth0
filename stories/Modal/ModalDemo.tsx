import { createRef, useState } from "react";
import { Button } from "ui/Button";
import { ModalWrapper, ModalWrapperProps } from "ui/Modal";

export const ModalDemo = ({
  children,
  onClose,
  ...props
}: Omit<ModalWrapperProps, "isOpen" | "container">) => {
  const triggerRef = createRef<HTMLButtonElement>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        icon="ArrowUpRightIcon"
        iconPosition="trailing"
        onClick={() => setIsOpen(true)}
        ref={triggerRef}
        size="xlarge"
      >
        Open Modal
      </Button>
      <ModalWrapper
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        container={document.getElementById("sb-custom-decorator")!}
        isOpen={isOpen}
        onClose={(trigger) => {
          setIsOpen(false);
          onClose(trigger);
        }}
        {...props}
        refocusRef={triggerRef}
      >
        {children}
      </ModalWrapper>
    </>
  );
};
