import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import { Section } from "@deco/deco/blocks";

export interface Props{
    image: ImageWidget;
    title?: string;
    subtitle?: RichText;
    ctaLabel?: string;
    ctaUrl?: string;
    categoriesBanners?: Section;
    /** @description Vitrine to be displayed below the not found message */
    vitrine?: Section;
}

export default function NotFound({ image, title, subtitle, ctaLabel, ctaUrl, vitrine, categoriesBanners }: Props) {
    return (
        <div class={`flex flex-col lg:items-center lg:justify-center gap-4 py-8`}>
            <div class="flex flex-col px-4 lg:px-0 lg:flex-row items-center justify-center gap-4 vz-container">
                <div>
                    <img src={image} alt={title} width={550} height={300} loading="eager" decoding={"sync"} class={`w-full object-contain max-w-[550px]`}/>
                </div>
                <div class={`flex flex-col gap-4 items-center text-center lg:text-left lg:items-start`}>
                    <h1 class="text-2xl font-bold">{title}</h1>
                    <div dangerouslySetInnerHTML={{__html: subtitle || ""}}/>
                    {ctaLabel && ctaUrl && <a href={ctaUrl} class="btn bg-primary rounded-md text-white w-max">{ctaLabel}</a>}
                </div>
            </div>
            {categoriesBanners && <categoriesBanners.Component {...categoriesBanners.props} />}
            {vitrine && <vitrine.Component {...vitrine.props} />}
        </div>

    );
}