import ProductTags from "site/components/product/ProductTags.tsx";
import type { Tag } from "$store/components/product/ProductTags.tsx";

interface Props {
  description?: string;
  tags?: Tag[];
}

export default function ProductDescription({ description, tags }: Props) {
  const tableInfo = description?.split("</h3>")[1];
  const descriptionProduct = description?.split("<h3")[0];
  return (
    <>
      <div class={`flex flex-col gap-4 text-primary-content`}>
        <div class="collapse arrow-right collapse-arrow">
          <input
            type="checkbox"
            class="h-[50px] min-h-[50px]"
            checked
          />
          <div class="collapse-title px-0 text-sm font-bold min-h-[50px] flex gap-3">
            {tableInfo && tableInfo?.length > 0
              ? <>Descrição do produto</>
              : <>Informações gerais</>}
          </div>
          <div class="collapse-content px-0 py-0 text-sm">
            <ProductTags tags={tags} />
            <div
              class="text-sm"
              dangerouslySetInnerHTML={{ __html: descriptionProduct || "" }}
            />
          </div>
        </div>
        {tableInfo && tableInfo?.length > 0 &&
          (
            <div class="collapse arrow-right collapse-arrow">
              <input
                type="checkbox"
                class="h-[50px] min-h-[50px]"
                checked
              />
              <div class="collapse-title px-0 text-sm font-bold min-h-[50px] flex gap-3">
                Informações gerais
              </div>
              <div
                class="collapse-content paddingLeftUnset px-0 text-sm"
                dangerouslySetInnerHTML={{ __html: tableInfo || "" }}
              />
            </div>
          )}
      </div>
    </>
  );
}
