import {
    renderTemplateString,
    SEOSection,
} from "apps/website/components/Seo.tsx";
import { ProductListingPage } from "apps/commerce/types.ts";
import { canonicalFromBreadcrumblist } from "apps/commerce/utils/canonical.ts";
import { AppContext } from "site/apps/site.ts";
import SEO from "site/components/_seo/SEO.tsx";

/**@titleBy matcher */
export interface Text {
    /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  **/
    matcher: string;
    title: string;
    description?: string;
}
/**@title {{title}} */
export interface Category {
    title: string;
    texts: Text[];
}

export interface ConfigJsonLD {
    /**
     * @title Remove videos
     * @description Remove product videos from structured data
     */
    removeVideos?: boolean;
}

export interface Props {
    /** @title Title e meta Description */
    categories?: Category[];
    /** @title Data Source */
    jsonLD: ProductListingPage | null;
    /** @hide true */
    canonical?: string;
    /**
     * @title Disable indexing
     * @description In testing, you can use this to prevent search engines from indexing your site
     */
    noIndexing?: boolean;
    noFollow?: boolean;

    /**
     * @title Disable indexing in Filter
     * @description In testing, you can use this to prevent search engines from indexing your site
     */
    noIndexingFilter?: boolean;
    noFollowFilter?: boolean;

    configJsonLD?: ConfigJsonLD;
}

/** @title Product listing custom */
export function loader(_props: Props, _req: Request, ctx: AppContext) {
    const url = new URL(_req.url);
    const isFilter = url.search != "";

    const props = _props as Partial<Props>;
    const {
        titleTemplate = "",
        descriptionTemplate = "",
        ...seoSiteProps
    } = ctx.seo ?? {};
    const { jsonLD, categories } = props;

    const texts = categories?.map(({ texts }) => texts).flat();

    const text = texts?.find(({ matcher }) => {
        if (typeof matcher !== "string" || matcher.length === 0) {
            console.error("Invalid matcher:", matcher);
            return false;
        }

        try {
            return new URLPattern({ pathname: matcher }).test(_req.url);
        } catch (error) {
            console.error("Error creating URLPattern:", error);
            return false;
        }
    });

    const title = renderTemplateString(
        titleTemplate,
        text?.title || jsonLD?.seo?.title || ctx.seo?.title || "",
    );
    const description = renderTemplateString(
        descriptionTemplate,
        text?.description || jsonLD?.seo?.description || ctx.seo?.description ||
            "",
    );
    const canonical = props.canonical
        ? props.canonical
        : jsonLD?.seo?.canonical
        ? jsonLD.seo.canonical
        : jsonLD?.breadcrumb
        ? canonicalFromBreadcrumblist(jsonLD?.breadcrumb)
        : undefined;

    const noIndexing = props.noIndexing ||
        !jsonLD ||
        !jsonLD.products.length ||
        jsonLD.seo?.noIndexing;

    const noFollow = props.noFollow;

    const noFollowFilter = props.noFollowFilter;
    const noIndexingFilter = props.noIndexingFilter;

    console.log(noIndexing, noFollow, noFollowFilter, noIndexingFilter);

    if (props.configJsonLD?.removeVideos) {
        jsonLD?.products.forEach((product) => {
            product.video = undefined;
            product.isVariantOf?.hasVariant.forEach((variant) => {
                variant.video = undefined;
            });
        });
    }

    return {
        ...seoSiteProps,
        title,
        description,
        canonical,
        jsonLDs: [jsonLD],
        noIndexing,
        noFollow,
        noFollowFilter,
        noIndexingFilter,
        isFilter,
        url
    };
}

function Section(props: Props): SEOSection {
    return <SEO {...props} />;
}

export function LoadingFallback(props: Partial<Props>) {
    return <SEO {...props} />;
}

export { default as Preview } from "apps/website/components/_seo/Preview.tsx";

export default Section;