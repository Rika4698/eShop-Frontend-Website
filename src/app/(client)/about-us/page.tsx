/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';

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

    const stats = [
        { number: "50K+", label: "Happy Customers" },
        { number: "10K+", label: "Products" },
        { number: "99%", label: "Satisfaction Rate" },
        { number: "24/7", label: "Support" }
    ];

    const features = [
        { icon: "🚚", title: "Free Shipping", desc: "On orders over ৳500" },
        { icon: "🔒", title: "Secure Payment", desc: "100% secure transactions" },
        { icon: "↩️", title: "Easy Returns", desc: "30-day return policy" },
        { icon: "⭐", title: "Quality Products", desc: "Verified & authentic" }
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
            <div className={`max-w-7xl mx-auto px-4 md:px-10 lg:px-20 py-16 transition-all duration-1000 delay-300 transform ${statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-center overflow-hidden"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-green-400/0 group-hover:from-green-400/10 group-hover:to-emerald-400/10 transition-all duration-300"></div>
                            <div className="relative">
                                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 py-16">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                    Why Choose <span className="text-green-800">E<span className='text-green-500'>Shop?</span></span>
                </h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    We're committed to providing an unmatched shopping experience with premium services
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-center"
                        >
                            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mission Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 py-16">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
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