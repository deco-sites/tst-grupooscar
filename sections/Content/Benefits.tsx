import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import type { RichText } from "apps/admin/widgets.ts";

/**@titleBy text */
export interface Benefit {
  text: RichText;
  icon: AvailableIcons;
}
export interface Props {
  benefits?: Benefit[];
}

export default function Benefits(
  props: Props,
) {
  const {
    benefits = [{
      icon: "credCard",
      text: "Pague em até 6x sem juros",
    }, {
      icon: "idCard",
      text: "Complete seu cadastro e ganhe 20% de desconto",
    }, {
      icon: "swapArrows",
      text: "Troque em uma de nossas lojas",
    }],
  } = props;

  const listOfBenefits = benefits.map((benefit) => {
    return (
      <div
        class={`flex flex-col gap-3 items-center bg-base-100 rounded-xl py-6 px-3 lg:w-[13vw] max-w-[195px] min-w-[160px]`}
      >
        <Icon
          id={benefit.icon}
          class={"text-info"}
          width={30}
          height={26}
          strokeWidth={1}
        />
        <div
          class={`text-center text-xs`}
          dangerouslySetInnerHTML={{ __html: benefit.text }}
        />
      </div>
    );
  });

  return (
    <>
      <div class="w-full pl-4 py-3 flex flex-col gap-8 lg:gap-10 lg:py-7 lg:px-0 bg-base-300">
        <div class="container-oscar flex justify-center">
          <div class="flex gap-4 w-full overflow-x-scroll scrollbar-none lg:overflow-hidden lg:flex-wrap lg:justify-center lg:h-auto lg:gap-6 text-primary-content">
            {listOfBenefits}
          </div>
        </div>
      </div>
    </>
  );
}
