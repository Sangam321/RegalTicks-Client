import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  useEditWatchMutation,
  useGetWatchByIdQuery,
  usePublishWatchMutation,
} from "@/features/api/watchApi";
import { ArrowLeft, BarChart3, BookOpen, Check, DollarSign, Eye, Image as ImageIcon, Loader2, Save, Tag, Trash2, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const WatchTab = () => {
  const [input, setInput] = useState({
    watchTitle: "",
    subTitle: "",
    description: "",
    category: "",
    watchLevel: "",
    watchPrice: "",
    watchThumbnail: "",
  });

  const params = useParams();
  const watchId = params.watchId;
  const { data: watchByIdData, isLoading: watchByIdLoading, refetch } =
    useGetWatchByIdQuery(watchId);

  const [publishWatch, { }] = usePublishWatchMutation();

  useEffect(() => {
    if (watchByIdData?.watch) {
      const watch = watchByIdData?.watch;
      setInput({
        watchTitle: watch.watchTitle,
        subTitle: watch.subTitle,
        description: watch.description,
        category: watch.category,
        watchLevel: watch.watchLevel,
        watchPrice: watch.watchPrice,
        watchThumbnail: "",
      });
    }
  }, [watchByIdData]);

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const navigate = useNavigate();

  const [editWatch, { data, isLoading, isSuccess, error }] =
    useEditWatchMutation();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectWatchLevel = (value) => {
    setInput({ ...input, watchLevel: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, watchThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setInput({ ...input, watchThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const removeThumbnail = () => {
    setInput({ ...input, watchThumbnail: "" });
    setPreviewThumbnail("");
  };

  const updateWatchHandler = async () => {
    const formData = new FormData();
    formData.append("watchTitle", input.watchTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("watchLevel", input.watchLevel);
    formData.append("watchPrice", input.watchPrice);
    formData.append("watchThumbnail", input.watchThumbnail);

    await editWatch({ formData, watchId });
  };

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishWatch({ watchId, query: action });
      if (response.data) {
        refetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to publish or unpublish watch");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Watch updated.");
    }
    if (error) {
      toast.error(error.data.message || "Failed to update watch");
    }
  }, [isSuccess, error]);

  if (watchByIdLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading watch details...</p>
        </div>
      </div>
    );
  }

  const isPublished = watchByIdData?.watch?.isPublished;
  const hasWatch_Detailss = watchByIdData?.watch?.watch_detailss?.length > 0;

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl font-bold">Watch Management</CardTitle>
              </div>
              <CardDescription className="text-base">
                Configure your watch settings and content. Make sure to save your changes.
              </CardDescription>
            </div>
            <div className="flex items-center space-x-3">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${isPublished
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                }`}>
                {isPublished ? (
                  <div className="flex items-center space-x-1">
                    <Check className="h-3 w-3" />
                    <span>Published</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>Draft</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content Card */}
      <Card className="shadow-lg">
        <CardHeader className="border-b bg-muted/30">
          <div className="flex flex-row justify-between items-center">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Tag className="h-5 w-5" />
                <span>Basic watch Information</span>
              </CardTitle>
              <CardDescription className="mt-1">
                Update your watch details and settings below.
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button

                variant={isPublished ? "destructive" : "default"}
                onClick={() =>
                  publishStatusHandler(isPublished ? "false" : "true")
                }
                className="transition-all duration-200 hover:scale-105"
              >
                {isPublished ? (
                  <>
                    <X className="mr-2 h-4 w-4" />
                    Unpublish
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Publish
                  </>
                )}
              </Button>
              <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors">
                <Trash2 className="mr-2 h-4 w-4" />
                Remove Watch
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Watch Title */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Watch Title</span>
                </Label>
                <Input
                  type="text"
                  name="watchTitle"
                  value={input.watchTitle}
                  onChange={changeEventHandler}
                  placeholder="Ex. Rolez"
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Subtitle */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Subtitle</Label>
                <Input
                  type="text"
                  name="subTitle"
                  value={input.subTitle}
                  onChange={changeEventHandler}
                  placeholder="Ex. Automatic with handmade movement"
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Description</Label>
                <div className="border rounded-lg p-1 bg-background">
                  <RichTextEditor input={input} setInput={setInput} />
                </div>
              </div>

              {/* Watch Settings Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold flex items-center space-x-2">
                    <Tag className="h-4 w-4" />
                    <span>Category</span>
                  </Label>
                  <Select
                    defaultValue={input.category}
                    onValueChange={selectCategory}
                  >
                    <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
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

                {/* Watch Level */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>Level</span>
                  </Label>
                  <Select
                    defaultValue={input.watchLevel}
                    onValueChange={selectWatchLevel}
                  >
                    <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Difficulty Level</SelectLabel>
                        <SelectItem value="Smart">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Smart</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="Analog">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span>Analog</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="Luxury">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span>Luxury</span>
                          </div>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Price (NPR)</span>
                  </Label>
                  <Input
                    type="number"
                    name="watchPrice"
                    value={input.watchPrice}
                    onChange={changeEventHandler}
                    placeholder="1999"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Thumbnail */}
            <div className="space-y-4">
              <Label className="text-sm font-semibold flex items-center space-x-2">
                <ImageIcon className="h-4 w-4" />
                <span>Watch Thumbnail</span>
              </Label>

              <div className="space-y-4">
                {previewThumbnail ? (
                  <div className="relative group w-full max-w-[1000px] mx-auto h-[1000px] flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg overflow-hidden">
                    <img
                      src={previewThumbnail}
                      className="w-full h-full object-contain"
                      alt="Watch Thumbnail Preview"
                    />
                    <Button
                      onClick={removeThumbnail}
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer hover:border-primary/50 hover:bg-primary/5 ${isDragOver ? 'border-primary bg-primary/10' : 'border-muted-foreground/25'
                      }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('thumbnail-upload')?.click()}
                  >
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Upload Watch Thumbnail</p>
                      <p className="text-xs text-muted-foreground">
                        Drag and drop your image here, or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Recommended: 1280x720px, JPG or PNG
                      </p>
                    </div>
                  </div>
                )}

                <Input
                  id="thumbnail-upload"
                  type="file"
                  onChange={selectThumbnail}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-8 border-t mt-8">
            <Button
              onClick={() => navigate("/admin/watch")}
              variant="outline"
              className="flex items-center space-x-2 transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Watches</span>
            </Button>

            <div className="flex items-center space-x-3">
              <Button
                disabled={isLoading}
                onClick={updateWatchHandler}
                className="flex items-center space-x-2 transition-all duration-200 hover:scale-105 min-w-[120px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>


        </CardContent>
      </Card>
    </div>
  );
};

export default WatchTab;