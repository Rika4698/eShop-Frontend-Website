/* eslint-disable react/no-unescaped-entities */
"use client"

import Link from 'next/link';
import React, { useState, useEffect } from 'react';

interface TimeLeft {
  [key: string]: number;
}

export const Countdown = ({ targetDate }: { targetDate: string }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };
  console.log(targetDate.length);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const timerComponents: React.ReactElement[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span
        key={interval}
        className="bg-gradient-to-br from-[#18b500] to-[#48ad39] text-white shadow-xl h-16 sm:h-20 lg:h-24 px-6 sm:px-8 lg:px-10 rounded-xl text-base sm:text-xl lg:text-2xl font-bold flex flex-col justify-center items-center min-w-[80px] sm:min-w-[100px] lg:min-w-[120px] transform hover:scale-105 transition-transform duration-300"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">{timeLeft[interval]}</h1>
        <h1 className="text-xs sm:text-sm lg:text-base uppercase tracking-wider">{interval}</h1>
      </span>
    );

  });

  return (
    <div className="flex justify-center flex-wrap gap-3 sm:gap-4 py-6 sm:py-8 lg:py-10 px-4">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white bg-red-500 px-6 py-3 rounded-lg shadow-lg animate-pulse">
          Time's up! ⏰
        </span>
      )}
    </div>
  );
};


const BestDeal = () => {
  const targetDate = '2026-01-31T00:00:00';


    const [isTimeRemaining, setIsTimeRemaining] = useState(true);

  useEffect(() => {
    const checkTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      setIsTimeRemaining(difference > 0);
    };

    checkTime();
    const interval = setInterval(checkTime, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);



  return (
    <section className="py-8 sm:py-12 md:py-16  max-w-7xl mx-auto">
     
      <div className="mb-8 sm:mb-10">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center md:text-left">
              Best Deal
            </h2>
            <div className="h-1 w-20 sm:w-24 bg-gradient-to-r from-[#18b500] to-[#48ad39] rounded-full mt-2 mx-auto md:mx-0"></div>
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#18b500]/10 hover:border-[#18b500]/40 transition-all duration-300"
        style={{
          backgroundImage: `url("/banner.jsx.png")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '50vh',
        }}
      >

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>

     
        <div className="relative z-10 flex flex-col justify-center items-center h-full min-h-[50vh] px-4 py-8 sm:py-12">
      
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-center text-white drop-shadow-2xl mb-4 sm:mb-6 leading-tight">
            Grab the Best Offer of
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#80b500] via-[#18b500] to-[#48ad39] animate-pulse">
              This Month!
            </span>
          </h1>

          {/* Countdown Timer */}
          <Countdown targetDate={targetDate} />


           {isTimeRemaining && (
            <Link href={'/flashSale'}>
              <button className="group mt-4 sm:mt-6 px-6 sm:px-8 lg:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#18b500] to-[#48ad39] hover:from-[#48ad39] hover:to-[#80b500] text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center gap-2">
                <span className="text-base sm:text-lg lg:text-xl">Shop Now 🛍️</span>
                
              
              </button>
           </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default BestDeal;