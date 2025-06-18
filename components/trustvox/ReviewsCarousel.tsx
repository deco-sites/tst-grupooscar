import { Review } from "site/loaders/Trustvox/productDetailsPage.ts";
import AggregateRating from "site/components/trustvox/aggregateRating.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Icon from "site/components/ui/Icon.tsx";
import { useId } from "site/sdk/useId.ts";
import ImageZoom from "site/islands/ProductImageZoom.tsx";

export interface Props {
  reviews: Review[];
  rating: number | null;
}

export default function Reviews({ reviews, rating }: Props) {
  const id = useId();

  if (reviews.length === 0) {
    return (
      <div id="reviews" class={`flex flex-col items-center gap-6 justify-center w-full`}>
        <h2 class="text-xl lg:w-max mx-auto uppercase font-normal lg:text-2xl">
          avaliações do produto
        </h2>
        <div class={`flex items-center gap-3 flex-col lg:flex-row`}>
          <AggregateRating
            rating={rating || 0}
            reviewsCount={reviews.length}
            showReviewsCount={false}
          />
          <span>
            Esse produto ainda não possui avaliações.
          </span>
        </div>
      </div>
    );
  }
  return (
    <div id="reviews" class={`flex flex-col items-center gap-6 justify-center w-full`}>
      <h2 class="text-xl lg:w-max mx-auto uppercase font-normal lg:text-2xl">
        avaliações do produto
      </h2>
      <div class={`flex items-center gap-3 flex-col lg:flex-row`}>
        <AggregateRating
          rating={rating || 0}
          reviewsCount={reviews.length}
          showReviewsCount={false}
        />
        <span class={`hidden lg:block`}>·</span>
        <span>
          {rating?.toFixed(1)}/5.0 - Baseado em {reviews.length} avaliações
        </span>
      </div>
      <div
        id={id}
        class={`flex relative items-center w-11/12 ${
          reviews.length < 4 ? "lg:justify-center" : ""
        }`}
      >
        <Slider class={`carousel carousel-start sm:carousel-end gap-4 lg:gap-8`}>
          {reviews?.map((review, index) => (
            <Slider.Item
              index={index}
              class={`carousel-item bg-base-100 rounded-lg p-6 flex flex-col gap-3 w-[70%] lg:w-[390px] lg:h-[214px] overflow-hidden`}
            >
              <div class={`flex items-center justify-between`}>
                <p class={`text-sm font-semibold text-primary-content`}>
                  {review.user.name}
                </p>
                <AggregateRating
                  rating={review.rate || 0}
                  reviewsCount={reviews.length}
                  showReviewsCount={false}
                />
              </div>
              <span class={`text-sm`}>Avaliado em {review.created_at}</span>
              {review.opinion_title
                ? (
                  <>
                    <p class={`text-sm`}>{review.opinion_title}</p>
                    <p class={`text-sm`}>{review.opinion}</p>
                  </>
                )
                : (
                  <p class={`text-sm`}>
                    {review.opinion ||
                      "Cliente não escreveu uma avaliação, apenas deu a nota do produto."}
                  </p>
                )}
              {review.review_photos?.length > 0 && (
                <div class={`flex gap-2 relative`}>
                  {review.review_photos.map((photo) => (
                    <img
                      src={photo.thumbnail}
                      alt={photo.thumbnail}
                      class={`w-16 h-16 object-cover`}
                    />
                  ))}
                  {/* Transformar review_photos em ImageObject[] para passar ao ImageZoom */}
                  <ImageZoom
                    images={review.review_photos.map((photo) => ({
                      "@type": "ImageObject",
                      url: photo.image, // Usar a URL do thumbnail como o campo `url`
                    }))}
                    width={520}
                    height={520}
                    hideIcon={true}
                  />
                </div>
              )}
            </Slider.Item>
          ))}
        </Slider>
        <div
          class={`absolute w-[105%] -bottom-[60px] left-1/2 -translate-x-1/2 flex items-center justify-between gap-2 lg:justify-between lg:top-[40%] lg:bottomUnset lg:pointer-events-none`}
        >
          <div class="block z-10 col-start-1 row-start-3 lg:pointer-events-auto">
            <Slider.PrevButton class="btn btn-circle bg-base-100 border border-base-200 h-8 min-h-8 w-8">
              <Icon
                class="text-base-content"
                width={8}
                height={12}
                id="ChevronLeft"
              />
            </Slider.PrevButton>
          </div>
          <div class="block z-10 col-start-3 row-start-3 lg:pointer-events-auto">
            <Slider.NextButton class="btn btn-circle bg-base-100 border border-base-200 h-8 min-h-8 w-8">
              <Icon
                class="text-base-content"
                width={8}
                height={12}
                id="ChevronRight"
              />
            </Slider.NextButton>
          </div>
        </div>
        <SliderJS rootId={id} infinite />
      </div>
    </div>
  );
}
