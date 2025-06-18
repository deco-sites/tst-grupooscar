import { useUI } from "site/sdk/useUI.ts";
import { useEffect } from "preact/hooks";
export default function sellerName({ sellerId, seller }: { seller?: string, sellerId: string }) {

  const { sellerUI } = useUI()

  useEffect(()=>{
    sellerUI.value = {seller:sellerId, sellerName:null}
  },[])

  return (
    <span class="text-sm text-primary">
      Vendido por: {sellerUI.value.sellerName ?? seller}
    </span>
  )
}