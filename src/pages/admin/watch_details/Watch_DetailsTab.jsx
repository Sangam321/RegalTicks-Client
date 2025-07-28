import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  useEditWatch_DetailsMutation,
  useGetWatch_DetailsByIdQuery,
  useRemoveWatch_DetailsMutation,
} from "@/features/api/watchApi";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const MEDIA_API = "http://localhost:8080/api/v1/media";

const Watch_DetailsTab = () => {
  const [watch_detailsTitle, setWatch_DetailsTitle] = useState("");
  const [uploadVideInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const params = useParams();
  const { watchId, watch_detailsId } = params;

  const { data: watch_detailsData } = useGetWatch_DetailsByIdQuery(watch_detailsId);
  const watch_details = watch_detailsData?.watch_details;

  useEffect(() => {
    if (watch_details) {
      setWatch_DetailsTitle(watch_details.watch_detailsTitle);
      setIsFree(watch_details.isPreviewFree);
      setUploadVideoInfo(watch_details.videoInfo);
    }
  }, [watch_details]);

  const [edtiWatch_Details, { data, isLoading, error, isSuccess }] =
    useEditWatch_DetailsMutation();
  const [removeWatch_Details, { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess }] = useRemoveWatch_DetailsMutation();

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });

        if (res.data.success) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const editWatch_DetailsHandler = async () => {
    await edtiWatch_Details({
      watch_detailsTitle,
      videoInfo: uploadVideInfo,
      isPreviewFree: isFree,
      watchId,
      watch_detailsId,
    });
  };

  const removeWatch_DetailsHandler = async () => {
    await removeWatch_Details(watch_detailsId);
    setShowDialog(false);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData.message);
    }
  }, [removeSuccess]);

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Watch_Details</CardTitle>
          <CardDescription>
            Make changes and click save when done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button disabled={removeLoading} variant="destructive">
                {removeLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Remove Watch_Details"
                )}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure you want to delete this watch_details?</DialogTitle>
              </DialogHeader>
              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowDialog(false)}>
                  No
                </Button>
                <Button
                  variant="destructive"
                  disabled={removeLoading}
                  onClick={removeWatch_DetailsHandler}
                >
                  {removeLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Yes, Delete"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input
            value={watch_detailsTitle}
            onChange={(e) => setWatch_DetailsTitle(e.target.value)}
            type="text"
            placeholder="Ex. Introduction to Javascript"
          />
        </div>
        <div className="my-5">
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            onChange={fileChangeHandler}
            placeholder="Ex. Introduction to Javascript"
            className="w-fit"
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch checked={isFree} onCheckedChange={setIsFree} id="airplane-mode" />
          <Label htmlFor="airplane-mode">Is this video FREE</Label>
        </div>

        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}

        <div className="mt-4">
          <Button disabled={isLoading} onClick={editWatch_DetailsHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Update Watch_Details"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Watch_DetailsTab;
