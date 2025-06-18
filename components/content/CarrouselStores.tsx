import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "site/components/ui/Slider.tsx";
import Icon from "site/components/ui/Icon.tsx";
import { useId } from "site/sdk/useId.ts";
import SliderJS from "site/islands/SliderJS.tsx";
import { useDevice } from "@deco/deco/hooks";

interface Card {
  title: string;
  content: string;
  image: ImageWidget;
  alt: string;
  link: string
}

export interface Props {
  title: string;
  content: RichText;
  cards: Card[]
}

function CardItem({ card }: { card: Card }) {

  const device = useDevice()
  const isMobile = device == "mobile"

  return (
    <div class="w-full h-full p-4 rounded-2xl flex flex-col gap-3 bg-white">
      <Image
        src={card.image}
        alt={card.alt}
        width={isMobile ? 227 : 365}
        height={isMobile ? 181 : 161}
        class="w-full h-full rounded-lg max-h-[161px]"
      />
      <h3 class="font-semibold text-sm text-black">{card.title}</h3>
      <p class="text-xs">{card.content}</p>
      <a href={card.link} class="font-semibold border-2 border-primary rounded-full px-4 py-2 text-primary w-fit text-xs"><div class="flex flex-row gap-2 justify-center items-center"><Icon id="Map" width={14} height={11} />Ver no Mapa</div></a>
    </div>
  )
}


export default function CarrouselStores(props: Props) {

  const { title, content, cards } = props

  const id = useId();

  return (
    <div class="w-full h-full flex flex-col gap-8 bg-base-300 py-10">
      <div class="w-full h-full flex justify-center gap-4 flex-col">
        <h2 class="uppercase text-xl text-center">{title}</h2>
        <span class="text-sm text-center" dangerouslySetInnerHTML={{ __html: content }}></span>
      </div>
      <div
        id={id}
        class={`flex relative items-center w-full`}
      >

        <Slider class="carousel carousel-start sm:carousel-end gap-4">
          {cards?.map((card, index) => (
            <Slider.Item
              index={index}
              class={`carousel-item w-[80vw] first:pl-4 last:pr-4 lg:first:pl-16 lg:last:pr-16 max-w-[427px]`}
            >
              <CardItem card={card} />
            </Slider.Item>
          ))}
        </Slider>
        <div
          class={`absolute w-[95%] -bottom-[60px] left-1/2 -translate-x-1/2 flex items-center justify-between gap-2 lg:justify-between lg:top-[40%] lg:bottomUnset`}
        >

          <div class="block z-10 col-start-1 row-start-3">
            <Slider.PrevButton class="btn btn-circle bg-base-100 border border-base-200 h-8 min-h-8 w-8 hidden lg:flex">
              <Icon
                class="text-base-content"
                width={8}
                height={12}
                id="ChevronLeft"
              />
            </Slider.PrevButton>
          </div>

          <div class="block z-10 col-start-3 row-start-3">
            <Slider.NextButton class="btn btn-circle bg-base-100 border border-base-200 h-8 min-h-8 w-8 hidden lg:flex">
              <Icon
                class="text-base-content"
                width={8}
                height={12}
                id="ChevronRight"
              />
            </Slider.NextButton>
          </div>
        </div>
        <SliderJS rootId={id} infinite />
      </div>
    </div>
  )
}
