import type { ImageWidget, RichText } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import { type Section } from "@deco/deco/blocks";
import Timer from "site/islands/Stopwatch.tsx";
import { useDevice } from "@deco/deco/hooks";

export interface Stopwatch {
  title: string;
  description: RichText;
  /**@format datetime */
  startDate: string;
  /**@format datetime */
  endDate: string;
}

export interface Props {
  /**
   * @format color
   */
  bgColor: string;
  image: {
    desktop: ImageWidget;
    mobile: ImageWidget;
    alt?: string;
    href?: string;
  };
  activeStopwatch: boolean;
  stopwatch?: Stopwatch;
  title?: string;
  markupTitle?: boolean;
  description?: string;
  headerAlignment?: "center" | "left";
  headerfontSize?: "Normal" | "Large" | "Small";
  section: Section;
}
export default function ShelfWithImage(
  {
    activeStopwatch,
    stopwatch,
    bgColor,
    section,
    image,
    title,
    markupTitle,
    description,
    headerAlignment,
    headerfontSize,
  }: Props,
) {
  const device = useDevice();
  return (
    <div
      class="w-full flex flex-col py-16 gap-10"
      style={{ backgroundColor: bgColor }}
    >
      <div class={`hidden w-full lg:flex lg:justify-center`}>
        <Header
          title={title || ""}
          description={description || ""}
          markupTitle={markupTitle}
          fontSize={headerfontSize || "Large"}
          alignment={headerAlignment || "center"}
        />
      </div>
      <div class="flex flex-col lg:grid lg:grid-cols-[28vw_68.2vw] 2xl:grid-cols-[25vw_72.3vw] lg:overflow-x-hidden gap-8">
        <a
          href={image.href}
          class={`${
            activeStopwatch ? "flex-col" : ""
          } lg:pl-[4vw] w-full flex`}
        >
          <Picture preload={false} class={`w-full`}>
            <Source
              media="(max-width: 767px)"
              fetchPriority={"low"}
              src={image.mobile}
              width={375}
              height={395}
            />
            <Source
              media="(min-width: 768px)"
              fetchPriority={"low"}
              src={image.desktop}
              width={360}
              height={395}
            />
            <img
              class="object-cover w-full rounded-lg lg:mb-0"
              loading={"lazy"}
              src={image.desktop}
              alt={image.alt}
            />
          </Picture>
          {activeStopwatch && stopwatch && device == "mobile" &&
            <Timer {...stopwatch} />}
        </a>
        {title &&
          (
            <div class={`flex w-full mb-8 lg:hidden`}>
              <Header
                title={title || ""}
                description={description || ""}
                markupTitle={markupTitle}
                fontSize={headerfontSize || "Large"}
                alignment={headerAlignment || "center"}
              />
            </div>
          )}
        <div class={`flex flex-col w-full justify-between`}>
          {activeStopwatch && stopwatch && device == "desktop" &&
            <Timer {...stopwatch} />}
          <section.Component {...section.props} />
        </div>
      </div>
    </div>
  );
}
