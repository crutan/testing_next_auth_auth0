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
    <path
      d="M20.4001 12C20.4001 16.6392 16.6393 20.4 12.0001 20.4C7.36091 20.4 3.6001 16.6392 3.6001 12C3.6001 7.36081 7.36091 3.6 12.0001 3.6C16.6393 3.6 20.4001 7.36081 20.4001 12ZM6.0361 12C6.0361 15.2938 8.70627 17.964 12.0001 17.964C15.2939 17.964 17.9641 15.2938 17.9641 12C17.9641 8.70617 15.2939 6.036 12.0001 6.036C8.70627 6.036 6.0361 8.70617 6.0361 12Z"
      fill="currentColor"
    />
  </svg>
);

const ForwardRef = forwardRef(DotIcon);
export default ForwardRef as SVGIcon;
