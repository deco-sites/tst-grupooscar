import { clx } from "site/sdk/clx.ts";
import UserName from "site/islands/Account/UserName.tsx";

export interface MenuItem {
  label: string;
  href: string;
  isActive?: boolean;
  isLogout?: boolean;
}

export interface Props {
  menuItems: MenuItem[];
}

export default function SidebarMenu({ menuItems }: Props) {

  return (
    <aside class="w-full lg:w-64 p-4 text-sm">
      <UserName />
      <nav class="flex flex-col">
        {menuItems.map(({ label, href, isLogout }) => (
          <a
            href={href}
            class={clx(
              'text-base py-4',
              isLogout
                ? 'text-primary font-bold underline'
                : "/wishlist" === href
                  ? 'font-semibold'
                  : ''
            )}
          >
            <span class={`${"/wishlist" === href ? "leading-none border-l-2 border-primary pl-4 " : ""}`}>
              {label}
            </span>
          </a>
        ))}
      </nav>
    </aside>
  );
};
