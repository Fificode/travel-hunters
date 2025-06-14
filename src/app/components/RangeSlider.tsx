"use client";
import { useEffect, useState, useRef } from "react";

const RangeSlider = () => {
  const [minValue, setMinValue] = useState(5000);
  const [maxValue, setMaxValue] = useState(500000);

  const rangeRef = useRef<HTMLDivElement>(null);

  const minLimit = 5000;
  const maxLimit = 500000;
  const step = 5000;

  useEffect(() => {
    if (rangeRef.current) {
      const left = ((minValue - minLimit) / (maxLimit - minLimit)) * 100;
      const right = ((maxValue - minLimit) / (maxLimit - minLimit)) * 100;
      rangeRef.current.style.left = `${left}%`;
      rangeRef.current.style.width = `${right - left}%`;
    }
  }, [minValue, maxValue]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue - step);
    setMinValue(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue + step);
    setMaxValue(value);
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rangeRef.current) return;

    const trackRect = rangeRef.current.parentElement!.getBoundingClientRect();
    const clickX = e.clientX - trackRect.left;
    const clickPercent = clickX / trackRect.width;
    const clickValue = Math.round(
      minLimit + clickPercent * (maxLimit - minLimit)
    );

    if (Math.abs(clickValue - minValue) < Math.abs(clickValue - maxValue)) {
      setMinValue(Math.min(clickValue, maxValue - step));
    } else {
      setMaxValue(Math.max(clickValue, minValue + step));
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4 text-left">
        Filter according to your budget
      </h2>

      <div className="flex justify-between text-sm font-medium mb-2">
        <span>From ₦{minValue.toLocaleString()}</span>
        <span>To ₦{maxValue.toLocaleString()}</span>
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
          value={minValue}
          onChange={handleMinChange}
          className="absolute top-2 w-full h-2 appearance-none bg-transparent z-30 pointer-events-auto"
        />
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full top-2 h-2 appearance-none bg-transparent z-20 pointer-events-auto"
        />
      </div>
      <button className="w-full bg-emerald-700 text-white text-sm p-2 rounded-md my-2">Find affordable hotels</button>
    </div>
  );
};

export default RangeSlider;
