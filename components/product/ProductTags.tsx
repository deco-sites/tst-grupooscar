import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

export interface Tag {
  icon: AvailableIcons;
  label: string;
}

interface Props {
  tags?: Tag[];
}

export default function ProductTags({ tags }: Props) {
  return (
    <>
      <ul class={`flex flex-wrap items-center gap-3 mb-4`}>
        {tags?.map((tag) => {
          return (
            <>
              <li
                class={`flex gap-2 items-center justify-center py-2 px-3 border border-primary border-opacity-10 text-primary bg-primary bg-opacity-10 rounded-badge`}
              >
                <Icon id={tag.icon} width={14} height={15} />
                <span class={`text-sm font-semibold`}>{tag.label}</span>
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
}
