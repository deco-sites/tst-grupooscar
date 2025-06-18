import {
  SendEventOnClick,
  SendEventOnView,
} from "$store/components/Analytics.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "@deco/deco/hooks";


/**
 * @titleBy alt
 */
export interface Banner {
  /** @description desktop otimized image */
  desktop: ImageWidget;
  /** @description mobile otimized image */
  mobile: ImageWidget;
  /** @description Image's alt text */
  alt: string;
  /** @description when user clicks on the image, go to this link */
  href: string;
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Show arrows
   * @description show arrows to navigate through the images
   */
  arrows?: boolean;
  /**
   * @title Show dots
   * @description show dots to navigate through the images
   */
  dots?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

const DEFAULT_PROPS = {
  images: [
    {
      alt: "/feminino",
      href: "/",
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/c007e481-b1c6-4122-9761-5c3e554512c1",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
    },
    {
      alt: "/feminino",
      href: "/",
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/c007e481-b1c6-4122-9761-5c3e554512c1",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
    },
    {
      alt: "/feminino",
      href: "/",
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/c007e481-b1c6-4122-9761-5c3e554512c1",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
    },
  ],
  preload: true,
};

function BannerItem(
  { image, lcp, id }: { image: Banner; lcp?: boolean; id: string },
) {
  const {
    alt,
    mobile,
    desktop,
    href,
  } = image;

  const device = useDevice()
  const isMobile = device == "mobile"

  return (
    <a
      id={id}
      href={href ?? "#"}
      aria-label={alt}
      class="relative overflow-y-hidden w-full"
    >
      <Image
        src={isMobile ? mobile : desktop}
        preload={lcp}
        fetchPriority={lcp ? "high" : "low"}
        loading={lcp ? "eager" : "lazy"}
        width={isMobile ? 375 : 1440}
        height={isMobile ? 492 : 480}
        class="object-cover w-full h-[calc(100vw*(492/375))] md:h-[calc(100vw*(480/1440))]"
      />
    </a>
  );
}

function Dots({ images, interval = 0 }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
        }}
      />
      <ul class="absolute bottom-5 left-1/2 -translate-x-1/2 carousel justify-center gap-2 z-10 p-2.5 row-start-4">
        {images?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index} _class={`disabled:bg-primary disabled:bg-opacity-100 bg-base-100 bg-opacity-30`}>
                <div
                  class="w-11 h-0.5"
                  style={{ animationDuration: `${interval}s` }}
                />
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

function Buttons() {
  return (
    <>
      <div class="absolute top-[calc(50%-24px)] left-4 flex items-center justify-center z-10 col-start-1 row-start-2">
        <Slider.PrevButton class="btn btn-circle bg-base-100 border border-base-200 h-8 min-h-8 w-8">
          <Icon
            class="text-base-content"
            width={8}
            height={12}
            id="ChevronLeft"
          />
        </Slider.PrevButton>
      </div>
      <div class="absolute top-[calc(50%-24px)] right-4 flex items-center justify-center z-10 col-start-3 row-start-2">
        <Slider.NextButton class="btn btn-circle bg-base-100 border border-base-200 h-8 min-h-8 w-8">
          <Icon
            class="text-base-content"
            width={8}
            height={12}
            id="ChevronRight"
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function BannerCarousel(props: Props) {
  const id = useId();
  const { images, preload, interval } = { ...DEFAULT_PROPS, ...props };

  return (
    <div
      id={id}
      class="flex relative"
    >
      <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-6">
        {images?.map((image, index) => {
          const params = { promotion_name: image.alt };
          return (
            <Slider.Item index={index} class="carousel-item w-full">
              <BannerItem
                image={image}
                lcp={index === 0 && preload}
                id={`${id}::${index}`}
              />
              <SendEventOnClick
                id={`${id}::${index}`}
                event={{ name: "select_promotion", params }}
              />
              <SendEventOnView
                id={`${id}::${index}`}
                event={{ name: "view_promotion", params }}
              />
            </Slider.Item>
          );
        })}
      </Slider>

      {props.arrows && <Buttons />}

      {props.dots && <Dots images={images} interval={interval} />}

      <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default BannerCarousel;
