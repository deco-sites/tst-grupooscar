import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Newsletter from "site/components/footer/Newsletter.tsx";
import Icon from "site/components/ui/Icon.tsx";
import PaymentMethods from "site/components/footer/PaymentMethods.tsx";
import Security from "site/components/footer/Security.tsx";
import SocialResponsibility from "site/components/footer/SocialResponsibility.tsx";
import PoweredByDeco from "$store/components/footer/PoweredByDeco.tsx";
import DevelopedBy from "$store/components/footer/DevelopedBy.tsx";
import Technology from "$store/components/footer/Technology.tsx";
import { useDevice } from "@deco/deco/hooks";

/**@titleBy alt */
export interface Logos {
  logo: ImageWidget;
  alt: string;
  href?: string;
  width?: number;
  height?: number;
}
export interface SocialResponsibility {
  title: string;
  items: Logos[];
}
export interface Security {
  title: string;
  items: Logos[];
}
export interface PaymentMethods {
  title: string;
  items: Logos[];
}
export interface Form {
  placeholderEmail: string;
  placeholderNome: string;
  terms: string;
  buttonText: string;
}
export interface Newsletter {
  title: string;
  description: string;
  form: Form;
}

/**@titleBy name */
export interface Icons {
  name: string;
  href: string;
  icon: "face-menu" | "insta-menu" | "pinterest-menu" | "youtube-menu";
}
export interface Social {
  title: string;
  icons: Icons[];
}
export interface linkRelationship {
  label: string;
  description: string;
  labelBtn: string;
  href: string;
}
export interface RelationshipCenter {
  title: string;
  links: linkRelationship[];
}

export interface Link {
  label: string;
  href: string;
  emphasis?: boolean;
}

/**@titleBy title */
export interface Menu2 {
  title: string;
  links: Link[];
}

