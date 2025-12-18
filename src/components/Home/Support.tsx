import { MessageSquarePlus, Sparkles, Mail, Gift, Clock } from "lucide-react";
import Image from "next/image";



const Support = () => {



  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto">

        {/* Main Card */}
        <div className="relative overflow-hidden rounded-lg shadow-2xl group">
         
          <div className="relative h-[400px] sm:h-[350px] md:h-[300px] lg:h-[350px]">
            <Image
              src="https://i.ibb.co.com/xSVPNkmW/tastydaily-customersuppot.jpg"
              alt="Customer Support"
              width={600} height={600}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/85 to-transparent"></div>
            
            {/* Animated  Elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 right-10 w-32 h-32 border-4 border-white rounded-full animate-ping"></div>
              <div className="absolute bottom-10 left-10 w-24 h-24 border-4 border-white rounded-full animate-float"></div>
            </div>
          </div>

  
          <div className="absolute inset-0 flex items-center">
            <div className="w-full px-6 sm:px-8 md:px-12 lg:px-16">
              <div className="max-w-xl">

                {/* Badge */}
                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-4 border border-white/30">
                  <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                  <span className="text-white text-xs sm:text-sm font-semibold">Exclusive Offer</span>
                </div>

                {/*  Heading */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
                  Stay Informed About Our{" "}
                  <span className="text-green-300">Exclusive Deals</span>
                </h1>

              
                <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-3">
                    <Gift className="w-5 h-5 text-green-300 flex-shrink-0 mt-1" />
                    <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                      Sign up for our newsletter and enjoy{" "}
                      <span className="font-bold text-green-300">10% off</span> your first order
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-green-300 flex-shrink-0 mt-1" />
                    <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                      Get early access to new arrivals and exclusive subscriber-only offers
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
                  <button className="group/btn bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                    <Clock className="w-5 h-5 group-hover/btn:animate-pulse" />
                    <span>24/7 Hours Support</span>
                  </button>

                  <div className="flex items-center space-x-2 text-white/80 text-sm">
                    <MessageSquarePlus className="w-5 h-5 text-green-300" />
                    <span>Always here to help you</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-gradient-to-r from-green-400 to-green-800 rounded-lg p-6 border border-green-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Gift className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-white">10% Off</h3>
            </div>
            <p className="text-sm text-gray-200">First order discount for new subscribers</p>
          </div>

          <div className="bg-gradient-to-r from-blue-400 to-blue-700 rounded-lg p-6 border border-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-white">Early Access</h3>
            </div>
            <p className="text-sm text-gray-200">Be the first to know about new arrivals</p>
          </div>

          <div className="bg-gradient-to-r from-purple-400 to-purple-700 border border-purple-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-white">24/7 Support</h3>
            </div>
            <p className="text-sm text-gray-200">Round-the-clock customer assistance</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;