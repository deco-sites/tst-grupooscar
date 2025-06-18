import { useId } from "$store/sdk/useId.ts";
import { type SectionProps } from "@deco/deco";
/**
 * @titleBy label
 */
export interface Item {
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
    title?: string;
    categoriesURL: Category[];
}
function Card({ href, label }: Item) {
    return (<a href={href} class="flex items-center justify-center w-10 h-10 border border-base-200 rounded-full bg-base-100">
      <span class="font-medium text-xs">{label}</span>
    </a>);
}
function ChooseYourNumber(props: SectionProps<ReturnType<typeof loader>>) {
    const { category } = props;
    if (!category) {
        return null;
    }
    const { items } = category;
    const id = useId();
    return (<div id={id} class={`flex flex-col items-center justify-center gap-4 w-full pt-4 pb-6 bg-base-300`}>
      <h2 class={`w-max text-primary-content font-semibold`}>{props.title}</h2>
      <div class="flex-wrap w-11/12 mx-auto pb-4 lg:pb-0 flex items-center justify-center gap-3">
        {items.map((i) => <Card {...i}/>)}
      </div>
    </div>);
}
export const loader = (props: Props, req: Request) => {
    const { categoriesURL } = { ...props };
    const category = categoriesURL.find(({ matcher }) => new URLPattern({ pathname: matcher }).test(req.url));
    return { category, title: props.title };
};
export default ChooseYourNumber;
