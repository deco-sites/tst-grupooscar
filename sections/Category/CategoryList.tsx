import Header from "$store/components/ui/SectionHeader.tsx";
import { useId } from "$store/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Category {
  label?: string;
  href?: string;
  image?: ImageWidget;
}

export interface Props {
  header?: {
    title?: string;
    description?: string;
  };
  list?: Category[];
  layout?: {
    headerAlignment?: "center" | "left";
    categoryCard?: {
      textPosition?: "top" | "bottom";
      textAlignment?: "center" | "left";
    };
  };
}

function CardText(
  { label, alignment }: {
    label?: string;
    alignment?: "center" | "left";
  },
) {
  return (
    <div
      class={`flex flex-col ${
        alignment === "center" ? "text-center" : "text-left"
      }`}
    >
      {label && (
        <h2 class="text-xs font-semibold">{label}</h2>
      )}
    </div>
  );
}

const DEFAULT_LIST = [
  {
    label: "Feminino",
    href: "/feminino",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
  },
  {
    label: "Feminino",
    href: "/feminino",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
  },
  {
    label: "Feminino",
    href: "/feminino",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
  },
  {
    label: "Feminino",
    href: "/feminino",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
  },
  {
    label: "Feminino",
    href: "/feminino",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
  },
];

function CategoryList(props: Props) {
  const id = useId();
  const {
    header = {
      title: "",
      description: "",
    },
    list = DEFAULT_LIST,
    layout = {
      headerAlignment: "center",
      categoryCard: {
        textPosition: "top",
        textAlignment: "center",
      },
    },
  } = props;

  return (
    <div class={`bg-base-300 w-full py-8 lg:py-10`}>
      <div
        id={id}
        class="w-full lg:w-11/12 2xl:w-4/5 mx-auto flex flex-col gap-8 lg:gap-10 text-base-content"
      >
        <Header
          title={header.title}
          description={header.description || ""}
          alignment={layout.headerAlignment || "center"}
        />

        <ul class="flex gap-6 lg:gap-8 pb-5 lg:pb-0 scroll-menu snap-center overflow-x-scroll lg:overflow-x-hidden justify-between items-center overflow-y-hidden">
          {list.map((
            { label, href, image },
          ) => (
            <li class="flex flex-col gap-4 first:pl-4 md:first:pl-0 last:pr-4 md:last:pr-0 md:w-full lg:max-w-[350px] 2xl:max-w-[450px]">
              <a
                href={href}
                class="flex flex-col gap-4 w-[285px] lg:w-full"
              >
                {layout.categoryCard?.textPosition === "top" &&
                  (
                    <CardText
                      label={label}
                      alignment={layout?.categoryCard?.textAlignment}
                    />
                  )}
                {image &&
                  (
                      <Image
                        class="w-full rounded-lg border border-black border-opacity-10"
                        src={image}
                        alt={ label }
                        width={396}
                        height={514}
                        loading="lazy"
                      />
                  )}
                {layout.categoryCard?.textPosition === "bottom" &&
                  (
                    <CardText
                      label={label}
                      alignment={layout?.categoryCard?.textAlignment}
                    />
                  )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoryList;
