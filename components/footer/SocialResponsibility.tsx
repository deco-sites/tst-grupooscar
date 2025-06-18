import { ImageWidget } from "apps/admin/widgets.ts";

export interface Logos {
  logo: ImageWidget;
  alt: string;
  href?: string;
}

export interface SocialResponsibility {
  title: string;
  items: Logos[];
}

export default function SocialResponsibility(
  { title, items }: SocialResponsibility,
) {
  return (
    <>
      <div class="flex flex-col gap-3 border-b border-base-100 border-opacity-15 pb-4 lg:border-b-0">
        <h6 class={`text-base-100 font-semibold`}>{title}</h6>
        <div class="flex flex-wrap w-full gap-2">
          {items.map((item) => (
            <a href={item.href}>
              <img
                loading="lazy"
                src={item.logo}
                alt={item.alt}
                class={`object-contain`}
                width={140}
              />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
