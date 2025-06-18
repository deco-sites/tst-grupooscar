import type { ImageWidget } from "apps/admin/widgets.ts";
import { useId } from "$store/sdk/useId.ts";
import { type SectionProps } from "@deco/deco";
/**
 * @titleBy label
 */
export interface Item {
    image: ImageWidget;
    href: string;
    label: string;
}
/**
 * @titleBy matcher
 */
export interface Category {
    /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
    matcher: string;
    items: Item[];
}
export interface Props {
    categoriesURL: Category[];
}
function Card({ image, href, label }: Item) {
    return (<a href={href} class="flex flex-col gap-3 items-center justify-center min-w-[100px] w-[100px]">
      <img src={image} alt={label} width={100} height={100} loading="lazy" decoding={"async"} class={`w-full aspect-square object-contain rounded-full`}/>
      <span class="font-normal text-sm">{label}</span>
    </a>);
}
function CategoryGridBanners(props: SectionProps<ReturnType<typeof loader>>) {
    const { category } = props;
    if (!category) {
        return null;
    }
    const { items } = category;
    const id = useId();
    return (<div id={id} class={`flex flex-col gap-6 w-full pt-4 pb-6 bg-base-300`}>
      <div class="w-full overflow-x-scroll lg:overflow-x-hidden px-4 lg:px-0 pb-4 lg:pb-0 flex items-center lg:justify-center gap-8">
        {items.map((i) => <Card {...i}/>)}
      </div>
    </div>);
}
export const loader = (props: Props, req: Request) => {
    const { categoriesURL } = { ...props };
    const category = categoriesURL.find(({ matcher }) => new URLPattern({ pathname: matcher }).test(req.url));
    return { category };
};
export default CategoryGridBanners;
