import { UIBasePropsWithoutRef } from "ui/shared.types";
import { Heading } from "ui/Text";

import { cn } from "@/lib/utils/twHelpers";

const ColorLevelDemo = ({
  level,
  className,
}: Omit<UIBasePropsWithoutRef<"h5">, "as"> & {
  level: string;
}) => {
  return (
    <Heading
      className={cn("p-2", "text-right", className)}
      size="h5"
      weight="bold"
    >
      {level}
    </Heading>
  );
};

const ColorDemo = ({
  colorName,
  levels,
}: {
  colorName: string;
  levels: Record<string, string>;
}) => {
  return (
    <div>
      <Heading className="my-2 text-center" size="h5">
        {colorName}
      </Heading>
      {Object.keys(levels)
        .sort((l1, l2) => Number(l2) - Number(l1))
        .map((level) => (
          <ColorLevelDemo className={levels[level]} key={level} level={level} />
        ))}
    </div>
  );
};

export const ColorsDemo = () => {
  return (
    <>
      <Heading size="h4" weight="bold">
        Primary Palette
      </Heading>
      <div
        className={cn(
          "grid",
          "grid-cols-2",
          "md:grid-cols-3",
          "xl:grid-cols-4",
          "gap-4"
        )}
      >
        <ColorDemo
          colorName="Onyx"
          levels={{
            "900": "bg-onyx-900 text-onyx-0",
            "800": "bg-onyx-800 text-onyx-0",
            "700": "bg-onyx-700 text-onyx-0",
            "600": "bg-onyx-600 text-onyx-0",
            "500": "bg-onyx-500 text-onyx-0",
            "400": "bg-onyx-400 text-onyx-0",
            "300": "bg-onyx-300 text-onyx-0",
            "200": "bg-onyx-200 text-onyx-800",
            "100": "bg-onyx-100 text-onyx-800",
            "50": "bg-onyx-50 text-onyx-800",
            "25": "bg-onyx-25 text-onyx-800",
            "00": "bg-onyx-0 text-onyx-800",
          }}
        />
        <ColorDemo
          colorName="Celesteal"
          levels={{
            "900": "bg-celesteal-900 text-celesteal-100",
            "800": "bg-celesteal-800 text-celesteal-100",
            "700": "bg-celesteal-700 text-celesteal-100",
            "600": "bg-celesteal-600 text-celesteal-100",
            "500": "bg-celesteal-500 text-celesteal-800",
            "400": "bg-celesteal-400 text-celesteal-800",
            "300": "bg-celesteal-300 text-celesteal-800",
            "200": "bg-celesteal-200 text-celesteal-800",
            "100": "bg-celesteal-100 text-celesteal-800",
          }}
        />
        <ColorDemo
          colorName="Melon"
          levels={{
            "900": "bg-melon-900 text-melon-100",
            "800": "bg-melon-800 text-melon-100",
            "700": "bg-melon-700 text-melon-100",
            "600": "bg-melon-600 text-melon-100",
            "500": "bg-melon-500 text-melon-800",
            "400": "bg-melon-400 text-melon-800",
            "300": "bg-melon-300 text-melon-800",
            "200": "bg-melon-200 text-melon-800",
            "100": "bg-melon-100 text-melon-800",
          }}
        />
      </div>

      <Heading className="mt-6" size="h4" weight="bold">
        Semantic
      </Heading>
      <div
        className={cn(
          "grid",
          "grid-cols-2",
          "md:grid-cols-4",
          "xl:grid-cols-5",
          "gap-4"
        )}
      >
        <ColorDemo
          colorName="Error"
          levels={{
            "600": "bg-error-600 text-error-100",
            "500": "bg-error-500 text-error-100",
            "400": "bg-error-400 text-error-100",
            "300": "bg-error-300 text-error-600",
            "200": "bg-error-200 text-error-600",
            "100": "bg-error-100 text-error-600",
          }}
        />
        <ColorDemo
          colorName="Warning"
          levels={{
            "600": "bg-warning-600 text-warning-100",
            "500": "bg-warning-500 text-warning-100",
            "400": "bg-warning-400 text-warning-100",
            "300": "bg-warning-300 text-warning-600",
            "200": "bg-warning-200 text-warning-600",
            "100": "bg-warning-100 text-warning-600",
          }}
        />
        <ColorDemo
          colorName="Success"
          levels={{
            "600": "bg-success-600 text-success-100",
            "500": "bg-success-500 text-success-100",
            "400": "bg-success-400 text-success-100",
            "300": "bg-success-300 text-success-600",
            "200": "bg-success-200 text-success-600",
            "100": "bg-success-100 text-success-600",
          }}
        />
        <ColorDemo
          colorName="Informational"
          levels={{
            "600": "bg-info-600 text-info-100",
            "500": "bg-info-500 text-info-100",
            "400": "bg-info-400 text-info-100",
            "300": "bg-info-300 text-info-600",
            "200": "bg-info-200 text-info-600",
            "100": "bg-info-100 text-info-600",
          }}
        />
      </div>
    </>
  );
};
