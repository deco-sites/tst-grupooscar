import Image from "apps/website/components/Image.tsx";
import { Cupom } from "./Cupons.tsx";
import CopyCupom from "../../../islands/Content/Cupons/CopyCupom.tsx";
import ModalCondidional from "../../../islands/Content/Cupons/ModalConditional.tsx";

export default function CardCupom({ props }: { props: Cupom }) {
  const { title, description, image, cupom, titleDescription, descriptionCupom, collection } = props;
  return (
    <div class="w-full h-full flex items-center justify-center border border-primary border-opacity-50 p-2 rounded-lg shadow-sm">
      {image && <div class="pr-2 border-r border-primary border-opacity-50 w-1/3">
        <Image src={image} alt={title} width={180} height={180} class="w-full h-full object-cover rounded-lg max-w-[140px]" />
      </div>}
      <div class={`h-full flex items-start justify-center flex-col gap-1 py-1 ${image ? "w-2/3 pl-2" : "w-full"}`}>
        <h2 class="text-xl  text-primary font-semibold uppercase">{title}</h2>
        <p>{description}</p>
        <CopyCupom cupom={cupom} />
        <div class="w-full h-full flex items-center justify-between mt-1">
          <ModalCondidional title={titleDescription} description={descriptionCupom} />
          <a href={collection.link} class="text-primary text-xs font-bold underline cursor-pointer">
            {collection.label}
          </a>
        </div>
      </div>
    </div>
  );
}