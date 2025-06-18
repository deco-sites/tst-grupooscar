import { useEffect, useState } from "preact/hooks";
import { RichText } from "apps/admin/widgets.ts";

export interface Props {
  title: string;
  description: RichText;
  /**@format datetime */
  startDate: string;
  /**@format datetime */
  endDate: string;
}

const Timer = ({ endDate, title, description }: Props) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const end = new Date(endDate).getTime();
    const difference = end - now;

    if (difference <= 0) {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const totalSeconds = Math.floor(difference / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      hours,
      minutes,
      seconds,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div class="flex flex-col lg:flex-row -mt-[60px] items-center justify-center gap-6 bg-primary rounded-2xl p-4 w-11/12 mx-auto lg:mt-0 lg:ml-1.5 2xl:ml-4 lg:mb-2.5 lg:py-1.5 lg:px-6 lg:justify-between lg:rounded-lg">
      <h2 class="text-xl text-base-100 font-bold">{title}</h2>
      <div class={`w-full lg:w-max px-4 py-2.5 gap-4 flex flex-col lg:flex-row items-center bg-secondary rounded-lg lg:rounded-md`}>
        <div
          class="text-sm lg:text-base font-semibold text-base-100"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div class="flex gap-4 lg:gap-4 items-center justify-center">
          <div class={`flex flex-col gap-1 items-center`}>
          <div class="w-[42px] h-[43px] bg-base-100 border border-base-200 rounded-lg flex items-center justify-center">
            <span class="leading-none text-base text-accent-content font-bold">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
          </div>
          <span class="text-xs font-semibold text-base-100">Horas</span>
          </div>
          <span class="text-base text-base-100 font-bold">:</span>
          <div class={`flex flex-col gap-1 items-center`}>
          <div class="w-[42px] h-[43px] bg-base-100 border border-base-200 rounded-lg flex items-center justify-center">
            <span class="leading-none text-base text-accent-content font-bold">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
          </div>
          <span class="text-xs font-semibold text-base-100">Minutos</span>
          </div>
          <span class="text-base text-base-100 font-bold">:</span>
          <div class={`flex flex-col gap-1 items-center`}>
          <div class="w-[42px] h-[43px] bg-base-100 border border-base-200 rounded-lg flex items-center justify-center">
            <span class="leading-none text-base text-accent-content font-bold">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </div>
          <span class="text-xs font-semibold text-base-100">Segundos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
