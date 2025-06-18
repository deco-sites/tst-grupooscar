import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "@deco/deco/hooks";

/**
 * @titleBy title
 */
interface Card {
  imageCard: ImageWidget;
  alt: string;
  title: string;
  content: RichText;
}

export interface Props {
  imageMobile: ImageWidget;
  imageDesktop: ImageWidget;
  preload: boolean;
  alt: string;
  title: string;
  content: RichText;
  cards: Card[];
}

function ItemCard({ card }: { card: Card }) {

  const { imageCard, title, alt, content } = card
  return (
    <li class="flex flex-col gap-4 carousel-item max-w-[160px] ">
      <Image
        src={imageCard}
        alt={alt}
        width={160}
        height={160}
        class="w-full h-full rounded-3xl max-w-[160px] max-h-[160px]"
      />
      <h2 class="font-bold text-white text-xs text-center">{title}</h2>
      <span class="text-xs text-white text-center" dangerouslySetInnerHTML={{ __html: content }}>

      </span>
    </li>
  )
}

export default function HeroWithModal(props: Props) {

  const device = useDevice()
  const isMobile = device === "mobile"

  const { imageMobile, imageDesktop, alt, title, content, cards, preload } = props

  return (
    <div class="w-full h-full flex flex-col">
      <div class="w-full flex h-full">
        <Image
          src={isMobile ? imageMobile : imageDesktop}
          alt={alt}
          width={isMobile ? 375 : 1440}
          height={isMobile ? 345 : 442}
          preload={preload}
          fetchPriority={preload ? "high" : "low"}
          class={"w-full h-full"}
        />
      </div>
      <div class="flex w-full h-full px-4 -mt-24">
        <div class="flex flex-col gap-6 bg-accent-content rounded-3xl px-6 py-11 w-full max-w-[992px] mx-auto lg:px-16 lg:py-10">
          <h1 class="text-3xl lg:text-5xl text-white text-center">{title}</h1>
          <span class="text-white text-center text-sm"
            dangerouslySetInnerHTML={{ __html: content }}
          ></span>
          <ul class="flex flex-row carousel carousel-vertical gap-4 lg:justify-center">
            {cards.map((card) => <ItemCard card={card} />)}
          </ul>
        </div>
      </div>
    </div>
  )
}