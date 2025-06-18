import Icon from "site/components/ui/Icon.tsx";
import Slider from "site/components/ui/Slider.tsx";
import ProductCard from "site/components/oscar/header/SearchBar/ProductCard.tsx";
import { useId } from "site/sdk/useId.ts";
import { Suggestion } from "apps/commerce/types.ts";


export interface Props {
  searches: Suggestion["searches"]
  products: Suggestion["products"]
  searchTerm: string
}
const Suggestions = ({ searches, products, searchTerm }: Props) => {
  const id = useId();

  const hasProducts = products ? Boolean(products.length) : false;
  const hasTerms = searches ? Boolean(searches.length) : false;

  if (!hasProducts && !hasTerms) {
    return null
  }

  return (
    <div id={"bg-suggestion"} class="w-full h-screen left-0 right-0 absolute z-50 top-full bg-black bg-opacity-35">

      <div
        class={
          "flex flex-col w-[80%] lg:flex-row sm:overflow-y-auto bg-white px-4 lg:px-8 py-6 lg:h-fit rounded-3xl border border-[#0000001f] lg:w-[94%] max-w-[791px] rounded-t-none  overscroll-y-contain overflow-y-scroll max-h-[510px] top-full lg:left-[-10%] lg:right-0 m-auto box-content"}
      >
        <div class="flex flex-col sm:flex-row gap-4 lg:gap-8 h-fit lg:w-full">
          <div class="flex flex-col gap-3 lg:gap-6 lg:border-r-2 lg:border-black w-full lg:w-[30%]  lg:box-content lg:pr-6 flex-wrap h-auto">
            <span class="text-primary font-bold text-base" role="heading" aria-level={3}>
              Isso te interessa?
            </span>
            <ul class="flex lg:flex-col gap-3 flex-row flex-wrap">
              {searches && searches.map(({ term }) => (
                <li>
                  {/* TODO @gimenes: use name and action from searchbar form */}
                  <a
                    href={`/s?q=` + term}
                    class="flex justify-between items-center text-black border rounded-2xl px-2 py-1 text-base w-fit"
                    aria-label={`Ir para ${term}`}
                    title={`Ir para ${term}`}
                  >
                    <span dangerouslySetInnerHTML={{ __html: term }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div id={id} class="flex flex-col pt-0 gap-4 lg:gap-6 overflow-x-hidden w-full lg:w-[70%]">
            <div class="flex flex-col sm:flex-row justify-between gap-6 ">
              <span class="text-primary font-bold text-base" role="heading" aria-level={3}>
                Itens que podem te surpreender
              </span>
            </div>

            <Slider class="carousel gap-[11px] overflow-x-scroll">
              {!hasProducts && (
                <p class="carousel-item text-black">Produtos não encontrados</p>
              )}
              {products &&
                products.slice(0, 5).map((product, index) => (
                  <Slider.Item
                    index={index}
                    class="carousel-item w-[30%] max-w-[80px] lg:w-1/4 lg:max-w-[120px]"
                  >
                    <ProductCard
                      product={product}
                      index={index}
                      itemListName="Suggestions"
                    />
                  </Slider.Item>
                ))}
            </Slider>
            {hasProducts && hasTerms && (
              <div class="flex justify-center items-center w-full">
                <a href={`/s?q=` + searchTerm} class="w-fit cursor-pointer flex justify-center items-center gap-2.5 text-sm text-primary transition-all duration-150 group px-4 py-2 rounded-[500px] border border-black bg-white hover:bg-primary hover:text-white font-bold" aria-label={`Ver mais produtos`} title={`Ver mais produtos`} >
                  <span>Quero ver mais opções </span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}
export default Suggestions;
