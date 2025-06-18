import { useUI } from "site/sdk/useUI.ts";
import Icon from "site/components/ui/Icon.tsx";
import { useUser } from "apps/vtex/hooks/useUser.ts";

const LoginButtonIframe = () => {
  const { vtexIdScriptsLoaded } = useUI();

  const { user } = useUser();

  return (
    <>
      {!user.value
        ? (
          <a
            class="flex items-center gap-2 py-4 w-full"
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
            <p class="text-sm text-accent-content font-semibold">
              Entre ou cadastre-se
            </p>
          </a>
        )
        : (
          <a
            class="flex items-center gap-2 py-4 w-full"
            aria-label="Minha conta"
            href={`/my-account`}
          >
            <Icon
              id="user-alert"
              strokeWidth={1}
              size={16}
              class="text-primary"
            />
            <p class="text-sm text-accent-content font-semibold">
              {user.value?.email}
            </p>
          </a>
        )}
    </>
  );
};
export default LoginButtonIframe;
