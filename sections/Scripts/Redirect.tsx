import { ImageWidget } from "apps/admin/widgets.ts";
import { useDevice } from "@deco/deco/hooks";
import Image from "apps/website/components/Image.tsx";
import Redirect from "site/islands/Redirect.tsx";

export interface Props {
  imageMobile: ImageWidget
  imageDesktop: ImageWidget
  alt: string
}

export default function SectionRedirect({ imageMobile, imageDesktop, alt }: Props) {

  const device = useDevice()
  const isMobile = device == "mobile"

  return (
    <div class={"fixed top-0 bottom-0 left-0 right-0 w-full h-full z-[9999999999] flex justify-center items-center bg-white"}>
      <Image
        src={isMobile ? imageMobile : imageDesktop}
        width={isMobile ? 600 : 1920}
        height={isMobile ? 600 : 1080}
        alt={alt}
        preload={true}
        fetchPriority="high"
        loading={"eager"}
        class="relative w-full h-full object-contain"
      />
      <Redirect />
    </div>
  )

}