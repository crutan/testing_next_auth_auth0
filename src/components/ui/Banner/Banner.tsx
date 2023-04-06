import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import { cva, VariantProps } from "class-variance-authority";
import { BannerBaseProps, ComponentIcon } from "interface";

import { VariantIcons } from "../shared.types";

import { cn } from "@/lib/utils/twHelpers";

export type BannerProps = VariantProps<typeof BannerBase> & BannerBaseProps;

const BannerBase = cva(["flex w-full py-4 px-[18px]"], {
  variants: {
    variant: {
      neutral: "bg-gray-100 text-gray-500",
      info: "bg-info-100 text-info-500",
      success: "bg-success-100 text-success-500",
      warning: "bg-warning-100 text-warning-500",
      error: "bg-error-100 text-error-500",
    },
    fixed: {
      true: "fixed top-0 z-40",
    },
  },
});

const _IconColor = cva([], {
  variants: {
    variant: {
      neutral: "bg-gray-100 text-gray-500",
      info: "fill-info-500 text-info-500",
      success: "fill-success-500 text-success-500",
      warning: "fill-warning-500 text-warning-500",
      error: "fill-error-500 text-error-500",
    },
  },
});

const Banner = ({
  bannerId,
  variant,
  fixed,
  children,
  className,
  linkLabel,
  linkUrl,
  dismissable = true,
  initValue = true,
  ...rest
}: BannerProps) => {
  const id = `banner-${bannerId}`;
  const [visible, setVisible] = useState<boolean>();
  const [bannerClose, setBannerClose] = useState<boolean>(visible || initValue);

  useEffect(() => {
    const isVisible = localStorage.getItem(id);
    const parsed = isVisible && JSON.parse(isVisible);
    if (parsed === true || parsed === false) {
      setVisible(parsed);
    } else {
      setVisible(initValue);
    }
  }, [id, initValue]);

  useEffect(() => {
    if (visible !== undefined) {
      localStorage.setItem(id, JSON.stringify(visible));
    }
  }, [visible, id]);

  const toggleVisible = (value: boolean) => {
    setBannerClose(value);
    setTimeout(() => {
      setVisible(value);
    }, 1000);
  };

  if (!visible) return null;

  return (
    <Transition
      data-testid="callout-transition"
      leave="transition-opacity duration-1000"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      show={bannerClose}
    >
      <div
        className={cn(BannerBase({ variant, fixed }), className)}
        data-testid="banner"
        {...rest}
      >
        {variant !== "neutral" && (
          <div
            className={cn(_IconColor({ variant }), "flex w-8 grow-0")}
            data-testid="banner-icon"
          >
            <ComponentIcon
              className={_IconColor({ variant })}
              icon={VariantIcons[variant]}
            />
          </div>
        )}
        <div
          className="flex flex-1 flex-col justify-center gap-3"
          data-testid="banner-children"
        >
          <p className="font-semibold line-clamp-2">{children}</p>
          {linkLabel && linkUrl && (
            <Link
              className="inline-flex items-center gap-1 font-semibold"
              data-testid="banner-link"
              href={linkUrl}
            >
              {linkLabel}
              <ComponentIcon icon="ArrowLongRightIcon" size="base" />
            </Link>
          )}
        </div>
        {dismissable && (
          <div
            className={cn(
              "flex w-8 grow-0 items-start justify-end",
              _IconColor({ variant })
            )}
            data-testid="banner-dismiss-container"
          >
            <button
              data-testid="banner-dismiss"
              onClickCapture={() => toggleVisible(false)}
            >
              <ComponentIcon format="solid" icon="XMarkIcon" />
            </button>
          </div>
        )}
      </div>
    </Transition>
  );
};

export default Banner;
