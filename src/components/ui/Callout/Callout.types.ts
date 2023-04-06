import { ComponentPropsWithoutRef } from "react";

import { SemanticColor } from "../shared.types";

type CalloutSize = "normal" | "full";
export interface CalloutProperties extends ComponentPropsWithoutRef<"div"> {
  variant: SemanticColor;
  size?: CalloutSize;
  header?: string;
  copy?: string;
  action?: () => void;
  actionLabel?: string;
  dismissible?: boolean;
  dismissLabel?: string;
  linkLabel?: string;
  linkUrl?: string;
}

export type CalloutBaseProps = CalloutProperties;
