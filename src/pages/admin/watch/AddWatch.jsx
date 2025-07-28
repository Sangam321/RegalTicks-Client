import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateWatchMutation } from "@/features/api/watchApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddWatch = () => {
  const [watchTitle, setWatchTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createWatch, { data, isLoading, error, isSuccess }] =
    useCreateWatchMutation();

  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const createWatchHandler = async () => {
    await createWatch({ watchTitle, category });
  };

  // for displaying toast
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Watch created.");
      navigate("/admin/watch");
    }
  }, [isSuccess, error])

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets upload new watch
        </h1>
        <p className="text-sm">
          Let your collection public
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={watchTitle}
            onChange={(e) => setWatchTitle(e.target.value)}
            placeholder="Your watch Name"
          />
        </div>
        <div>
          <Label>Watch Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Watch Categories</SelectLabel>
                <SelectItem value="Luxury">Luxury</SelectItem>
                <SelectItem value="Smartwatch">Smartwatch</SelectItem>
                <SelectItem value="Digital">Digital</SelectItem>
                <SelectItem value="Analog">Analog</SelectItem>
                <SelectItem value="Diver">Diver</SelectItem>
                <SelectItem value="Chronograph">Chronograph</SelectItem>
                <SelectItem value="Mechanical">Mechanical</SelectItem>
                <SelectItem value="Automatic">Automatic</SelectItem>
                <SelectItem value="Field">Field</SelectItem>
                <SelectItem value="Fashion">Fashion</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/admin/watch")}>
            Back
          </Button>
          <Button disabled={isLoading} onClick={createWatchHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Add"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddWatch;
