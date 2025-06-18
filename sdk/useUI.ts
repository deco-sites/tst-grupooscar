/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */
import { signal } from "@preact/signals";
import type { AggregateOffer, Product } from "apps/commerce/types.ts";
import { ImageObject } from "apps/commerce/types.ts";
import { SimulationOrderForm } from "apps/vtex/utils/types.ts";
import { useOffer } from "site/sdk/useOffer.ts";

const displayCart = signal(false);
const displayMenu = signal(false);
const displayMenuInstitucional = signal(false);
const displaySearchPopup = signal(false);
const displaySearchDrawer = signal(false);
const displayMenuProducts = signal(false);
const displayMenuProductsChild = signal(false);
const productsChild = signal({ label: "", children: [], href: "" });
const productsChild2 = signal({
  label: "",
  children: [{ type: "", label: "", href: "" }],
  href: "",
});
const userEmail = signal("");
const userLogged = signal(false);
const skuIDCart = signal("");
const sellerUI = signal<{ seller: string, sellerName: null | string }>({ seller: "1", sellerName: null });
const urlSkuVariant = signal("");
const productSimilar = signal<Product | undefined>(undefined);
const productOfferSimilar = signal<
  AggregateOffer | ReturnType<typeof useOffer> | undefined
>(undefined);
const imagesProductSimilar = signal<ImageObject[] | []>([]);
const productNameSimilar = signal("");
const productModelSimilar = signal("");
const productColor = signal("");
const displayMode = signal("vertical");
const displayModeDesktop = signal("fourItems");
const modalCookies = signal(false);
const filterPriceSelected = signal({
  value: "",
  label: "",
  href: "",
});
const vtexIdScriptsLoaded = signal(false);
const simulateResult = signal<SimulationOrderForm | null>(null);
const imageActive = signal(1);
const openZoom = signal<number | null>(null);

const state = {
  displayCart,
  displayMenu,
  displaySearchPopup,
  displaySearchDrawer,
  displayMenuProducts,
  userEmail,
  userLogged,
  productsChild,
  productsChild2,
  displayMenuProductsChild,
  skuIDCart,
  sellerUI,
  urlSkuVariant,
  productSimilar,
  imagesProductSimilar,
  productNameSimilar,
  productModelSimilar,
  displayMenuInstitucional,
  productOfferSimilar,
  modalCookies,
  productColor,
  displayMode,
  filterPriceSelected,
  displayModeDesktop,
  vtexIdScriptsLoaded,
  simulateResult,
  imageActive,
  openZoom,
};

// Keyboard event listeners
addEventListener("keydown", (e: KeyboardEvent) => {
  const isK = e.key === "k" || e.key === "K" || e.keyCode === 75;

  // Open Searchbar on meta+k
  if (e.metaKey === true && isK) {
    displaySearchPopup.value = true;
  }
});

export const useUI = () => state;
