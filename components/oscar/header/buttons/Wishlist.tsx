import Icon from "site/components/ui/Icon.tsx";
import { useWishlist } from "apps/vtex/hooks/useWishlist.ts";

export default function WishlistButton({ paths }: { paths: { favouriteHref: string } }) {

  const { wishlist } = useWishlist()

  return (
    <a
      class="text-info"
      href={paths.favouriteHref || "/lista-de-desejos"}
      aria-label="Lista de desejos"
    >
      <div className="indicator p-1 lg:px-4 lg:py-3.5 lg:h-auto lg:w-auto">
        {wishlist.value?.length && wishlist.value.length > 0 ?
          <span className="indicator-item badge badge-primary text-white">
            {wishlist.value.length}
          </span> : null}
        <Icon id="Heart" strokeWidth={1} class="w-5 h-[19px] text-primary" />
      </div>
    </a>
  );
}