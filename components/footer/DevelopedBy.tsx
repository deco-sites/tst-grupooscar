import Icon from "$store/components/ui/Icon.tsx";

export default function DevelopedBy() {
  return (
    <a
      href={"https://www.tec4udigital.com/"}
      target={"_blank"}
      class={`flex gap-2 items-center px-1.5`}
    >
      <span class={`text-base-100 text-xs font-normal lg:text-sm`}>
        Desenvolvido por
      </span>
      <Icon id="tec4u-footer" width="80" height="17" class={``} />
    </a>
  );
}
