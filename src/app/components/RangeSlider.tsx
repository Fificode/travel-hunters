"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const RangeSlider = ({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}: {
  minPrice: number;
  maxPrice: number;
  setMinPrice: (val: number) => void;
  setMaxPrice: (val: number) => void;
}) => {
    const router = useRouter();
  const rangeRef = useRef<HTMLDivElement>(null);

  const minLimit = 5000;
  const maxLimit = 500000;
  const step = 5000;

  useEffect(() => {
    if (rangeRef.current) {
      const left = ((minPrice - minLimit) / (maxLimit - minLimit)) * 100;
      const right = ((maxPrice - minLimit) / (maxLimit - minLimit)) * 100;
      rangeRef.current.style.left = `${left}%`;
      rangeRef.current.style.width = `${right - left}%`;
    }
  }, [minPrice, maxPrice]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - step);
    setMinPrice(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + step);
    setMaxPrice(value);
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rangeRef.current) return;

    const trackRect = rangeRef.current.parentElement!.getBoundingClientRect();
    const clickX = e.clientX - trackRect.left;
    const clickPercent = clickX / trackRect.width;
    const clickValue = Math.round(
      minLimit + clickPercent * (maxLimit - minLimit)
    );

    if (Math.abs(clickValue - minPrice) < Math.abs(clickValue - maxPrice)) {
      setMinPrice(Math.min(clickValue, maxPrice - step));
    } else {
      setMaxPrice(Math.max(clickValue, minPrice + step));
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4 text-left">
        Filter according to your budget
      </h2>

      <div className="flex justify-normal gap-2 lg:justify-between flex-wrap text-sm font-medium mb-2">
        <span>From ₦{minPrice?.toLocaleString()}</span>
        <span>To ₦{maxPrice?.toLocaleString()}</span>
      </div>

      <div className="relative w-full h-6 mt-4">
        {/* Selected Range Track */}
        <div
          ref={rangeRef}
          onClick={handleTrackClick}
          className="absolute top-1/2 h-[5px] bg-red-500 rounded -translate-y-1/2 z-10 cursor-pointer"
        ></div>

        {/* Range Inputs */}
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          step={step}
          value={minPrice}
          onChange={handleMinChange}
          className="absolute top-2 w-full h-2 appearance-none bg-transparent z-30 pointer-events-auto"
        />
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          step={step}
          value={maxPrice}
          onChange={handleMaxChange}
          className="absolute w-full top-2 h-2 appearance-none bg-transparent z-20 pointer-events-auto"
        />
      </div>
      <button
        onClick={() => {
          const query = new URLSearchParams(window.location.search);
          query.set("minPrice", minPrice?.toString());
          query.set("maxPrice", maxPrice?.toString());
          router.push(`/hotelList?${query?.toString()}`);
        }}
        className="w-full bg-emerald-700 text-white text-sm p-2 rounded-md my-2 cursor-pointer"
      >
        Find affordable hotels
      </button>
    </div>
  );
};

export default RangeSlider;
