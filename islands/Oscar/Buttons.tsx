import { default as MenuButtonComponent } from "site/components/oscar/header/buttons/Menu.tsx";
import { default as CartButtonComponent } from "site/components/oscar/header/buttons/Cart.tsx";

export function CartButton() {
  return <CartButtonComponent />;
}

export function MenuButton() {
  return <MenuButtonComponent />;
}
