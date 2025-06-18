export interface Props {
    title: string;
}

export default function ButtonMenuMarcas({ title }: Props) {
    const handleScroll = (event: MouseEvent, title: string) => {
        event.preventDefault();
        const targetElement = document.getElementById("letra" + title);

        if (targetElement) {
            const offset = globalThis.innerWidth < 768 ? 150 : 100; // Ajuste para parar antes do elemento
            const elementPosition = targetElement.getBoundingClientRect().top +
                globalThis.scrollY;
            const offsetPosition = elementPosition - offset;

            globalThis.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <li
            onClick={(event) => handleScroll(event, title)}
            class={`uppercase text-base lg:text-sm text-primary-content cursor-pointer`}
        >
            {title}
        </li>
    );
}
