import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  srcMobile: ImageWidget;
  srcDesktop?: ImageWidget;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description When you click you go to
   */
  href: string;
}

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface Props {
  title?: string;
  /**
   * @description Default is 2 for mobile and all for desktop
   */
  itemsPerLine: {
    /** @default 2 */
    mobile?: 1 | 2;
    /** @default 4 */
    desktop?: 1 | 2 | 4 | 6 | 8;
  };
  /**
   * @description Item's border radius in px
   */
  borderRadius: {
    /** @default none */
    mobile?: BorderRadius;
    /** @default none */
    desktop?: BorderRadius;
  };
  banners: Banner[];
}

const MOBILE_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const DESKTOP_COLUMNS = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  4: "sm:grid-cols-4",
  6: "sm:grid-cols-6",
  8: "sm:grid-cols-8",
};

const RADIUS_MOBILE = {
  "none": "rounded-none",
  "sm": "rounded-sm",
  "md": "rounded-md",
  "lg": "rounded-lg",
  "xl": "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  "full": "rounded-full",
};

const RADIUS_DESKTOP = {
  "none": "sm:rounded-none",
  "sm": "sm:rounded-sm",
  "md": "sm:rounded-md",
  "lg": "sm:rounded-lg",
  "xl": "sm:rounded-xl",
  "2xl": "sm:rounded-2xl",
  "3xl": "sm:rounded-3xl",
  "full": "sm:rounded-full",
};

export default function BannnerGrid(props: Props) {
  const {
    title,
    itemsPerLine,
    borderRadius,
    banners = [],
  } = { ...props };

  return (
    <div class="bg-base-300 w-full py-8 lg:py-10">
      <div class="w-11/12 mx-auto flex flex-col gap-4 items-center justify-center">
        {title &&
          (
            <h2 class="text-xl lg:w-max mx-auto uppercase font-normal lg:text-2xl">
              {title}
            </h2>
          )}
        <div
          class={`grid gap-4 md:gap-6 ${
            MOBILE_COLUMNS[itemsPerLine?.mobile ?? 2]
          } ${DESKTOP_COLUMNS[itemsPerLine?.desktop ?? 4]}`}
        >
          {banners.map(({ href, srcMobile, srcDesktop, alt }) => (
            <a
              href={href}
              class={`overflow-hidden ${
                RADIUS_MOBILE[borderRadius.mobile ?? "none"]
              } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]} `}
            >
              <Picture>
                <Source
                  media="(max-width: 767px)"
                  src={srcMobile}
                  width={343}
                  height={334}
                />
                <Source
                  media="(min-width: 768px)"
                  src={srcDesktop ? srcDesktop : srcMobile}
                  width={644}
                  height={314}
                />
                <img
                  class="w-full"
                  sizes="(max-width: 640px) 100vw, 30vw"
                  src={srcMobile}
                  alt={alt}
                  decoding="async"
                  loading="lazy"
                />
              </Picture>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
