import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  image: ImageWidget;
  ImageText: RichText;
  alt: string;
  content: RichText;
}

export default function TextWithImageHistory(props: Props) {

  const { image, alt, content, ImageText } = props

  return (
    <div class="w-full h-full px-4 py-8 lg:px-0 lg:py-16 ">

      <div class="flex flex-col w-full h-full  gap-10 lg:gap-16 lg:flex-row max-w-[1076px] lg:mx-auto">
        <div class="flex w-full h-full flex-col gap-3 max-w-[336px]">
          <Image
            src={image}
            alt={alt}
            width={336}
            height={336}
            class="rounded-lg lg:max-w-[336px] lg:max-h-[336px]"
          />

          <span class="w-full text-[#157539] text-base " dangerouslySetInnerHTML={{ __html: ImageText }}>
          </span>
        </div>
        <div class="w-full h-full justify-center flex my-auto">
          <span class="text-sm" dangerouslySetInnerHTML={{ __html: content }}>

          </span>

        </div>
      </div>
    </div>
  )
}