import { Props as ShowPix } from "site/loaders/Pix/showPix.ts"

export interface Props {
  price: number;
  configPix?: ShowPix | null;
}

export function PricePix({ price, configPix }: Props) {

  if (configPix && configPix.showPix) {
    const priceWithDiscount = price * (1 - configPix.value / 100);
    return (
      <div class={"flex items-center gap-2"}>
        <span class={"font-bold text-lg text-primary leading-7"}>
          {priceWithDiscount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + ` no Pix`}
        </span>
        <span class={"text-accent text-sm border-accent border rounded-md px-2 py-1 ml-2 font-medium"}>
          {configPix.value + `%`}
        </span>
      </div>
    );
  }
  return null
}

export function PricePixCard({ price, configPix }: Props) {

  if (configPix && configPix.showPix) {
    const priceWithDiscount = price * (1 - configPix.value / 100);
    return (
      <div>
        <span class="text-sm">
          {`ou ` + priceWithDiscount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + ` no Pix`}
        </span>
      </div >
    )
  }

  return null
}