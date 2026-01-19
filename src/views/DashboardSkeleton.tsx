"use client"

const DashboardSkeleton = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-teal-200/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto relative z-10 animate-pulse">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="relative inline-block w-full max-w-xl">
            <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-6 border-l-4 border-green-500 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                {/* Green dot */}
                <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                {/* Title skeleton */}
                <div className="h-9 bg-gray-200 rounded w-64"></div>
              </div>
              {/* Subtitle skeleton */}
              <div className="h-5 bg-gray-200 rounded w-80 ml-6"></div>
            </div>
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-green-100 p-6">
              {/* Icon skeleton */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
              </div>
              {/* Value skeleton */}
              <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
              {/* Label skeleton */}
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          ))}
        </div>

        {/* Monthly Chart Skeleton */}
        <div className="mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-green-100 p-6">
            {/* Chart title skeleton */}
            <div className="h-7 bg-gray-200 rounded w-48 mb-6"></div>
            
            {/* Chart area skeleton */}
            <div className="h-80 bg-gray-100 rounded-lg flex items-end justify-around gap-4 p-6">
              {/* Bar chart skeleton */}
              {[65, 80, 45, 90].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-gray-200 rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                  <div className="h-3 w-6 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>

            {/* Legend skeleton */}
            <div className="flex justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Pie Chart Skeleton */}
        <div className="mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 overflow-hidden">
            {/* Top accent line */}
            <div className="h-1 bg-gray-200"></div>
            
            <div className="p-6">
              {/* Chart title skeleton */}
              <div className="h-7 bg-gray-200 rounded w-56 mb-6"></div>
              
              <div className="flex flex-col lg:flex-row items-center justify-around gap-8">
                {/* Pie chart circle skeleton */}
                <div className="w-64 h-64 bg-gray-200 rounded-full"></div>
                
                {/* Legend skeleton */}
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-6 h-6 bg-gray-200 rounded"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                        <div className="h-5 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Distribution Chart Skeleton */}
        <div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-green-100 p-6">
            {/* Chart title skeleton */}
            <div className="h-7 bg-gray-200 rounded w-52 mb-6"></div>
            
            {/* Bar chart horizontal skeleton */}
            <div className="h-80 bg-gray-100 rounded-lg flex items-end justify-around gap-4 p-6">
              {/* Bar chart skeleton */}
              {[65, 80, 45, 90].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-gray-200 rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                  <div className="h-3 w-6 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          {/* Legend skeleton */}
            <div className="flex justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              
            </div>


          </div>
        </div>

        {/* Floating particles skeleton */}
        <div className="fixed top-20 right-10 w-2 h-2 bg-gray-200 rounded-full opacity-60"></div>
        <div className="fixed top-40 right-32 w-3 h-3 bg-gray-200 rounded-full opacity-40"></div>
        <div className="fixed bottom-20 left-20 w-2 h-2 bg-gray-200 rounded-full opacity-50"></div>
      </div>
    </div>
    );
};

export default DashboardSkeleton;