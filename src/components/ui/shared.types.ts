import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
} from "react";
import { IconUnion } from "ui/ComponentIcon";

type UIBaseProps<T extends ElementType> = {
  as?: T;
  children?: React.ReactNode;
};

export type PrimaryColor = "onyx" | "celesteal" | "melon";
export type SemanticColor = "success" | "warning" | "error" | "info";
export type Color = PrimaryColor | SemanticColor;

export type UIBasePropsWithoutRef<T extends ElementType> =
  ComponentPropsWithoutRef<T> & UIBaseProps<T>;

export type UIBasePropsWithRef<T extends ElementType> =
  ComponentPropsWithRef<T> & UIBaseProps<T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CVAVariants<K extends keyof any> = Record<K, string>;

export const VariantIcons: Record<SemanticColor, IconUnion> = {
  info: "InformationCircleIcon",
  success: "CheckCircleIcon",
  warning: "ExclamationTriangleIcon",
  error: "XCircleIcon",
};
