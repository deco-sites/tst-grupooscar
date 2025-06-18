import Icon from "$store/components/ui/Icon.tsx";

export default function Technology() {
  return (
    <a
      href="https://vtex.com/pt-br/"
      target={"_blank"}
      class={`flex gap-2 items-center px-1.5`}
    >
      <span class={`text-base-100 text-xs font-normal lg:text-sm`}>
        Tecnologia de e-commerce
      </span>
      <Icon id="vtex-footer" width="72" height="27" class={``} />
    </a>
  );
}
