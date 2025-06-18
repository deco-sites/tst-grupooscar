import { RichText } from "apps/admin/widgets.ts";
import { useState } from "preact/hooks";
import Icon from "../../ui/Icon.tsx";

interface Props {
  title: string;
  description: RichText;
}

export default function ModalCondidional({ title, description }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  }

  const handleCloseModal = () => {
    setIsOpen(false);
  }

  return (
    <>
      <button onClick={handleOpenModal} class="text-black text-xs font-bold underline cursor-pointer text-opacity-60">Condições</button>
      {isOpen && (
        <div class="w-full h-full flex items-center justify-center fixed top-0 left-0 bg-black bg-opacity-50 z-50 ">
          <div class=" flex items-center justify-start bg-white rounded-lg p-2 relative z-10 w-[95%] h-auto max-w-[500px] flex-col">
            <div class="w-full h-full flex items-center justify-end p-2 relative z-10">
              <Icon id="close-cart" size={12} onClick={handleCloseModal} class="rounded-full p-2 bg-black bg-opacity-20 w-auto h-auto text-white cursor-pointer" />
            </div>
            <div class="w-full h-full flex items-start justify-start bg-white rounded-lg p-2 relative z-10 flex-col gap-2">
              <p class="text-xl text-primary font-semibold text-start">{title}</p>
              <span class="text-sm text-start" dangerouslySetInnerHTML={{ __html: description }}></span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}