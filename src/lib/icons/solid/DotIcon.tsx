import { forwardRef, Ref } from "react";
import { SVGIcon, SVGIconProps } from "src/lib/icons/icons.types";

const DotIcon = (
  { title, titleId, ...props }: SVGIconProps,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    aria-hidden={true}
    aria-labelledby={titleId}
    fill="none"
    ref={ref}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <circle cx={12.0001} cy={12} fill="currentColor" r={8.4} />
  </svg>
);

const ForwardRef = forwardRef(DotIcon);
export default ForwardRef as SVGIcon;
