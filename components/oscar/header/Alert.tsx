import { useId } from "$store/sdk/useId.ts";
import { ImageWidget } from "apps/admin/widgets.ts";

interface links {
  logo: ImageWidget;
  alt: string;
  href: string;
}
export interface Props {
  alerts: links[];
}

function Alert({ alerts }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class="relative flex items-center gap-2 justify-center w-full xl:w-[50%] lg:justify-start"
    >
      {alerts.map((item) => {
        return (
          <>
            <div
              class={`flex items-center justify-center h-full px-6 py-1.5 first:bg-white first:border-t-2 first:border-t-primary `}
            >
              <a
                class={`flex items-center justify-center h-full`}
                href={item.href}
                target={"_blank"}
              >
                <img
                  class="object-contain min-h-4 h-4 lg:h-[18px]"
                  src={item.logo}
                  alt={item.alt}
                  width={65}
                />
              </a>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default Alert;
