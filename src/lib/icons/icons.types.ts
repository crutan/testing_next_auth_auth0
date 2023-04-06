import { ComponentPropsWithRef } from "react";

interface TitleProps {
  title?: string;
  titleId?: string;
}

export type SVGIconProps = ComponentPropsWithRef<"svg"> & TitleProps;

export type SVGIcon = (props: SVGIconProps) => JSX.Element;
