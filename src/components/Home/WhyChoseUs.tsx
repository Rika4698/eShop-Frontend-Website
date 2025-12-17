"use client"
import Image from "next/image";
import { Truck, RefreshCcw, Headphones, ShieldCheck, Users, Award, Package, TrendingUp } from "lucide-react";

const WhyChooseUs = () => {
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
    <section  className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 via-green-50 to-gray-50 overflow-hidden relative rounded-md">
      {/* Decorative Background Elements */}

      <div className="absolute top-0 left-0 w-40 h-40 sm:w-72 sm:h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob border border-black"></div>
      <div className="absolute top-0 right-0 w-40 h-40 sm:w-72 sm:h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 border border-black"></div>
      <div className="absolute bottom-0 left-1/2 w-40 h-40 sm:w-72 sm:h-72 bg-lime-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 border border-black"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">


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



        {/* Statistics Section */}
        <div className="relative rounded-md sm:rounded-lg overflow-hidden shadow-2xl">
          
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
      </div>

      
    </section>
  );
};

export default WhyChooseUs;