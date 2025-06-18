import type { BreadcrumbList } from "apps/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
  _class?: string;
}

function Breadcrumb({ itemListElement = [], _class }: Props) {
  const items = [{ name: "Início", item: "/" }, ...itemListElement];

  return (
    <div class={`breadcrumbs py-0 ${_class}`}>
      <ul>
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }) => (
            <li class={`text-xs text-base-content text-opacity-60`}>
              <a href={item}>{name}</a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Breadcrumb;
