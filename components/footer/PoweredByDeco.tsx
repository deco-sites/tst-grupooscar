import Icon from "$store/components/ui/Icon.tsx";

export default function PoweredByDeco() {
  return (
    <a
      href={"https://deco.cx/"}
      target={"_blank"}
      class={`flex gap-2 items-center px-1.5`}
    >
      <span class={`text-base-100 text-xs font-normal lg:text-sm`}>
        Powered by
      </span>
      <Icon id="deco-footer" width="67" height="24" class={``} />
    </a>
  );
}
