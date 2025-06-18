import { useUser } from "apps/vtex/hooks/useUser.ts";

export default function UserName(){
  const { user } = useUser();

    return(
        <p class="mb-6 flex flex-col">
            Olá,<br />
            <span class="font-semibold text-lg truncate">{user.value?.email}</span>
        </p>
    )
}