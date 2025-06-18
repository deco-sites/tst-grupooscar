import Icon from "site/components/ui/Icon.tsx";
import {useUI} from "$store/sdk/useUI.ts";

export default function ViewCardsButton() {
    const { displayMode, displayModeDesktop } = useUI();

    return (
        <div class={`flex gap-3 items-center justify-center w-full lg:justify-end`}>
            <span class={`text-sm`}>Visualização:</span>
            <button class={`lg:hidden w-8 h-8 rounded-full flex items-center justify-center ${displayMode.value == 'vertical' ? "border border-primary rounded-full" : ""}`}
            onClick={() => {
                displayMode.value = 'vertical';
            }}>
                <Icon id="verticalIcon" width="11" height="16" class={`${displayMode.value == 'vertical' ? "text-primary" : "text-base-200"}`}/>
            </button>
            <button class={`lg:hidden w-8 h-8 rounded-full flex items-center justify-center ${displayMode.value == 'horizontal' ? "border border-primary rounded-full" : ""}`}
            onClick={() => {
                displayMode.value = 'horizontal';
            }}>
                <Icon id="horizontalIcon" width="17" height="12" class={`${displayMode.value == 'horizontal' ? "text-primary" : "text-base-200"}`}/>
            </button>
            <button class={`hidden lg:flex w-[18px] h-4 rounded-full items-center justify-center`}
            onClick={() => {
                displayModeDesktop.value = 'threeItems';
            }}>
                <Icon id="threeItems" width="18" height="16" class={`${displayModeDesktop.value == 'threeItems' ? "text-primary-content" : "text-base-200"}`}/>
            </button>
            <button class={`hidden lg:flex w-[25px] h-4 rounded-full items-center justify-center`}
            onClick={() => {
                displayModeDesktop.value = 'fourItems';
            }}>
                <Icon id="fourItems" width="25" height="16" class={`${displayModeDesktop.value == 'fourItems' ? "text-primary-content" : "text-base-200"}`}/>
            </button>
        </div>
    );
}