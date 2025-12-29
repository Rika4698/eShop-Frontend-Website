/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Truck, RefreshCcw, Headphones, ShieldCheck, Users, Award, Package, TrendingUp } from "lucide-react";


export default function AboutUs() {
    const [isVisible, setIsVisible] = useState(false);
    const [statsVisible, setStatsVisible] = useState(false);

   useEffect(() => {
    const timer1 = setTimeout(() => setIsVisible(true), 50);
    const timer2 = setTimeout(() => setStatsVisible(true), 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

 

const features = [
    {
      icon: <Truck className="w-12 h-12" />,
      title: "Fast Delivery",
      description: "We ensure speedy delivery of all your orders to your doorstep.",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: <RefreshCcw className="w-12 h-12" />,
      title: "30 Days Return",
      description: "Simply return it within 30 days for an exchange.",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Headphones className="w-12 h-12" />,
      title: "24/7 Support",
      description: "Our support team is available around the clock to assist you.",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: <ShieldCheck className="w-12 h-12" />,
      title: "Secure Payment",
      description: "All transactions are encrypted for a safe shopping experience.",
      color: "from-orange-400 to-red-500"
    }
  ];

      const stats = [
        { icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />, value: "1,200+", label: "Happy Customers" },
        { icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />, value: "100%", label: "Customer Satisfaction" },
        { icon: <Package className="w-6 h-6 sm:w-8 sm:h-8" />, value: "1K+", label: "Organic Products" },
        { icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />, value: "78+", label: "Awards Winning" }
      ];

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
            
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10"></div>
                
                <div className={`relative max-w-7xl mx-auto px-4 md:px-10 lg:px-20 py-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <h2 className="text-3xl md:text-5xl font-bold text-center text-green-700 underline mb-9">
  About <span className="text-green-500 ">Us</span>
</h2>

                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Content Section */}
                        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-start">
                            <div className="inline-block ">
                                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold animate-pulse ">
                                    🎉 Bangladesh's Trusted EShop
                                </span>
                            </div>
                            
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                Our Journey to
                                <span className="block bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mt-2">
                                    Smart Shopping
                                </span>
                            </h1>
                            
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Welcome to <span className="font-semibold text-green-800">E<span className='text-green-500'>Shop</span></span> - where quality meets affordability. 
                                We're revolutionizing online shopping in Bangladesh by bringing you authentic products, 
                                lightning-fast delivery, and exceptional customer care.
                            </p>

                            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
                                <a
                                    href="/all-product"
                                    className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                                >
                                    <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                                    <span className="relative font-semibold">Start Shopping</span>
                                    <span className="relative text-xl">→</span>
                                </a>
                                
                                <a
                                    href="/contact"
                                    className="inline-flex items-center gap-2 border-2 border-green-500 text-green-600 px-8 py-4 rounded-xl hover:bg-green-50 transform hover:-translate-y-1 transition-all duration-300 font-semibold"
                                >
                                    Contact Us
                                    <span>💬</span>
                                </a>
                            </div>
                        </div>

                        {/* Image Section with Floating Animation */}
                        <div className="w-full lg:w-1/2 relative">
                            <div className="relative animate-float">
                                <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
                                <Image src="/about.jpg"alt="Verified Seller"
                                width={700}
                                 height={600}
                                    className="relative w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                                />
                                
                                {/* Floating badges */}
                                <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-xl animate-bounce">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">4.9</div>
                                        <div className="text-xs text-gray-600">⭐⭐⭐⭐⭐</div>
                                    </div>
                                </div>
                                
                                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-4 shadow-xl animate-pulse">
                                    <div className="text-sm font-semibold">✓ Verified Seller</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="relative rounded-md sm:rounded-lg overflow-hidden shadow-2xl my-8 ">
                     
                     <div className="relative h-[600px] sm:h-[650px] md:h-[700px] lg:h-[450px]">
                       <Image
                         className="w-full h-[600px] sm:h-[450px] object-cover"
                         src="https://demo.xpeedstudio.com/marketov2/home5/wp-content/uploads/sites/5/2018/05/funfact-bg1.png"
                         alt="Statistics Background"
                         width={1920}
                         height={450}
                         
                       />
                       {/* Green Gradient Overlay */}
                       <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 via-emerald-600/85 to-green-700/90"></div>
                       
                       {/* Animated Patterns Hidden mobile*/}
                       <div className="absolute inset-0 opacity-10 hidden sm:block">
                         <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full animate-ping"></div>
                         <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-white rounded-full animate-float"></div>
                       </div>
                     </div>
           
                     {/* Content Overlay */}
                     <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4 sm:px-6 lg:px-8 py-8">
                       <div className="text-center mb-12 sm:mb-20 md:mb-24 ">
                         <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 drop-shadow-lg px-2">
                           Celebrating Excellence Together
                         </h2>
                         <p className="text-sm sm:text-lg md:text-xl text-green-100 max-w-2xl mx-auto px-2">
                           Join thousands of satisfied customers in our growing community
                         </p>
                       </div>
           
                       {/* Stats Grid */}
                       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 w-full max-w-5xl">
                         {stats.map((stat, index) => (
                           <div
                             key={index}
                             className="group text-center transform hover:scale-105 sm:hover:scale-110 transition-all duration-300"
                           >
                             <div className="bg-white/20 backdrop-blur-md rounded-md sm:rounded-lg p-4 sm:p-6 border border-white/30 shadow-xl hover:bg-white/30 transition-all duration-300">
                               {/* Icon */}
                               <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white/25 rounded-full mb-3 sm:mb-4 group-hover:bg-white/40 transition-all duration-300">
                                 <div className="text-white">
                                   {stat.icon}
                                 </div>
                               </div>
                               
                               {/* Value */}
                               <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-1 sm:mb-2 drop-shadow-lg">
                                 {stat.value}
                               </h3>
                               
                               {/* Label */}
                               <p className="text-xs sm:text-sm md:text-base lg:text-sm xl:text-base font-medium text-green-100 leading-tight">
                                 {stat.label}
                               </p>
                             </div>
                           </div>
                         ))}
                       </div>
                     </div>
                   </div>



            {/* Features Section */}
          <div className="max-w-7xl mx-auto mt-20 relative z-10">
  
                  {/* Header */}
                  <header className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4">
                       Why Choose <span className="text-green-800">E<span className='text-green-500'>Shop?</span></span>
                    </h2>
                    <p className="text-base  text-gray-600 max-w-2xl mx-auto px-4">
                      Experience excellence in every aspect of your shopping journey
                    </p>
                  </header>
          
                  {/* Feature Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-20">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="group relative bg-white rounded-lg p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                      >
                        {/* Gradient Background on Hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                        
                        {/* Icon with Gradient */}
                        <div className={`relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-br ${feature.color} p-3 sm:p-4 text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                          {feature.icon}
                        </div>
          
                        {/* Content */}
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 text-center group-hover:text-green-600 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-center text-xs sm:text-sm leading-relaxed">
                          {feature.description}
                        </p>
          
                        {/* Decorative Corner */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    ))}
                  </div>
                </div>



            {/* Mission Section */}
            <div className="max-w-7xl mx-auto px-4  py-16">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
                    <div className="relative z-10 text-white text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
                        <p className="text-lg leading-relaxed mb-8">
                            To empower every Bangladeshi with access to quality products at fair prices, 
                            delivered with care and backed by trust. We believe shopping should be joyful, 
                            secure, and convenient - that's the Eshop promise.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full font-semibold">
                                🌟 Customer First
                            </div>
                            <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full font-semibold">
                                💎 Quality Assured
                            </div>
                            <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full font-semibold">
                                🚀 Fast Delivery
                            </div>
                        </div>
                    </div>
                </div>
            </div>

   
        </div>
    );
}