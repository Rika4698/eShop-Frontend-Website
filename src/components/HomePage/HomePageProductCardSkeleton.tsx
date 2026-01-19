"use client"



const HomePageProductCardSkeleton = () => {
    return (
        <div className="w-full h-full">
            <div className="h-full bg-white shadow-lg rounded-md border p-3 flex flex-col animate-pulse">
             <div className="w-full aspect-square bg-gray-200 rounded-md mb-3"></div>
                {/* category */}
             <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>

            {/* Title */}
             <div className="h-4 w-full bg-gray-200 rounded mb-1"/>
             <div className="h-4 w-5/6 bg-gray-200 rounded mb-2"/>


             {/* description */}

             <div className="space-y-1 mb-2">
                <div className="h-3 w-full bg-gray-200 rounded"/>
                <div className="h-3 w-4/5 bg-gray-200 rounded"/>
             </div>

             {/* price */}

             <div className="h-4 w-20 bg-gray-200 rounded mb-2"/>

             {/* shop name */}
             <div className="h-4 w-24 bg-gray-200 rounded"/>



            </div>
            
        </div>
    );
};

export default HomePageProductCardSkeleton;