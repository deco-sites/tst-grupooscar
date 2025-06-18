import { useEffect, useRef, useState } from "preact/hooks";
import { formatPrice } from "../../sdk/format.ts";
import { useUI } from "../../sdk/useUI.ts";

export interface Props {
  classProps?: string;
  sliderClass?: string;
  name?: string;
  label?: string;
  url: string;
  minFilterPrice: number;
  maxFilterPrice: number;
}

function FilterPrice(props: Props) {
  const { sliderClass, classProps, url, minFilterPrice, maxFilterPrice } = props;
  const { filterPriceSelected } = useUI();
  const sliderRef = useRef<HTMLDivElement>(null);

  const searchParams = new URLSearchParams(globalThis.location.search);
  const priceFilter = searchParams.get("filter.price");

  const [initialMin, initialMax] = priceFilter
    ? priceFilter.split(":").map(Number)
    : [minFilterPrice, maxFilterPrice];

  const [minValue, setMinValue] = useState<number>(initialMin);
  const [maxValue, setMaxValue] = useState<number>(initialMax);
  const [dragging, setDragging] = useState<"left" | "right" | null>(null);

  const queryParams = new URLSearchParams(globalThis.location.search);
  if (queryParams.toString().includes("filter.price")) {
    filterPriceSelected.value = {
      label: "filter.price",
      value: `De R$${initialMin} até R$${initialMax}`,
      href: "?" + queryParams.toString().replace(/&filter\.price=\d+%3A\d+/, ""),
    };
  }

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging) return;

      const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      const sliderRect = sliderRef.current!.getBoundingClientRect();
      const valuePerPixel = (maxFilterPrice - minFilterPrice) / sliderRect.width;
      const newX = Math.max(0, Math.min(sliderRect.width, clientX - sliderRect.left));
      const newValue = Math.round(minFilterPrice + newX * valuePerPixel);

      if (dragging === "left") {
        setMinValue(Math.min(Math.max(newValue, minFilterPrice), maxValue - 1));
      } else if (dragging === "right") {
        setMaxValue(Math.max(Math.min(newValue, maxFilterPrice), minValue + 1));
      }
    };

    const handleEnd = () => setDragging(null);

    globalThis.addEventListener("mousemove", handleMove);
    globalThis.addEventListener("mouseup", handleEnd);
    globalThis.addEventListener("touchmove", handleMove);
    globalThis.addEventListener("touchend", handleEnd);

    return () => {
      globalThis.removeEventListener("mousemove", handleMove);
      globalThis.removeEventListener("mouseup", handleEnd);
      globalThis.removeEventListener("touchmove", handleMove);
      globalThis.removeEventListener("touchend", handleEnd);
    };
  }, [dragging, minValue, maxValue]);

  const handleApply = () => {
    const urlParams = url.split("filter.price")[0];
    const queryParams = new URLSearchParams(globalThis.location.search);
    queryParams.set(`filter.price`, `${minValue}:${maxValue}`);

    const urlFinal = queryParams.toString().includes(urlParams.split("?")[1])
      ? `${globalThis.location.pathname}?${queryParams}`
      : `${globalThis.location.pathname}${urlParams}&${queryParams}`;

    globalThis.location.href = urlFinal;
    history.pushState({}, "", urlFinal);
  };

  return (
    <div className={`relative ${classProps || ""} flex-col`} id="range-slider">
      <div className="flex justify-between mb-4 text-sm text-neutral">
        <span class="text-sm text-base-content">{formatPrice(minValue, "BRL")}</span>
        <span class="text-sm text-base-content">{formatPrice(maxValue, "BRL")}</span>
      </div>

      <div ref={sliderRef} className={`range-slider ${sliderClass || ""}`}>
        <div className="range-bar relative h-[1px] bg-gray-300 rounded-lg">
          <div
            className="range-fill absolute h-[1px] bg-primary rounded-lg"
            style={{
              left: `${((minValue - minFilterPrice) / (maxFilterPrice - minFilterPrice)) * 100}%`,
              right: `${100 - ((maxValue - minFilterPrice) / (maxFilterPrice - minFilterPrice)) * 100}%`,
            }}
          />
          <button
            className="knob left absolute w-4 h-4 bg-white border border-primary rounded-full cursor-pointer"
            style={{
              left: `${((minValue - minFilterPrice) / (maxFilterPrice - minFilterPrice)) * 100}%`,
              transform: "translate(-50%, -50%)",
              top: "50%",
            }}
            onMouseDown={() => setDragging("left")}
            onTouchStart={() => setDragging("left")}
          />
          <button
            className="knob right absolute w-4 h-4 bg-white border border-primary rounded-full cursor-pointer"
            style={{
              left: `${((maxValue - minFilterPrice) / (maxFilterPrice - minFilterPrice)) * 100}%`,
              transform: "translate(-50%, -50%)",
              top: "50%",
            }}
            onMouseDown={() => setDragging("right")}
            onTouchStart={() => setDragging("right")}
          />
        </div>
      </div>

      <div className="flex gap-2 mt-4 justify-between ">
        <div className="flex items-center justify-between gap-2">
          <label htmlFor="min" className="text-sm text-primary-content">de</label>
          <input
            type="number"
            id="min"
            value={minValue}
            min={minFilterPrice}
            max={maxValue - 1}
            placeholder={`R$ ${initialMin}`}
            onInput={(e) =>
              setMinValue(Math.min(Math.max(Number(e.currentTarget.value), minFilterPrice), maxValue - 1))
            }
            className="border border-base-200 p-2 rounded w-[86px] bg-base-100 rounded-badge text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="max" className="text-sm text-primary-content">até</label>
          <input
            type="number"
            id="max"
            value={maxValue}
            min={minValue + 1}
            max={maxFilterPrice}
            placeholder={`R$ ${initialMax}`}
            onInput={(e) =>
              setMaxValue(Math.max(Math.min(Number(e.currentTarget.value), maxFilterPrice), minValue + 1))
            }
            className="border border-base-200 p-2 rounded w-[86px] bg-base-100 rounded-badge text-xs"
          />
        </div>
        <button
          onClick={handleApply}
          className="bg-primary text-xs font-bold text-base-100 p-2.5 rounded-badge"
        >
          Filtrar
        </button>
      </div>
    </div>
  );
}

export default FilterPrice;
