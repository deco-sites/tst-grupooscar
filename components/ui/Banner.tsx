import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

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
  borderRadius: BorderRadius;
}

const RADIUS = {
  "none": "rounded-none",
  "sm": "rounded-sm",
  "md": "rounded-md",
  "lg": "rounded-lg",
  "xl": "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  "full": "rounded-full",
};

export default function BannnerGrid(
  { srcMobile, srcDesktop, alt, href, borderRadius }: Props,
) {
  return (
    <div
      class={`flex w-full py-4 bg-base-300 lg:py-8`}
    >
      <a href={href} class={`w-11/12 mx-auto `}>
        <Picture>
          <Source
            media="(max-width: 767px)"
            src={srcMobile}
            width={344}
            height={334}
          />
          <Source
            media="(min-width: 768px)"
            src={srcDesktop ? srcDesktop : srcMobile}
            width={1312}
            height={420}
          />
          <img
            class={`${
              RADIUS[borderRadius ?? "none"]
            } w-full h-[calc(92vw*(334/344))] md:h-[calc(92vw*(420/1312))]`}
            src={srcMobile}
            alt={alt}
            decoding="async"
            loading="lazy"
          />
        </Picture>
      </a>
    </div>
  );
}
