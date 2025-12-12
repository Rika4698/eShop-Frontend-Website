"use client";

import React from "react";

interface RangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export default function RangeSlider({ min, max, value, onChange }: RangeSliderProps) {
  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), value[1] - 50);
    onChange([newMin, value[1]]);
  };

  const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), value[0] + 50);
    onChange([value[0], newMax]);
  };

  const minPercent = (value[0] / max) * 100;
  const maxPercent = (value[1] / max) * 100;

  return (
    <div className="w-full">
      <div className="relative h-2 bg-gray-200 rounded-lg my-6">
        {/* Green selected range */}
        <div
          className="absolute h-2 bg-[#4da11d] rounded-lg transition-all duration-300"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        {/* Min Slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={handleMin}
          className="absolute w-full appearance-none pointer-events-auto bg-transparent z-30 slider-thumb"
        />

        {/* Max Slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={handleMax}
          className="absolute w-full appearance-none pointer-events-auto bg-transparent z-20 slider-thumb"
        />
      </div>

      {/* Price values below */}
      <div className="flex justify-between text-sm font-semibold text-gray-700">
        <span>{value[0]} TK</span>
        <span>{value[1]} TK</span>
      </div>

     
    
    </div>
  );
}
