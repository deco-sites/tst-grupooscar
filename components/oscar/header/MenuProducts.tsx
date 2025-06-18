// deno-lint-ignore-file no-explicit-any
import Button from "$store/components/ui/Button.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import IconChevronRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-right.tsx";

function MenuProducts() {
  const {
    displayMenuProducts,
    productsChild,
    displayMenuProductsChild,
    productsChild2,
  } = useUI();

  return (
    <div>
      <ul class="w-full h-full flex flex-col bg-base-300">
        <li class="w-full">
          <Button
            class="py-3 border-none w-full text-primary bg-base-300 hover:bg-inherit text-left"
            onClick={() => {
              displayMenuProducts.value = false;
            }}
          >
            {productsChild.value.href && (
              <a
                class="font-medium text-sm w-full text-primary"
                href={productsChild.value.href}
              >
                {`Ver tudo em ${productsChild.value.label}`}
              </a>
            )}
          </Button>
        </li>
        {productsChild.value.children.map((node: any) => (
          <li class="w-full">
            {node.children !== undefined && node.children.length > 0
              ? (
                <Button
                  class={`py-3 w-full font-medium m-auto bg-base-300 hover:bg-inherit border-b border-t-0 justify-between text-left border-base-200`}
                  onClick={() => {
                    displayMenuProducts.value = false;
                    displayMenuProductsChild.value = true;
                    productsChild2.value = {
                      label: node.label,
                      children: node.children,
                      href: node.href,
                    } as any;
                  }}
                >
                  {node.label}
                  <IconChevronRight class="w-5 h-5 text-base-content" />
                </Button>
              )
              : (
                <a
                  href={node.href}
                  class="flex items-center justify-between w-full px-4 py-4 border-b font-medium text-base"
                >
                  {node.label}
                </a>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuProducts;
