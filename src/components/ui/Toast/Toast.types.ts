import { PrimaryColor, SemanticColor } from "../shared.types";

export type ToastVariants = "accentBorder" | "default";
export type ToastType = SemanticColor | Extract<PrimaryColor, "celesteal">;

export interface ToastBaseProps {
  variant?: ToastVariants;
  toastType?: ToastType;
}
