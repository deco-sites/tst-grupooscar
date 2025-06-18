import Button from "$store/components/ui/Button.tsx";
import IconChevronRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-right.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import Icon from "site/components/ui/Icon.tsx";
import LoginButton from "site/islands/Account/LoginButtonIframe.tsx";
import { LabelBonifiq } from "site/islands/Header/Bonifiq.tsx";

export interface lastChild {
  type: "navItem" | "sizeItem";
  label: string;
  href?: string;
}
interface INavItem {
  label: string;
  href?: string;
  children?: lastChild[];
}
export interface MenuNavItem {
  label: string;
  href?: string;
  children?: INavItem[];
  fontBold?: boolean;
  destaque?: boolean;
}

interface ItemSocial {
  icon: "user-alert" | "cred-card-alert" | "duvida-alert" | "box-header";
  href: string;
  text?: string;
  openNewTab?: boolean;
}
export interface Social {
  sociais: ItemSocial[];
}

export interface Props {
  items: MenuNavItem[];
  social: Social;
}

function Menu({ items, social }: Props) {
  const {
    displayMenuProducts,
    displayMenu,
    productsChild,
  } = useUI();

  return (
    <div class="flex flex-col h-auto w-full bg-base-300 justify-between">
      <ul class="flex flex-col text-xs">
        {items.map((item) => (
          <li class="font-medium">
            {item.children !== undefined && item.children?.length > 0
              ? (
                <Button
                  class={`flex border-b-[1px] items-center justify-between py-3 m-auto w-full bg-base-300 text-[14px] leading-[17.5px] ${item.destaque ? "text-primary" : ""
                    } ${item.fontBold
                      ? "font-bold text-accent-content"
                      : "font-normal"
                    } hover:bg-inherit border-base-200 border-t-0`}
                  onClick={() => {
                    displayMenuProducts.value = true;
                    displayMenu.value = false;
                    productsChild.value = {
                      label: item.label,
                      children: item.children,
                      href: item.href,
                      // deno-lint-ignore no-explicit-any
                    } as any;
                  }}
                >
                  {item.label}
                  <IconChevronRight class="w-5 h-5" />
                </Button>
              )
              : (
                <a
                  href={item.href}
                  class={`flex border-b-[1px] items-center justify-between px-4 py-4 m-auto w-full bg-base-300 text-[14px] leading-[17.5px] ${item.destaque ? "text-primary" : ""
                    } ${item.fontBold
                      ? "font-bold text-accent-content"
                      : "font-normal"
                    }`}
                >
                  {item.label}
                </a>
              )}
          </li>
        ))}
          <LabelBonifiq type="menu"/>
      </ul>

      <ul class="grid grid-cols-2">
        {social.sociais.map((item, index) => {
          return (
            <>
              {index == 0 &&
                (
                  <li
                    class={`py-4 px-2.5 flex justify-center border border-base-200 bg-base-100`}
                  >
                    <a
                      href={item.href}
                      target={item.openNewTab ? "_blank" : "_self"}
                      class="flex gap-2 items-center text-xs"
                    >
                      <Icon
                        id={item.icon}
                        size={16}
                        stroke-width={1}
                        class="text-info"
                      />
                      {item.text &&
                        <>{item.text}</>}
                    </a>
                  </li>
                )}
              <li
                class={`py-4 px-2.5 lg:flex justify-center border border-base-200 bg-base-100 hidden`}>
                <LoginButton />
              </li>
              {index === 1 &&
                (
                  <li
                    class={`py-4 px-2.5 flex justify-center border border-base-200 bg-base-100`}
                  >
                    <a
                      href={"/my-account#/wishlist"}
                      class="flex gap-2 items-center text-xs"
                    >
                      <Icon
                        id={"heart-menu-mobile"}
                        size={16}
                        stroke-width={1}
                        class="text-primary"
                      />
                      Lista de desejos
                    </a>
                  </li>
                )}
            </>
          );
        })}
        <div class="flex w-full px-4 py-3 bg-primary col-start-1 col-end-3 justify-center">
          <ul class={`flex items-center justify-center gap-3`}>
            <li>
              <a href="https://www.instagram.com/oscarcalcados/" target={"_blank"}>
                <Icon id={"insta-menu"} size={37} stroke-width={1} />
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/oscarcalcados" target={"_blank"}>
                <Icon id={"face-menu"} size={37} stroke-width={1} />
              </a>
            </li>
            <li>
              <a href="https://br.pinterest.com/oscarcalcados/" target={"_blank"}>
                <Icon id={"pinterest-menu"} size={37} stroke-width={1} />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/user/OscarCalcados" target={"_blank"}>
                <Icon id={"youtube-menu"} size={37} stroke-width={1} />
              </a>
            </li>
          </ul>
        </div>
      </ul>
    </div>
  );
}

export default Menu;
