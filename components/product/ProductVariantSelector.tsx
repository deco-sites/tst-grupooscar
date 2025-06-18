import Avatar from "$store/components/ui/Avatar.tsx";
import { useState } from "preact/hooks";
import {
  filterProductAdditionalProperty,
  useVariantPossibilities,
  VariantProductLeaf,
} from "$store/sdk/useVariantPossiblities.ts";
import type { AggregateOffer, Product } from "apps/commerce/types.ts";
import { useUI } from "site/sdk/useUI.ts";
import Image from "apps/website/components/Image.tsx";
import { useOffer } from "site/sdk/useOffer.ts";

interface VariantOf {
  hasVariant: VariantProductLeaf[];
}

interface SlimProductVariant extends
  Pick<
    Product,
    "url" | "additionalProperty" | "productID" | "isSimilarTo" | "image"
  > {
  isVariantOf?: VariantOf;
}

export const mapProductToSlimProductVariant = (
  { url, image, isVariantOf, isSimilarTo, additionalProperty, productID }: Product, { sellerId }: { sellerId: string }
): SlimProductVariant => ({
  productID,
  url,
  image,
  isVariantOf: isVariantOf
    ? {
      hasVariant: isVariantOf.hasVariant.map((
        { url, additionalProperty = [], productID, offers, image = [] },
      ): VariantProductLeaf => ({
        url,
        additionalProperty: filterProductAdditionalProperty(additionalProperty),
        productID,
        offers: useOffer(offers, sellerId),
        image,
      })),
    }
    : undefined,
  isSimilarTo,
  additionalProperty: filterProductAdditionalProperty(additionalProperty),
});

interface Props {
  product: Product;
}

const SELLERCODE = {
  "OC035": "KRN Shoes",
  "OC036": "Haldrys",
  "OC049": "Autem Originals",
  "OC050": "Calçados Bibi",
  "OC051": "Cabana Magazine",
  "OC056": "EC Shoes",
  "OC059": "Ferraroni",
  "OC060": "Fila",
  "OC065": "Hfast Shoes",
  "OC025": "Alex Shoes",
  "OC029": "Total Tennis",
  "OC030": "MG Sports",
  "OC067": "KYW",
  "OC075": "OP Santos",
  "OC079": "Pegada",
  "OC081": "Royalz",
  "OC088": "Usaflex",
  "OC089": "Usevértice",
  "OC106": "Home Sport Center",
  "OC110": "West+",
  "OC118": "Mizuno",
  "OC119": "Olympikus",
  "OC120": "Under Armour",
  "OC121": "Diadora Brasil",
  "OC122": "Petite Jolie",
  "OC123": "Sport West",
  "OC124": "Democrata",
  "OC125": "Sawary",
  "OC126": "Umbro",
  "OC127": "Chic e Elegante",
  "OC128": "Pé Mania",
  "OC129": "Kidy Calçados",
  "OC130": "Macboot",
  "OC131": "Wisni",
  "OC132": "Rovitex",
  "1": "Oscar Calçados",
}

