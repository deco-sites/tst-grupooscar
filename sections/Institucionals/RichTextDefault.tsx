import { RichText } from "apps/admin/widgets.ts";

export interface Props {
  title: string;
  content: RichText;
}

export default function RichTextDefault(props: Props) {

  const { title, content } = props

  return (
    <div class="w-full h-full py-4 px-4 lg:px-4 lg:py-10 bg-base-300">
      <div class=" rounded lg:rounded-3xl mx-auto flex flex-col gap-4 p-6 lg:p-10 justify-center items-center bg-white max-w-3xl">
        <h1 class="lg:text-xl text-center uppercase">{title}</h1>
        <p class="text-sm text-center" dangerouslySetInnerHTML={{ __html: content }}>

        </p>
      </div>
    </div>
  )
}