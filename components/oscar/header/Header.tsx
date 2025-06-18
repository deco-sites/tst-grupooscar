import { AppContext } from "$store/apps/site.ts";
import Icon from "$store/components/ui/Icon.tsx";
import Drawers from "../../../islands/Oscar/Drawers.tsx";
import { useId } from "$store/sdk/useId.ts";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Alert from "./Alert.tsx";
import NavBar from "./NavBar.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import NavItem from "./NavItem.tsx";
import ScrollableContainer from "$store/components/oscar/header/ScrollableContainer.tsx";
import { type SectionProps } from "@deco/deco";
import LoginButton from "site/islands/Account/LoginButtonIframe.tsx";
import { SearchBarSuggestionsMobile } from "site/islands/Header/SearchBarSuggestion.tsx";
<<<<<<< HEAD
import { LabelBonifiq } from "site/islands/Header/Bonifiq.tsx";
=======
import { PageViewEvent, SendEventOnView } from "site/components/Analytics.tsx";

>>>>>>> main
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
/**@titleBy text */
interface ItemSocial {
  icon: "user-alert" | "cred-card-alert" | "duvida-alert" | "box-header";
  href: string;
  text?: string;
  openNewTab?: boolean;
}
export interface Social {
  sociais: ItemSocial[];
}
interface links {
  logo: ImageWidget;
  alt: string;
  href: string;
}
export interface Props {
  alerts: links[];
  /**
   * @title Social Media
   */
  social: Social;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems: MenuNavItem[];
  /** @title Logo */
  logo?: {
    src: ImageWidget;
    alt: string;
  };
  paths: {
    loginHref: string;
    favouriteHref: string;
  };
  ShippingPrice: number;
}
function Header(
  { alerts, navItems = [], logo, social, paths, ShippingPrice, device, url }:
    SectionProps<typeof loader>,
) {
  const platform = usePlatform();
  const id = useId();

  const event:PageViewEvent =  {
    name: "page_view",
    params:{
      pathname: url.pathname,
      page_type: url.pathname.includes("/p") ? "PDP" : url.pathname === "/" ? "home" : "PLP"
    }
  }
  return (
    <>
      <header id={id} class="h-[135px] lg:h-[142px]">
        <Drawers
          menu={{ items: navItems, social }}
          logo={logo}
          ShippingPrice={ShippingPrice}
          platform={platform}
          device={device}
        >
          <div class="bg-base-100 w-full z-20 h-auto xl:relative">
            <ScrollableContainer type="Alert">
              <div class="w-full bg-neutral">
                <div class="w-11/12 gap-6 flex m-auto items-center justify-between">
                  <Alert alerts={alerts} />
                  <ul class="hidden lg:flex items-center text-[0.56em] justify-end text-info">
                      <LabelBonifiq type="header"/>
                    {social.sociais.map((item) => {
                      if (item.href === "/account") {
                        return (
                          <li
                            class={`px-4 border-r border-r-black border-opacity-[12%] `}
                          >
                            <LoginButton />
                          </li>
                        )
                      }
                      return (
                        <>
                          <li
                            class={`px-4 border-r border-r-black border-opacity-[12%] `}
                          >
                            <a
                              href={item.href}
                              target={item.openNewTab ? "_blank" : "_self"}
                              class="flex gap-2 items-center text-xs w-max"
                            >
                              <Icon
                                id={item.icon}
                                size={16}
                                stroke-width={1}
                                class="text-primary"
                              />
                              {item.text &&
                                <>{item.text}</>}
                            </a>
                          </li>
                        </>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </ScrollableContainer>

            <div class="w-full lg:relative lg:bg-white lg:z-20 border-b border-base-200">
              <NavBar paths={paths} logo={logo} device={device} />
            </div>
            {navItems.length > 0 && device == "desktop" &&
              (
                <ScrollableContainer type="Menu">
                  <ul class="hidden lg:flex justify-center w-full items-center text-info min-h-10 h-10 bg-neutral relative">
                    {navItems.map((item, index) => (
                      <NavItem
                        item={item}
                        lastIndex={index === navItems.length - 1}
                      />
                    ))}
                  </ul>
                </ScrollableContainer>
              )}
            {device === "mobile" &&
              (
                <div className="w-full xl:hidden relative border-b border-solid border-base-200">
                  <SearchBarSuggestionsMobile />
                </div>
              )}
          </div>
        </Drawers>
      </header>
      <SendEventOnView
        id={id}
        event={event}
      />
    </>
  );
}
export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  const url = new URL(_req.url)
  return { ...props, device: ctx.device, url };
};
export default Header;