function VariantSelector({ product }: Props) {
  const {
    skuIDCart,
    urlSkuVariant,
    productSimilar,
    imagesProductSimilar,
    productNameSimilar,
    productModelSimilar,
    productOfferSimilar,
    productColor,
    sellerUI,
    simulateResult
  } = useUI();


  const { url, isVariantOf, isSimilarTo } = mapProductToSlimProductVariant(product, { sellerId: sellerUI.value.seller });

  const hasVariant = productSimilar.value?.isVariantOf?.hasVariant ??
    isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(
    hasVariant,
    productSimilar.value || product,
    productColor.value ||
    product.additionalProperty?.find((prop) => prop.name === "COR")?.value,
  );

  const [activeVariant, setActiveVariant] = useState("");
  function handleSku(skuID: string, value: string, offers: AggregateOffer | undefined) {

    const sellerID = offers?.seller ? offers.seller! : offers?.offers[0].seller

    skuIDCart.value = skuID;
    simulateResult.value = null
    sellerUI.value = { seller: sellerID, sellerName: SELLERCODE[sellerID as keyof typeof SELLERCODE] }
    productOfferSimilar.value = offers;
    setActiveVariant(value);
  }
  return (
    <ul class="flex flex-col-reverse gap-4">
      {Object.keys(possibilities).map((name) => (
        <>
          {name != "COR"
            ? (
              <>
                <li class="flex flex-col gap-2 max-w-[100vw]">
                  <span class="text-sm leading-4 text-base-content font-semibold">
                    {name == "TAMANHO"
                      ? "Selecione o tamanho:"
                      : "Selecione a cor:"}
                  </span>
                  <ul class="flex flex-row gap-3 w-full overflow-x-scroll scrollbar-none pl-1 flex-wrap py-1">
                    {Object.entries(possibilities[name]).map(
                      ([value, link]) => {
                        console.log("click product", link.productVariant)
                        return (
                          <li id={"tam-" + value}>
                            <button
                              class={`${link.available == false
                                ? "pointer-events-none"
                                : ""
                                }`}
                              onClick={() => {
                                handleSku(link.productID, value, link.productVariant.offers);
                              }}
                            >
                              <Avatar
                                content={value}
                                variant={link.available == false
                                  ? "disabled"
                                  : (activeVariant === value
                                    ? "active"
                                    : "default")}
                              />
                            </button>
                          </li>
                        );
                      },
                    )}
                  </ul>
                </li>
              </>
            )
            : (
              <>
                {Object.entries(possibilities[name]).length != 1 &&
                  (
                    <li class="flex flex-col gap-2 max-w-[100vw] order-1">
                      <span class="text-sm leading-4 text-base-content font-semibold">
                        Selecione a cor:
                      </span>
                      <ul class="flex flex-row gap-3 w-full overflow-x-scroll scrollbar-none pl-1 flex-wrap">
                        {Object.entries(possibilities[name]).map(
                          ([value, link]) => {
                            return (
                              <li>
                                <button
                                  class={`w-full flex ${urlSkuVariant.value != ""
                                    ? urlSkuVariant.value ==
                                      link.productVariant.url
                                      ? "pointer-events-none"
                                      : ""
                                    : url ==
                                    link.productVariant.url &&
                                    "pointer-events-none"
                                    }`}
                                  onClick={() => {
                                    urlSkuVariant.value =
                                      link.productVariant.url || "";
                                    productSimilar.value = link.productVariant;
                                    if (link.productVariant.image) {
                                      imagesProductSimilar.value =
                                        link.productVariant.image || [];
                                    }
                                    skuIDCart.value = "";
                                    productNameSimilar.value =
                                      product.isVariantOf?.name || "";
                                    productModelSimilar.value = product.gtin ||
                                      isVariantOf?.model || "";
                                    productOfferSimilar.value =
                                      link.productVariant.offers;
                                    productColor.value = link.color || "";
                                    setActiveVariant("");
                                  }}
                                >
                                  <Image
                                    class={`w-[70px] h-[70px] rounded-lg ${urlSkuVariant.value != ""
                                      ? urlSkuVariant.value ==
                                        link.productVariant.url
                                        ? "border-2 border-primary"
                                        : ""
                                      : url ==
                                      link.productVariant.url &&
                                      "border-2 border-primary"
                                      }`}
                                    src={link.firstImage || ""}
                                    alt={link.productVariant.name || ""}
                                    width={70}
                                    height={70}
                                    loading={"eager"}
                                  />
                                </button>
                              </li>
                            );
                          },
                        )}
                      </ul>
                    </li>
                  )}
              </>
            )}
        </>
      ))}
      {isSimilarTo && isSimilarTo.length > 0 &&
        (
          <li class="flex flex-col gap-2 max-w-[100vw]">
            <span class="text-sm leading-4 text-base-content font-semibold">
              Selecione a cor:
            </span>
            <ul class="flex flex-row gap-3 w-full overflow-x-scroll scrollbar-none pl-1 flex-wrap">
              <li>
                {product.image &&
                  (
                    <>
                      {product.image[0] &&
                        (
                          <>
                            <button
                              class={`w-full flex ${urlSkuVariant.value != ""
                                ? urlSkuVariant.value ==
                                  product.url?.split("?")[0]
                                  ? "pointer-events-none"
                                  : ""
                                : url?.split("?")[0] ==
                                product.url?.split("?")[0] &&
                                "pointer-events-none"
                                }`}
                              onClick={() => {
                                history.pushState(null, '', product.url?.split("?")[0] || "");
                                urlSkuVariant.value =
                                  product.url?.split("?")[0] || "";
                                productSimilar.value = product;
                                if (product.image) {
                                  imagesProductSimilar.value = product.image;
                                }
                                skuIDCart.value = "";
                                productNameSimilar.value =
                                  product.isVariantOf?.name || "";
                                productModelSimilar.value =
                                  product.isVariantOf?.model || "";
                                productOfferSimilar.value = product.offers;
                                productColor.value = product.additionalProperty?.find((prop) => prop.name === "COR")?.value || "";
                                setActiveVariant("");
                              }}
                            >
                              <Image
                                class={`w-[70px] h-[70px] rounded-lg ${urlSkuVariant.value != ""
                                  ? urlSkuVariant.value ==
                                    product.url?.split("?")[0]
                                    ? "border-2 border-primary"
                                    : ""
                                  : url?.split("?")[0] ==
                                  product.url?.split("?")[0] &&
                                  "border-2 border-primary"
                                  }`}
                                src={product.image[0].url || ""}
                                alt={product.isVariantOf?.name || ""}
                                width={70}
                                height={70}
                                loading={"eager"}
                              />
                            </button>
                          </>
                        )}
                    </>
                  )}
              </li>
              {isSimilarTo?.map((product) => {
                return (
                  <>
                    <li>
                      {product.image &&
                        (
                          <>
                            {product.image[0] &&
                              (
                                <>
                                  <button
                                    class={`w-full flex ${urlSkuVariant.value != ""
                                      ? urlSkuVariant.value ==
                                        product.url?.split("?")[0]
                                        ? "pointer-events-none"
                                        : ""
                                      : url?.split("?")[0] ==
                                      product.url?.split("?")[0] &&
                                      "pointer-events-none"
                                      }`}
                                    onClick={() => {
                                      urlSkuVariant.value =
                                        product.url?.split("?")[0] || "";
                                      productSimilar.value = product;
                                      if (product.image) {
                                        imagesProductSimilar.value =
                                          product.image;
                                      }
                                      skuIDCart.value = "";
                                      productNameSimilar.value =
                                        product.isVariantOf?.name || "";
                                      productModelSimilar.value =
                                        product.gtin || isVariantOf?.model ||
                                        "";
                                      productOfferSimilar.value =
                                        product.offers;
                                      productColor.value = product.additionalProperty?.find((prop) => prop.name === "COR")?.value || "";

                                      setActiveVariant("");
                                    }}
                                  >
                                    <Image
                                      class={`w-[70px] h-[70px] rounded-lg ${urlSkuVariant.value != ""
                                        ? urlSkuVariant.value ==
                                          product.url?.split("?")[0]
                                          ? "border-2 border-primary"
                                          : ""
                                        : url?.split("?")[0] ==
                                        product.url?.split("?")[0] &&
                                        "border-2 border-primary"
                                        }`}
                                      src={product.image[0].url || ""}
                                      alt={product.isVariantOf?.name || ""}
                                      width={70}
                                      height={70}
                                      loading={"eager"}
                                    />
                                  </button>
                                </>
                              )}
                          </>
                        )}
                    </li>
                  </>
                );
              })}
            </ul>
          </li>
        )}
    </ul>
  );
}

export default VariantSelector;
