import type { ImageWidget } from "apps/admin/widgets.ts";
import { useId } from "$store/sdk/useId.ts";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";

/** @titleBy altText */
export interface Item {
  image: ImageWidget;
  href: string;
  altText: string;
}

export interface Props {
  title: string;
  items: Item[];
  arrowsDisplay?: boolean;
}

function Card({ image, href, altText }: Item) {
  return (
    <a
      href={href}
      class="flex flex-col gap-3 items-center justify-center w-[33vw] lg:w-[120px]"
    >
      <img
        src={image}
        alt={altText}
        width={120}
        height={120}
        loading="lazy"
        decoding={"async"}
        class={`w-full aspect-square object-contain rounded-full`}
      />
    </a>
  );
}

function BrandCarousel({ title, items, arrowsDisplay }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class={`w-full bg-base-300`}
    >
      <div class={`flex flex-col gap-8 py-8 w-11/12 mx-auto relative`}>
        <h2 class="text-xl lg:w-max mx-auto uppercase font-normal lg:text-2xl">
          {title}
        </h2>
        <Slider class={`carousel w-full flex gap-8 max-w-[1640px] lg:w-11/12 mx-auto`}>
          {items.map((i, index) => (
            <Slider.Item
              index={index}
              class={`carousel-item first:pl-4 last:pr-4 md:first:pl-0 md:last:pr-0`}
            >
              <Card {...i} />
            </Slider.Item>
          ))}
        </Slider>
        {arrowsDisplay && (
          <div
            class={`absolute w-full -bottom-[60px] left-1/2 -translate-x-1/2 hidden lg:flex items-center justify-between gap-2 lg:justify-between lg:top-1/2 lg:bottomUnset lg:pointer-events-none`}
          >
            <div class="block z-10 col-start-1 row-start-3 lg:pointer-events-auto">
              <Slider.PrevButton class="btn btn-circle bg-base-100 border border-base-200 h-8 min-h-8 w-8">
                <Icon
                  class="text-base-content"
                  width={8}
                  height={12}
                  id="ChevronLeft"
                />
              </Slider.PrevButton>
            </div>
            <div class="block z-10 col-start-3 row-start-3 lg:pointer-events-auto">
              <Slider.NextButton class="btn btn-circle bg-base-100 border border-base-200 h-8 min-h-8 w-8">
                <Icon
                  class="text-base-content"
                  width={8}
                  height={12}
                  id="ChevronRight"
                />
              </Slider.NextButton>
            </div>
          </div>
        )}
        <SliderJS rootId={id} infinite />
      </div>
    </div>
  );
}

export default BrandCarousel;
