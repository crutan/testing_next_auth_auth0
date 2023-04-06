import React from "react";
import { Radio, RadioGroup, RadioGroupProps } from "ui/FormFields";

export const RadioGroupDemo = ({
  children,
  defaultCheckedIndex,
  groupDisabled,
  individuallyDisabledIndex,
  ...props
}: Omit<RadioGroupProps, "children"> & {
  children: string[];
  defaultCheckedIndex?: number;
  groupDisabled: boolean;
  individuallyDisabledIndex: number;
}) => {
  return (
    <RadioGroup disabled={groupDisabled} {...props}>
      {children.map((child, idx) => (
        <Radio
          defaultChecked={
            defaultCheckedIndex !== undefined
              ? defaultCheckedIndex === idx
              : undefined
          }
          disabled={individuallyDisabledIndex === idx}
          key={idx}
        >
          {child}
        </Radio>
      ))}
    </RadioGroup>
  );
};
