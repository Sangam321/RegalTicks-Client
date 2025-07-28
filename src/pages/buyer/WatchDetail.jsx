import BuyWatchButton from "@/components/BuyWatchButton";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetWatchDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Clock, PlayCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const WatchDetail = () => {
  const params = useParams();
  const watchId = params.watchId;
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetWatchDetailWithStatusQuery(watchId);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Failed to load watch details</h1>;

  const { watch, purchased } = data;

  const handleContinueWatch = () => {
    if (purchased) {
      navigate(`/watch-progress/${watchId}`);
    }
  };

  return (
    <div className="min-h-[117vh] space-y-5">

      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#316a3a] via-[#1c8f2f] to-[#4f975b] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">{watch?.watchTitle}</h1>
          <p className="text-base md:text-base">{watch?.subTitle}</p>

          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated {watch?.createdAt.split("T")[0]}</p>
          </div>
          <p>Already Sold: {watch?.enrolledBuyers.length}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        {/* Left - Description and Watch_Detailss */}
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: watch.description }}
          />
          <Card>
            <CardHeader>
              <CardTitle>Watch Details</CardTitle>
              <CardDescription>Details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {watch.watch_detailss.map((watch_details, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  {purchased ? <PlayCircle size={14} /> : <Clock size={14} />}
                  <p>{watch_details.watch_detailsTitle}</p>
                </div>
              ))}
            </CardContent>

          </Card>
        </div>

        {/* Right - Thumbnail Preview & Buy/Continue Button */}
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">
                <img
                  src={watch.watchThumbnail}
                  alt="Watch Thumbnail"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              <h1>{watch.watch_detailss?.[0]?.watch_detailsTitle || "Watch_Details title"}</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">
                NPR {watch.watchPrice}
              </h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button
                  onClick={handleContinueWatch}
                  className="w-full bg-[#146321] hover:bg-[#2b6d36]"
                >
                  Buy Watch
                </Button>
              ) : (
                <BuyWatchButton watchId={watchId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WatchDetail; 