import { useSignal } from "@preact/signals";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";

export interface Props {
  productID: string;
  productGroupID?: string;
  variant?: "icon" | "full";
  removeItem: () => Promise<void>;
  addItem: () => Promise<void>;
  loading: boolean;
  inWishlist: boolean;
  isUserLoggedIn: boolean;
  _class?: string;
}

function ButtonCommon({
  variant = "icon",
  productGroupID,
  productID,
  loading,
  inWishlist,
  isUserLoggedIn,
  _class,
  removeItem,
  addItem,
}: Props) {
  const fetching = useSignal(false);

  return (
    <Button
      class={`${_class} btn-ghost p-0 hover:bg-transparent`}
      loading={fetching.value}
      aria-label="Add to wishlist"
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (!isUserLoggedIn) {
          globalThis.window.alert(
            "Por favor, realize o login antes de favoritar um produto.",
          );

          return;
        }

        if (loading) {
          return;
        }

        try {
          fetching.value = true;

          if (inWishlist) {
            await removeItem();
          } else if (productID && productGroupID) {
            await addItem();

            sendEvent({
              name: "add_to_wishlist",
              params: {
                items: [
                  {
                    item_id: productID,
                    item_group_id: productGroupID,
                    quantity: 1,
                  },
                ],
              },
            });
          }
        } finally {
          fetching.value = false;
        }
      }}
    >
      <Icon
        id={inWishlist ? "heart-active" :"heart-card"}
        stroke-width="1"
        size={24}
        class={"text-primary"}
        
      />
      {variant === "icon" ? null : inWishlist ? "Remover" : "Favoritar"}
    </Button>
  );
}


export default ButtonCommon;
