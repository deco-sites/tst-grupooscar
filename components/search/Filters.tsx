import Avatar from "$store/components/ui/Avatar.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import FiltersSelected from "$store/components/search/FiltersSelected.tsx";
import RangeSlider from "$store/islands/Search/PriceRange.tsx";

interface Props {
  filters: ProductListingPage["filters"];
  /** @description minimum value of the price filter bar */
  minFilterPrice: number;
  /** @description maximum value of the price filter bar */
  maxFilterPrice: number;
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2 max-w-[230px]">
      <div
        aria-checked={selected}
        class="checkbox border-black border-opacity-60 w-4 h-4 [--chkbg:theme(colors.primary)] [--chkfg:white]"
      />
      <span class="text-sm text-black text-opacity-60">{label}</span>
      {quantity > 0 && (
        <span class="text-sm text-black text-opacity-60">({quantity})</span>
      )}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  return (
    <ul class={`collapse-content flex gap-3 flex-col px-0`}>
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        // if (key === "cor" || key === "tamanho") {
        //   return (
        //     <a href={url} rel="nofollow">
        //       <Avatar
        //         content={value}
        //         variant={selected ? "active" : "default"}
        //       />
        //     </a>
        //   );
        // }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}
const portugueseMappings = {
  "Departments": "Departamentos",
  "PriceRanges": "Preço",
  "Categories": "Categorias",
  "Brands": "Marcas",
  "sellername": "Vendido por",
};

function Filters({ filters, minFilterPrice, maxFilterPrice }: Props) {
  return (
    <ul class="flex flex-col p-4 text-primary-content bg-base-300">
      <FiltersSelected filters={filters} />
      {filters
        .filter(isToggle)
        .map((filter) => {
          if (filter.quantity > 0 && filter.label !== "Departamento") {
            return (
              <>
                {filter.key === "price"
                  ? (
                    <li class="collapse collapse-plus border-b border-black border-opacity-10 last:border-b-0 rounded-none">
                      <input type="checkbox" class={`h-16 min-h-16`} />
                      <span
                        class={`filters collapse-title text-xs font-bold min-h-16 py-6 px-0 items-center text-base-content`}
                      >
                        Faixa de preço
                      </span>
                      <ul class={`collapse-content flex flex-col gap-5`}>
                        <RangeSlider
                          sliderClass="min-w-[77vw] lg:ml-0 lg:min-w-[21vw]"
                          name={filter.key}
                          label={filter.label}
                          minFilterPrice={minFilterPrice}
                          maxFilterPrice={maxFilterPrice}
                          url={filter.values[0].url}
                        />
                      </ul>
                    </li>
                  )
                  : (
                    <li class="collapse collapse-plus border-b border-black border-opacity-10 last:border-b-0 rounded-none">
                      <input type="checkbox" class={`h-16 min-h-16`} />
                      <span
                        class={`filters collapse-title text-xs font-bold min-h-16 py-6 px-0 items-center text-base-content capitalize`}
                      >
                        {portugueseMappings[
                          filter.label.toLowerCase() as keyof typeof portugueseMappings
                        ] ?? filter.label.toLowerCase()}
                      </span>
                      <FilterValues {...filter} />
                    </li>
                  )}
              </>
            );
          }
          <></>;
        })}
    </ul>
  );
}

export default Filters;
