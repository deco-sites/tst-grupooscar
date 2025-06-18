import { useUI } from "site/sdk/useUI.ts";
import Icon from "site/components/ui/Icon.tsx";
import { useUser } from "apps/vtex/hooks/useUser.ts";

const LoginButtonIframe = () => {
  const { vtexIdScriptsLoaded } = useUI();

  const { user } = useUser();

  console.log("user", user.value)

  return (
    <>
      {!user.value
        ? (
          <a
            class="flex gap-2 items-center text-xs w-max"
            aria-label="Entre ou Cadastre-se"
            href={`#`}
            onClick={async (e) => {
              e.preventDefault();
              const execute = () => {
                vtexIdScriptsLoaded.value = true;
                // deno-lint-ignore ban-ts-comment
                // @ts-expect-error
                window.vtexid.start({
                  userEmail: "",
                  locale: "pt-BR",
                  forceReload: true,
                });
              };
              if (!vtexIdScriptsLoaded.value) {
                const { loadVtexIdScripts } = await import(
                  "site/sdk/loadVtexIdScript.ts"
                );
                loadVtexIdScripts(execute);
              } else {
                execute();
              }
            }}
          >
            <Icon
              id="user-alert"
              strokeWidth={1}
              size={16}
              class="text-primary"
            />
            Entre ou Cadastre-se
          </a>
        )
        : (
          <a
            class="flex gap-2 items-center text-xs w-max"
            aria-label="Minha conta"
            href={`/my-account`}
          >
            <Icon
              id="user-alert"
              strokeWidth={1}
              size={16}
              class="text-primary"
            />
            <span class={`block lg:hidden`}>Minha conta</span>
            <span class={`hidden lg:block`}>{user.value?.email}</span>
          </a>
        )}
    </>
  );
};
export default LoginButtonIframe;
