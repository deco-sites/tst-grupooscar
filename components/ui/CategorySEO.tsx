import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import { type SectionProps } from "@deco/deco";
import CategorySEOContent from "site/components/ui/CategorySEOContent.tsx";
/**@titleBy matcher */
export interface UxWriting {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  title: string;
  headingtag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  description: RichText;
}
const DEFAULT_PROPS = {
  title: "Maculino",
  matcher: "/*",
  description:
    "Nulla vitae malesuada risus. Nam accumsan varius elementum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed nec quam quis nulla vehicula malesuada. Suspendisse sit amet lacus laoreet, interdum urna id, maximus arcu. Aliquam egestas porta ex, et tempus libero tempor vel. Morbi massa orci, faucibus nec venenatis in, cursus sit amet nibh. Ut sit amet metus libero.",
};
export interface Props {
  seoTexts?: UxWriting[];
}
function Title({ headingtag, title }: Pick<UxWriting, "headingtag" | "title">) {
  switch (headingtag) {
    case "h1":
      return (
        <h1 class={`lg:w-max uppercase font-semibold text-xl`}>
          {title}
        </h1>
      );
    case "h2":
      return (
        <h2 class={`lg:w-max uppercase font-semibold text-xl`}>
          {title}
        </h2>
      );
    case "h3":
      return (
        <h3 class={`lg:w-max uppercase font-semibold text-xl`}>
          {title}
        </h3>
      );
    case "h4":
      return (
        <h4 class={`lg:w-max uppercase font-semibold text-xl`}>
          {title}
        </h4>
      );
    case "h5":
      return (
        <h5 class={`lg:w-max uppercase font-semibold text-xl`}>
          {title}
        </h5>
      );
    case "h6":
      return (
        <h6 class={`lg:w-max uppercase font-semibold text-xl`}>
          {title}
        </h6>
      );
    default:
      return null;
  }
}
function UxWriting(props: SectionProps<ReturnType<typeof loader>>) {
  const { seoText } = props;
  if (!seoText) {
    return null;
  }
  const { title, description, headingtag = "h2", image } = seoText;
  return (
    <>
      <div class="w-full py-6 lg:py-16 bg-base-300">
        <div
          class={`w-11/12 mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-center lg:items-start`}
        >
          <CategorySEOContent>
            <div class={`flex flex-col gap-4 lg:max-w-[1440px]`}>
              <Title headingtag={headingtag} title={title} />
              <div class={`flex flex-col gap-4 text-sm`} dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </CategorySEOContent>
        </div>
      </div>
    </>
  );
}
export const loader = (props: Props, req: Request) => {
  const { seoTexts } = { ...DEFAULT_PROPS, ...props };
  const seoText = seoTexts?.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );
  return { seoText };
};
export default UxWriting;
