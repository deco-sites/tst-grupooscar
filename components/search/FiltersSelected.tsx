// deno-lint-ignore-file
import type { FilterToggle, ProductListingPage } from "apps/commerce/types.ts";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

function FiltersSelected({ filters }: Props) {
  const { filterPriceSelected } = useUI();

  const filteredArrays = filters
    // Filtra apenas os filtros que são do tipo "FilterToggle"
    .filter((filter) => filter["@type"] === "FilterToggle")
    // Faz o mapeamento dos valores de cada filtro e filtra os que têm 'selected' como true
    .map((filter) =>
      (filter as FilterToggle).values.filter((item) => item.selected)
    )
    // Remove arrays vazios
    .filter((array) => array.length > 0);

  const flatArray = [...filteredArrays.flat()];

  const removeAllFilters = () => {
    try {
      const urlObject = new URL(window.location.href);
      const searchParams = urlObject.searchParams;

      // Verifica se o parâmetro 's?q' existe na URL
      if (searchParams.has("s?q")) {
        const searchTerm = searchParams.get("s?q");
        return `/s?q=${searchTerm}`;
      } else {
        // Verifica se o parâmetro 'q' existe na URL
        if (searchParams.has("q")) {
          const searchTerm = searchParams.get("q");
          return `/s?q=${searchTerm}`;
        } else {
          return (globalThis.location.pathname);
        }
      }
    } catch (error) {
      return (globalThis.location.pathname);
    }
  };

  return (
    <>
      <div
        class={`${
          flatArray.length > 0 || filterPriceSelected.value.value.length > 0
            ? "flex"
            : "hidden"
        } flex-col gap-3 border-b border-black border-opacity-10 pb-6 -order-6`}
      >
        {/* @ts-ignore: never null */}
        <a href={globalThis.location.search.includes("?q=") ? globalThis.location.search.match(/\?q=[^&]*/)[0] : globalThis.location.pathname} class="">
          <span class={`text-sm text-primary underline font-semibold`}>
            Limpar filtros
          </span>
        </a>
        <div class={`flex flex-wrap gap-3 items-center`}>
        {flatArray.map(({ label, url }) => (
          <a href={url} class={`w-max`}>
            <span class="w-max flex bg-base-100 gap-4 items-center text-sm font-normal px-4 py-2.5 border border-base-200 rounded-badge">
              <p>
                {label}
              </p>
              <Icon id="close-filters" width={12} height={11} class="" />
            </span>
          </a>
        ))}
        {filterPriceSelected.value &&
          filterPriceSelected.value.value.length > 0 &&
          (
            <a href={filterPriceSelected.value.href} class={`w-max`}>
              <span class="w-max flex bg-base-100 gap-4 items-center text-sm font-normal px-4 py-2.5 border border-base-200 rounded-badge">
                <p>
                  {filterPriceSelected.value.value}
                </p>
                <Icon id="close-filters" width={12} height={11} class="" />
              </span>
            </a>
          )}
        </div>
      </div>
    </>
  );
}

export default FiltersSelected;
