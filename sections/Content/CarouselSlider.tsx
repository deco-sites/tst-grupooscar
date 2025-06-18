import { ImageWidget } from "apps/admin/widgets.ts";

/** @titleBy altText */
export interface SlideProps {
  image: ImageWidget;
  href: string;
  altText: string;
}

export interface Props {
  title: string;
  content?: SlideProps[];
}

export default function Slide({
  content,
  title,
}: Props) {
  const slideContent = content?.map(({ image, altText, href }) => {
    return (
      <li class="flex items-center gap-x-10 mx-4">
        <a
          href={href}
          class="flex flex-col gap-3 items-center justify-center w-[33vw] lg:w-[120px]"
        >
          <img
            src={image}
            alt={altText}
            width={120}
            height={120}
            loading="lazy"
            decoding={"async"}
            class={`w-full aspect-square object-contain rounded-full`}
          />
        </a>
      </li>
    );
  });
  return (
    <div class="w-full bg-base-300 py-8 lg:pb-16 lg:pt-0">
      <div class="relative overflow-hidden w-full mx-auto flex flex-col gap-8 h-[200px]">
        <h2 class="text-xl lg:w-max mx-auto uppercase font-normal lg:text-2xl">
          {title}
        </h2>
        <ul class="animate-slide absolute top-16 left-4 flex flex-nowrap lg:left-8">
          {slideContent}
          {slideContent}
        </ul>
      </div>
    </div>
  );
}
