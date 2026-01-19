import HomePageProductCardSkeleton from "./HomePageProductCardSkeleton";


const ShopViewSkeleton = () => {
    return (
         <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Shop Header Section */}
      <div 
        className="relative bg-cover bg-center py-8 md:py-12 lg:py-16"
        style={{
          backgroundImage: 'url("https://i.ibb.co.com/G7HdNwJ/bNr.jpg")',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Content Container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Shop Info Card */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-pulse">
            
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start">
                  {/* Shop Logo */}
                  <div className="flex-shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gray-200 shadow-lg"></div>
                  </div>

                  {/* Shop Info */}
                  <div className="flex-1 text-center md:text-left min-w-0">
                <div className="h-8 sm:h-9 md:h-11 bg-gray-200 rounded w-3/4 mx-auto md:mx-0 mb-3"/>
          {/* description */}
                <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded w-full"/>
                <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto md:mx-0"/>
                </div>
                    
                   

                    {/* Shop Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">

                       {/* Followers Skeleton */}
                      <div className="bg-gray-100 rounded-lg p-2 sm:p-3">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded-full" />
                          <div className="space-y-1 flex-1">
                            <div className="h-3 bg-gray-200 rounded w-16" />
                            <div className="h-5 bg-gray-200 rounded w-10" />
                          </div>
                        </div>
                      </div>





                       {/* Products Skeleton */}
                      <div className="bg-gray-100 rounded-lg p-2 sm:p-3">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded-full" />
                          <div className="space-y-1 flex-1">
                            <div className="h-3 bg-gray-200 rounded w-16" />
                            <div className="h-5 bg-gray-200 rounded w-10" />
                          </div>
                        </div>
                      </div>


                      
                     {/* Owner Skeleton */}
                      <div className="bg-gray-100 rounded-lg p-2 sm:p-3 col-span-2 sm:col-span-1">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded-full" />
                          <div className="space-y-1 flex-1">
                            <div className="h-3 bg-gray-200 rounded w-12" />
                            <div className="h-4 bg-gray-200 rounded w-20" />
                          </div>
                        </div>
                      </div>
                    </div>

                <div className="flex justify-center md:justify-start">
                      <div className="h-10 sm:h-12 bg-gray-200 rounded-full w-36 sm:w-40" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Products Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-pulse">

        <div className="mb-6 md:mb-8">
          <div className="h-8 sm:h-9 bg-gray-200 rounded w-48 mb-2" />
          <div className="h-5 bg-gray-200 rounded w-64" />
        </div>

        {/* Products Grid */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
             {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
           <HomePageProductCardSkeleton key={i}/>
          ))}
           
            </div>

           {/* Pagination Skeleton */}
        <div className="flex justify-center gap-2 mt-8 md:mt-12">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-lg" />
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-lg" />
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-lg" />
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-lg" />
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
    );
};

export default ShopViewSkeleton;