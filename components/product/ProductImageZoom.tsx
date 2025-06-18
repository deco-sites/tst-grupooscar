import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Modal from "$store/components/ui/Modal.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageObject } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useUI } from "site/sdk/useUI.ts";

export interface Props {
  images: ImageObject[];
  width: number;
  height: number;
  indexOpen?: number;
}

function ProductImageZoom({ images, width, height, indexOpen }: Props) {
  const id = useId();
  const { imageActive, openZoom } = useUI();

  return (
    <>
      <Button
        class="absolute border-none cursor-zoom-in bg-transparent hover:bg-transparent w-full h-full top-0 left-0 text-primary-content min-h-9 px-2.5"
        onClick={() => {
          openZoom.value = indexOpen ?? 0;
          imageActive.value = indexOpen ?? 0;
        }}
      />
      <div id={id}>
        <Modal
          loading="lazy"
          open={openZoom.value === indexOpen}
          onClose={() => openZoom.value = null}
        >
          <div class="modal-box relative w-11/12 max-w-7xl grid grid-cols-[48px_1fr_48px] grid-rows-1 place-items-center">
            <Slider class="cursor-crosshair carousel col-span-full col-start-1 row-start-1 row-span-full h-full w-full">
              {images.map((image, index) => (
                <Slider.Item
                  index={index}
                  class="slider-item-pdp carousel-item w-full h-full justify-center items-center"
                >
                  <div
                    class="relative overflow-hidden group h-full w-full flex items-center justify-center"
                    onMouseMove={(e) => {
                      if (window.innerWidth < 1024) return;

                      const container = e.currentTarget as HTMLDivElement;
                      const img = container.querySelector("img") as HTMLImageElement;
                      const { left, top, width, height } = container.getBoundingClientRect();

                      const x = ((e.clientX - left) / width) * 100;
                      const y = ((e.clientY - top) / height) * 100;

                      img.style.transformOrigin = `${x}% ${y}%`;
                    }}
                    onMouseLeave={(e) => {
                      const img = e.currentTarget.querySelector("img") as HTMLImageElement;
                      img.style.transformOrigin = "center center";
                    }}
                  >
                    <Image
                      style={{ aspectRatio: `${width} / ${height}` }}
                      src={image.url!}
                      alt={image.alternateName}
                      width={width}
                      height={height}
                      class="transition-transform duration-300 ease-out group-hover:scale-150 w-auto h-full object-contain"
                    />
                  </div>
                </Slider.Item>
              ))}
            </Slider>

            <Slider.PrevButton class="absolute left-3 lg:left-8 top-[45%] h-8 w-8 lg:h-11 lg:w-11 rounded-full bg-white flex border items-center justify-center border-black border-opacity-15 text-base">
              <Icon size={12} id="ChevronLeft" strokeWidth={2} />
            </Slider.PrevButton>

            <Slider.NextButton class="absolute right-3 lg:right-8 top-[45%] h-8 w-8 lg:h-11 lg:w-11 rounded-full bg-white flex border items-center justify-center border-black border-opacity-15 text-base">
              <Icon size={12} id="ChevronRight" strokeWidth={2} />
            </Slider.NextButton>

            <SliderJS
              key={imageActive.value}
              rootId={id}
              initialSlide={imageActive.value}
            />

            <button
              class="absolute top-3 right-3 rounded-full p-3"
              onClick={() => openZoom.value = null}
            >
              <Icon id="XMark" size={20} strokeWidth={2} />
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default ProductImageZoom;
