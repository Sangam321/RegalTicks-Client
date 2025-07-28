import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPublishedWatchQuery } from "@/features/api/watchApi";
import { useNavigate } from "react-router-dom";
import Watch from "./Watch";

const Watchs = () => {
  const { data, isLoading, isError } = useGetPublishedWatchQuery();
  const navigate = useNavigate();

  if (isError) return <h1>Some error occurred while fetching watches.</h1>;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0a0a0a] dark:to-[#1a1a1a] min-h-screen">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="font-bold text-4xl mb-2 text-left bg-gradient-to-r from-[#146321] to-[#1a7c2a] bg-clip-text text-transparent">
              Explore Timeless Luxury
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
              Explore our curated collection of luxury timepieces crafted for elegance,
              precision, and timeless sophistication.
            </p>
          </div>
          <Button
            onClick={() => navigate(`/watch/search?query`)}
            className="bg-white dark:bg-gray-800 text-[#146321] border border-[#146321] hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full px-6 py-2"
          >
            Explore All Watches
          </Button>
        </div>

        {/* Watches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <WatchSkeleton key={index} />
            ))
          ) : (
            data?.watchs &&
            data.watchs.map((watch, index) => (
              <Watch key={index} watch={watch} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Watchs;

const WatchSkeleton = () => {
  return (
    <div className="group bg-white dark:bg-[#1f1f1f] shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-[#146321] dark:hover:border-[#146321] hover:-translate-y-1">
      {/* Thumbnail Skeleton with taller aspect ratio */}
      <div className="relative aspect-[4/5] w-full">
        <Skeleton className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />
        <div className="absolute top-4 right-4">
          <Skeleton className="h-8 w-16 rounded-full bg-[#146321]/20" />
        </div>
      </div>

      {/* Details Skeleton */}
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-4/5 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-500 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-600 rounded" />
          <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-600 rounded" />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Skeleton className="h-8 w-8 rounded-full bg-[#146321]/20" />
          <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-600 rounded" />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded bg-yellow-200" />
            <Skeleton className="h-4 w-12 bg-gray-200 dark:bg-gray-600 rounded" />
          </div>
          <Skeleton className="h-5 w-16 bg-[#146321]/20 rounded-full" />
        </div>

        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-20 bg-[#146321]/30 rounded-lg" />
          <Skeleton className="h-4 w-16 bg-gray-200 dark:bg-gray-600 rounded line-through" />
        </div>

        <Skeleton className="h-10 w-full bg-gradient-to-r from-[#146321]/30 to-[#1a7c2a]/30 rounded-lg mt-4" />
      </div>
    </div>
  );
};