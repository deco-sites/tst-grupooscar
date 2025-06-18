import { useSignal } from "@preact/signals";
import { createPortal } from "preact/compat";
import type { ComponentChildren } from "preact";
import { formatPrice } from "site/sdk/format.ts";
import type { Offer, UnitPriceSpecification } from "apps/commerce/types.ts";
import Icon from "site/components/ui/Icon.tsx";

type Installment = {
  name: string;
  description: string;
  billingDuration: number;
  billingIncrement: number;
  price: number;
};

export interface Props {
  installments: Offer;
  price: number;
}

type ModalProps = {
  handleCloseModal: (value: boolean) => void;
  children: ComponentChildren;
};

const Modal = ({ handleCloseModal, children }: ModalProps) => {
  return createPortal(
    <div
      class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-25"
      onClick={() => handleCloseModal(false)}
    >
      <div
        class="fixed inset-0 flex flex-col gap-6 bg-base-100 z-50 w-11/12 lg:translate-y-[unset] lg:top-[unset] mx-auto h-max rounded-xl top-1/2 -translate-y-1/2 md:max-w-[676px] p-6 md:rounded-lg md:relative md:min-h-[459px] transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 class="text-xl font-medium">Formas de pagamento</h2>
        {children}

        <button
          class="w-6 h-6 absolute right-6 flex items-center justify-center"
          onClick={() => handleCloseModal(false)}
        >
          <Icon id="Close" size={16} stroke-width={2} />
        </button>
      </div>
    </div>,
    document.body,
  );
};

