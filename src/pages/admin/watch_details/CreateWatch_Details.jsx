import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateWatch_DetailsMutation,
  useGetWatchWatch_DetailsQuery,
} from "@/features/api/watchApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Watch_Details from "./Watch_Details";

const CreateWatch_Details = () => {
  const [watch_detailsTitle, setWatch_DetailsTitle] = useState("");
  const params = useParams();
  const watchId = params.watchId;
  const navigate = useNavigate();

  const [createWatch_Details, { data, isLoading, isSuccess, error }] =
    useCreateWatch_DetailsMutation();

  const {
    data: watch_detailsData,
    isLoading: watch_detailsLoading,
    isError: watch_detailsError,
    refetch,
  } = useGetWatchWatch_DetailsQuery(watchId);

  const createWatch_DetailsHandler = async () => {
    await createWatch_Details({ watch_detailsTitle, watchId });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  console.log(watch_detailsData);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Let's add watch_detailss, add some basic details for your new watch_details
        </h1>
        <p className="text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus,
          laborum!
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={watch_detailsTitle}
            onChange={(e) => setWatch_DetailsTitle(e.target.value)}
            placeholder="Your Title Name"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/watch/${watchId}`)}
          >
            Back to watch
          </Button>
          <Button
            disabled={isLoading}
            onClick={createWatch_DetailsHandler}
            className="bg-[#3869EB] hover:bg-[#2f56cc] text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create watch_details"
            )}
          </Button>
        </div>
        <div className="mt-10">
          {watch_detailsLoading ? (
            <p>Loading watch_detailss...</p>
          ) : watch_detailsError ? (
            <p>Failed to load watch_detailss.</p>
          ) : watch_detailsData.watch_detailss.length === 0 ? (
            <p>No watch_detailss availabe</p>
          ) : (
            watch_detailsData.watch_detailss.map((watch_details, index) => (
              <Watch_Details
                key={watch_details._id}
                watch_details={watch_details}
                watchId={watchId}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateWatch_Details;
