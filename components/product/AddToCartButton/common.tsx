import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { AddToCartParams } from "apps/commerce/types.ts";
import { useState } from "preact/hooks";
import Icon from "site/components/ui/Icon.tsx";

export interface Props {
  /** @description: sku name */
  eventParams: AddToCartParams;
  onAddItem: () => Promise<void>;
}

const useAddToCart = ({ eventParams, onAddItem }: Props) => {
  const [loading, setLoading] = useState(false);
  const { displayCart, skuIDCart } = useUI();

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!skuIDCart.value) {
      alert("Selecione um tamanho.");
      return false;
    }
    try {
      setLoading(true);

      await onAddItem();

      sendEvent({
        name: "add_to_cart",
        params: eventParams,
      });

      displayCart.value = true;
    } finally {
      setLoading(false);
    }
  };

  return { onClick, loading, "data-deco": "add-to-cart" };
};

export default function AddToCartButton(props: Props) {
  const btnProps = useAddToCart(props);

  return (
    <Button
      {...btnProps}
      class="background-gradient-primary text-base-100 flex items-center rounded-badge leading-none w-11/12 mx-auto lg:w-full border-0"
    >
      Adicionar a sacola
      <Icon
        id="bagBuyBtn"
        width={14}
        height={16}
        class={``}
      />
    </Button>
  );
}
