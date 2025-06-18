import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { type SectionProps } from "@deco/deco";
import Icon from "site/components/ui/Icon.tsx";

/**
 * @titleBy title
 */
interface Navigation {
  title: string;
  href: string;
}

interface Props {
  title: string;
  logo: {
    img: ImageWidget;
    alt: string;
  };
  navigation: Navigation[];
}

function Item({ active, navigation }: { active: boolean; navigation: Navigation }) {
  return (
    <li className={`${active ? "font-bold text-primary" : "text-info"} text-sm flex flex-row gap-5 `}>
      <div class={active ? "w-[2px] bg-primary" : "w-[2px] bg-info bg-opacity-10 " + "h-auto "}>
      </div>
      <a class="py-3" href={navigation.href}>{navigation.title}</a>
    </li>
  );
}

function ButtonNavigation({ title, logo, navigation, current }: SectionProps<typeof loader>) {

  return (
    <>
      {/* Checkbox oculto para controlar a navegação */}
      <input type="checkbox" id="menu-toggle" className="peer hidden " />

      {/* Label que funciona como botão */}
      <label
        htmlFor="menu-toggle"
        className="cursor-pointer z-10 text-base-100 bg-accent-content flex justify-center items-center rounded-full border-2 border-primary fixed top-[140px] lg:top-[160px] left-2.5 lg:left-11 h-14 w-14"
      >
        <Icon id="Menu" width={16} height={14} />
      </label>

      {/* Navegação que aparece quando o checkbox está marcado */}
      <nav className="peer-checked:translate-x-0 -translate-x-full fixed top-0 left-0 bg-base-300 shadow z-[110] duration-300 h-screen min-w-[342px]">
        <div className="flex items-center gap-4 py-6 px-4 bg-white">
          <Image
            alt={logo.alt}
            src={logo.img}
            width={70}
            height={16}
            className="object-contain"
          />
          <h2 className="text-sm w-full">{title}</h2>
          <label
            htmlFor="menu-toggle"
            className="cursor-pointer"
          >
            <Icon id="Close" size={20}/>
          </label>
        </div>
        <ul className="flex flex-col py-6 px-4">
          {navigation.map((item, index) => (
            <Item
              key={index}
              active={current ? item.title === current.title : false}
              navigation={item}
            />
          ))}
        </ul>
      </nav>
      <label
        htmlFor="menu-toggle"
        className="peer-checked:flex hidden w-full h-full top-0 fixed z-[100] bg-black bg-opacity-25"
      >

      </label>
    </>
  );
}

export const loader = (props: Props, _req: Request) => {
  const url = new URL(_req.url)

  const current = props.navigation.find((nav) => nav.href === url.pathname)

  return { ...props, current };
};

export default ButtonNavigation;
