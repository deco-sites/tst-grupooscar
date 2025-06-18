import { useRef } from "preact/hooks";
import Icon from "site/components/ui/Icon.tsx";

export default function ButtonCopy({ codeCupom }: { codeCupom?: string }) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleCopy = () => {
        if (buttonRef.current) {
            // Seleciona o span dentro do botão
            const spanText = buttonRef.current.querySelector("span")
                ?.textContent;
            if (spanText) {
                // Copia o texto para a área de transferência
                navigator.clipboard
                    .writeText(spanText)
                    .then(() => {
                        alert("Texto copiado para a área de transferência!");
                    })
                    .catch((err) => {
                        console.error("Erro ao copiar o texto: ", err);
                    });
            }
        }
    };

    return (
        <button
            class={`border border-base-100 rounded-badge flex items-center justify-center h-7`}
            ref={buttonRef}
            onClick={handleCopy}
            style={{ cursor: "pointer" }}
        >
            <span class={`uppercase text-sm px-2.5 py-2 leading-none font-bold`}>{codeCupom}</span>
            <div
                class={`h-full px-2.5 py-2 bg-base-100 rounded-r-badge flex items-center gap-1.5 justify-center font-semibold text-xs text-base-content`}
            >
                <Icon
                    id="copyText"
                    width={14}
                    height={14}
                    class={`text-primary`}
                />
                Copiar
            </div>
        </button>
    );
}
