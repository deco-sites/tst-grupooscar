import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { type SectionProps } from "@deco/deco";
/**
 * @titleBy matcher
 */
export interface Banner {
    /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
    matcher: string;
    image: {
        /** @description Image for big screens */
        desktop: ImageWidget;
        /** @description Image for small screens */
        mobile: ImageWidget;
        /** @description image alt text */
        alt?: string;
    };
}
const DEFAULT_PROPS = {
    banners: [
        {
            image: {
                mobile: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/91102b71-4832-486a-b683-5f7b06f649af",
                desktop: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/ec597b6a-dcf1-48ca-a99d-95b3c6304f96",
                alt: "a",
            },
            matcher: "/*",
        },
    ],
};
function Banner(props: SectionProps<ReturnType<typeof loader>>) {
    const { banner } = props;
    if (!banner) {
        return null;
    }
    const { image } = banner;
    return (<div class="grid grid-cols-1 grid-rows-1">
      <Picture preload class="col-start-1 col-span-1 row-start-1 row-span-1">
        <Source src={image.mobile} width={375} height={180} media="(max-width: 767px)"/>
        <Source src={image.desktop} width={1440} height={215} media="(min-width: 768px)"/>
        <img class="w-full" src={image.mobile} alt={image.alt ?? ""}/>
      </Picture>
    </div>);
}
export interface Props {
    banners?: Banner[];
}
export const loader = (props: Props, req: Request) => {
    const { banners } = { ...DEFAULT_PROPS, ...props };
    const banner = banners.find(({ matcher }) => new URLPattern({ pathname: matcher }).test(req.url));
    return { banner };
};
export default Banner;
