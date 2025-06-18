import { ComponentChildren } from "preact";
import { useUI } from "site/sdk/useUI.ts";

const SELLERCODE = {
  "OC035": "KRN Shoes",
  "OC036": "Haldrys",
  "OC049": "Autem Originals",
  "OC050": "Calçados Bibi",
  "OC051": "Cabana Magazine",
  "OC056": "EC Shoes",
  "OC059": "Ferraroni",
  "OC060": "Fila",
  "OC065": "Hfast Shoes",
  "OC025": "Alex Shoes",
  "OC029": "Total Tennis",
  "OC030": "MG Sports",
  "OC067": "KYW",
  "OC075": "OP Santos",
  "OC079": "Pegada",
  "OC081": "Royalz",
  "OC088": "Usaflex",
  "OC089": "Usevértice",
  "OC106": "Home Sport Center",
  "OC110": "West+",
  "OC118": "Mizuno",
  "OC119": "Olympikus",
  "OC120": "Under Armour",
  "OC121": "Diadora Brasil",
  "OC122": "Petite Jolie",
  "OC123": "Sport West",
  "OC124": "Democrata",
  "OC125": "Sawary",
  "OC126": "Umbro",
  "OC127": "Chic e Elegante",
  "OC128": "Pé Mania",
  "OC129": "Kidy Calçados",
  "OC130": "Macboot",
  "OC131": "Wisni",
  "OC132": "Rovitex",
  "1": "Oscar Calçados",
}

export default function Button({ sellerID, children, _class, id }: { sellerID: string, children: ComponentChildren, _class: string, id:string }) {

  const { sellerUI, productOfferSimilar } = useUI()

  function handleSelectSeller(ID: string) {
    sellerUI.value = {
      seller: ID, sellerName: SELLERCODE[ID as keyof typeof SELLERCODE]
    }
    productOfferSimilar.value = undefined
  }

  return (
    <button id={id} class={_class +
      `${sellerID === sellerUI.value.seller ? " border border-primary" : " border-none"}`
    } onClick={() => handleSelectSeller(sellerID)}>
      {children}
    </button>
  )
}