"use client"

import HomePageProductCardSkeleton from "./HomePageProductCardSkeleton";

const ProductDetailsSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto py-6 md:py-10 px-4 lg:px-0 animate-pulse ">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">

                <div className="flex flex-col-reverse md:flex-row gap-4">

                    <div className="flex md:flex-col gap-3">
                        {[1,2,3].map((i) => (
                            <div key={i} className="rounded-lg bg-gray-200 h-20 w-20 md:h-24 md:w-24 flex-shrink-0"/>
                        ))}

                    </div>

                    <div className="flex-1 rounded-lg bg-gray-200 h-[300px] sm:h-[400px] md:h-[500px]"/>

                </div>
            {/* product */}
                <div className="space-y-4 md:-space-y-5">
                    {/* title */}
                    <div className="h-8 md:h-10 lg:h-12 bg-gray-200 rounded w-3/4"/>
 
                 {/* description */}
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full"/>
                        <div className="h-4 bg-gray-200 rounded w-5/6"/>
                        <div className="h-4 bg-gray-200 rounded w-4/6"/>

                    </div>

                    {/* price */}

                    <div className="flex items-center gap-3">
                        <div className="h-8 md:h-10 lg:h-12 bg-gray-200 rounded w-32"/>
                        <div className="h-6 bg-gray-200 rounded-full w-20"/>
                    </div>

                    {/* category */}

                    <div className="pt-4 flex items-center gap-2">
                    <div className="h-10 bg-gray-200 rounded-lg w-28"/>
                    <div className="h-6 bg-gray-200 rounded w-24"/>

                    </div>

                    {/* stack */}
                    <div className="space-y-3">
                     <div className="h-6 bg-gray-200 rounded w-48"/>
                     <div className="h-10 bg-gray-200 rounded-lg w-32"/>

                    </div>

                    {/* quantity */}

                    <div className="space-y-2">
                        <div className="h-6 bg-gray-200 rounded w-36"/>
                        <div className="h-12 bg-gray-200 rounded w-full max-w-xs"/>

                    </div>

                    {/* button */}
                    <div className="h-12 bg-gray-200 rounded-lg w-full"/>
                </div>
            </div>

            {/* shop owner */}

            <section className="mb-12">
                <div className="h-8 md:h-10 bg-gray-200 rounded w-48 mb-6"/>
                <div className="border rounded-lg p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-3 flex-1">
                        <div className="h-7 bg-gray-200 rounded w-64"/>
                        <div className="h-6 bg-gray-200 rounded w-56"/>
                        </div>
                        <div className="h-11 bg-gray-200 rounded w-40"/>
                    </div>
                </div>
            </section>

            {/* review */}

            <section className="mb-12">
                <div className="h-8 md:h-10 bg-gray-200 rounded w-56 mb-6"/>
                <div className="space-y-6">
                    {[1,2,3].map((i) => (
                        <div key={i} className="border-2 rounded-lg p-6">
                            <div className="flex items-start gap-4">
                                {/* avatar */}
                                <div className="rounded-full bg-gray-200 h-[60px] w-[60px] flex-shrink-0"/>

                                <div className="flex-1 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-2">
                                            <div className="h-6 bg-gray-200 rounded w-32"/>
                                            <div className="h-4 bg-gray-200 rounded w-40"/>
                                        </div>
                                     <div className="h-5 bg-gray-200 rounded w-24"/>   
                                    </div>
                                    {/* comment */}

                                    <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-full"/>
                                    <div className="h-4 bg-gray-200 rounded w-3/4"/>                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            

            {/* related product */}

            <section>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="h-8 md:h-10 bg-gray-200 rounded w-56"/>

                <div className="flex gap-3">
                    <div className="h-9 w-9 bg-gray-200 rounded-sm"/>
                    <div className="h-9 w-9 bg-gray-200 rounded-sm"/>
                </div>
                </div>

            {/* card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[1,2,3,4].map ((i) => (
                //         <div key={i} className="border rounded-lg p-3 space-y-3">
                //             <div className="aspect-square bg-gray-200 rounded-lg w-full"/>
                //         <div className="h-6 bg-gray-200 rounded w-20"/>

                //         <div className="space-y-2">
                //             <div className="h-5 bg-gray-200 rounded w-full"/>
                //         <div className="h-5 bg-gray-200 rounded w-3/4"/>
                //         </div>
                //     <div className="space-y-2">
                //     <div className="h-4 bg-gray-200 rounded w-full"/>
                //     <div className="h-4 bg-gray-200 rounded w-2/3"/>
                //     </div>
                   
                //    {/* price */}
                //     <div className="flex gap-2">
                //       <div className="h-6 bg-gray-200 rounded w-16"/>
                //       <div className="h-6 bg-gray-200 rounded w-20"/>  
                //     </div>

                //     shop
                //         </div>

                <HomePageProductCardSkeleton key={i}/>
                    ))}

                </div>
            </section>
        </div>
    );
};

export default ProductDetailsSkeleton;