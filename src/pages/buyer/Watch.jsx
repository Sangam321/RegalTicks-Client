import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useGetWatchDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { Lock } from "lucide-react";
import { useState } from "react";
import { FaClipboardList, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const Watch = ({ watch }) => {
  const isLoggedIn = !!localStorage.getItem("token");
  const [open, setOpen] = useState(false);

  // Fetch watch detail when modal opens
  const { data, isLoading } = useGetWatchDetailWithStatusQuery(watch._id, {
    skip: !open, // Don't fetch unless modal is open
  });

  return (
    <>
      <div className="relative group">
        {/* Card wrapped in link for logged-in users */}
        <Link to={`/watch-detail/${watch._id}`}>
          <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 h-full flex flex-col">
            <div className="relative aspect-[4/5] w-full">
              <img
                src={watch.watchThumbnail}
                alt={watch.watchTitle}
                className="w-full h-full object-cover"
              />
              {/* Badge positioned absolutely within the image container */}
              <Badge className="absolute top-3 right-3 bg-[#146321] text-white px-2 py-1 text-xs rounded-full">
                {watch.watchLevel}
              </Badge>
            </div>
            <CardContent className="p-4 flex-grow flex flex-col">
              <h1 className="font-bold text-lg line-clamp-2 mb-2 hover:underline">
                {watch.watchTitle}
              </h1>

              <div className="flex items-center gap-3 mt-auto">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={watch.creator?.photoUrl || "https://github.com/shadcn.png"}
                    alt={watch.creator?.name || "Creator"}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <h1 className="font-medium text-sm line-clamp-1">{watch.creator?.name}</h1>
                </div>
              </div>

              <div className="text-lg font-bold mt-3">
                ₹{watch.watchPrice}
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Modal for watch details */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
          {isLoading ? (
            <p className="text-center text-lg font-medium text-gray-500 dark:text-gray-400 animate-pulse">
              Loading...
            </p>
          ) : (
            <>
              <DialogHeader className="border-b border-gray-200 dark:border-gray-700 mb-5 pb-3">
                <DialogTitle className="text-2xl font-extrabold tracking-wide text-gray-900 dark:text-gray-100">
                  {data?.watch?.watchTitle}
                </DialogTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-1">
                  {data?.watch?.subTitle}
                </p>
              </DialogHeader>

              <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800">
                {/* Enrolled count */}
                <p className="flex items-center text-gray-700 dark:text-gray-300 text-sm font-semibold gap-2">
                  <FaUsers className="text-indigo-500" />
                  Buyers enrolled: <span className="ml-1">{data?.watch?.enrolledBuyers?.length || 0}</span>
                </p>

                {/* Description */}
                <section>
                  <h2 className="flex items-center gap-2 font-semibold text-lg text-indigo-600 dark:text-indigo-400 mb-2">
                    <FaClipboardList />
                    Description
                  </h2>
                  <p
                    className="text-gray-800 dark:text-gray-200 leading-relaxed text-sm"
                    dangerouslySetInnerHTML={{
                      __html: data?.watch?.description || "No description",
                    }}
                  />
                </section>

                {/* Watch_Detailss */}
                <section>
                  <h2 className="flex items-center gap-2 font-semibold text-lg text-indigo-600 dark:text-indigo-400 mb-3">
                    <Lock size={18} className="text-indigo-500" />
                    Watch_Detailss
                  </h2>
                  <ul className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-indigo-100 dark:scrollbar-thumb-indigo-600 dark:scrollbar-track-indigo-900">
                    {data?.watch?.watch_detailss?.map((lec, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-gray-700 dark:text-gray-300 text-sm hover:bg-indigo-100 dark:hover:bg-indigo-900 rounded px-2 py-1 transition"
                      >
                        <Lock size={16} className="text-indigo-400" />
                        <span>{lec.watch_detailsTitle}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Cancel button */}
              <div className="text-right pt-5">
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-200 font-semibold rounded px-5 py-2 text-sm transition"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Watch;