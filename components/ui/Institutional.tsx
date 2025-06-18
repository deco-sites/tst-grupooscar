import { ImageWidget, RichText } from "apps/admin/widgets.ts";

/**@titleBy alt */
export interface Logo{
    image: ImageWidget;
    alt: string;
    href?: string;
}

/**@titleBy title */
export interface Marcas{
    title: string;
    logos: Logo[];
}

export interface Props{ 
    title: string;
    description: RichText;
    marcas: Marcas;
    links: Logo[];
}

export default function Institutional({ title, description, marcas, links }: Props) {
  return (
    <div class={`bg-base-300 w-full py-6 lg:py-16`}>
      <div class={`flex w-11/12 mx-auto flex-col lg:flex-row gap-10 items-center justify-center`}>
        <div class={`bg-base-content max-w-[640px] rounded-2xl p-10 flex flex-col gap-5`}>
          <h2 class={`text-xl text-base-100 uppercase font-semibold`}>{title}</h2>
          <div class={`text-sm text-base-100 text-opacity-60`} dangerouslySetInnerHTML={{ __html: description }}/>
          <div class={`flex flex-col gap-3`}>
            <h3 class={`text-sm text-base-100 uppercase font-semibold`}>{marcas.title}</h3>
            <div class={`flex gap-8 items-center justify-start`}>
              {marcas.logos.map((logo) => (
                <a href={logo.href || ""}>
                  <img src={logo.image} alt={logo.alt} loading={"lazy"} width={95}/>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div class={`grid grid-cols-2 gap-6`}>
          {links.map((link) => (
            <a href={link.href || ""}>
              <img src={link.image} alt={link.alt} loading={"lazy"} class={`rounded-2xl border border-primary border-opacity-15 w-[180px]`}/>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}