import { ImageWidget } from "apps/admin/widgets.ts";

export interface Logos {
  logo: ImageWidget;
  alt: string;
  href?: string;
}

export interface PaymentMethods {
  title: string;
  items: Logos[];
}

export default function PaymentMethods({title, items}: PaymentMethods) {
  return (
    <>
      <div class="flex flex-col gap-3">
        <h6 class={`text-base-100 font-semibold`}>{title}</h6>
        <div class="flex flex-wrap w-full gap-2">
          {items.map((item) => (
            <img
              loading="lazy"
              src={item.logo}
              alt={item.alt}
              width={42}
              height={26}
            />
          ))}
        </div>
      </div>
    </>
  );
}
