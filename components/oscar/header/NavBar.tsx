import { CartButton, MenuButton } from "../../../islands/Oscar/Buttons.tsx";
import { navbarHeight } from "../../header/constants.ts";
import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";
import { useId } from "$store/sdk/useId.ts";
import Icon from "site/components/ui/Icon.tsx";
import LoginButton from "site/islands/Account/LoginButtonIframeMobileHeader.tsx";
import SearchBarSuggestion from "site/islands/Header/SearchBarSuggestion.tsx";
import WishlistButton from "site/islands/Header/Wishlist.tsx"

function Navbar({ paths, logo, device }: {
  logo?: { src: LiveImage; alt: string };
  paths: { loginHref: string; favouriteHref: string };
  device: "mobile" | "desktop" | "tablet";
}) {
  const id = useId();

  if (device === "mobile") {
    return (
      <>
        {/* Mobile Version */}
        <div
          style={{ height: navbarHeight }}
          class="xl:hidden w-full text-primary"
        >
          <div class="w-11/12 m-auto flex flex-row justify-between items-center gap-4">
            <div class={`flex items-center justify-center gap-1`}>
              <MenuButton />
              <WishlistButton paths={paths} />
            </div>

            {logo && (
              <a
                href="/"
                class="flex-grow justify-center flex items-center h-[30px] w-[121px] object-contain"
                style={{ minHeight: navbarHeight }}
                aria-label="Store logo"
              >
                <Icon
                  id="LogoOscarMob"
                  width={121}
                  height={30}
                />
              </a>
            )}

            <div class="flex gap-1">
              <LoginButton />
              <CartButton />
            </div>
          </div>
        </div>
      </>
    );
  }
  // Desktop Version
  return (
    <>
      <div class="hidden lg:flex py-2.5 items-center m-auto w-11/12 justify-between gap-8 max-h-[74px] 2xl:gap-16">
        {logo && (
          <a
            href="/"
            aria-label="Store logo"
            class="flex items-center py-3 h-[32px] w-[130px]"
          >
            <Icon
              id="LogoOscar"
              width={130}
              height={32}
            />
          </a>
        )}
        <SearchBarSuggestion />
        <div class="flex items-center gap-6">
          <a
            class="flex items-center w-max"
            href={"/clube-oscar"}
          >
            <div class="flex gap-2 items-center justify-center">
              <Icon
                id="clubeOscar"
                width={21}
                height={22}
                strokeWidth={1}
                class="w-[21px] h-[22px]"
              />
              <span class="text-sm font-medium">
                Clube Oscar
              </span>
            </div>
          </a>
          <WishlistButton paths={paths} />
          <CartButton />
        </div>
      </div >
    </>
  );
}

export default Navbar;
