import { BodyDemo } from "../../Text/BodyDemo";
import { HeadingDemo } from "../../Text/HeadingDemo";

import { cn } from "@/lib/utils/twHelpers";

export const TypographyDemo = () => {
  return (
    <div className={cn("flex", "flex-col", "gap-2")}>
      <HeadingDemo size="h1" />
      <HeadingDemo size="h2" />
      <HeadingDemo size="h3" weight="bold" />
      <HeadingDemo size="h3" weight="book" />
      <HeadingDemo size="h4" weight="bold" />
      <HeadingDemo size="h4" weight="book" />
      <HeadingDemo size="h5" weight="bold" />
      <HeadingDemo size="h5" weight="book" />
      <HeadingDemo size="h6" weight="bold" />
      <HeadingDemo size="h6" weight="book" />
      <hr className={cn("my-2")} />
      <BodyDemo size="base" weight="bold" />
      <BodyDemo size="base" weight="book" />
      <BodyDemo size="small" weight="bold" />
      <BodyDemo size="small" weight="medium" />
      <BodyDemo size="small" weight="book" />
      <BodyDemo size="xsmall" weight="bold" />
      <BodyDemo size="xsmall" weight="medium" />
      <BodyDemo size="xsmall" weight="book" />
      <BodyDemo size="micro" weight="bold" />
      <BodyDemo size="micro" weight="medium" />
      <BodyDemo size="micro" weight="book" />
    </div>
  );
};
