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
            class="btn btn-circle btn-sm btn-ghost"
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
              id="user-header-mob"
              strokeWidth={1}
              width={22}
              height={21}
              class="text-base-content"
            />
          </a>
        )
        : (
          <a
            class="btn btn-circle btn-sm btn-ghost"
            aria-label="Minha conta"
            href={`/my-account`}
          >
            <Icon
              id="user-header-mob"
              strokeWidth={1}
              width={22}
              height={21}
              class="text-base-content"
            />
          </a>
        )}
    </>
  );
};
export default LoginButtonIframe;
