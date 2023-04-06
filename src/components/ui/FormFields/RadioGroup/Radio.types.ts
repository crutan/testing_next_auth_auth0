import { ComponentPropsWithRef } from "react";

export interface RadioVariant {
  children?: string;
}

export type RadioProps = Omit<ComponentPropsWithRef<"input">, "children"> &
  RadioVariant;
