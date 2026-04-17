/* eslint-disable react/no-unescaped-entities */
"use client"

import Link from 'next/link';
import React, { useState, useEffect } from 'react';


interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown = ({ targetDate }: { targetDate: string }) => {
  const calculateTimeLeft = (): TimeLeft | null => {
    const difference = +new Date(targetDate) - +new Date();

    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(
    calculateTimeLeft()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white bg-red-500 px-6 py-3 rounded-lg shadow-lg animate-pulse">
        Time's up! ⏰
      </span>
    );
  }

  return (
    <div className="flex justify-center flex-wrap gap-3 sm:gap-4 py-6 sm:py-8 px-4">
      {Object.entries(timeLeft).map(([label, value]) => (
        <span
          key={label}
          className="bg-gradient-to-br from-[#18b500] to-[#48ad39] text-white shadow-xl h-16 sm:h-20 lg:h-24 px-6 sm:px-8 rounded-xl text-base sm:text-xl lg:text-2xl font-bold flex flex-col justify-center items-center min-w-[80px] sm:min-w-[100px] lg:min-w-[120px] transform hover:scale-105 transition-transform duration-300"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">
            {String(value).padStart(2, "0")}
          </h1>
          <h1 className="text-xs sm:text-sm lg:text-base uppercase tracking-wider">
            {label}
          </h1>
        </span>
      ))}
    </div>
  );
};




// BestDeal
const BestDeal = () => {
  const targetDate = "2026-04-30T00:00:00";
  const [isTimeRemaining, setIsTimeRemaining] = useState(true);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const difference = +new Date(targetDate) - +new Date();
      setIsTimeRemaining(difference > 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="py-8 sm:py-12 md:py-16 max-w-7xl mx-auto">
      <div className="mb-8 sm:mb-10 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
          Best Deal
        </h2>
        <div className="h-1 w-40 sm:w-52 bg-gradient-to-r from-[#18b500] to-[#48ad39] rounded-full mt-2 mx-auto" />
      </div>

      <div
        className="relative rounded-md overflow-hidden shadow-2xl border-4 border-[#18b500]/10 hover:border-[#18b500]/40 transition-all duration-300"
        style={{
          backgroundImage: `url("/banner.jsx.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "50vh",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

        <div className="relative z-10 flex flex-col justify-center items-center min-h-[50vh] px-4 py-8">
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold text-center text-white drop-shadow-2xl mb-6">
            Grab the Best Offer of
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#80b500] via-[#18b500] to-[#48ad39] animate-pulse">
              This Month!
            </span>
          </h1>

          <Countdown targetDate={targetDate} />

          {isTimeRemaining && (
            <Link href="/flashSale">
              <button
                onClick={scrollToTop}
                className="group mt-6 px-8 py-4 bg-gradient-to-r from-[#18b500] to-[#48ad39] hover:from-[#48ad39] hover:to-[#80b500] text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Shop Now 🛍️
              </button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};


export default BestDeal;