import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";
import ViewCardsButton from "site/islands/Search/ViewCardsButton.tsx";

export type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
    /** @description minimum value of the price filter bar */
    minFilterPrice: number;
    /** @description maximum value of the price filter bar */
    maxFilterPrice: number;
  };

function SearchControls(
  { filters, breadcrumb, sortOptions, minFilterPrice, maxFilterPrice }: Props,
) {
  const open = useSignal(false);

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-base-200 flex flex-col h-full overflow-y-hidden">
            <div class="flex bg-base-100 justify-between items-center px-4 py-4">
              <div class="flex items-center justify-center gap-3">
                <Icon id="FilterList" width={13} height={13} />
                <span class="text-primary-content text-base">
                  Filtros
                </span>
              </div>
              <Button
                class="no-animation false block btn-ghost h-fit min-h-8 p-2 rounded-full"
                onClick={() => open.value = false}
              >
                <Icon id="close-menu" size={13} strokeWidth={1} />
              </Button>
            </div>
            <div class="flex-grow overflow-auto">
              <Filters
                filters={filters}
                minFilterPrice={minFilterPrice}
                maxFilterPrice={maxFilterPrice}
              />
            </div>
          </div>
        </>
      }
    >
      <div class="flex flex-col lg:grid lg:grid-cols-3 lg:justify-items-center justify-between mb-7 gap-2 lg:mb-0 lg:py-0 lg:px-6 lg:gap-4 lg:flex-row lg:h-[60px] bg-base-100 px-4 py-3 rounded-2xl">
        <div class="lg:hidden flex flex-row items-center justify-center ">
          <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
        </div>

        <div class="flex flex-row items-center justify-center gap-3 lg:justify-start lg:w-full">
          <Button
            class={`w-[150px] bg-base-100 min-h-9 h-9 leading-none px-4 py-2 gap-3 flex items-center justify-center border border-primary rounded-badge text-primary text-sm font-medium`}
            onClick={() => {
              open.value = true;
            }}
          >
            Filtros
            <Icon id="FilterList" width={13} height={13} />
          </Button>
          {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
        </div>
        <div class="hidden lg:flex flex-row items-center justify-center ">
          <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
        </div>
        <ViewCardsButton />
      </div>
    </Drawer>
  );
}

export default SearchControls;
