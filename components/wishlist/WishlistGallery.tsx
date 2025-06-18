import { type SectionProps as SectionProps } from "@deco/deco";
import { AppContext } from "apps/vtex/mod.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import SidebarMenu, { MenuItem } from "site/components/wishlist/Menu.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";

export interface Props {
  page: ProductListingPage | null;
  menuSection?: MenuItem[];
  cardLayout?: cardLayout;
}

function WishlistGallery(
  { result, logged, menuSection, cardLayout }: SectionProps<typeof loader>,
) {

  const isEmpty = result === null || result?.length === 0;

  if (!logged) {
    return (
      <div class="container px-4 sm:mx-auto">
        <div class="mx-10 my-20 flex flex-col gap-4 justify-center items-center">
          <span class="font-medium text-2xl">
            Parece que voce não está logado!
          </span>
          <span>
            Por favor, faça login para acessar sua lista de desejos.
          </span>
        </div>
      </div>
    );
  }
  return (
    <>
      <div class="flex flex-col px-4 md:px-0 container mx-auto mb-4 w-full pt-8">
        <div class="flex flex-col md:px-0 md:flex-row gap-4 mx-auto mb-4 w-full">
          <div>
            {menuSection && <SidebarMenu menuItems={menuSection} />}
          </div>
          {isEmpty
            ? (
              <>
                <div class="container px-4 sm:mx-auto">
                  <div class="lg:h-full w-full flex flex-col gap-4 justify-center items-center">
                    <span class="font-medium text-2xl">
                      Parece que sua lista esta vazia!
                    </span>
                    <span>
                      Favorite produtos para que eles apareçam aqui.
                    </span>
                  </div>
                </div>
              </>
            )
            : (
              <div class="w-full mx-auto">
                <div class="flex flex-col gap-4">
                  <h1 class="text-[#000] text-center text-ellipsis text-2xl font-medium leading-normal">
                    Lista de desejos
                  </h1>
                  {/* Exibição de produtos */}
                  <div
                    data-product-list
                    class={"grid items-center w-full grid-cols-2 gap-3 lg:grid-cols-4"}
                  >
                    {result?.map((product, index) => (
                      <ProductCard
                        key={`product-card-${product.productID}`}
                        product={product}
                        preload={index === 0}
                        index={index}
                        type={"PLP"}
                        layout={cardLayout}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
}

export const loader = async (props: Props, _req: Request, ctx: AppContext) => {
  const products = props.page?.products || [];
  const productsIds = products.map((product) => product.productID);
  const getCookies = _req.headers.get("cookie");
  const cookieFind = "VtexIdclientAutCookie_grupooscar";
  const filterCookie = getCookies?.split(";").filter((c) =>
    c.includes(cookieFind)
  );
  if (filterCookie?.length === 0) {
    return {
      ...props,
      result: null,
      logged: false,
      menuSection: props.menuSection,
    };
  }
  try {
    const res = await ctx.invoke(
      "vtex/loaders/intelligentSearch/productList.ts",
      {
        props: { ids: productsIds },
      },
    );

    const result = res && res.filter((product) => product !== undefined)

    return { ...props, result, logged: true, menuSection: props.menuSection };
  } catch {
    return {
      ...props,
      result: null,
      logged: true,
      menuSection: props.menuSection,
    };
  }

};
export default WishlistGallery;