export interface Props {
  rating: number; // Valor de 0 a 5, incluindo frações como 3.5
  reviewsCount: number; // Número total de avaliações
  showReviewsCount?: boolean; // Exibir o número de avaliações
  activeAnchor?: boolean; // Adiciona um link para a seção de avaliações
}

export default function AggregateRating(
  { rating, reviewsCount, showReviewsCount = false, activeAnchor = false }: Props,
) {
  const MAX_STARS = 5;

  if(activeAnchor){
    return (
      <a href="#reviews" className="flex space-x-1">
        {Array.from({ length: MAX_STARS }, (_, index) => {
          const starFill = Math.max(0, Math.min(1, rating - index)); // Calcula a porcentagem de preenchimento (0 a 1)
  
          return (
            <div key={index} className="relative w-4 h-4">
              {/* Estrela de fundo (cinza) */}
              <svg
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 left-0"
              >
                <path
                  d="M8.64062 0.742188L10.418 4.37891L14.3281 4.95312C14.6562 5.00781 14.9297 5.22656 15.0391 5.55469C15.1484 5.85547 15.0664 6.21094 14.8203 6.42969L11.9766 9.24609L12.6602 13.2383C12.7148 13.5664 12.5781 13.8945 12.3047 14.0859C12.0312 14.3047 11.6758 14.3047 11.375 14.168L7.875 12.2812L4.34766 14.168C4.07422 14.3047 3.71875 14.3047 3.44531 14.0859C3.17188 13.8945 3.03516 13.5664 3.08984 13.2383L3.74609 9.24609L0.902344 6.42969C0.683594 6.21094 0.601562 5.85547 0.683594 5.55469C0.792969 5.22656 1.06641 5.00781 1.39453 4.95312L5.33203 4.37891L7.08203 0.742188C7.21875 0.441406 7.51953 0.25 7.875 0.25C8.20312 0.25 8.50391 0.441406 8.64062 0.742188Z"
                  fill="#D9D9D9"
                />
              </svg>
  
              {/* Estrela de preenchimento (dourada) */}
              <svg
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 left-0"
                style={{
                  clipPath: `inset(0 ${100 - starFill * 100}% 0 0)`, // Controla a largura do preenchimento
                }}
              >
                <path
                  d="M8.64062 0.742188L10.418 4.37891L14.3281 4.95312C14.6562 5.00781 14.9297 5.22656 15.0391 5.55469C15.1484 5.85547 15.0664 6.21094 14.8203 6.42969L11.9766 9.24609L12.6602 13.2383C12.7148 13.5664 12.5781 13.8945 12.3047 14.0859C12.0312 14.3047 11.6758 14.3047 11.375 14.168L7.875 12.2812L4.34766 14.168C4.07422 14.3047 3.71875 14.3047 3.44531 14.0859C3.17188 13.8945 3.03516 13.5664 3.08984 13.2383L3.74609 9.24609L0.902344 6.42969C0.683594 6.21094 0.601562 5.85547 0.683594 5.55469C0.792969 5.22656 1.06641 5.00781 1.39453 4.95312L5.33203 4.37891L7.08203 0.742188C7.21875 0.441406 7.51953 0.25 7.875 0.25C8.20312 0.25 8.50391 0.441406 8.64062 0.742188Z"
                  fill="#E2B96E"
                />
              </svg>
            </div>
          );
        })}
        {showReviewsCount && (
          <span className="text-xs text-base-content text-opacity-60">
            {reviewsCount} Avaliações
          </span>
        )}
      </a>
    );
  }

  return (
    <div className="flex space-x-1">
      {Array.from({ length: MAX_STARS }, (_, index) => {
        const starFill = Math.max(0, Math.min(1, rating - index)); // Calcula a porcentagem de preenchimento (0 a 1)

        return (
          <div key={index} className="relative w-4 h-4">
            {/* Estrela de fundo (cinza) */}
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 left-0"
            >
              <path
                d="M8.64062 0.742188L10.418 4.37891L14.3281 4.95312C14.6562 5.00781 14.9297 5.22656 15.0391 5.55469C15.1484 5.85547 15.0664 6.21094 14.8203 6.42969L11.9766 9.24609L12.6602 13.2383C12.7148 13.5664 12.5781 13.8945 12.3047 14.0859C12.0312 14.3047 11.6758 14.3047 11.375 14.168L7.875 12.2812L4.34766 14.168C4.07422 14.3047 3.71875 14.3047 3.44531 14.0859C3.17188 13.8945 3.03516 13.5664 3.08984 13.2383L3.74609 9.24609L0.902344 6.42969C0.683594 6.21094 0.601562 5.85547 0.683594 5.55469C0.792969 5.22656 1.06641 5.00781 1.39453 4.95312L5.33203 4.37891L7.08203 0.742188C7.21875 0.441406 7.51953 0.25 7.875 0.25C8.20312 0.25 8.50391 0.441406 8.64062 0.742188Z"
                fill="#D9D9D9"
              />
            </svg>

            {/* Estrela de preenchimento (dourada) */}
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 left-0"
              style={{
                clipPath: `inset(0 ${100 - starFill * 100}% 0 0)`, // Controla a largura do preenchimento
              }}
            >
              <path
                d="M8.64062 0.742188L10.418 4.37891L14.3281 4.95312C14.6562 5.00781 14.9297 5.22656 15.0391 5.55469C15.1484 5.85547 15.0664 6.21094 14.8203 6.42969L11.9766 9.24609L12.6602 13.2383C12.7148 13.5664 12.5781 13.8945 12.3047 14.0859C12.0312 14.3047 11.6758 14.3047 11.375 14.168L7.875 12.2812L4.34766 14.168C4.07422 14.3047 3.71875 14.3047 3.44531 14.0859C3.17188 13.8945 3.03516 13.5664 3.08984 13.2383L3.74609 9.24609L0.902344 6.42969C0.683594 6.21094 0.601562 5.85547 0.683594 5.55469C0.792969 5.22656 1.06641 5.00781 1.39453 4.95312L5.33203 4.37891L7.08203 0.742188C7.21875 0.441406 7.51953 0.25 7.875 0.25C8.20312 0.25 8.50391 0.441406 8.64062 0.742188Z"
                fill="#E2B96E"
              />
            </svg>
          </div>
        );
      })}
      {showReviewsCount && (
        <span className="text-xs text-base-content text-opacity-60">
          {reviewsCount} Avaliações
        </span>
      )}
    </div>
  );
}
