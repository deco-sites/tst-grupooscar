import ButtonMenuMarcas from "site/islands/LPs/ButtonMenuMarcas.tsx";


/**@titleBy title */
export interface ItemMenu{
    title: string;
}

/**@titleBy title */
export interface Marca{
    title: string;
    href: string;
}

/**@titleBy title */
export interface Item{
    title: string;
    marcas: Marca[];
}

export interface Props{
    titleMarcas: string;
    marcas: Item[];
}

export default function Marcas({titleMarcas, marcas}: Props){
    return (
        <div class={`flex flex-col w-11/12  mx-auto pt-8 lg:pt-10 pb-20 gap-10`}>
            <div class={`flex flex-col lg:flex-row gap-4 w-full`}>
                <h1 class={`uppercase font-bold text-primary-content text-sm`}>{titleMarcas}</h1>
                <ul class={`flex gap-5 lg:gap-4 w-full flex-wrap`}>
                    {marcas.map(({title}) => (
                        <ButtonMenuMarcas title={title}/>
                    ))}
                </ul>
            </div>
            <div class={`flex flex-col gap-8`}>
                {marcas.map(({title, marcas}) => (
                    <div id={`letra`+title} class={`flex flex-col items-start justify-start gap-4`}>
                        <h2 class={`text-2xl font-bold uppercase text-primary-content`}>{title}</h2>
                        <ul class={`grid grid-cols-2 lg:flex gap-4 lg:flex-wrap w-full`}>
                            {marcas.map(({title, href}) => (
                                <li class={`w-1/2 lg:w-[150px]`}>
                                    <a class={`uppercase font-medium text-sm text-primary-content`} href={href}>{title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}