/**@titleBy title */
export interface Menu {
  title: string;
  links: Link[];
  children?: Menu2[];
}
export interface Props {
  menus: Menu[];
  relationshipCenter: RelationshipCenter;
  social: Social;
  newsletter: Newsletter;
  paymentMethods: PaymentMethods;
  security: Security;
  socialResponsibility: SocialResponsibility;
  copyright: RichText;
}
export default function Footer(
  {
    menus,
    relationshipCenter,
    social,
    newsletter,
    paymentMethods,
    security,
    socialResponsibility,
    copyright,
  }: Props,
) {
  const device = useDevice();
  if (device == "mobile") {
    return (
      <footer class={`flex flex-col w-full`}>
        <div
          class={`bg-accent-content p-4 pb-10 flex flex-col gap-8 items-center justify-center`}
        >
          <Newsletter {...newsletter} />
          <div class={`flex w-full flex-wrap gap-x-4 gap-y-8`}>
            {menus.map(({ title, links, children }, index) => (
              <>
                <ul
                  class={`flex gap-3 ${
                    index == menus.length - 1 ? "w-full" : "flex-col"
                  }`}
                >
                  <div
                    class={`flex flex-col gap-3 ${
                      index == menus.length - 1 ? "w-full" : ""
                    }`}
                  >
                    <h6
                      class={`text-sm text-base-100 font-semibold border-b border-base-100 border-opacity-15 pb-1.5`}
                    >
                      {title}
                    </h6>
                    {links.map(({ href, label, emphasis }) => (
                      <>
                        <li>
                          <a
                            href={href}
                            class={`${
                              emphasis
                                ? "text-primary"
                                : "text-base-100 opacity-60"
                            } text-sm font-normal`}
                          >
                            {label}
                          </a>
                        </li>
                      </>
                    ))}
                  </div>
                  {children && children.length > 0 && (
                    <>
                      {children.map(({ title, links }) => (
                        <ul
                          class={`flex flex-col gap-3 ${
                            index == menus.length - 1 ? "w-full" : ""
                          }`}
                        >
                          <h6
                            class={`text-sm text-base-100 font-semibold border-b border-base-100 border-opacity-15 pb-1.5`}
                          >
                            {title}
                          </h6>
                          {links.map(({ href, label, emphasis }) => (
                            <>
                              <li>
                                <a
                                  href={href}
                                  class={`${
                                    emphasis
                                      ? "text-primary"
                                      : "text-base-100 opacity-60"
                                  } text-sm font-normal`}
                                >
                                  {label}
                                </a>
                              </li>
                            </>
                          ))}
                        </ul>
                      ))}
                    </>
                  )}
                </ul>
              </>
            ))}
          </div>
          <div class="flex flex-col gap-4 w-full">
            <h6 class="text-sm text-base-100 font-semibold border-b border-base-100 border-opacity-15 pb-1.5">
              {relationshipCenter.title}
            </h6>
            <div class={`grid grid-cols-2 gap-x-4`}>
              {relationshipCenter.links.map((
                { href, label, description, labelBtn },
              ) => (
                <div class={`flex flex-col gap-1.5`}>
                  <p class={`text-sm text-base-100`}>{label}</p>
                  <p class={`text-sm text-base-100 text-opacity-60`}>
                    {description}
                  </p>
                  <a
                    href={href}
                    class={`mt-1.5 text-xs text-base-100 font-semibold flex gap-2 items-center justify-center py-2.5 rounded-badge background-gradient-primary w-full`}
                  >
                    <Icon id="wpp-footer" size={13} />
                    {labelBtn}
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div class={`flex flex-col gap-3 w-full`}>
            <h6 class={`text-sm text-base-100 font-semibold`}>
              {social.title}
            </h6>
            <div class={`flex gap-3 items-center justify-start`}>
              {social.icons.map(({ href, icon }) => (
                <a href={href}>
                  <Icon id={icon} size={37} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div
          class={`bg-base-content px-4 py-6 flex flex-col justify-center gap-4`}
        >
          <PaymentMethods {...paymentMethods} />
          <Security {...security} />
          <SocialResponsibility {...socialResponsibility} />
          <div
            class="w-full flex flex-col text-xs text-base-100 border-b border-base-100 border-opacity-15 pb-4"
            dangerouslySetInnerHTML={{ __html: copyright }}
          />
          <div
            class={`flex flex-col sm:flex-row sm:flex-wrap gap-3 pb-6 w-full pt-4`}
          >
            <Technology />
            <DevelopedBy />
            <PoweredByDeco />
          </div>
        </div>
      </footer>
    );
  }
  return (
    <footer class={`flex flex-col w-full`}>
      <div
        class={`bg-accent-content py-16`}
      >
        <div class={`flex gap-8 items-start justify-center w-11/12 mx-auto 2xl:justify-evenly`}>
          <div class={`flex gap-12`}>
            {menus.map(({ title, links, children }) => (
              <>
                <ul class={`flex flex-col gap-3 w-max 2xl:flex-row 2xl:gap-16`}>
                  <div class={`flex flex-col gap-3 w-max`}>
                  <h6
                    class={`text-sm text-base-100 font-semibold border-b border-base-100 border-opacity-15 pb-1.5`}
                  >
                    {title}
                  </h6>
                  {links.map(({ href, label, emphasis }) => (
                    <>
                      <li>
                        <a
                          href={href}
                          class={`${
                            emphasis
                              ? "text-primary"
                              : "text-base-100 opacity-60"
                          } text-sm font-normal`}
                        >
                          {label}
                        </a>
                      </li>
                    </>
                  ))}
                  </div>
                  {children && children.length > 0 && (
                    <>
                      {children.map(({ title, links }) => (
                        <ul class={`flex flex-col gap-3 w-max mt-3 2xl:mt-0`}>
                          <h6
                            class={`text-sm text-base-100 font-semibold border-b border-base-100 border-opacity-15 pb-1.5`}
                          >
                            {title}
                          </h6>
                          {links.map(({ href, label, emphasis }) => (
                            <>
                              <li>
                                <a
                                  href={href}
                                  class={`${
                                    emphasis
                                      ? "text-primary"
                                      : "text-base-100 opacity-60"
                                  } text-sm font-normal`}
                                >
                                  {label}
                                </a>
                              </li>
                            </>
                          ))}
                        </ul>
                      ))}
                    </>
                  )}
                </ul>
              </>
            ))}
          </div>
          <div class="flex flex-col gap-4 w-full max-w-[210px]">
            <h6 class="text-sm text-base-100 font-semibold border-b border-base-100 border-opacity-15 pb-1.5">
              {relationshipCenter.title}
            </h6>
            <div class={`grid grid-cols-1 gap-4`}>
              {relationshipCenter.links.map((
                { href, label, description, labelBtn },
              ) => (
                <div class={`flex flex-col gap-1.5`}>
                  <p class={`text-sm text-base-100`}>{label}</p>
                  <p class={`text-sm text-base-100 text-opacity-60`}>
                    {description}
                  </p>
                  <a
                    href={href}
                    class={`mt-1.5 text-xs text-base-100 font-semibold flex gap-2 items-center justify-center py-2.5 rounded-badge background-gradient-primary w-full`}
                  >
                    <Icon id="mailFooter" size={24} class={`text-base-100`} />
                    {labelBtn}
                  </a>
                </div>
              ))}
            </div>
            <div class={`flex flex-col gap-3 w-full`}>
              <h6 class={`text-sm text-base-100 font-semibold`}>
                {social.title}
              </h6>
              <div class={`flex gap-3 items-center justify-start`}>
                {social.icons.map(({ href, icon }) => (
                  <a href={href}>
                    <Icon id={icon} size={37} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <Newsletter {...newsletter} />
        </div>
      </div>
      <div
        class={`bg-base-content py-6`}
      >
        <div class={`flex flex-col justify-center gap-4 w-11/12 mx-auto`}>
          <div class={`flex items-start justify-between 2xl:justify-evenly border-b border-base-100 border-opacity-15 pb-4`}>
            <PaymentMethods {...paymentMethods} />
            <Security {...security} />
            <SocialResponsibility {...socialResponsibility} />
          </div>
          <div
            class="w-full flex flex-col text-sm text-base-100 border-b border-base-100 border-opacity-15 pb-4"
            dangerouslySetInnerHTML={{ __html: copyright }}
          />
          <div
            class={`flex gap-8 pb-6 w-full pt-4 justify-center`}
          >
            <Technology />
            <DevelopedBy />
            <PoweredByDeco />
          </div>
        </div>
      </div>
    </footer>
  );
}
