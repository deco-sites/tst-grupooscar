import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useSignalEffect } from "@preact/signals";
export interface Props extends Omit<BtnProps, "onAddItem"> {
  seller: string;
  productID: string;
}

function AddToCartButton({ seller, productID, eventParams }: Props) {
  const { addItems } = useCart();
  const { skuIDCart, sellerUI } = useUI();
  const onAddItem = () =>
    addItems({
      orderItems: [{
        id: skuIDCart.value,
        seller: sellerUI.value.seller,
        quantity: 1,
      }],
    });

  return <Button onAddItem={onAddItem} eventParams={eventParams} />;
}

export default AddToCartButton;
