import { useState } from "preact/hooks";
import Icon from "../../ui/Icon.tsx";

interface Props {
  cupom: string;
}

export default function CopyCupom({ cupom }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(cupom);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }

  return (
    <div onClick={handleCopy} class="w-full h-full flex items-center justify-between px-2 py-2 cursor-pointer rounded-lg text-white bg-primary font-bold relative">
      <p class=" uppercase">{cupom}</p>
      <Icon id="copyText" size={16} />
      {isCopied && <p class="absolute -top-2/4 left-0 w-auto h-auto px-2 py-1 flex items-center justify-center text-white bg-primary bg-opacity-80 text-xs rounded-md z-10 font-medium ">
        Cupom copiado com sucesso!
      </p>}
    </div>
  );
}