import type { Platform } from "$store/apps/site.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import WishlistButtonVtex from "../../islands/WishlistButton/vtex.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { relative } from "$store/sdk/url.ts";
import Icon from "$store/components/ui/Icon.tsx";
import { PricePix, PricePixCard } from "site/components/product/PricePix.tsx";
import { Props as ShowPix } from "site/loaders/Pix/showPix.ts"

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
  };
  elementsPositions?: {
    favoriteIcon?: "Top right" | "Top left";
  };
  hide?: {
    productName?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    discount?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    cta?: boolean;
    favoriteIcon?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    card?: "None" | "Move up";
    showFavoriteIcon?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
  configPix?: ShowPix;
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  layout?: Layout;
  platform?: Platform;
  /**@hidden */
  type?: "PLP" | "HOME" | "PDP";
}

const WIDTH = 278;
const HEIGHT = 278;

function ProductCard({
  product,
  preload,
  itemListName,
  layout,
  platform,
  index,
  type = "HOME",
}: Props) {
  const { url, productID, image: images, offers, isVariantOf, brand } = product;
  const name = isVariantOf?.name;
  const brandName = brand?.name || "";
  const id = `product-card-${productID}`;
  const productGroupID = isVariantOf?.productGroupID;
  const description = product.description || isVariantOf?.description;
  const [front, back] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);

  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";
  const relativeUrl = relative(url);
  const cta = (
    <a
      href={url?.split("?sku")[0]}
      aria-label="view product"
      class="bg-accent flex gap-3 justify-center items-center duration-200 rounded-[500px] px-6 py-3.5 w-full text-sm uppercase lg:hover-bag font-bold text-white lg:w-[165px] lg:bg-transparent lg:border lg:border-primary-content lg:text-primary-content lg:hover:bg-accent lg:hover:text-white lg:hover:border-accent"
    >
      <Icon
        id="bagBuyBtn"
        width={14}
        height={16}
        class={`lg:text-primary-content duration-200`}
      />
      {l?.basics?.ctaText || "Comprar"}
    </a>
  );

  return (
    <a
      href={url?.split("?sku")[0]}
      aria-label="view product"
      id={id}
      class={`card card-compact group w-full text-primary-content bg-base-100 p-1.5 ${
        align === "center" ? "text-center" : "text-start"
      } ${l?.onMouseOver?.showCardShadow ? "lg:hover:card-bordered" : ""}
        ${
        l?.onMouseOver?.card === "Move up" &&
        "duration-500 transition-translate ease-in-out lg:hover:-translate-y-2"
      }
      `}
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
        class="relative overflow-hidden"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        {/* Wishlist button */}

        <div
          class={`absolute top-2 lg:top-4 justify-between w-[90%] z-10 flex items-center
            ${
            l?.elementsPositions?.favoriteIcon === "Top left"
              ? "left-2"
              : "right-2 lg:right-3.5"
          }
            
          `}
        >
          {/* Discount % */}
          {!l?.hide?.discount && (
            <>
              {listPrice && price && listPrice != price &&
                (
                  <>
                    <div class="text-xs uppercase font-semibold flex gap-1.5 items-center justify-center bg-base-100 rounded-badge px-2.5 py-1">
                      <Icon id="tag-card-discount" width={13} height={12} />
                      <span class="text-base-content">
                        {Math.round(((listPrice - price) / listPrice) * 100)}%
                        OFF
                      </span>
                    </div>
                  </>
                )}
              <div
                class={`${l?.hide?.favoriteIcon ? "hidden" : "block"} ${
                  l?.onMouseOver?.showFavoriteIcon ? "lg:group-hover:block" : ""
                }`}
              >
                  <WishlistButtonVtex
                    productGroupID={productGroupID}
                    productID={productID}
                    _class={`h-5 min-h-5 w-auto`}
                  />
              </div>
            </>
          )}
        </div>

        {/* Product Images */}
        <div
          class="grid grid-cols-1 grid-rows-1 w-full"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={`col-span-full row-span-full w-full rounded-xl ${
              l?.onMouseOver?.image == "Zoom image"
                ? "duration-100 transition-scale scale-100 lg:group-hover:scale-125"
                : ""
            }`}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          {(!l?.onMouseOver?.image ||
            l?.onMouseOver?.image == "Change image") && (
            <Image
              src={back?.url ?? front.url!}
              alt={back?.alternateName ?? front.alternateName}
              width={WIDTH}
              height={HEIGHT}
              class="col-span-full row-span-full transition-opacity rounded-xl w-full opacity-0 lg:group-hover:opacity-100"
              sizes="(max-width: 640px) 50vw, 20vw"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
        <figcaption
          class={`
          absolute bottom-1 left-0 w-full flex flex-col gap-3 p-2 ${
            l?.onMouseOver?.showCta
              ? "transition-opacity opacity-0 lg:group-hover:opacity-100"
              : "lg:hidden"
          }`}
        >
          {
            /* SKU Selector
          {l?.onMouseOver?.showSkuSelector && (
            <ul class="flex justify-center items-center gap-2 w-full">
              {skuSelector}
            </ul>
          )} */
          }
          {l?.onMouseOver?.showCta && cta}
        </figcaption>
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

        {l?.hide?.productName && l?.hide?.productDescription
          ? (
            ""
          )
          : (
            <div class="flex flex-col gap-1.5">
              <div>
                <span
                  class={`text-xs text-base-content text-opacity-60 font-medium`}
                >
                  {brandName}
                </span>
              </div>
              {l?.hide?.productName
                ? (
                  ""
                )
                : type == "HOME"
                ? (
                  <>
                    <h3 class="lg:hidden text-sm h-10 max-h-10 overflow-hidden text-primary-content font-normal">
                      {name && name.length > 35
                        ? name?.slice(0, 30) + "..."
                        : name}
                    </h3>
                    <h3 class="hidden lg:flex text-sm min-h-[42px] h-[42px] overflow-hidden text-primary-content font-normal">
                      {name && name.length > 60
                        ? name?.slice(0, 60) + "..."
                        : name}
                    </h3>
                  </>
                )
                : type == "PLP"
                ? (
                  <>
                    <h2 class="lg:hidden text-sm h-10 max-h-10 overflow-hidden text-primary-content font-normal">
                      {name && name.length > 35
                        ? name?.slice(0, 30) + "..."
                        : name}
                    </h2>
                    <h2 class="hidden lg:flex text-base leading-5 min-h-[42px] h-[42px] overflow-hidden text-primary-content font-normal">
                      {name && name.length > 60
                        ? name?.slice(0, 60) + "..."
                        : name}
                    </h2>
                  </>
                )
                : (
                  <>
                    <h3 class="lg:hidden text-sm h-10 max-h-10 overflow-hidden text-primary-content font-normal">
                      {name && name.length > 35
                        ? name?.slice(0, 30) + "..."
                        : name}
                    </h3>
                    <h3 class="hidden lg:flex text-base leading-5 min-h-[42px] h-[42px] overflow-hidden text-primary-content font-normal">
                      {name && name.length > 60
                        ? name?.slice(0, 60) + "..."
                        : name}
                    </h3>
                  </>
                )}
              {l?.hide?.productDescription
                ? (
                  ""
                )
                : (
                  <div
                    class="truncate text-sm lg:text-sm text-neutral"
                    dangerouslySetInnerHTML={{ __html: description ?? "" }}
                  />
                )}
            </div>
          )}
        {l?.hide?.allPrices
          ? (
            ""
          )
          : (
            <div class="flex flex-col gap-2">
              <div
                class={`flex gap-2 ${
                  l?.basics?.oldPriceSize === "Normal"
                    ? "lg:flex-row-reverse lg:gap-2"
                    : ""
                } ${
                  align === "center"
                    ? "justify-center"
                    : "justify-start items-end"
                }`}
              >
                {listPrice && price && listPrice > price &&
                  (
                    <div
                      class={`line-through text-base-content text-opacity-60 text-xs font-normal leading-none ${
                        l?.basics?.oldPriceSize === "Normal" ? "lg:text-sm" : ""
                      }`}
                    >
                      {formatPrice(listPrice, offers?.priceCurrency)}
                    </div>
                  )}
                <div class="text-primary font-semibold leading-none">
                  {formatPrice(price, offers?.priceCurrency)}
                </div>
              </div>
              {price && <PricePixCard price={price} configPix={layout?.configPix} />}
              <div>
                <span class="text-base-content text-xs text-opacity-60 truncate leading-none">
                  em até {installments?.replace("ou", "").split("no ")[0]}
                </span>
              </div>
            </div>
          )}
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
        {!l?.hide?.cta
          ? (
            <div
              class={`flex-auto flex items-end ${
                l?.onMouseOver?.showCta ? "lg:hidden" : ""
              }`}
            >
              {cta}
            </div>
          )
          : (
            ""
          )}
      </div>
    </a>
  );
}

export default ProductCard;
