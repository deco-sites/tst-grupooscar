import { useUser } from "apps/vtex/hooks/useUser.ts";
import { signal, useSignalEffect } from "@preact/signals";

type PointHistoryEntry = {
  Id: number;
  DateReceived: string;
  ExpirationDate: string | null;
  Amount: number;
  CashbackAmount: number;
  BranchId: string | null;
  BranchName: string | null;
};

type CustomerData = {
  CustomerExists: boolean;
  InternalId: string;
  PointsBalance: number;
  PointsToExpire: any[];
  CashbackBalance: number;
  RedeemKey: string | null;
  PointHistory: PointHistoryEntry[];
  Name: string;
};

const bonifiq = signal<CustomerData | null>(null);

export default function HeaderBonifiq() {
  const { user } = useUser();

  useSignalEffect(() => {
    const getUserBonifiq = async () => {
      try {
        const response = await fetch(`https://api.bonifiq.com.br/v1/pub/customer/${user.value?.taxID}/points`, {
          method: "GET",
          headers: {
            "X-BQ-APITOKEN": "ClubeOscar-RKYJABPLUGLYTYBWRSTH",
          },
        });
        const data = await response.json();
        bonifiq.value = data;

      } catch (error) {
        console.error("Erro ao buscar pontos Bonifiq", error);
      }
    };

    if (user.value) {
      getUserBonifiq();
    }
  });

  return (
    <>
      {bonifiq.value?.PointsBalance && bonifiq.value.PointsBalance > 0 ? (
        <a href="/clube-oscar" class="cursor-pointer flex flex-col gap-1 justify-center items-center w-full h-auto py-2 bg-primary text-white">
          <div class="flex flex-row gap-1 text-base">
            <span class="font-semibold underline">Resgate agora</span>
            <span class="font-bold">{bonifiq.value.PointsBalance}</span>
            <span>pontos no Clube Oscar</span>
          </div>
        </a>
      ) : null}
    </>
  );
}


export function LabelBonifiq({ type }: { type: "header" | "menu" }) {
  const { user } = useUser();

  useSignalEffect(() => {
    const getUserBonifiq = async () => {
      try {
        const response = await fetch(`https://api.bonifiq.com.br/v1/pub/customer/${user.value?.taxID}/points`, {
          method: "GET",
          headers: {
            "X-BQ-APITOKEN": "ClubeOscar-RKYJABPLUGLYTYBWRSTH",
          },
        });
        const data = await response.json();
        bonifiq.value = data;

      } catch (error) {
        console.error("Erro ao buscar pontos Bonifiq", error);
      }
    };

    if (user.value) {
      getUserBonifiq();
    }
  });


  switch (type) {
    case "header":
      return (
        <>
          {bonifiq.value?.PointsBalance && bonifiq.value.PointsBalance > 0 ? (
            <li class="text-xs px-4 border-r border-r-black border-opacity-[12%]">
              <a href="/clube-oscar" class="cursor-pointer flex flex-col gap-1 justify-center items-center w-full h-auto  ">
                <div class=" flex-row flex gap-1 items-center w-max">
                <span class="font-semibold underline">Resgate agora</span>
                  <span class="font-bold text-primary">{bonifiq.value.PointsBalance}</span>
                  <span>pontos no Clube Oscar</span>
                </div>
              </a>
            </li>
          ) : null}
        </>
      )
    case "menu":
      return (
        <>
          {bonifiq.value?.PointsBalance && bonifiq.value.PointsBalance > 0 ? (
            <li class="flex border-b-[1px] items-center justify-between py-4 m-auto w-full bg-base-300 text-[14px] leading-[17.5px]">
              <a href="/clube-oscar" class="cursor-pointer flex flex-col gap-1 justify-center items-center w-full h-auto  ">
                <div class=" flex-row flex gap-1 items-center w-max">
                <span class="font-semibold underline">Resgate agora</span>
                  <span class="font-bold text-primary">{bonifiq.value.PointsBalance}</span>
                  <span>pontos no Clube Oscar</span>
                </div>
              </a>
            </li>
          ) : null}
        </>
      )
  }
}