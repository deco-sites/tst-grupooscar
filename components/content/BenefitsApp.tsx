import { RichText } from "apps/admin/widgets.ts";
import { useId } from "site/sdk/useId.ts";
import Slider from "site/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import ButtonCopy from "site/islands/Content/ButtonCopy.tsx";
import Icon from "site/components/ui/Icon.tsx";

/**@titleBy text */
export interface Benefit {
    text: RichText;
    codCupom?: string;
    labelButton?: string;
    linkButton?: string;
}

export interface Props {
    benefits: Benefit[];
    interval?: number;
}

export default function BenefitsApp({ benefits, interval }: Props) {
    const id = useId();
    return (
        <div id={id}>
            <Slider class="carousel carousel-center w-full bg-base-content py-2">
                {benefits.map((
                    { text, codCupom, labelButton, linkButton },
                    index,
                ) => (
                    <Slider.Item
                        index={index}
                        class="carousel-item flex gap-3 flex-col lg:flex-row w-11/12 mx-auto lg:w-full items-center justify-center text-base-100"
                    >
                        <div dangerouslySetInnerHTML={{ __html: text }} class={`text-center lg:text-start`} />
                        {labelButton && linkButton && codCupom && (
                            <div
                                class={`flex items-center justify-center gap-4`}
                            >
                                <ButtonCopy codeCupom={codCupom} />
                                <a
                                    class={`bg-base-100 rounded-badge px-3 flex items-center gap-1.5 justify-center h-7 text-base-content text-xs font-semibold`}
                                    href={linkButton}
                                >
                                    <Icon
                                        id="downloadIco"
                                        width={14}
                                        height={14}
                                        class={`text-primary`}
                                    />
                                    {labelButton}
                                </a>
                            </div>
                        )}
                    </Slider.Item>
                ))}
            </Slider>

            <SliderJS rootId={id} interval={interval && interval * 1e3} />
        </div>
    );
}
