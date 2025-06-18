import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useCallback, useState } from "preact/hooks";

export interface Item {
  skuID: string;
  productGroupID: string;
  image: {
    src: string;
    alt: string;
  };
  name: string;
  quantity: number;
  price: {
    sale: number;
    list: number;
  };
}

export interface Props {
  item: Item;
  index: number;

  locale: string;
  currency: string;

  onUpdateQuantity: (quantity: number, index: number) => Promise<void>;
  itemToAnalyticsItem: (index: number) => AnalyticsItem | null | undefined;
}

function CartItem(
  {
    item,
    index,
    locale,
    currency,
    onUpdateQuantity,
    itemToAnalyticsItem,
  }: Props,
) {
  const {
    image,
    name,
    price: { sale, list },
    quantity,
    skuID,
    productGroupID,
  } = item;
  const isGift = sale < 0.01;
  const [loading, setLoading] = useState(false);

  const withLoading = useCallback(
    <A,>(cb: (args: A) => Promise<void>) => async (e: A) => {
      try {
        setLoading(true);
        await cb(e);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <div
      class="grid grid-rows-1 lg:flex gap-2 bg-base-100 rounded-xl p-3"
      style={{
        gridTemplateColumns: "auto 1fr",
      }}
    >
      <Image
        {...image}
        src={image.src.replace("55-55", "255-255")}
        style={{ aspectRatio: "75 / 75" }}
        width={75}
        height={75}
        class="h-[75px] object-contain rounded-lg lg:h-[120px] lg:w-[120px]"
      />

      <div class="flex flex-col gap-2 pl-3 text-info">
        <div class="flex justify-between items-start gap-5">
          <span class={`text-[13px] font-medium`}>{name}</span>
          <Button
            disabled={loading || isGift}
            loading={loading}
            class="btn-ghost btn-square min-h-4 h-4 w-4"
            onClick={withLoading(async () => {
              const analyticsItem = itemToAnalyticsItem(index);

              await onUpdateQuantity(0, index);

              analyticsItem && sendEvent({
                name: "remove_from_cart",
                params: {
                  items: [{
                    ...analyticsItem,
                    item_id: `${productGroupID}_${skuID}`,
                  }],
                },
              });
            })}
          >
            <Icon id="close-cart" size={12} class={`text-primary`} />
          </Button>
        </div>
        <div class="flex items-center gap-2">
          {list > sale &&(
            <span class="line-through text-sm text-opacity-60 text-base-content">
              {formatPrice(list, currency, locale)}
            </span>
          )}
          <span class="text-base text-primary font-bold lg:text-xl">
            {isGift ? "Grátis" : formatPrice(sale, currency, locale)}
          </span>
        </div>
        <div class={`hidden lg:flex items-center justify-between gap-2`}>
          <QuantitySelector
            disabled={loading || isGift}
            quantity={quantity}
            onChange={withLoading(async (quantity) => {
              const analyticsItem = itemToAnalyticsItem(index);
              const diff = quantity - item.quantity;

              await onUpdateQuantity(quantity, index);

              if (analyticsItem) {
                sendEvent({
                  name: diff < 0 ? "remove_from_cart" : "add_to_cart",
                  params: {
                    items: [{ ...analyticsItem, quantity: Math.abs(diff) }],
                  },
                });
              }
            })}
          />
        </div>
      </div>
      <div
        class={`grid col-start-2 col-end-3 lg:hidden items-center justify-end gap-4`}
      >
        <QuantitySelector
          disabled={loading || isGift}
          quantity={quantity}
          onChange={withLoading(async (quantity) => {
            const analyticsItem = itemToAnalyticsItem(index);
            const diff = quantity - item.quantity;

            await onUpdateQuantity(quantity, index);

            if (analyticsItem) {
              sendEvent({
                name: diff < 0 ? "remove_from_cart" : "add_to_cart",
                params: {
                  items: [{ ...analyticsItem, quantity: Math.abs(diff) }],
                },
              });
            }
          })}
        />
      </div>
    </div>
  );
}

export default CartItem;
