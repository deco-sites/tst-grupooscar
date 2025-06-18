import { Offer } from "apps/commerce/types.ts";
import { useCurrentOffer } from "site/sdk/useOffer.ts";
import { formatPrice } from "site/sdk/format.ts";
import Button from "site/islands/Product/BuyBox.tsx";

export default function BuyBox({ offers, showBuyBox }: { offers: Offer[], showBuyBox?:boolean }) {


  return (
    <div style={{display: !showBuyBox ? "none" : "flex" }}>
      <ul class="flex flex-row gap-2 overflow-auto w-full">
        {offers.map((item, index) => {
          const { price = 0, listPrice, seller = "1", installments, availability } =
            useCurrentOffer(item);
          return (
            <>
              {availability == "https://schema.org/InStock" ?
                <li class="first:pl-2 last:pr-2 min-w-[200px] max-w-[50%]">
                  <Button _class="flex flex-col gap-2 justify-start items-start p-3 rounded-lg bg-white h-full" sellerID={seller} id={`seller-id-${index}`}>
                    {
                      listPrice && listPrice != price && <span class="line-through text-base-content text-opacity-60 text-xs font-medium">
                        {formatPrice(listPrice)}
                      </span>
                    }
                    <span class="font-bold text-2xl ">
                      {formatPrice(price)}
                    </span>
                    <span class="text-xs font-medium text-base-content text-opacity-60 text-start">
                      {installments}
                    </span>
                    <span class="text-xs text-primary text-start">
                      {`Vendido por: ${item.sellerName}`}
                    </span>
                  </Button>
                </li>
                :
                null
              }
            </>
          )
        })}
      </ul>
    </div >
  )
}