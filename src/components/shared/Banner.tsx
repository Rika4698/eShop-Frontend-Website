import { MoveRight, ShoppingBag, Tag, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="overflow-hidden -mt-4">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5">
        {/* Main Large Banner - Fashion */}
        <div className="col-span-4 group">
          <div className="relative w-full xl:h-[450px] lg:h-[355px] md:h-[290px] h-[320px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=80"
              alt="Fashion Sale"
              fill
              className="object-cover transition-transform duration-700 ease-in-out transform group-hover:scale-110"
              priority
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center pl-[30px] md:pl-[60px] text-white">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5" />
                <span className="uppercase text-sm md:text-base font-semibold tracking-wider">
                  New Season Collection
                </span>
              </div>
              
              <h1 className="text-[28px] md:text-[40px] xl:text-[55px] font-bold leading-tight md:w-[520px] mb-4">
                Fashion That <br />
                <span className="text-[#ff69b4]">Speaks Style</span>
              </h1>
              
              <p className="text-base md:text-lg mb-2 text-gray-200">
                Up to <span className="text-[#ff69b4] font-bold text-2xl md:text-3xl">50% OFF</span>
              </p>
              
              <p className="text-sm md:text-base text-gray-300 mb-6">
                Trendy outfits for every occasion
              </p>
              
              <Link href="/all-products">
                <button className="bg-gradient-to-r from-[#ff69b4] to-[#ff1493] hover:from-[#ff1493] hover:to-[#ff69b4] transition-all duration-300 rounded-full text-sm md:text-base font-semibold text-white px-6 md:px-8 py-3 md:py-4 flex items-center gap-2 w-fit shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <ShoppingBag className="w-5 h-5" />
                  Shop Fashion
                  <MoveRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Side Banner - Pet Care */}
        <div className="col-span-2 group">
          <div className="relative w-full xl:h-[450px] lg:h-[355px] md:h-[290px] h-[280px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=800&q=80"
              alt="Pet Care Products"
              fill
              className="object-cover transition-transform duration-700 ease-in-out transform group-hover:scale-110"
              priority
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold mb-2 inline-block">
                PET ESSENTIALS
              </span>
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                Love Your Pets
              </h3>
              <p className="text-sm text-gray-200 mb-3">
                Premium pet care products
              </p>
              <Link href="/all-products">
                <button className="text-sm font-semibold text-white hover:text-orange-300 transition-colors flex items-center gap-2">
                  Shop Now <MoveRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Two Banners */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:gap-5 mt-4 md:mt-5">
        {/* Bottom Left - Grocery */}
        <div className="group">
          <div className="relative w-full lg:h-[260px] md:h-[220px] h-[240px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80"
              alt="Fresh Grocery"
              fill
              className="object-cover transition-transform duration-700 ease-in-out transform group-hover:scale-110"
            />
            
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-900/50 to-transparent"></div>
            
            <div className="absolute inset-0 flex items-center justify-start pl-8 md:pl-12">
              <div>
                <span className="text-xs md:text-sm text-green-300 font-semibold uppercase tracking-wide">
                  Farm Fresh
                </span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white my-2">
                  Grocery Deals
                </h3>
                <p className="text-sm md:text-base text-green-100 mb-4">
                  Save up to <span className="text-yellow-300 font-bold text-lg">40% OFF</span>
                </p>
                <Link href="/all-products">
                  <button className="bg-green-500 hover:bg-green-600 transition-colors text-white rounded-lg px-5 md:px-6 py-2 text-sm md:text-base font-semibold shadow-md hover:shadow-lg">
                    Shop Grocery
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Right - Books */}
        <div className="group">
          <div className="relative w-full lg:h-[260px] md:h-[220px] h-[240px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200&q=80"
              alt="Books Collection"
              fill
              className="object-cover transition-transform duration-700 ease-in-out transform group-hover:scale-110"
            />
            
            <div className="absolute inset-0 bg-gradient-to-l from-indigo-900/80 via-indigo-900/50 to-transparent"></div>
            
            <div className="absolute inset-0 flex items-center justify-end pr-8 md:pr-12">
              <div className="text-right">
                <span className="text-xs md:text-sm text-indigo-300 font-semibold uppercase tracking-wide">
                  Knowledge Hub
                </span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white my-2">
                  Books & More
                </h3>
                <p className="text-sm md:text-base text-indigo-100 mb-4">
                  Explore thousands of titles
                </p>
                <Link href="/all-products">
                  <button className="bg-indigo-500 hover:bg-indigo-600 transition-colors text-white rounded-lg px-5 md:px-6 py-2 text-sm md:text-base font-semibold shadow-md hover:shadow-lg">
                    Browse Books
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;