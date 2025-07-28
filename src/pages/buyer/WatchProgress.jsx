import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useGetWatchProgressQuery,
  useUpdateWatch_DetailsProgressMutation,
} from "@/features/api/watchProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const WatchProgress = () => {
  const { watchId } = useParams();
  const { data, isLoading, isError, refetch } = useGetWatchProgressQuery(watchId);

  const [updateWatch_DetailsProgress] = useUpdateWatch_DetailsProgressMutation();

  const [currentWatch_Details, setCurrentWatch_Details] = useState(null);
  const [localProgress, setLocalProgress] = useState([]);

  // Initialize currentWatch_Details and localProgress from API data
  useEffect(() => {
    if (data?.data) {
      if (!currentWatch_Details) {
        setCurrentWatch_Details(data.data.watchDetails.watch_detailss[0]);
      }
    }
  }, [data, currentWatch_Details]);

  // Update localProgress only when backend data.progress changes
  useEffect(() => {
    if (data?.data?.progress) {
      setLocalProgress(data.data.progress);
    }
  }, [data?.data?.progress]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load watch details</p>;

  const { watchDetails } = data.data;
  const { watchTitle } = watchDetails;

  const selectedWatch_Details = currentWatch_Details;

  // Check if current watch_details is completed using localProgress state
  const isCurrentWatch_DetailsCompleted = localProgress.some(
    (prog) => prog.watch_detailsId === selectedWatch_Details?._id && prog.viewed
  );

  // Toggle completion status of current watch_details with backend update and optimistic local update
  const toggleWatch_DetailsCompletion = async () => {
    try {
      await updateWatch_DetailsProgress({
        watchId,
        watch_detailsId: selectedWatch_Details._id,
        markComplete: !isCurrentWatch_DetailsCompleted,
      }).unwrap();

      // Optimistically update localProgress immediately
      if (isCurrentWatch_DetailsCompleted) {
        // Remove completion for current watch_details
        setLocalProgress((prev) =>
          prev.filter((prog) => prog.watch_detailsId !== selectedWatch_Details._id)
        );
      } else {
        // Add completion for current watch_details
        setLocalProgress((prev) => [
          ...prev,
          { watch_detailsId: selectedWatch_Details._id, viewed: true },
        ]);
      }

      toast.success(
        isCurrentWatch_DetailsCompleted
          ? "Watch_Details marked as incomplete"
          : "Watch_Details marked as completed"
      );

      // Refetch data from backend for sync
      refetch();
    } catch (err) {
      toast.error("Failed to update watch_details progress");
    }
  };

  const handleSelectWatch_Details = (watch_details) => {
    setCurrentWatch_Details(watch_details);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 min-h-[75vh]">
      {/* Watch title and mark complete button */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{watchTitle}</h1>
        <Button
          onClick={toggleWatch_DetailsCompletion}
          style={{
            backgroundColor: isCurrentWatch_DetailsCompleted ? "transparent" : "#3869EB",
            color: isCurrentWatch_DetailsCompleted ? "#3869EB" : "white",
            border: isCurrentWatch_DetailsCompleted ? "1px solid #3869EB" : "none",
          }}
        >
          {isCurrentWatch_DetailsCompleted ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" /> <span>Mark as incomplete</span>
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Video section */}
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>
            {selectedWatch_Details?.videoUrl ? (
              <video
                src={selectedWatch_Details.videoUrl}
                controls
                className="w-full h-auto md:rounded-lg"
                onPlay={() => {
                  if (!isCurrentWatch_DetailsCompleted) {
                    toggleWatch_DetailsCompletion();
                  }
                }}
              />
            ) : (
              <p className="text-red-500">No video available for this watch_details.</p>
            )}
          </div>
          <div className="mt-2">
            <h3 className="font-medium text-lg">
              {`Watch_Details ${watchDetails.watch_detailss.findIndex((lec) => lec._id === selectedWatch_Details?._id) + 1
                } : ${selectedWatch_Details?.watch_detailsTitle || "Untitled"}`}
            </h3>
          </div>
        </div>

        {/* Watch_Details Sidebar */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Watch Watch_Detailss</h2>
          <div className="flex-1 overflow-y-auto max-h-[70vh]">
            {watchDetails?.watch_detailss.map((watch_details) => {
              const watch_detailsCompleted = localProgress.some(
                (prog) => prog.watch_detailsId === watch_details._id && prog.viewed
              );
              return (
                <Card
                  key={watch_details._id}
                  className={`mb-3 hover:cursor-pointer transition transform ${watch_details._id === selectedWatch_Details?._id
                    ? "bg-gray-200 dark:bg-gray-800"
                    : ""
                    }`}
                  onClick={() => handleSelectWatch_Details(watch_details)}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      {watch_detailsCompleted ? (
                        <CheckCircle2 size={24} className="text-green-500 mr-2" />
                      ) : (
                        <CirclePlay size={24} className="text-gray-500 mr-2" />
                      )}
                      <div>
                        <CardTitle className="text-lg font-medium">{watch_details.watch_detailsTitle}</CardTitle>
                      </div>
                    </div>
                    {watch_detailsCompleted && (
                      <Badge variant={"outline"} className="bg-green-200 text-green-600">
                        Completed
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchProgress;
