import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";


/**
 * @titleBy title
 */
interface Card {
  image: ImageWidget;
  alt: string;
  title: string;
  content: RichText;
}

export interface Props {
  cards: Card[]
}

function CardItem({ card }: { card: Card }) {
  return (
    <li class="relative w-full h-full rounded-lg">
      <Image
        alt={card.alt}
        src={card.image}
        width={343}
        height={320}
        class="w-full h-full"

      />
      <div class="w-full absolute bottom-0 left-0 right-0 bg-black bg-opacity-25 px-3 py-3 rounded-b-lg">
        <h3 class="uppercase text-white">{card.title}</h3>
        <span class="text-white" dangerouslySetInnerHTML={{ __html: card.content }}></span>
      </div>
    </li>
  )
}

export default function CardBenefits(props: Props) {

  const { cards } = props
  return (
    <div class="w-full h-full py-12">
      <ul class="w-full h-full flex flex-col lg:flex-row mx-auto gap-4 px-4 lg:gap-8 max-w-[1156px]">
        {cards.map((card) => <CardItem card={card} />)}

      </ul>
    </div>
  )
}