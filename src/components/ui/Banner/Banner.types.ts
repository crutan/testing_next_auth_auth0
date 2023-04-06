import { ComponentPropsWithoutRef } from "react";

import { SemanticColor } from "../shared.types";

export type BannerVariant = SemanticColor | "neutral";

interface BannerProperties extends ComponentPropsWithoutRef<"div"> {
  bannerId: string | number;
  variant: BannerVariant;
  fixed?: boolean;
  children: React.ReactNode;
  initValue?: boolean;
  linkUrl?: string;
  linkLabel?: string;
  dismissable?: boolean;
}

export type BannerBaseProps = BannerProperties;
