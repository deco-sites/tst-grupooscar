import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableIcons =
  | "ArrowsPointingOut"
  | "handshake"
  | "money-bill-wave"
  | "Bars3"
  | "box-header"
  | "mailFooter"
  | "clubeOscar"
  | "categorySEOIcon"
  | "wpp-pdp"
  | "payments-card"
  | "discountIcon"
  | "threeItems"
  | "fourItems"
  | "close-filters"
  | "horizontalIcon"
  | "verticalIcon"
  | "vtex-footer"
  | "tec4u-footer"
  | "deco-footer"
  | "wpp-footer"
  | "minus-cart"
  | "plus-cart"
  | "close-cart"
  | "ChevronLeftMenu"
  | "face-menu"
  | "insta-menu"
  | "pinterest-menu"
  | "youtube-menu"
  | "heart-menu-mobile"
  | "wpp-menu-mobile"
  | "close-menu"
  | "LogoOscarMob"
  | "user-header-mob"
  | "LogoOscar"
  | "wpp-header"
  | "user-alert"
  | "cred-card-alert"
  | "duvida-alert"
  | "arrow-right"
  | "heart-card"
  | "tag-card-discount"
  | "copyText"
  | "downloadIco"
  | "ChevronLeft"
  | "tagPrice"
  | "truck-fast"
  | "pix-benefit"
  | "store-benefit"
  | "credit-card"
  | "rotate-benefit"
  | "ChevronRight"
  | "ChevronRightFilter"
  | "ChevronUp"
  | "ChevronDown"
  | "CreditCard"
  | "Deco"
  | "Diners"
  | "Discord"
  | "Discount"
  | "Elo"
  | "Facebook"
  | "FilterList"
  | "Heart"
  | "Instagram"
  | "Linkedin"
  | "Minus"
  | "MapPin"
  | "MagnifyingGlass"
  | "Mastercard"
  | "Message"
  | "Phone"
  | "Pix"
  | "Plus"
  | "QuestionMarkCircle"
  | "Return"
  | "Ruler"
  | "ShoppingCart"
  | "Star"
  | "Tiktok"
  | "Trash"
  | "Truck"
  | "Twitter"
  | "User"
  | "Visa"
  | "WhatsApp"
  | "XMark"
  | "Zoom"
  | "Alert"
  | "AlertInfo"
  | "AlertSuccess"
  | "AlertWarning"
  | "AlertError"
  | "share"
  | "youtube"
  | "headset"
  | "grupoOscar"
  | "Central"
  | "arrowRight"
  | "bagBuyBtn"
  | "idCard"
  | "credCard"
  | "swapArrows"
  | "Sort"
  | "HeartCard"
  | "TruckFast"
  | "Medal"
  | "File"
  | "MapIcon"
  | "ArrowInstitucional"
  | "sacola"
  | "Map"
  | "Menu"
  | "Close"
  | "heart-active";

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="Bell" />
   */
  id: AvailableIcons;
  size?: number;
}

function Icon(
  { id, strokeWidth = 16, size, width, height, ...otherProps }: Props,
) {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
      strokeWidth={strokeWidth}
    >
      <use href={asset(`/sprites.svg#${id}`)} />
    </svg>
  );
}

export default Icon;
