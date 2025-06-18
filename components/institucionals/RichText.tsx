import { RichText } from "apps/admin/widgets.ts";


export interface Props {
  title: string;
  text: RichText;
  variant?: "Light" | "Dark";
}

export default function RichTextComponent({ title, text, variant = "Light" }: Props) {
  return (
    <div class="w-full h-full px-4">
      <div
        class={`py-6 lg:py-10 px-4 gap-3 mb-4 md:mb-0 md:py-8 md:px-10 rounded-2xl flex flex-col max-w-[1060px] mx-auto lg:px-0 ${variant === "Light" ? "bg-base-100" : "bg-accent-content"}`}
      >
        <h1
          class={`w-full text-center px-2.5 text-base leading-7 font-bold ${variant === "Light" ? "bg-base-100" : "text-white"} `}
        >
          {title}
        </h1>
        <div
          class={` w-full text-sm text-center flex flex-col gap-4 font-medium  text-opacity-60 ${variant !== "Dark" ? "text-black" : "bg-accent-content text-white text-opacity-80"}`}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </div>
  );
}
