import { ImageWidget } from "apps/admin/widgets.ts";

export interface Logos {
  logo: ImageWidget;
  alt: string;
  href?: string;
  width?: number;
  height?: number;
}

export interface Security {
  title: string;
  items: Logos[];
}

export default function Security({ title, items }: Security) {
  return (
    <>
      <div class="flex flex-col gap-3">
        <h6 class={`text-base-100 font-semibold`}>{title}</h6>
        <div class="flex flex-wrap w-full gap-2 items-start">
          {items.map((item) => (
            <a href={item.href}>
              <img
                loading="lazy"
                src={item.logo}
                alt={item.alt}
                class={`object-contain`}
                width={item.width}
                height={item.height}
              />
            </a>
          ))}
          <div id="ra-verified-seal" class="scale-[0.7] translate-x-[-14px] translate-y-[-14px]">
            <script type="text/javascript" id="ra-embed-verified-seal"
              src="https://s3.amazonaws.com/raichu-beta/ra-verified/bundle.js" data-id="ODYyODpvc2Nhci1jYWxjYWRvcw==" data-target="ra-verified-seal" data-model="1"></script></div>
        </div>
      </div>
    </>
  );
}
