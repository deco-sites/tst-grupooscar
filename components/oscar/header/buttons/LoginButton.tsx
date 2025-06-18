import { useUI } from "$store/sdk/useUI.ts";
import Icon from "site/components/ui/Icon.tsx";

export interface Props {
  loginHref: string;
}

export default function LoginButton({ loginHref }: Props) {
  const { userLogged, userEmail } = useUI();

  return (
    <a
      class="flex items-center gap-2 py-4 w-full"
      href={userLogged.value ? "/my-account" : loginHref}
      aria-label="Entre ou Cadastre-se"
    >
      <Icon id="user-alert" strokeWidth={1} size={16} class="text-primary" />
      <p class="text-sm text-accent-content font-semibold">
        {!userLogged.value
          ? (
            <>
              Entre ou cadastre-se
            </>
          )
          : (
            <>
              {userEmail.value}
            </>
          )}
      </p>
    </a>
  );
}
