import { RichText } from "apps/admin/widgets.ts";
import { invoke } from "$store/runtime.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

export interface Props {
  title: string;
  text: RichText;
  form?: {
    placeholderName: string;
    placeholderEmail: string;
    labelCta: string;
  };
}

export default function NewsletterPartners({ title, text, form }: Props) {

    const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await invoke.vtex.actions.newsletter.subscribe({ email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div class={`w-full py-10 bg-base-100`}>
      <div class={`w-11/12 mx-auto flex flex-col lg:flex-row items-center justify-center gap-8`}>
        <div class={`flex flex-col items-center justify-center gap-4`}>
          <h2 class={`text-xl lg:w-max mx-auto uppercase font-normal lg:text-2xl`}>{title}</h2>
          <div class="text-base text-base-content text-opacity-60 font-medium text-center max-w-[400px]" dangerouslySetInnerHTML={{ __html: text }} />
        </div>
        <form
          class="form-control w-full lg:w-auto"
          onSubmit={handleSubmit}
        >
          <div class="flex flex-col lg:flex-row flex-wrap gap-3 justify-center lg:justify-start lg:flex-nowrap ">
            <input
              name="name"
              required
              class="flex-auto input input-bordered border-black border-opacity-[12%] rounded-lg"
              placeholder={form?.placeholderName || "Nome"}
            />
            <input
              name="email"
              required
              class="flex-auto input input-bordered border-black border-opacity-[12%] rounded-lg"
              placeholder={form?.placeholderEmail || "Digite seu email"}
            />
            <button
              type="submit"
              class="disabled:loading background-gradient-primary rounded-badge w-full lg:w-[110px] py-3 text-base-100 font-semibold text-xs leading-none"
              disabled={loading}
            >
              {form?.labelCta || "Inscrever"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
