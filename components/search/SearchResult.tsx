import { SendEventOnView } from "$store/components/Analytics.tsx";
import { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, {
  Columns,
} from "site/islands/Search/ProductGallery.tsx";
import { AppContext } from "site/apps/site.ts";
import { SectionProps } from "@deco/deco";
import { ProductListingPage } from "apps/commerce/types.ts";
import NotFound, { Props as NotFoundProps } from "./NotFound.tsx";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  /** @description minimum value of the price filter bar */
  minFilterPrice: number;
  /** @description maximum value of the price filter bar */
  maxFilterPrice: number;
  layout?: Layout;
  cardLayout?: CardLayout;

  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
  notFound: NotFoundProps;
}

function Result({
  page,
  layout,
  cardLayout,
  isSearch,
  url,
  startingPage = 0,
  minFilterPrice,
  maxFilterPrice,
}: Omit<SectionProps<typeof loader>, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo.recordPerPage || products.length;
  const records = pageInfo.records ?? products.length;
  const recordPerPage = pageInfo.recordPerPage ?? 1;
  const totalPages = (Math.ceil(records / recordPerPage) > 50)
    ? 50
    : Math.ceil(records / recordPerPage);
  const currentPage = pageInfo.currentPage;
  const value = Math.ceil(records / recordPerPage);
  const id = useId();

  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  // Função para calcular o intervalo de páginas a serem exibidas
  const getPageRange = () => {
    if (currentPage <= 4) {
      // Exibir as páginas de 1 a 5 no início
      return Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1);
    } else if (currentPage > totalPages - 4) {
      // Exibir as últimas 5 páginas no final
      return Array.from({ length: 5 }, (_, i) => totalPages - 4 + i);
    } else {
      // Centralizar a página atual, mostrando duas antes e duas depois
      return Array.from({ length: 5 }, (_, i) => currentPage - 2 + i);
    }
  };

  return (
    <>
      <div class={`bg-base-300`}>
        <div class="w-11/12 mx-auto sm:py-10 lg: lg:px-0">
          <SearchControls
            sortOptions={sortOptions}
            filters={filters}
            breadcrumb={breadcrumb}
            displayFilter={layout?.variant === "drawer"}
            minFilterPrice={minFilterPrice}
            maxFilterPrice={maxFilterPrice}
          />

          <div class="flex flex-row gap-8 lg:mt-6">
            <div class="flex-grow" id={id}>
              <ProductGallery
                products={products}
                offset={offset}
                type="PLP"
                layout={{ card: cardLayout, columns: layout?.columns }}
              />
            </div>
          </div>

          <div class="flex justify-center my-4 mx-auto w-11/12 items-center">
            <div class="join gap-1 lg:gap-2.5 items-center justify-center">
              <a
                aria-label="previous page link"
                rel="prev"
                href={pageInfo.previousPage ?? ""}
                class={`${pageInfo.previousPage ? "" : "pointer-events-none"
                  } btn btn-circle bg-base-100 border border-base-200 h-8 min-h-8 w-8`}
              >
                <Icon
                  class="text-base-content"
                  width={8}
                  height={12}
                  id="ChevronLeft"
                />
              </a>

              {getPageRange().map((pageNumber) => (
                <a
                  key={pageNumber}
                  href={`${isSearch
                    ? url.search.includes("&page")
                      ? url.search.split("&page=")[0] + `&page=${pageNumber}`
                      : url.search + `&page=${pageNumber}`
                    : url.search.length > 0
                      ? url.search.includes("page=")
                        ? url.search.split("page=")[0] + `page=${pageNumber}`
                        : url.search + `&page=${pageNumber}`
                      : `?page=${pageNumber}`
                    }`}
                  class={`p-2 lg:p-4 rounded-full flex items-center w-10 lg:w-14 justify-center ${pageNumber === currentPage ? "bg-primary text-white" : ""
                    }`}
                >
                  {pageNumber}
                </a>
              ))}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span class="px-2">...</span>
                  <a
                    href={`${isSearch
                      ? url.search.includes("&page")
                        ? url.search.split("&page=")[0] +
                        `&page=${totalPages}`
                        : url.search + `&page=${totalPages}`
                      : url.search.length > 0
                        ? url.search.includes("page=")
                          ? url.search.split("page=")[0] + `page=${totalPages}`
                          : url.search + `&page=${totalPages}`
                        : `?page=${totalPages}`
                      }`}
                    class="p-4 rounded-full"
                  >
                    {totalPages}
                  </a>
                </>
              )}

              <a
                aria-label="next page link"
                rel="next"
                href={pageInfo.nextPage ?? ""}
                class={`${pageInfo.nextPage ? "" : "pointer-events-none"
                  } btn btn-circle bg-base-100 border border-base-200 h-8 min-h-8 w-8`}
              >
                <Icon
                  class="text-base-content"
                  width={8}
                  height={12}
                  id="ChevronRight"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
            item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: SectionProps<typeof loader>) {
  if (!page || page.pageInfo.records == 0) {
    return <NotFound
      image={props.notFound.image}
      title={props.notFound.title}
      subtitle={props.notFound.subtitle}
      ctaLabel={props.notFound.ctaLabel}
      ctaUrl={props.notFound.ctaUrl}
      vitrine={props.notFound?.vitrine}
      categoriesBanners={props.notFound?.categoriesBanners} />;
  }

  return <Result {...props} page={page} />;
}

export const loader = (props: Props, req: Request, ctx: AppContext) => {
  const url = new URL(req.url);
  const isSearch = url.pathname === "/s";

  if (!props.page || props.page.products.length === 0) {
    ctx.response.status = 404;
  }

  return { ...props, isSearch, url };
};

export default SearchResult;
