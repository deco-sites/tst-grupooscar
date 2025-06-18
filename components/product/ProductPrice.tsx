import { useUI } from "site/sdk/useUI.ts";
import { formatPrice } from "site/sdk/format.ts";
import { useOffer } from "site/sdk/useOffer.ts";
import Icon from "site/components/ui/Icon.tsx";
import { PricePix } from "site/components/product/PricePix.tsx";
import { Props as ShowPix } from "site/loaders/Pix/showPix.ts"
import { useSignal } from "@preact/signals";
import { AggregateOffer } from "apps/commerce/types.ts";

export interface Props {
  offers?: AggregateOffer;
  device?: "mobile" | "tablet" | "desktop";
  configPix: ShowPix;
}

export default function ProductPrice(
  { offers, device, configPix }: Props,
) {
  const { productOfferSimilar, sellerUI } = useUI();
  const product = useSignal<{ newPrice: number | undefined, newListPrice: number | undefined, newInstallments: string | null }>
    ({
      newPrice: 0,
      newListPrice: 0,
      newInstallments: "",
    });

  if (productOfferSimilar.value && sellerUI.value) {
    const { price, listPrice, installments } =
      "installments" in productOfferSimilar.value
        ? productOfferSimilar.value
        : useOffer(
          productOfferSimilar.value || offers, sellerUI.value.seller
        );

    product.value = { newPrice: price, newListPrice: listPrice, newInstallments: installments }
  } else {
    const { price, listPrice, installments } = useOffer(offers, sellerUI.value.seller);
    product.value = { newPrice: price, newListPrice: listPrice, newInstallments: installments }
  }

  if (device == "desktop") {
    return (
      <>
        <div class="w-11/12 mx-auto flex flex-col gap-2 lg:w-full">
          <div class={`flex flex-row gap-2 items-end justify-start`}>
            {product.value.newPrice && (product.value.newListPrice ?? 0) > product.value.newPrice && (
              <span class="line-through text-base-content text-opacity-60 text-xs font-medium">
                {formatPrice(product.value.newListPrice)}
              </span>
            )}
            <span class="font-semibold text-xl text-primary">
              {formatPrice(product.value.newPrice)}
            </span>
            {product.value.newListPrice && product.value.newPrice && (product.value.newListPrice ?? 0) > product.value.newPrice && (
              <span class="bg-accent px-2 py-1.5 gap-1 text-xs font-bold text-base-100 flex items-center justify-center rounded-badge">
                <Icon id="discountIcon" width="14" height="12" />
                <span>
                  Você economiza{" "}
                  {formatPrice(product.value.newListPrice - product.value.newPrice)}
                </span>
              </span>
            )}
          </div>
          {product.value.newPrice && <PricePix price={product.value.newPrice} configPix={configPix} />}
          <span class="text-xs font-medium text-base-content text-opacity-60">
            {product.value.newInstallments}
          </span>
        </div>
      </>
    )
  }

  return (
    <>
      <div class="w-11/12 mx-auto flex flex-col gap-2 lg:w-full">
        <div class={`flex flex-row gap-2 items-end justify-start`}>
          {product.value.newPrice && (product.value.newListPrice ?? 0) > product.value.newPrice && (
            <span class="line-through text-base-content text-opacity-60 text-xs font-medium">
              {formatPrice(product.value.newListPrice)}
            </span>
          )}
          <span class="font-semibold text-xl text-primary">
            {formatPrice(product.value.newPrice)}
          </span>
          {product.value.newListPrice && product.value.newPrice && (product.value.newListPrice ?? 0) > product.value.newPrice && (
            <span class="bg-accent px-2 py-1.5 gap-1 text-xs font-bold text-base-100 flex items-center justify-center rounded-badge">
              <Icon id="discountIcon" width="14" height="12" />
              <span>
                Você economiza{" "}
                product.value{formatPrice(product.value.newListPrice - product.value.newPrice)}
              </span>
            </span>
          )}
        </div>
        {product.value.newPrice && <PricePix price={product.value.newPrice} configPix={configPix} />}
        <span class="text-xs font-medium text-base-content text-opacity-60">
          {product.value.newInstallments}
        </span>
      </div>
    </>
  );

}
