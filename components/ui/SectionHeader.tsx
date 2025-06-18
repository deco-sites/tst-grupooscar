import { clx } from "$store/sdk/clx.ts";

export interface Props {
  title?: string;
  fontSize?: "Small" | "Normal" | "Large";
  description?: string;
  alignment?: "center" | "left";
  colorReverse?: boolean;
  markupTitle?: boolean;
}

const fontSizeClasses = {
  "Small": "lg:text-2xl",
  "Normal": "lg:text-3xl",
  "Large": "lg:text-4xl",
};

function Header(props: Props) {
  return (
    <>
      {props.title || props.description
        ? (
          <div
            class={`flex flex-col gap-2 px-4 ${
              props.alignment === "left" ? "text-left" : "text-center"
            }`}
          >
            {props.title &&
              (
                <h2
                  class={clx(
                    "text-xl lg:w-max mx-auto uppercase font-normal",
                    fontSizeClasses[props.fontSize || "Normal"],
                  )}
                >
                  {props.title}
                </h2>
              )}
          </div>
        )
        : null}
    </>
  );
}

export default Header;
