// deno-lint-ignore-file no-explicit-any
import { useUI } from "$store/sdk/useUI.ts";
import Button from "$store/components/ui/Button.tsx";

function MenuProducts() {
  const { productsChild2, displayMenuProducts } = useUI();

  return (
    <div class={"bg-base-300"}>
      <ul
        class={`bg-base-300 ${
          productsChild2.value.children[0].type == "sizeItem"
            ? "flex flex-wrap mt-4 gap-2 w-11/12 m-auto h-auto"
            : "w-full h-full"
        }`}
      >
        <li
          class={`w-full ${
            productsChild2.value.children[0].type == "sizeItem" && "hidden"
          }`}
        >
          <Button
            class="py-3 border-none w-full text-primary bg-base-300 text-left"
            onClick={() => {
              displayMenuProducts.value = false;
            }}
          >
            {productsChild2.value.href && (
              <a
                class="font-medium w-full text-primary"
                href={productsChild2.value.href}
              >
                {`Ver tudo em ${productsChild2.value.label}`}
              </a>
            )}
          </Button>
        </li>
        {productsChild2.value.children.map((node: any) => (
          <li
            class={`${
              node.type == "navItem"
                ? "w-full"
                : "w-10 h-10 bg-base-100 rounded-full border border-base-200 flex items-center justify-center"
            }`}
          >
            <a
              href={node.href}
              class={`${
                node.type == "navItem"
                  ? "flex items-center justify-between w-full px-4 py-4 border-b font-medium border-base-200"
                  : "text-base-content"
              } text-sm`}
            >
              {node.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuProducts;