const Installments = ({ installments, price }: Props) => {
  const availableOffers = [
    "festcard",
    "visa",
    "pagaleve pix a vista transparente",
  ];
  const availableOffersIconDictionary = {
    visa: "Cartão de crédito",
    festcard: "FESTCARD",
    "pagaleve pix a vista transparente": "Pix",
  };

  const formatedOffers = installments.priceSpecification.reduce(
    (acumulator, item) => {
      const paymentMethod = item.name?.toLowerCase() || "outros"; // Use "outros" as a default category if name is missing
      acumulator[paymentMethod] ??= [];
      acumulator[paymentMethod].push(item);
      return acumulator;
    },
    {} as { [key: string]: UnitPriceSpecification[] },
  ) || {};

  Object.keys(formatedOffers).forEach((item) => {
    if (availableOffers.includes(item.toLowerCase())) return;
    delete formatedOffers[item];
  });
  const tratedKeys = Object.keys(formatedOffers);
  const selectedOptionIndex = useSignal("giftCard");
  const openedInstallmentsModal = useSignal(false);

  const handleInstallmentsModal = (value: boolean) => {
    openedInstallmentsModal.value = value;
  };

  const handleSetInstallmentBar = (
    name: string,
  ) => (selectedOptionIndex.value = name);
  return (
    <>
      <a
        class="flex gap-2 items-center text-xs font-medium text-base-content cursor-pointer"
        onClick={() => handleInstallmentsModal(true)}
      >
        <Icon id="payments-card" width="14" height="12" />
        Opções de pagamento
      </a>
      {openedInstallmentsModal.value && (
        <Modal handleCloseModal={handleInstallmentsModal}>
          <nav class="flex flex-col md:flex-row items-center border-b border-neutral-100 justify-between">
            <li
              key={"1"}
              onClick={() =>
                handleSetInstallmentBar("giftCard")}
              class={`list-none cursor-pointer w-full text-center py-2.5 md:py-0 ${
                selectedOptionIndex.value === "giftCard"
                  ? "border-b-2 border-primary"
                  : "border-b-2 border-neutral-100 lg:border-0"
              }`}
            >
              Cartão Presente
            </li>
            {tratedKeys.map((item, index) => (
              <li
                key={(index + 1).toString()}
                onClick={() => handleSetInstallmentBar(item)}
                class={`list-none cursor-pointer w-full text-center py-2.5 md:py-0 ${
                  selectedOptionIndex.value.toLowerCase() === item.toLowerCase()
                    ? "border-b-2 border-primary"
                  : "border-b-2 border-neutral-100 lg:border-0"
                }`}
              >
                {availableOffersIconDictionary[
                  item
                    .toLowerCase() as keyof typeof availableOffersIconDictionary
                ]}
              </li>
            ))}
          </nav>
          <div class="rounded-sm overflow-auto">
            <div
              class={`${
                selectedOptionIndex.value == "giftCard" ||
                  selectedOptionIndex.value ==
                    "pagaleve pix a vista transparente"
                  ? "bg-base-100"
                  : "[&>*:nth-child(odd)]:bg-neutral-50 grid border border-base-200 rounded-xl w-[430px] md:w-full"
              }`}
            >
              {selectedOptionIndex.value == "giftCard"
                ? (
                  <div class={`flex flex-col items-center gap-5 bg-base-100`}>
                    <h3 class={`w-full text-xl font-medium`}>
                      Cartão Presente Oscar Calçados
                    </h3>
                    <p class={`text-sm`}>
                      Com o cartão presente da Oscar você pode presentear quem
                      você gosta, ela irá escolher o que quer do site e pagar
                      usando o nosso cartão presente,{" "}
                      <a
                        href="https://oscarcalcados.todocartoes.com.br/#/purchase"
                        class={`underline`}
                      >
                        peça o cartão presente e presentei quem você ama!
                      </a>
                    </p>
                    <div class={`flex gap-6 items-center justify-center`}>
                      <div
                        class={`flex flex-col items-center justify-center text-center gap-3 py-6 px-3 rounded-xl bg-base-300`}
                      >
                        <Icon id="handshake" width="30" height="19" />
                        <span>Um cartão presente válido por 12 meses</span>
                      </div>
                      <div
                        class={`flex flex-col items-center justify-center text-center gap-3 py-6 px-3 rounded-xl bg-base-300`}
                      >
                        <Icon id="money-bill-wave" width="28" height="24" />
                        <span>Um cartão presente válido por 12 meses</span>
                      </div>
                    </div>
                    <a
                      href="https://oscarcalcados.todocartoes.com.br/#/purchase"
                      class={`text-base-100 text-xs px-8 py-3 rounded-badge background-gradient-primary`}
                    >
                      Compre o cartão presente
                    </a>
                  </div>
                )
                : formatedOffers[selectedOptionIndex.value].map((
                  item,
                  index,
                ) => (
                  <>
                    {selectedOptionIndex.value ==
                        "pagaleve pix a vista transparente"
                      ? (
                        <div class={`flex flex-col gap-5 bg-base-100`}>
                          <div>
                            <img
                              src={"/image/pix-installments.png"}
                              loading={`lazy`}
                            />
                          </div>
                          <div
                            class="grid grid-cols-1 border border-base-200 rounded-xl bg-base-300 justify-items-center"
                            key={(index + 1).toString()}
                          >
                            <div class="py-2">
                              Pagamento à vista de: {formatPrice(item.price)}
                            </div>
                          </div>
                          <p>
                            Com o pagamento em PIX, tenha mais facilidade e
                            agilidade na hora de pagar! Além da aprovação ser na
                            hora.
                          </p>
                        </div>
                      )
                      : (
                        <div
                          class="grid grid-cols-[2fr_1fr_2fr] border-b last:border-b-0 border-base-200 first:rounded-t-xl last:rounded-b-xl"
                          key={(index + 1).toString()}
                        >
                          <div class="pl-4 py-2">
                            {item.billingDuration}x de{"  "}
                            {formatPrice(item.billingIncrement)}
                          </div>
                          <div class="py-2 flex justify-center">
                            {item.billingIncrement && item.billingDuration &&
                                item.billingDuration * item.billingIncrement >
                                price
                              ? "com juros"
                              : "sem juros"}
                          </div>
                          <div class="text-right pr-4 py-2">
                            Total: {formatPrice(item.price)}
                          </div>
                        </div>
                      )}
                  </>
                ))}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Installments;
