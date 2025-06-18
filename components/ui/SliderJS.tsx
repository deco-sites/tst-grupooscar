import { useEffect } from "preact/hooks";

export interface Props {
  rootId: string;
  scroll?: "smooth" | "auto";
  interval?: number;
  infinite?: boolean;
  initialSlide?: number;
}

const ATTRIBUTES = {
  "data-slider": "data-slider",
  "data-slider-item": "data-slider-item",
  'data-slide="prev"': 'data-slide="prev"',
  'data-slide="next"': 'data-slide="next"',
  "data-dot": "data-dot",
};

// Percentage of the item that has to be inside the container
// for it it be considered as inside the container
const THRESHOLD = 0.6;

const intersectionX = (element: DOMRect, container: DOMRect): number => {
  const delta = container.width / 1_000;

  if (element.right < container.left - delta) return 0.0;
  if (element.left > container.right + delta) return 0.0;
  if (element.left < container.left - delta) return element.right - container.left + delta;
  if (element.right > container.right + delta) return container.right - element.left + delta;

  return element.width;
};

const isHTMLElement = (x: Element): x is HTMLElement =>
  typeof (x as any).offsetLeft === "number";

const setup = ({ rootId, scroll, interval, infinite, initialSlide }: Props) => {
  const root = document.getElementById(rootId);
  const slider = root?.querySelector(`[${ATTRIBUTES["data-slider"]}]`);
  const items = root?.querySelectorAll(`[${ATTRIBUTES["data-slider-item"]}]`);
  const prev = root?.querySelector(`[${ATTRIBUTES['data-slide="prev"']}]`);
  const next = root?.querySelector(`[${ATTRIBUTES['data-slide="next"']}]`);
  const dots = root?.querySelectorAll(`[${ATTRIBUTES["data-dot"]}]`);

  if (!root || !slider || !items || items.length === 0) {
    console.warn("Missing necessary slider attributes.", { root, slider, items, rootId });
    return;
  }

  const goToItem = (index: number) => {
    const item = items.item(index);
    if (!isHTMLElement(item)) {
      console.warn(`Element at index ${index} is not an HTML element.`);
      return;
    }

    slider.scrollTo({
      top: 0,
      behavior: scroll,
      left: item.offsetLeft,
    });
  };

  // 🔥 Mover para o slide inicial
  if (
    typeof initialSlide === "number" &&
    initialSlide >= 0 &&
    initialSlide < items.length
  ) {
    requestAnimationFrame(() => goToItem(initialSlide));
  }

  const getElementsInsideContainer = () => {
    const indices: number[] = [];
    const sliderRect = slider.getBoundingClientRect();

    for (let index = 0; index < items.length; index++) {
      const item = items.item(index);
      const rect = item.getBoundingClientRect();

      const ratio = intersectionX(rect, sliderRect) / rect.width;
      if (ratio > THRESHOLD) indices.push(index);
    }

    return indices;
  };

  const onClickPrev = () => {
    const indices = getElementsInsideContainer();
    const itemsPerPage = indices.length;
    const isShowingFirst = indices[0] === 0;
    const pageIndex = Math.floor(indices[indices.length - 1] / itemsPerPage);

    goToItem(isShowingFirst ? items.length - 1 : (pageIndex - 1) * itemsPerPage);
  };

  const onClickNext = () => {
    const indices = getElementsInsideContainer();
    const itemsPerPage = indices.length;
    const isShowingLast = indices[indices.length - 1] === items.length - 1;
    const pageIndex = Math.floor(indices[0] / itemsPerPage);

    goToItem(isShowingLast ? 0 : (pageIndex + 1) * itemsPerPage);
  };

  const observer = new IntersectionObserver(
    (elements) =>
      elements.forEach((item) => {
        const index = Number(item.target.getAttribute("data-slider-item")) || 0;
        const dot = dots?.item(index);
        const slide = items.item(index);

        if (item.isIntersecting) {
          dot?.setAttribute("disabled", "");
          slide?.setAttribute("disabled", "");
        } else {
          dot?.removeAttribute("disabled");
          slide?.removeAttribute("disabled");
        }

        if (!infinite) {
          if (index === 0) {
            item.isIntersecting ? prev?.setAttribute("disabled", "") : prev?.removeAttribute("disabled");
          }
          if (index === items.length - 1) {
            item.isIntersecting ? next?.setAttribute("disabled", "") : next?.removeAttribute("disabled");
          }
        }
      }),
    { threshold: THRESHOLD, root: slider },
  );

  items.forEach((item) => observer.observe(item));

  for (let it = 0; it < (dots?.length ?? 0); it++) {
    dots?.item(it).addEventListener("click", () => goToItem(it));
  }

  prev?.addEventListener("click", onClickPrev);
  next?.addEventListener("click", onClickNext);

  const timeout = interval && setInterval(onClickNext, interval);

  return () => {
    for (let it = 0; it < (dots?.length ?? 0); it++) {
      dots?.item(it).removeEventListener("click", () => goToItem(it));
    }

    prev?.removeEventListener("click", onClickPrev);
    next?.removeEventListener("click", onClickNext);
    observer.disconnect();
    clearInterval(timeout);
  };
};

function Slider({
  rootId,
  scroll = "smooth",
  interval,
  infinite = false,
  initialSlide,
}: Props) {
  useEffect(() => {
    const cleanup = setup({ rootId, scroll, interval, infinite, initialSlide });
    return cleanup;
  }, [rootId, scroll, interval, infinite, initialSlide]);

  return <div data-slider-controller-js />;
}

export default Slider;
