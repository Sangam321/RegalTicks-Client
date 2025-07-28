import { useLoadUserQuery } from "@/features/api/authApi";
import Watch from "./Watch";

const MyCollection = () => {
  const { data, isLoading } = useLoadUserQuery();

  const myCollection = data?.user.enrolledWatchs || [];
  return (
    <div className="max-w-4xl mx-auto my-10 px-4 md:px-0">
      <h1 className="font-bold text-2xl">MY LEARNING</h1>
      <div className="my-5">
        {isLoading ? (
          <MyCollectionSkeleton />
        ) : myCollection.length === 0 ? (
          <p>You are not enrolled in any watch.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {myCollection.map((watch, index) => (
              <Watch key={index} watch={watch} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCollection;

// Skeleton component for loading state
const MyCollectionSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);
