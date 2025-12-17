"use client"
import Link from "next/link";
import { ShoppingBag,  Leaf, Award } from "lucide-react";
import Image from "next/image";

const BundleSet = () => {
  const bundles = [
    {
      id: 1,
      title: "Tasty",
      highlight: "Honey",
      subtitle: "From Farm Sellers",
      description: "100% natural honey and bee products expertly crafted to nourish your skin and boost your health.",
      image: "https://i.ibb.co.com/8Ljxv2mh/Preview-today-big-free-glass-jar-with-wildflower-honey-mockup.jpg",
      gradient: "from-amber-500/40 to-yellow-500/60",
      textColor: "text-amber-700",
      size: "large"
    },
    {
      id: 2,
      title: "",
      highlight: "Kiwi",
      subtitle: "Jam",
      description: "For health conscious families. Spoon it on a crisp toast, roll in parathas, or just scoop it over vanilla ice.",
      image: "https://i.ibb.co.com/ZPgqpFd/jar-jam-kiwi-wooden-table-natural-background-392895-383674.jpg",
      gradient: "from-green-500/400 to-emerald-500/50",
      textColor: "text-green-700",
      size: "large"
    },
    {
      id: 3,
      title: "Spices",
      highlight: "Set",
      subtitle: "",
      description: "Give a unique flavor to your food with our premium spice collection!",
      image: "https://i.ibb.co.com/JwNfm4Nf/0d0f05a9-4756-46a8-9007-15a852397b4d.webp",
      gradient: "from-red-500/30 to-orange-500/40",
      textColor: "text-red-700",
      size: "medium"
    },
    {
      id: 4,
      title: "Italian",
      highlight: "Pasta",
      subtitle: "from Florence",
      description: "Non-GMO. Absolutely Natural! Authentic Italian taste in every bite.",
      image: "https://i.ibb.co.com/N6znZk1N/Voiello-dried-pasta-on-the-supermarket-shelf.jpg",
      gradient: "from-yellow-500/40 to-amber-500/50",
      textColor: "text-yellow-800",
      size: "medium"
    }
  ];

  return (
    <div className="py-16 ">
      <div className="max-w-7xl mx-auto">
       
        <div className="text-center mb-12">
          {/* <div className="inline-flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6 text-green-600" />
            <div className="h-1 w-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
            <ShoppingBag className="w-6 h-6 text-green-600" />
            <div className="h-1 w-12 bg-gradient-to-l from-green-400 to-green-600 rounded-full"></div>
            <Sparkles className="w-6 h-6 text-green-600" />
          </div> */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            Combo <span className="text-green-600">Set</span>
          </h2>
          <p className="text-base text-gray-600">
            Handpicked bundles for your healthy lifestyle
          </p>
        </div>

        {/* Large Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {bundles.slice(0, 2).map((bundle, index) => (
            <div
              key={bundle.id}
              className="group relative overflow-hidden rounded-sm shadow-2xl bg-white hover:shadow-3xl transition-all duration-500 -translate-y-2"
            >
              {/* Image */}
              <div className="relative h-[400px] md:h-[450px] overflow-hidden ">
                <Image
                  src={bundle.image}
                  alt={bundle.title}
                   width={800} height={800}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 hover:-translate-y-2"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${bundle.gradient} to-transparent opacity-60  hover:-translate-y-2 `}></div>
                
                {/* Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg ">
                  <div className="flex items-center space-x-2">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-bold text-green-600">100% Natural</span>
                  </div>
                </div>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6 md:p-8">
                <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                    {bundle.title}{" "}
                    <span className="text-green-400">{bundle.highlight}</span>
                    {bundle.subtitle && (
                      <>
                        <br />
                        {bundle.subtitle}
                      </>
                    )}
                  </h1>
                  <p className="text-white/90 text-sm md:text-base mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                    {bundle.description}
                  </p>
                  <Link href="/all-products">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/50 flex items-center space-x-2">
                      <ShoppingBag className="w-5 h-5" />
                      <span>Shop Now</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Small Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {bundles.slice(2, 4).map((bundle) => (
            <div
              key={bundle.id}
              className="group relative overflow-hidden rounded-sm shadow-xl bg-white hover:shadow-2xl transition-all duration-500 -translate-y-2"
            >
              {/* Image */}
              <div className="relative h-[350px] overflow-hidden">
                <Image
                width={800} height={800}
                  src={bundle.image}
                  alt={bundle.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${bundle.gradient} to-transparent opacity-60`}></div>
                
                {/* Quality Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-4">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                    {bundle.title}{" "}
                    <span className="text-green-400">{bundle.highlight}</span>
                    {bundle.subtitle && (
                      <>
                        {" "}{bundle.subtitle}
                      </>
                    )}
                  </h1>
                  <p className="text-white/90 text-sm mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                    {bundle.description}
                  </p>
                  <Link href="/all-products">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/50 flex items-center space-x-2 text-sm">
                      <ShoppingBag className="w-4 h-4" />
                      <span>Shop Now</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

       
      </div>

   
    </div>
  );
};

export default BundleSet;