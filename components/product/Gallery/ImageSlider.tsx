import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { ImageObject } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import WishlistButtonVtex from "$store/islands/WishlistButton/vtex.tsx";
import { useUI } from "site/sdk/useUI.ts";
import ImageZoom from "site/islands/ProductImageZoom.tsx";
export interface Props {
  images: ImageObject[];
  productID: string;
  productGroupID: string;
  device?: "mobile" | "tablet" | "desktop";
}

export default function GallerySlider(
  { images, productID, productGroupID, device }: Props,
) {
  const id = useId();
  const { imagesProductSimilar, skuIDCart } = useUI();

  const newImages = imagesProductSimilar.value.length > 0
    ? imagesProductSimilar.value
    : images;
  const newProductId = skuIDCart.value !== "" ? skuIDCart.value : productID;
  const newProductGroupId = skuIDCart.value !== "" ? skuIDCart.value : productGroupID;

  if (device == "desktop") {
    return (
      <div class={`flex flex-col w-full relative`}>
        <ImageZoom images={newImages} width={800} height={800} />
        <WishlistButtonVtex
          variant="icon"
          productID={newProductId}
          productGroupID={newProductGroupId}
          _class={`h-11 min-h-11 w-11 absolute right-3 top-3 z-10`}
        />
        <ul class={`grid ${newImages.length > 1 ? "grid-cols-2" : "grid-cols-1"} gap-1`}>
          {newImages.map((img, index) => (
            <li
              class="w-full relative"
            >
              <Image
                class={`w-full ${newImages.length > 1 ? "lg:max-w-[520px] lg:max-h-[520px]" : "lg:max-w-[700px] 2xl:max-w-[1000px]"} lg:mx-auto rounded-lg`}
                src={img.url!}
                alt={img.alternateName}
                width={600}
                height={600}
                // Preload LCP image for better web vitals
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
              <ImageZoom images={newImages} width={800} height={800} indexOpen={index} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
  return (
    <div id={id} class="grid lg:hidden grid-flow-row lg:grid-flow-col grid-cols-1 lg:grid-cols-[min-content_1fr]">
      {/* Image Slider */}
      <div class="col-start-1 col-span-1 lg:col-start-2">
        <div class="relative h-min flex-grow">
          <Slider class="carousel carousel-center gap-6 w-screen lg:w-[40vw] lg:max-w-[520px]">
            {newImages.map((img, index) => (
              <Slider.Item
                index={index}
                class="carousel-item w-full relative"
              >
                <Image
                  class="w-full lg:max-w-[520px] lg:max-h-[520px] lg:mx-auto lg:border lg:border-black lg:border-opacity-15 lg:rounded-xl"
                  src={img.url!}
                  alt={img.alternateName}
                  width={520}
                  height={520}
                  // Preload LCP image for better web vitals
                  preload={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <ImageZoom images={newImages} width={800} height={800} indexOpen={index} />
              </Slider.Item>
            ))}
          </Slider>

          {
            /* <div class="absolute top-2 right-2 bg-base-100 rounded-full">
            <ProductImageZoom
              images={images}
              width={700}
              height={Math.trunc(700)}
            />
          </div> */
          }
          <WishlistButtonVtex
            variant="icon"
            productID={newProductId}
            productGroupID={newProductGroupId}
            _class={`h-11 min-h-11 w-11 absolute right-3 top-3`}
          />
        </div>
      </div>

      {/* Dots */}
      <div class="col-start-1 col-span-1">

        <ul class="w-full flex h-[4px]">
          {newImages.map((img, index) => (
            <Slider.Dot
              index={index}
              _class={`disabled:bg-primary h-[4px] flex-1 bg-base-200`}
            >
              <div class="">
                <div class="" />
              </div>
            </Slider.Dot>
          ))}
        </ul>
      </div>
      <div class={`absolute`}>
        <SliderJS rootId={id} infinite />
      </div>
    </div>
  );
}
