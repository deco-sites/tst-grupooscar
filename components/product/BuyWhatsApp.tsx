import Icon from "site/components/ui/Icon.tsx";

export default function BuyWhatsApp(){
    return(
        <a href={``} class={`flex items-center justify-center gap-2`}>
            <Icon id="wpp-pdp" width="14" height="14"/>
            <span class={`text-xs font-medium`}>Dúvidas? Chama no Whats!</span>
        </a>
    )
}