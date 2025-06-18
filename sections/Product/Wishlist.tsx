export { default, loader } from "$store/components/wishlist/WishlistGallery.tsx";

export function LoadingFallback(){
  return(
    <div class="flex w-full min-h-dvh justify-center items-center">
      <span class="loading loading-spinner text-primary"></span>
    </div>
  )
}
