import ProductCard, {
  Layout as CardLayout,
} from "$store/components/product/ProductCard.tsx";
import { Product } from "apps/commerce/types.ts";
import { useUI } from "$store/sdk/useUI.ts";
import ProductCardHorizontal from "site/components/product/ProductCardHorizontal.tsx";

export interface Columns {
  mobile?: 1 | 2;
  desktop?: 2 | 3 | 4 | 5;
}

export interface Props {
  products: Product[] | null;
  offset: number;
  layout?: {
    card?: CardLayout;
    columns?: Columns;
  };
  /**@hidden */
  type?: "PLP" | "HOME" | "PDP";
}

const MOBILE_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const DESKTOP_COLUMNS = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
};

function ProductGallery({ products, layout, offset, type }: Props) {
  const mobile = MOBILE_COLUMNS[layout?.columns?.mobile ?? 2];
  const desktop = DESKTOP_COLUMNS[layout?.columns?.desktop ?? 4];
  const { displayMode, displayModeDesktop } = useUI();

  return (
    <div
      class={`grid ${
        displayMode.value == "horizontal" ? "grid-cols-1" : mobile
      } gap-2 items-center ${
        displayMode.value == "horizontal" ? "md:grid-cols-1" : desktop
      } md:gap-8 ${displayModeDesktop.value == "fourItems" ? "lg:grid-cols-4 lg:gap-4" : "lg:grid-cols-3"}`}
    >
      {products?.map((product, index) => (
        <>
          {displayMode.value == "vertical"
            ? (
              <ProductCard
                product={product}
                preload={index === 0}
                index={offset + index}
                layout={layout?.card}
                platform={"vtex"}
                type={type}
              />
            )
            : (
              <ProductCardHorizontal
                product={product}
                preload={index === 0}
                index={offset + index}
                type={type}
              />
            )}
        </>
      ))}
    </div>
  );
}

export default ProductGallery;
