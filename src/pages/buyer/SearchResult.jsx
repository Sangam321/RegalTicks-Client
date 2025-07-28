import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const SearchResult = ({ watch }) => {

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4">
      <Link
        to={`/watch-detail/${watch._id}`}
        className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
      >
        <img
          src={watch.watchThumbnail}
          alt="watch-thumbnial"
          className="h-32 w-full md:w-56 object-cover rounded"
        />
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl">{watch.watchTitle}</h1>
          <p className="text-sm text-gray-600">{watch.subTitle}</p>

          <Badge className="w-fit mt-2 md:mt-0">{watch.watchLevel}</Badge>
        </div>
      </Link>
      <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
        <h1 className="font-bold text-lg md:text-xl">₹{watch.watchPrice}</h1>
      </div>
    </div>
  );
};

export default SearchResult;
