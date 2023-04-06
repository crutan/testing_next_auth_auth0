import type { UIBasePropsWithoutRef } from "ui/shared.types";

type GridElements = "div" | "section" | "article" | "main" | "aside";
type GridWidth = "fullBleed" | "container";
type GridColumns = 4 | 8 | 12 | 16;
type GridGap = "none" | "minimal" | "loose";
type Breakpoints = "standard" | "none";
export interface GridProperties {
  breakpoints?: Breakpoints;
  columns: GridColumns;
  size?: GridWidth;
  gap?: GridGap;
}

export type GridBaseProps = Omit<UIBasePropsWithoutRef<GridElements>, "as"> &
  Partial<Pick<UIBasePropsWithoutRef<GridElements>, "as">> &
  GridProperties;
