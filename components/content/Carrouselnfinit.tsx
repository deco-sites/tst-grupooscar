import { ImageWidget } from "apps/admin/widgets.ts";
import { useDevice } from "@deco/deco/hooks";
import Image from "apps/website/components/Image.tsx";

interface Img {
  imageMobile: ImageWidget;
  imageDesktop: ImageWidget;
  alt: string;
}

export interface Props {
  images: Img[];
}

export default function CarrouselInifit({ images }: Props) {

  const device = useDevice()
  const isMobile = device === "mobile"

  return (
    <>
      <style type="text/css" dangerouslySetInnerHTML={{
        __html: `
         .carousel-track {
                display: flex;
                animation: scroll 15s linear infinite;
              }

              @keyframes scroll {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-100%);
                }
              }

              .carousel-track:hover {
                animation-play-state: running;
              }
        `
      }}>

      </style>

      <div class="w-full h-full flex items-center justify-center ">
        <div class="overflow-hidden w-full h-full">
          <div class="carousel-track">
            {images.map((img) =>
              <div class="min-w-full flex-shrink-0 max-w-[80vw]">
                <Image src={isMobile ? img.imageMobile : img.imageDesktop} alt={img.alt} class="w-full " width={isMobile ? 375 : 1440} height={isMobile ? 300 : 350} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}