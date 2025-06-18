import { ImageWidget } from "apps/admin/widgets.ts";

export interface lastChild {
  type: "navItem" | "sizeItem";
  label: string;
  href?: string;
}
export interface INavItem {
  label: string;
  href?: string;
  children?: lastChild[];
}

export interface Card {
  img: ImageWidget;
  label: string;
  href: string;
}
export interface MenuNavItem {
  label: string;
  href?: string;
  children?: INavItem[];
  cards?: Card[];
  imgRight?: ImageWidget;
  linkImage?: string;
  destaque?: boolean;
  fontBold?: boolean;
}

function NavItem({ item }: { item: MenuNavItem; lastIndex: boolean }) {
  const {
    href,
    label,
    children,
    destaque,
    fontBold,
    cards,
    imgRight,
    linkImage,
  } = item;

  return (
    <li class="group flex items-center">
      <a
        href={href}
        class={`px-5 py-2.5 ${
          destaque ? "text-primary" : "text-base-content"
        } ${fontBold ? "font-bold text-primary-content" : "font-medium"}`}
      >
        <span
          class={`${href ? "group-hover:underline" : ""} text-base`}
        >
          {label}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="absolute hidden hover:flex w-11/12 max-w-[1300px] h-[442px] 2xl:h-[462px] group-hover:flex flex-col bg-base-100 z-50 items-start justify-start border-t-[1px] border-solid border-base-200 group-hover:border-2 m-auto rounded-b-lg p-6 gap-6"
            style={{ top: "39px", left: "50%", transform: "translateX(-50%)" }}
          >
            <div class={`flex items-center justify-between w-full`}>
              {cards && cards.length > 0 && (
                <div class={`flex gap-6 items-center justify-start`}>
                  {cards?.map((card) => (
                    <a
                      href={card.href}
                      class={`flex flex-col gap-3 items-center justify-center`}
                    >
                      <img src={card.img} alt={card.label} />
                      {/* <span class={`text-sm text-primary`}>{card.label}</span> */}
                    </a>
                  ))}
                </div>
              )}
              {imgRight && (
                <a href={linkImage} class="flex rounded-lg max-w-[486px]">
                  <img
                    src={imgRight}
                    alt="img"
                    class={`w-full object-contain rounded-lg`}
                  />
                </a>
              )}
            </div>
            <ul class="w-full h-full relative flex items-start gap-16">
              {children.map((node) => (
                <li class="flex flex-col gap-3">
                  <a
                    class="hover:underline pb-1.5 text-sm font-bold border-b border-base-200 text-nowrap"
                    href={node.href}
                  >
                    {node.label}
                  </a>
                  <ul
                    class={`${
                      node.children !== undefined && node.children.length > 0
                        ? node.children[0].type == "sizeItem"
                          ? "flex-row flex-wrap h-auto gap-2 pr-0 max-w-[200px] min"
                          : "flex-col gap-y-2.5 gap-x-8 h-full"
                        : "flex-col gap-2.5 h-full"
                    } flex max-h-[230px] flex-wrap`}
                  >
                    {node.children?.map((leaf) => (
                      <>
                        {leaf.type == "sizeItem"
                          ? (
                            <li
                              class={`w-10 h-10 rounded-full border border-base-200 flex items-center justify-center`}
                            >
                              <a
                                href={leaf.href}
                                class={`text-xs font-medium w-full h-full flex items-center justify-center`}
                              >
                                {leaf.label}
                              </a>
                            </li>
                          )
                          : (
                            <li>
                              <a class="hover:underline" href={leaf.href}>
                                <span class="text-sm">
                                  {leaf.label}
                                </span>
                              </a>
                            </li>
                          )}
                      </>
                    ))}
                    {node.children !== undefined && node.children.length > 0 &&
                      (
                        <>
                          {node.children[0].type != "sizeItem" &&
                            (
                              <li>
                                <a class="" href={node.href}>
                                  <span class="text-sm text-primary underline">
                                    Ver tudo
                                  </span>
                                </a>
                              </li>
                            )}
                        </>
                      )}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
