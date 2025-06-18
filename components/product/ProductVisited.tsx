import { useEffect } from "preact/hooks";

export interface Props {
  productId: string;
}

export default function ProductsVisited({ productId }: Props) {
  const setCookie = (name: string, value: string, days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Validade em dias
    const expires = `expires=${date.toUTCString()}`;

    const cookies = document.cookie.split(";");
    const cookie = cookies.find((row) => row.startsWith(` ${name}=`));
    const cookieValue = cookie?.split("=")[1];

    if (cookieValue) {
      if (!cookieValue.includes(productId)) {
        document.cookie =
          `${name}=${value},${cookieValue};${expires};path=/`;
      }
    } else {
      document.cookie = `${name}=${value};${expires};path=/`;
    }
  };

  useEffect(() => {
    setCookie("products_visited", productId, 20); // Exemplo de cookie com 20 dias de duração
  }, []);

  return <></>;
}
