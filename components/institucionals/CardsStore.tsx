import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "site/components/ui/Icon.tsx";

interface DeviceImage {
  imageMobile: ImageWidget;
  imageDesktop: ImageWidget;
  alt?: string;
}

interface Card {
  image: {
    src: ImageWidget;
    alt?: string;
  };
  label: string;
  address: RichText;
  linkMap?: string;
  linkWhatsapp?: string;
}

export interface Props {
  title: string;
  description: string;
  cards: Card[];
}

export default function BannerGridText({ title, description, cards }: Props) {
  return (
    <div class="w-full h-full px-4 py-10 bg-base-300">
      <div
        class={`py-6 lg:py-10 px-4 gap-3 mb-4 md:mb-0 md:py-8 md:px-10 rounded-2xl flex flex-col max-w-[1060px] mx-auto lg:px-0 bg-base-100`}
      >
        <h1
          class={`w-full text-center px-2.5 text-base leading-7 font-bold`}
        >
          {title}
        </h1>
        <h2
          class={`w-full text-sm text-center flex flex-col gap-4 font-medium  text-opacity-60`}
        >
          {description}
        </h2>
        <div class={`flex flex-wrap justify-center gap-6`}>
          {cards.map((card) => {
            return (
              <div
                class={`w-2/5 min-w-[311px] md:min-w-64 max-w-[275px] min-h-[332px] flex flex-col p-4 gap-4 rounded-2xl border border-black border-opacity-15`}
              >
                <Image
                  class="rounded-lg w-full object-cover h-[144px]"
                  src={card.image.src}
                  alt={card.image.alt || card.label}
                  width={243}
                  height={144}
                  loading="lazy"
                />
                <h2 class={`text-base text-info font-bold leading-5`}>
                  {card.label}
                </h2>
                <div
                  class={`h-[54px] text-sm text-black text-opacity-60 font-medium leading-[17.5px]`}
                  dangerouslySetInnerHTML={{ __html: card.address }}
                />
                <div class="flex w-full justify-between">

                  <a
                    href={card.linkMap}
                    class={`w-max flex text-primary text-sm font-semibold border border-primary rounded-lg gap-2.5 items-center justify-center px-4 py-2.5 group hover:bg-primary hover:text-white duration-300 ease-in-out`}
                  >
                    <Icon
                      id={"MapIcon"}
                      width={18}
                      height={15}
                      strokeWidth={1}
                      class="text-primary group-hover:text-white"
                    />
                    Ver no mapa
                  </a>
                  {card.linkWhatsapp != undefined && card.linkWhatsapp && 
                  <a href={card.linkWhatsapp} class="border border-green-500 flex justify-center items-center px-4 py-2.5 rounded-lg group hover:bg-green-500 duration-300 ease-in-out" >
                    <Icon id="WhatsApp"
                      size={24}
                      class="text-green-500 group-hover:text-white"
                    />
                  </a>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}