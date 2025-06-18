import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import CardCupom from "./CardCupom.tsx";
import { AppContext } from "../../../apps/site.ts";
import { type SectionProps } from "@deco/deco";

/**
 * @titleBy title
 */
export interface Cupom {
  title: string;
  description: string;
  image?: ImageWidget;
  cupom: string;
  titleDescription: string;
  descriptionCupom: RichText;
  collection: {
    label: string;
    link: string;
  }
  /**
   * @format date
  */
  startDate: string;
  /**
 * @format date
*/
  endDate: string;
}

export interface Props {
  cupons: Cupom[];
}

export default function Cupons({ cupons }: SectionProps<typeof loader>) {
  return (
    <div class="w-full h-full flex items-center justify-center py-8 lg:py-16">
      <div class="w-full h-full flex items-center justify-center lg:w-11/12 max-w-[1300px]">
        <ul class="w-full h-full items-center justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {cupons.map((cupom) => (
            <li class="w-full h-full flex items-center justify-center p-1">
              <CardCupom props={cupom} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  const currentDate = new Date();

  const cupons = props.cupons.filter((cupom) => {
    const startDate = new Date(cupom.startDate);
    const endDate = new Date(cupom.endDate);
    return currentDate >= startDate && currentDate <= endDate;
  });

  return {
    cupons
  }
}