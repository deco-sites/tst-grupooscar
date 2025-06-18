import { useSignal } from "@preact/signals";
import type { ComponentChildren } from "preact";
import Icon from "site/components/ui/Icon.tsx";

export default function CategorySEOContent(
  { children }: { children: ComponentChildren },
) {
  const seeMore = useSignal(false);

  return (
    <div
      class={`flex flex-col overflow-hidden gap-8`}
    >
      <div
        class={`${
          seeMore.value ? "h-auto" : "h-[320px] lg:h-[240px]"
        } flex flex-col overflow-hidden`}
      >
        {children}
      </div>
      <button
        class={`px-6 py-2 flex gap-2 items-center justify-center rounded-badge bg-primary bg-opacity-10 w-max text-primary font-semibold`}
        onClick={() => {
          seeMore.value = !seeMore.value;
        }}
      >
        {seeMore.value ? "Leia menos" : "Leia mais"}
        <Icon id="categorySEOIcon" width="16" height="15" />
      </button>
    </div>
  );
}
