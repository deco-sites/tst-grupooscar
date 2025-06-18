import { SendEventOnView } from "$store/components/Analytics.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

export interface Props {
  products: Product[] | null;
  title?: string;
  markupTitle?: boolean;
  description?: string;
  bgGray?: boolean;
  layout?: {
    numberOfSliders?: {
      mobile?: 1 | 2 | 3 | 4 | 5;
      desktop?: 1 | 2 | 3 | 4 | 5;
    };
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large" | "Small";
    showArrows?: boolean;
  };
  cardLayout?: cardLayout;
}

function ProductShelf({
  products,
  title,
  markupTitle,
  description,
  bgGray,
  layout,
  cardLayout,
}: Props) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }
  const slideDesktop = {
    1: "md:w-full",
    2: "md:w-1/2",
    3: "md:w-1/3",
    4: "lg:w-[19%] lg:first:pl-[4vw] lg:last:pr-[4vw] 2xl:w-[320px] lg:px-0",
    5: "md:w-1/5",
  };

  const slideMobile = {
    1: "w-full",
    2: "w-[40%] md:w-[32.8%] first:pl-4 px-1 last:pr-4",
    3: "w-1/3",
    4: "w-1/4",
    5: "w-1/5",
  };
  return (
    <div
      class={`w-full pt-8 pb-20 lg:py-10 ${
        bgGray ? "bg-base-300" : "bg-base-300"
      }`}
    >
      <div class="w-full flex flex-col gap-6">
        <Header
          title={title || ""}
          description={description || ""}
          markupTitle={markupTitle}
          fontSize={layout?.headerfontSize || "Large"}
          alignment={layout?.headerAlignment || "center"}
        />

        <div
          id={id}
          class={`flex relative items-center w-full`}
        >
          <Slider class="carousel carousel-start sm:carousel-end lg:gap-8">
            {products?.map((product, index) => (
              <Slider.Item
                index={index}
                class={`carousel-item ${
                  slideMobile[layout?.numberOfSliders?.mobile ?? 1]
                } ${slideDesktop[layout?.numberOfSliders?.desktop ?? 3]}`}
              >
                <ProductCard
                  product={product}
                  itemListName={title}
                  layout={cardLayout}
                  platform={platform}
                  index={index}
                />
              </Slider.Item>
            ))}
          </Slider>
          <div
            class={`absolute w-[94%] -bottom-[60px] left-1/2 -translate-x-1/2 flex items-center justify-between gap-2 lg:justify-between lg:top-[40%] lg:bottomUnset lg:pointer-events-none`}
          >
            {layout?.showArrows && (
              <>
                <div class="block z-10 col-start-1 row-start-3 lg:pointer-events-auto">
                  <Slider.PrevButton class="btn btn-circle bg-base-100 border border-base-200 h-8 min-h-8 w-8">
                    <Icon
                      class="text-base-content"
                      width={8}
                      height={12}
                      id="ChevronLeft"
                    />
                  </Slider.PrevButton>
                </div>
              </>
            )}
            <ul class="lg:hidden bottom-5 right-4 lg:right-16 carousel justify-center z-10 rounded-badge">
              {products?.map((_, index) => (
                <li class="carousel-item even:hidden">
                  <Slider.Dot index={index} _class={`disabled:bg-primary disabled:rounded-badge w-12 h-2.5 bg-base-100`}>
                    <div class="">
                      <div class="" />
                    </div>
                  </Slider.Dot>
                </li>
              ))}
            </ul>
            {layout?.showArrows && (
              <>
                <div class="block z-10 col-start-3 row-start-3 lg:pointer-events-auto">
                  <Slider.NextButton class="btn btn-circle bg-base-100 border border-base-200 h-8 min-h-8 w-8">
                    <Icon
                      class="text-base-content"
                      width={8}
                      height={12}
                      id="ChevronRight"
                    />
                  </Slider.NextButton>
                </div>
              </>
            )}
          </div>
          <SliderJS rootId={id} infinite />
          <SendEventOnView
            id={id}
            event={{
              name: "view_item_list",
              params: {
                item_list_name: title,
                items: products.map((product, index) =>
                  mapProductToAnalyticsItem({
                    index,
                    product,
                    ...(useOffer(product.offers)),
                  })
                ),
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductShelf;
