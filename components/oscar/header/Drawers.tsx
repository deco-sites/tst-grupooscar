import Button from "$store/components/oscar/ui/Button.tsx";
import type { Props as MenuProps } from "$store/components/oscar/header/Menu.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";
import ImageComponent from "apps/website/components/Image.tsx";
import type { ComponentChildren } from "preact";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { lazy, Suspense } from "preact/compat";
import { useId } from "site/sdk/useId.ts";
import LoginButton from "site/islands/Account/LoginButtonIframeMobile.tsx";

const Menu = lazy(() => import("$store/components/oscar/header/Menu.tsx"));
const MenuProducts = lazy(() =>
  import("$store/components/oscar/header/MenuProducts.tsx")
);
const MenuProductsChild = lazy(() =>
  import(
    "$store/components/oscar/header/MenuProductsChild.tsx"
  )
);
const Cart = lazy(() => import("$store/components/minicart/Cart.tsx"));

export interface Props {
  menu: MenuProps;
  ShippingPrice: number;

  logo?: { src: LiveImage; alt: string };
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  platform: ReturnType<typeof usePlatform>;
  device: "mobile" | "desktop" | "tablet";
}

const Aside = (
  {
    logo,
    onClose,
    children,
    chevronClick,
    title,
    displayMenu,
    open,
    isMiniCart,
  }: {
    logo?: { src: LiveImage; alt: string };
    onClose?: () => void;
    chevronClick?: () => void;
    children: ComponentChildren;
    title?: string;
    displayMenu: boolean;
    open: boolean;
    isMiniCart?: boolean;
    subtitle?: string;
    id: string;
  },
) => (
  <div class="bg-white grid grid-rows-[auto_1fr] max-w-[425px] w-11/12 min-h-[100%] max-h-[100vh] overflow-y-auto">
    <div
      class={`${
        !displayMenu || isMiniCart
          ? "bg-base-100"
          : "bg-base-100"
      } relative flex flex-col`}
    >
      <div
        class={`flex h-full ${
          isMiniCart ? "justify-between py-4 gap-1" : `${!displayMenu ? "py-3.5 gap-2" : "justify-between py-4"}`
        } items-center w-11/12 m-auto`}
      >
        {!displayMenu && (
          <>
            <Button
              class="btn-ghost p-2"
              onClick={chevronClick}
            >
              <Icon
                class="text-primary"
                id="ChevronLeftMenu"
                size={14}
                strokeWidth={1}
              />
            </Button>
              <span class="w-full font-semibold text-base text-primary">
                {title}
              </span>
          </>
        )}
        {displayMenu && logo && (
          <a
            href="/"
            class="flex items-center justify-center"
            aria-label="Store logo"
          >
            <ImageComponent
              src={logo.src}
              alt={logo.alt}
              width={121}
              height={28}
            />
          </a>
        )}
        {!isMiniCart && onClose && (
          <Button
            class={`${!displayMenu && "text-white"} ${
              open ? "block" : "hidden"
            } btn-ghost h-fit p-2 rounded-full`}
            onClick={onClose}
          >
            <Icon id="close-menu" class="w-[13px] h-[13px] text-primary" />
          </Button>
        )}
        {isMiniCart && onClose && (
          <>
            <div class={`flex gap-2 items-center justify-center ml-4`}>
              <Icon id="ShoppingCart" strokeWidth={1} class="w-[18px] h-[21px] text-primary" />
              <span class="font-medium text-accent-content mt-[3px]">
                {title}
              </span>
            </div>
            <button
              class="rounded-full flex justify-center items-center"
              onClick={onClose}
            >
              <Icon id="close-menu" class="w-[13px] h-[13px]" />
            </button>
          </>
        )}
      </div>
      {displayMenu && logo && (
        <div class="w-full px-4 border-y border-base-200">
          <LoginButton/>
        </div>
      )}
    </div>
    <Suspense
      fallback={
        <div class="w-full flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

function Drawers(
  { menu, logo, children, platform, device, ShippingPrice }: Props,
) {
  const {
    displayMenu,
    displayMenuProducts,
    productsChild,
    displayMenuProductsChild,
    productsChild2,
    displayCart,
  } = useUI();
  const { cart } = useCart();
  const { items } = cart.value ?? { items: [] };
  const id = useId();

  if (device === "mobile") {
    return (
      <>
        <Drawer
          class={`fixed z-50 w-full`}
          open={displayMenu.value || displayMenuProductsChild.value}
          onClose={() => {
            displayMenu.value = false;
            displayMenuProductsChild.value = false;
          }}
          aside={
            <Aside
              displayMenu={displayMenu.value}
              logo={logo}
              onClose={() => {
                displayMenu.value = false;
                displayMenuProductsChild.value = false;
              }}
              open={displayMenu.value || displayMenuProductsChild.value}
              title={productsChild2.value.label}
              chevronClick={() => {
                displayMenuProductsChild.value = false;
                displayMenuProducts.value = true;
              }}
              id={id}
            >
              {displayMenu.value && <Menu {...menu} />}
              {displayMenuProductsChild.value && <MenuProductsChild />}
            </Aside>
          }
        >
          <Drawer
            open={displayMenuProducts.value}
            onClose={() => displayMenuProducts.value = false}
            aside={
              <Aside
                displayMenu={displayMenu.value}
                title={productsChild.value.label}
                onClose={() => displayMenuProducts.value = false}
                chevronClick={() => {
                  displayMenuProducts.value = false;
                  displayMenu.value = true;
                }}
                open={displayMenuProducts.value}
                id={id}
              >
                <MenuProducts />
              </Aside>
            }
          >
            <Drawer // right drawer
              class="drawer-end"
              open={displayCart.value}
              onClose={() => displayCart.value = false}
              aside={
                <Aside
                  title="Sacola"
                  subtitle={`(${items.length} ${
                    items.length > 1 ? "items" : "item"
                  })`}
                  chevronClick={() => displayCart.value = false}
                  onClose={() => displayCart.value = false}
                  displayMenu={displayCart.value}
                  open={displayCart.value}
                  id={id}
                  isMiniCart={true}
                >
                  <Cart
                    platform={platform}
                    freeShippingTarget={ShippingPrice || 200}
                  />
                </Aside>
              }
            >
              {children}
            </Drawer>
          </Drawer>
        </Drawer>
      </>
    );
  }

  return (
    <>
      <Drawer
        class={`fixed z-50 w-full`}
        aside={
          <Aside
            displayMenu={displayMenu.value}
            logo={logo}
            open={displayMenu.value || displayMenuProductsChild.value}
            id={id}
          >
            {displayMenu.value && <Menu {...menu} />}
          </Aside>
        }
      >
        <Drawer // right drawer
          class="drawer-end"
          open={displayCart.value}
          onClose={() => displayCart.value = false}
          aside={
            <Aside
              title="Seu carrinho "
              subtitle={`(${items.length} ${
                items.length > 1 ? "items" : "item"
              })`}
              chevronClick={() => displayCart.value = false}
              onClose={() => displayCart.value = false}
              displayMenu={displayCart.value}
              open={displayCart.value}
              id={id}
              isMiniCart={true}
            >
              <Cart
                platform={platform}
                freeShippingTarget={ShippingPrice || 200}
              />
            </Aside>
          }
        >
          {children}
        </Drawer>
      </Drawer>
    </>
  );
}

export default Drawers;
