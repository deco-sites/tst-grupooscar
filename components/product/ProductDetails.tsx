import { SendEventOnView } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import ProductSelector, {
  mapProductToSlimProductVariant,
} from "./ProductVariantSelector.tsx";
import { AppContext } from "$store/apps/site.ts";
import GallerySlider from "$store/islands/ProductImageSlider.tsx";
import ProductName from "$store/islands/ProductName.tsx";
import ProductPrice from "$store/islands/ProductPrice.tsx";
import ProductDescription from "$store/components/product/ProductDescription.tsx";
import type { Tag } from "$store/components/product/ProductTags.tsx";
import { mapProductToAnalyticsItem } from "$store/sdk/productAnalytics.ts";
import { type SectionProps } from "@deco/deco";
import { type Section } from "@deco/deco/blocks";
import Installments from "site/islands/Product/Installments.tsx";
import AggregateRating from "site/components/trustvox/aggregateRating.tsx";
import { Review } from "site/loaders/Trustvox/productDetailsPage.ts";
import { storeId } from "site/constants.tsx";
import Reviews from "site/components/trustvox/ReviewsCarousel.tsx";
import { Props as ShowPix } from "site/loaders/Pix/showPix.ts";
import SellerName from "site/islands/Product/SellerName.tsx";
import BuyBox from "site/components/product/BuyBox/BuyBox.tsx";
import ProductsVisited from "site/islands/Product/ProductVisited.tsx";

interface Props {
  page: ProductDetailsPage | null;
  configPix: ShowPix;
  section?: Section;
  tags?: Tag[];
  showBuybox?: boolean
}
function ProductInfo(
  { page, device, section, tags, rating, reviews, configPix, showBuybox = false }: SectionProps<
    typeof loader
  >,
) {
  const platform = usePlatform();
  const id = useId();
  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }
  const { product, breadcrumbList } = page;
  const {
    productID,
    offers,
    gtin,
    isVariantOf,
    image: images = [],
    brand,
  } = product;
  const description = product.description || isVariantOf?.description;
  const { price = 0, listPrice, seller = "1", installments, availability } =
    useOffer(offers);
  const sellerName = offers?.offers[0]?.sellerName || "";
  const model = gtin || isVariantOf?.model || "";
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };
  const eventItem = mapProductToAnalyticsItem({
    product,
    price,
    listPrice,
    skuID: product.sku
  });

  return (
    <>
      <div class={`flex flex-col gap-4 bg-base-300 lg:pt-4`} id={id}>
        <div
          class={`flex flex-col gap-3 lg:flex-row lg:justify-between lg:w-11/12 lg:mx-auto lg: lg:gap-10`}
        >
          <div class={`flex flex-col gap-3`}>
            {device == "desktop" &&
              (
                <>
                  <GallerySlider
                    images={images || []}
                    productID={productID}
                    productGroupID={productGroupID}
                    device="desktop"
                  />
                </>
              )}
            {device == "mobile" &&
              (
                <>
                  <GallerySlider
                    images={images || []}
                    productID={productID}
                    productGroupID={productGroupID}
                  />
                  <Breadcrumb
                    itemListElement={breadcrumb.itemListElement}
                    _class={`w-11/12 mx-auto pb-2 border-b border-base-200`}
                  />
                  {brand &&
                    (
                      <div
                        class={`w-11/12 mx-auto flex items-center justify-between`}
                      >
                        <span
                          class={`text-xs text-base-content text-opacity-60`}
                        >
                          {brand.name}
                        </span>
                        <AggregateRating
                          activeAnchor={true}
                          rating={rating || 0}
                          reviewsCount={reviews.length}
                          showReviewsCount={true}
                        />
                      </div>
                    )}
                  <ProductName
                    name={isVariantOf?.name || ""}
                    device={device}
                    model={model}
                  />
                  {offers !== undefined && offers?.offers.length > 1 && <BuyBox showBuyBox={showBuybox} offers={offers.offers} />}
                  <ProductPrice
                    offers={offers}
                    device={device}
                    configPix={configPix}
                  />
                </>
              )}
          </div>
          {/**@ts-ignore: images never undefined*/}
          <div
            class={`flex flex-col gap-3 lg:w-[45%] ${images?.length > 1 ? "lg:max-w-[530px]" : "lg:max-w-[650px]"
              } lg:gap-4`}
          >
            {device == "desktop" &&
              (
                <>
                  <Breadcrumb
                    itemListElement={breadcrumb.itemListElement}
                    _class={`pt-0 pb-2.5 border-b border-black border-opacity-15`}
                  />
                  {brand &&
                    (
                      <div class={`w-full flex items-center justify-between`}>
                        <span
                          class={`text-xs text-base-content text-opacity-60`}
                        >
                          {brand.name}
                        </span>
                        <AggregateRating
                          activeAnchor={true}
                          rating={rating || 0}
                          reviewsCount={reviews.length}
                          showReviewsCount={true}
                        />
                      </div>
                    )}
                  <ProductName
                    name={isVariantOf?.name || ""}
                    device={device}
                    model={model}
                  />
                  {offers !== undefined && offers?.offers.length > 1 && <BuyBox showBuyBox={showBuybox} offers={offers.offers} />}
                  <ProductPrice
                    offers={offers}
                    device={device}
                    configPix={configPix}
                  />
                </>
              )}
            {/* Sku Selector */}
            <div class="w-11/12 mx-auto lg:w-full">
              <ProductSelector
                product={product}
              />
            </div>
            <>
              {availability === "https://schema.org/InStock"
                ? (
                  <>
                    {platform === "vtex" && (
                      <>
                        <AddToCartButtonVTEX
                          eventParams={{ items: [eventItem] }}
                          productID={productID}
                          seller={seller}
                        />
                        <div
                          class={`flex flex-col lg:flex-row items-center justify-between gap-3`}
                        >
                          <Installments
                            installments={product.offers?.offers[0]!}
                            price={price}
                          />
                          {sellerName.length > 0 &&
                            (
                              <div>
                                <SellerName sellerId={seller} seller={sellerName} />
                              </div>
                            )}
                          {/* <BuyWhatsApp /> */}
                        </div>
                      </>
                    )}
                  </>
                )
                : <OutOfStock productID={productID} />}
            </>
            {/* Shipping Simulation */}
            <div class="w-11/12 mx-auto lg:w-full">
              {platform === "vtex" && (
                <ShippingSimulation
                  productSKU={product.sku}
                  price={price}
                  name={isVariantOf?.name}
                />
              )}
            </div>

            <div class={`flex w-11/12 mx-auto lg:w-full`}>
              {/* Description card */}
              {description && (
                <>
                  <ProductDescription description={description} tags={tags} />
                </>
              )}
            </div>
            {device == "mobile" &&
              (
                <>
                  {/* Add to Cart and Favorites button */}
                  <div class="z-40 fixed bottom-0 w-full background-gradient-primary">
                    {/* Prices */}
                    {availability === "https://schema.org/InStock"
                      ? (
                        <>
                          {platform === "vtex" && (
                            <>
                              <AddToCartButtonVTEX
                                eventParams={{ items: [eventItem] }}
                                productID={productID}
                                seller={seller}
                              />
                            </>
                          )}
                        </>
                      )
                      : <OutOfStock productID={productID} />}
                  </div>
                </>
              )}
            {/* Analytics Event */}
            <SendEventOnView
              id={id}
              event={{
                name: "view_item",
                params: {
                  currency: "BRL",
                  value: price,
                  items: [
                    mapProductToAnalyticsItem({
                      item_list_name: "Product",
                      item_list_id: "product",
                      productGroupID: product.productID,
                      skuID: product.sku,
                      product,
                      breadcrumbList: breadcrumb,
                      price,
                      listPrice,
                      index: 0,
                    }),
                  ],
                },
              }}
            />
          </div>
        </div>
        {section &&
          <section.Component {...section.props} />}
        <Reviews reviews={reviews} rating={rating} />
      </div>
      <script
        defer
        id="sizebay-vfr-v4"
        src="https://static.sizebay.technology/4425/prescript.js"
      >
      </script>
      <ProductsVisited productId={productID} />
    </>
  );
}

