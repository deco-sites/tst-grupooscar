import type { Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";


interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;
  type?: string;
  class?: string;

  /**@hide true */
  displayHorizontal?: boolean;
}

const WIDTH = 120;
const HEIGHT = 120;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

function ProductCard({
  product,
  preload,
  class: _class,
}: Props) {
  const { url, image: images, offers, isVariantOf } = product;
  const title = isVariantOf?.name ?? product.name;
  const [front, back] = images ?? [];

  const { listPrice, price, installments } = useOffer(offers);

  const relativeUrl = url

  return (
    <div
      class={`w-full card card-compact group text-sm flex-col`}
    >
      <figure
        class={
          `relative bg-[#F5F5F5] rounded-none max-w-full h-full max-h-[80px] lg:max-h-[120px]`}
        style={{ aspectRatio: ASPECT_RATIO }}
      >
        {/* Product Images */}
        <a
          href={relativeUrl}
          aria-label="view product"
          class={"relative w-full h-full"}
        >
          {/* Imagem Frontal */}
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            style={{ aspectRatio: ASPECT_RATIO }}
            class={
              "absolute inset-0 object-contain w-full h-full opacity-100 lg:group-hover:opacity-0 mix-blend-darken"
            }
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />

          {/* Imagem Secundária / Back */}
          <Image
            src={back?.url ?? front.url!}
            alt={back?.alternateName ?? front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            style={{ aspectRatio: ASPECT_RATIO }}
            class={
              "absolute inset-0 object-contain w-full h-full opacity-0 lg:group-hover:opacity-100 mix-blend-darken"
            }
            sizes="(max-width: 640px) 50vw, 20vw"
            loading="lazy"
            decoding="async"
          />
        </a>

        {/* Tags */}
        <div class="flex flex-col items-start gap-1.5 absolute left-1.5 top-1.5">
          {product.additionalProperty?.map((productItem) => {
            if (productItem.value?.includes("Lançamentos")) {
              return (
                <div class="bg-white rounded-[500px] px-1 lg:px-2.5 py-1 flex gap-1.5 items-center">
                  {/* <Icon id="lauch" width={12} height={12} /> */}
                </div>
              );
            }

            if (productItem.value?.includes("Liquida Kikos")) {
              return (
                <div class="bg-white rounded-[500px] px-1 lg:px-2.5 py-1 flex gap-1.5 items-center">
                  {/* <Icon id="timer" width={12} height={12} /> */}
                </div>
              );
            }
          })}
        </div>

        {/* Wishlist button */}
        <div class="flex items-center justify-center absolute right-2 top-2 ">
          {/* <WishlistButton item={item} variant="icon" /> */}
        </div>

      </figure>

      <div class="pt-3 flex flex-col gap-1 items-start">
        <a href={relativeUrl} class="w-full flex flex-col gap-1.5 items-start">
          <span class="text-base w-full line-clamp-2 text-black">
            {title}
          </span>

          <div class="flex items-center flex-wrap">
            {price && listPrice && listPrice > price && (
              <span class="line-through text-xs lg:text-base font-normal text-[#00000099]">
                {formatPrice(listPrice, offers?.priceCurrency)}
              </span>
            )}

            <span class="font-semibold text-sm lg:text-lg text-[#B51010] ">
              {formatPrice(price, offers?.priceCurrency)}
            </span>

            {installments && (
              <span class="text-xs lg:text-[13px] font-normal text-[#00000099]">
                ou {installments}
              </span>
            )}
          </div>
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
