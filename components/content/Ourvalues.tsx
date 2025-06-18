import Image from "apps/website/components/Image.tsx";
import { ImageWidget, RichText } from "apps/admin/widgets.ts";

interface Card {
  image: ImageWidget;
  alt: string;
  title: RichText;
}

export interface Props {
  title: string;
  cards: Card[]
}

function ItemCard({ card }: { card: Card }) {
  return (
    <li class=" flex flex-col gap-4 w-[calc(50%-0.4rem)] bg-white rounded-xl p-4 justify-center items-center h-auto max-w-[198px]">
      <Image
        src={card.image}
        alt={card.alt}
        width={83}
        height={83}
      />
      <span class="text-xs text-center" dangerouslySetInnerHTML={{ __html: card.title }}>
      </span>
    </li>
  )
}

export default function OurValues(props: Props) {
  return (
    <div class="w-full h-full py-10 bg-base-300 px-4 lg:px-16 flex gap-6 flex-col lg:py-16">
      <h2 class="text-xl border-b-2 border-black border-opacity-25 pb-3 w-full text-center">
        {props.title}
      </h2>
      <ul class="flex flex-row gap-3 lg:gap-6 flex-wrap justify-center max-w-[874px] mx-auto">
        {props.cards.map((card) => <ItemCard card={card} />)}
      </ul>
    </div>
  )
}