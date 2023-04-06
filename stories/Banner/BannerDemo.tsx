import React from "react";
import { Banner, BannerBaseProps } from "interface";

export const BannerDemo = ({ children, ...props }: BannerBaseProps) => {
  return <Banner {...props}>{children}</Banner>;
};
