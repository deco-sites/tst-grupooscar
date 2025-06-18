import { invoke } from "$store/runtime.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

export interface Form {
  placeholderEmail: string;
  placeholderNome: string;
  terms: string;
  buttonText: string;
}

export interface Props {
  title: string;
  description: string;
  form: Form;
}

function Newsletter(
  { title, description, form }: Props,
) {
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
    <div class="flex flex-col gap-3 bg-base-content p-6 rounded-2xl w-full lg:max-w-[350px]">
      <h6 class="text-base-100 font-semibold pb-1.5 border-b border-base-100 border-opacity-15">
        {title}
      </h6>
      <p class="text-xs text-base-100">{description}</p>
      <form
        class="form-control"
        onSubmit={handleSubmit}
      >
        <div class="flex flex-wrap gap-3 justify-center lg:justify-start 2xl:flex-nowrap lg:flex-col">
          <input
            name="name"
            required
            class="flex-auto input input-bordered border-black border-opacity-[12%] rounded-lg"
            placeholder={form?.placeholderNome || "Nome"}
          />
          <input
            name="email"
            required
            class="flex-auto input input-bordered border-black border-opacity-[12%] rounded-lg"
            placeholder={form?.placeholderEmail || "Digite seu email"}
          />
          <div class="form-control">
            <label class="label cursor-pointer gap-2 items-start">
              <input type="checkbox" required class="checkbox checkbox-primary w-5 h-5 bg-base-100 checked:bg-primary checked:text-base-100 border-base-200" />
              <span class="label-text text-base-100 text-xs">{form.terms}</span>
            </label>
          </div>
          <button
            type="submit"
            class="disabled:loading background-gradient-primary rounded-badge py-3 w-full text-base-100 font-semibold text-xs leading-none"
            disabled={loading}
          >
            {form.buttonText || "Inscrever"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Newsletter;
