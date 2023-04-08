import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
} from "react";

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
