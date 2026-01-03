/* eslint-disable react-hooks/set-state-in-effect */

import { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: number;
  bgColor: string;
  iconColor: string;
  borColor: string;
}

const StatCard = ({ icon: Icon, title, value, bgColor, iconColor, borColor }: StatCardProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    let start = 0;
    const end = value;
    const duration = 1500; 
    const increment = end / (duration / 16); 

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div
      className={`
        relative overflow-hidden
        bg-gradient-to-br from-white to-gray-50
        rounded-2xl p-6 shadow-lg
        cursor-pointer transform transition-all duration-500 ease-out
        hover:scale-105 hover:shadow-2xl
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        group
      `}
    >
  
      <div className={`
        absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
        transition-opacity duration-500 -z-10
        ${borColor} border-2
      `} />

    
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex-1">
          <p className="text-gray-500 text-sm font-medium mb-1 uppercase tracking-wide whitespace-nowrap">
            {title}
          </p>
          <p className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {count.toLocaleString()}
          </p>
        
      
        </div>

        {/* Icon container with rotation and scale */}
        <div className={`
          ${bgColor} p-4 rounded-2xl
          transform transition-all duration-500
          group-hover:rotate-12 group-hover:scale-110
          shadow-md group-hover:shadow-xl
          relative
        `}>
          {/* Pulse ring effect */}
          <div className={`
            absolute inset-0 rounded-2xl ${bgColor}
            animate-ping opacity-20
          `} />
          
          <Icon className={`
            ${iconColor} w-8 h-8 
            transform transition-transform duration-500
            group-hover:scale-110
            relative z-10
          `} />
        </div>
      </div>

      {/* Shine effect sweeping across card */}
      <div className="
        absolute inset-0 
        bg-gradient-to-br from-green-400 via-sky-600 to-purple-500
        opacity-0 group-hover:opacity-20
        transform -translate-x-full group-hover:translate-x-full
        transition-all duration-1000 ease-in-out
        pointer-events-none
      " />
    </div>
  );
};

export default StatCard;