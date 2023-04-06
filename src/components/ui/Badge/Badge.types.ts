import { ComponentPropsWithoutRef } from "react";
import { Color } from "ui/shared.types";

import { IconFormat, IconUnion } from "../ComponentIcon";

type BadgeIconPosition = "leading" | "trailing";
type BadgeSize = "large" | "small";

export interface BadgeVariant {
  icon?: IconUnion;
  iconFormat?: IconFormat;
  iconPosition?: BadgeIconPosition;
  size?: BadgeSize;
  color?: Color;
  children: string;
}

export type BadgeProps = Omit<ComponentPropsWithoutRef<"div">, "children"> &
  BadgeVariant;