export const loader = async (
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<
  Props & { device: string; rating: number | null; reviews: Review[] }
> => {
  if (!props.page) {
    throw new Error("Missing Product Details Page Info");
  }

  const { isVariantOf } = props.page.product;
  const productGroupID = isVariantOf?.productGroupID || "";

  if (!productGroupID) {
    throw new Error("Missing Product ID");
  }

  const headersList = {
    accept: "application/vnd.trustvox-v2+json",
  };

  const url =
    `https://trustvox.com.br/widget/opinions?code=${productGroupID}&store_id=${storeId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headersList,
    });

    if (!response.ok) {
      console.warn(
        `Non-OK response fetching Trustvox data. Status: ${response.status}, URL: ${url}`,
      );
      return {
        ...props,
        device: ctx.device,
        rating: 0,
        reviews: [],
      };
    }

    const data = await response.json();

    // Log para debug (pode ser removido em produção)
    const reviews: Review[] = data.items;
    const aggregateRating = reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rate, 0) / reviews.length
      : null;

    if (reviews.length === 0) {
      return {
        ...props,
        device: ctx.device,
        rating: aggregateRating,
        reviews: [],
      };
    }
    return {
      ...props,
      device: ctx.device,
      rating: aggregateRating,
      reviews: reviews,
    };
  } catch (error) {
    console.error("Error fetching Trustvox data:", error);
    //@ts-ignore: any type
    throw new Error(`Error fetching Trustvox data: ${error.message}`);
  }
};

export default ProductInfo;
