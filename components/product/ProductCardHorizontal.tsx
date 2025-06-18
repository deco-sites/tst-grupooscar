import { SendEventOnClick } from "$store/components/Analytics.tsx";
import WishlistButtonVtex from "../../islands/WishlistButton/vtex.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  /**@hidden true*/
  type?: "PLP" | "HOME" | "PDP";
}

const WIDTH = 150;
const HEIGHT = 150;

function ProductCard({
  product,
  preload,
  itemListName,
  index,
  type = "HOME",
}: Props) {
  const { url, productID, image: images, offers, isVariantOf, brand } = product;
  const name = isVariantOf?.name;
  const brandName = brand?.name || "";
  const id = `product-card-${productID}`;
  const productGroupID = isVariantOf?.productGroupID;
  const [front] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);

  return (
    <a
      href={url?.split("?sku")[0]}
      aria-label="view product"
      id={id}
      class={`card card-compact flex-row gap-1.5 group w-full text-primary-content bg-base-100 p-1.5`}
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />
      <figure
        class="relative overflow-hidden min-w-[150px]"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        {/* Wishlist button */}

        <div
          class={`absolute top-2 lg:top-4 justify-between w-[90%] z-10 flex items-center`}
        >
          <div
            class={``}
          >
            <WishlistButtonVtex
              productGroupID={productGroupID}
              productID={productID}
              _class={`h-5 min-h-5 w-5`}
            />
          </div>
        </div>

        {/* Product Images */}
        <div class="grid grid-cols-1 grid-rows-1 w-full">
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={`col-span-full row-span-full rounded-xl w-[${WIDTH}px] h-[${HEIGHT}px]`}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
        </div>
      </figure>
      {/* Prices & Name */}
      <div class="flex-auto flex flex-col p-2 gap-3">
        {
          /* SKU Selector
        {(!l?.elementsPositions?.skuSelector ||
          l?.elementsPositions?.skuSelector === "Top") && (
          <>
            {l?.hide?.skuSelector
              ? (
                ""
              )
              : (
                <ul
                  class={`flex items-center gap-2 w-full overflow-auto p-3 ${
                    align === "center" ? "justify-center" : "justify-start"
                  } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
                >
                  {skuSelector}
                </ul>
              )}
          </>
        )} */
        }

        <div class="flex flex-col gap-1.5">
          {/* Discount % */}
          {listPrice && price && listPrice != price &&
            (
              <>
                <div class="text-xs uppercase font-semibold flex gap-1.5 items-center justify-start">
                  <Icon id="tag-card-discount" width={13} height={12} />
                  <span class="text-base-content">
                    {Math.round(((listPrice - price) / listPrice) * 100)}% OFF
                  </span>
                </div>
              </>
            )}
          <div>
            <span
              class={`text-xs text-base-content text-opacity-60 font-medium`}
            >
              {brandName}
            </span>
          </div>
          <h2 class="text-sm h-10 max-h-10 overflow-hidden text-container text-primary-content font-normal">
            {name}
          </h2>
        </div>
        <div class="flex flex-col gap-2">
          <div
            class={`flex gap-2 items-center`}
          >
            {listPrice && price && listPrice > price &&
              (
                <div
                  class={`line-through text-base-content text-opacity-60 text-xs font-normal leading-none`}
                >
                  {formatPrice(listPrice, offers?.priceCurrency)}
                </div>
              )}
            <div class="text-primary font-semibold leading-none">
              {formatPrice(price, offers?.priceCurrency)}
            </div>
          </div>
          <div>
            <span class="text-base-content text-xs text-opacity-60 truncate leading-none">
              em até {installments?.replace("ou", "").split("no ")[0]}
            </span>
          </div>
        </div>
        {
          /* {l?.hide?.installments
                ? (
                  ""
                )
                : (
                  <li>
                    <span class="text-base-300 font-light text-sm truncate">
                      ou {installments}
                    </span>
                  </li>
                )} */
        }

        {
          /* SKU Selector
        {l?.elementsPositions?.skuSelector === "Bottom" && (
          <>
            <ul
              class={`flex items-center gap-2 w-full ${
                align === "center" ? "justify-center" : "justify-between"
              } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
            >
              {l?.hide?.skuSelector
                ? (
                  ""
                )
                : (
                  <li>
                    <ul class="flex items-center gap-2">{skuSelector}</ul>
                  </li>
                )}
            </ul>
          </>
        )} */
        }
      </div>
    </a>
  );
}

export default ProductCard;
