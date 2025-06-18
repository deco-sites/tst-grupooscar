import type {
  AggregateOffer,
  Offer,
  UnitPriceSpecification,
} from "apps/commerce/types.ts";

const bestInstallment = (
  acc: UnitPriceSpecification | null,
  curr: UnitPriceSpecification,
) => {
  if (curr.priceComponentType !== "https://schema.org/Installment") {
    return acc;
  }

  if (!acc) {
    return curr;
  }

  if (acc.price > curr.price) {
    return curr;
  }

  if (acc.price < curr.price) {
    return acc;
  }

  if (
    acc.billingDuration && curr.billingDuration &&
    acc.billingDuration < curr.billingDuration
  ) {
    return curr;
  }

  return acc;
};

const installmentToString = (
  installment: UnitPriceSpecification,
) => {
  const { billingDuration, billingIncrement, name } = installment;

  if (!billingDuration || !billingIncrement) {
    return "";
  }

  return `ou ${billingDuration}x de R$ ${billingIncrement.toString().replace(`.`, ",")
    } ${name ? `no ${name != "FESTCARD" ? "Cartão de crédito" : name}` : ``}`;
};

export const useOffer = (aggregateOffer?: AggregateOffer, sellerId?: string) => {

  const offer = aggregateOffer?.offers.find(({ seller }) => seller === sellerId) || aggregateOffer?.offers[0];

  // const offer = aggregateOffer?.offers[0];
  const listPrice = offer?.priceSpecification.find((spec) =>
    spec.priceType === "https://schema.org/ListPrice"
  );
  const installment = offer?.priceSpecification.reduce(bestInstallment, null);
  const seller = offer?.seller;
  const price = offer?.price;
  const availability = offer?.availability;
  const sellerName = offer?.sellerName


  return {
    price,
    listPrice: listPrice?.price,
    availability,
    seller,
    sellerName,
    installments: installment && price
      ? installmentToString(installment)
      : null,
  };
};

export const useCurrentOffer = (offer?: Offer) => {
  const listPrice = offer?.priceSpecification.find((spec) =>
    spec.priceType === "https://schema.org/ListPrice"
  );
  const installment = offer?.priceSpecification.reduce(bestInstallment, null);
  const seller = offer?.seller;
  const price = offer?.price;
  const availability = offer?.availability;
  const sellerName = offer?.sellerName

  return {
    price,
    listPrice: listPrice?.price,
    availability,
    seller,
    installments: installment && price
      ? installmentToString(installment)
      : null,
    sellerName
  };
};
