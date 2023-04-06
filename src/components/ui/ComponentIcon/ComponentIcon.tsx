import { forwardRef } from "react";
import * as outlineHeroIcons from "@heroicons/react/24/outline";
import * as solidHeroIcons from "@heroicons/react/24/solid";
import { cva, VariantProps } from "class-variance-authority";
import * as outlineCustomIcons from "src/lib/icons/outline";
import * as solidCustomIcons from "src/lib/icons/solid";
import { cn } from "src/lib/utils/twHelpers";

import {
  ComponentIconProps,
  CustomIconUnion,
  HeroIconUnion,
  PossibleCustomIcons,
  PossibleHeroIcons,
} from "./ComponentIcon.types";

import { SVGIcon } from "@/lib/icons/icons.types";

export type IconProps = VariantProps<typeof IconBase> & ComponentIconProps;

const IconBase = cva(["stroke-2"], {
  variants: {
    size: {
      xsmall: "h-3 w-3",
      small: "h-4 w-4",
      base: "h-5 w-5",
      large: "h-6 w-6",
      xlarge: "h-7 w-7",
    },
  },
});

const ComponentIcon = forwardRef<SVGSVGElement, ComponentIconProps>(
  ({ icon, size = "base", format = "solid", className, ...rest }, ref) => {
    const isHeroIcon = PossibleHeroIcons.includes(icon);
    const isCustomIcon = PossibleCustomIcons.includes(icon);
    if (!isHeroIcon && !isCustomIcon) return null;

    let Icon: SVGIcon;
    switch (format) {
      case "outline":
        Icon = isHeroIcon
          ? outlineHeroIcons[icon as HeroIconUnion]
          : outlineCustomIcons[icon as CustomIconUnion];
        break;
      default:
        Icon = isHeroIcon
          ? solidHeroIcons[icon as HeroIconUnion]
          : solidCustomIcons[icon as CustomIconUnion];
        break;
    }

    return (
      <Icon
        aria-hidden="true"
        className={cn(IconBase({ size }), className)}
        ref={ref}
        {...rest}
      />
    );
  }
);

ComponentIcon.displayName = "ComponentIcon";

export default ComponentIcon;
