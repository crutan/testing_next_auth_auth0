import React from "react";

import {
  Input,
  StandardInputBaseProps,
} from "@/components/ui/FormFields/Input";

export const InputDemo = ({ ...props }: StandardInputBaseProps) => {
  return (
    <div className="w-fit">
      <Input {...props} />
    </div>
  );
};
