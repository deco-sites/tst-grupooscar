import { ImageWidget } from "apps/admin/widgets.ts";
import Header from "site/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "site/sdk/useId.ts";
import Icon from "site/components/ui/Icon.tsx";

export interface Numbers {
    label: string;
    link: string;
}

/**@titleBy title */
export interface Card {
    title: string;
    link: string;
    image: ImageWidget;
    numbers: Numbers[];
}

export interface Props {
    title: string;
    cards: Card[];
}

export default function ComprePorNumeracao(props: Props) {
    const { title, cards } = props;
    const id = useId();
    return (
        <div
            class={`flex flex-col items-center justify-center gap-8 pt-8 pb-20 lg:py-10 bg-base-300`}
        >
            <Header
                title={title || ""}
                description={""}
                markupTitle={false}
                fontSize={"Small"}
                alignment={"center"}
            />
            <div
                class={`flex gap-4 lg:gap-6 items-center scroll-menu justify-start pb-8 lg:pb-0 lg:justify-center w-11/12 mx-auto overflow-x-scroll snap-center lg:overflow-hidden`}
            >
                {cards.map((card, index) => (
                    <div class="w-full max-w-[285px] lg:max-w-[350px] 2xl:max-w-[500px] flex flex-col items-center justify-center gap-2 p-2 relative bg-base-100 rounded-xl">
                        <div class="w-full flex items-center justify-center">
                            <a href={card.link} class={`rounded-lg w-full`}>
                                <img
                                    loading="lazy"
                                    src={card.image}
                                    alt={card.title}
                                    class={`rounded-lg w-full`}
                                />
                            </a>
                        </div>
                        <div class="w-full flex items-center justify-center">
                            <a
                                href={card.link}
                                class={`w-[210px] background-gradient-primary flex gap-2 items-center justify-center py-2.5 rounded-badge`}
                            >
                                <h3 class="text-center text-sm font-semibold text-base-100 leading-none">
                                    {card.title}
                                </h3>
                                <Icon
                                    class="text-base-100"
                                    width={13}
                                    height={12}
                                    id="arrow-right"
                                />
                            </a>
                        </div>
                        <div id={id + index} class={`flex w-3/5 lg:w-[80%] mx-auto`}>
                            <Slider class="carousel gap-4">
                                {card.numbers.map((number, index) => (
                                    <Slider.Item
                                        index={index}
                                        class={`carousel-item `}
                                    >
                                        <a
                                            href={number.link}
                                            class={`border border-base-200 rounded-full bg-base-100 flex items-center justify-center w-10 h-10`}
                                        >
                                            <h3 class="text-xs font-medium leading-none">
                                                {number.label}
                                            </h3>
                                        </a>
                                    </Slider.Item>
                                ))}
                            </Slider>
                                <div class="absolute left-0 flex z-10 col-start-1 row-start-3">
                                    <Slider.PrevButton class="btn btn-square btn-ghost hover:bg-base-100 border-none bg-base-100 h-10 min-h-10 w-10">
                                        <Icon
                                            class="text-base-content"
                                            width={8}
                                            height={12}
                                            id="ChevronLeft"
                                        />
                                    </Slider.PrevButton>
                                    <div class={`w-2.5 h-10 background-shadow-left`}>

                                    </div>
                                </div>
                                <div class="absolute right-0 flex z-10 col-start-3 row-start-3">
                                    <div class={`w-2.5 h-10 background-shadow-right`}>

                                    </div>
                                    <Slider.NextButton class="btn btn-square btn-ghost hover:bg-base-100 border-none bg-base-100 h-10 min-h-10 w-10">
                                        <Icon
                                            class="text-base-content"
                                            width={8}
                                            height={12}
                                            id="ChevronRight"
                                        />
                                    </Slider.NextButton>
                                </div>
                            <SliderJS rootId={id + index} infinite />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
