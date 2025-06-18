import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface App {
  label: string;
  image: ImageWidget;
  link: string;
}

export interface Props {
  banner: {
    desktop: ImageWidget;
    mobile: ImageWidget;
    altText: string;
  };
  text: RichText;
  apps: App[];
}

export default function BannerApp({ banner, text, apps }: Props) {
  return (
    <div class={`w-full relative bg-base-300 pt-8`}>
      <Picture>
        <Source
          media="(max-width: 767px)"
          src={banner?.mobile}
          width={375}
          height={213}
        />
        <Source
          media="(min-width: 768px)"
          src={banner?.desktop ? banner?.desktop : banner?.mobile}
          width={1440}
          height={270}
        />
        <img
          class="w-full h-full object-cover"
          src={banner?.mobile}
          alt={banner?.altText}
          decoding="async"
          loading="lazy"
        />
      </Picture>
      <div class={`absolute bottom-6 left-1/2 -translate-x-1/2 w-11/12 lg:left-[unset] lg:translate-x-[unset] lg:right-[2vw] xl:right-[3vw] 2xl:right-[6vw] lg:top-[30%] lg:flex lg:flex-col lg:items-end lg:justify-center lg:gap-4`}>
        <div class="hidden lg:flex w-[270px] text-base-100 text-sm" dangerouslySetInnerHTML={{ __html: text || "" }} />
        <div class="flex gap-1 lg:gap-2">
          {apps.map((app) => (
            <a href={app.link}>
              <img
                class=" object-cover w-[96px] h-[29px] lg:w-[130px] lg:h-[40px]"
                src={app.image}
                alt={app.label}
                width={130}
                height={41}
                decoding="async"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
