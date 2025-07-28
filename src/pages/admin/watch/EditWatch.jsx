import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import WatchTab from "./WatchTab";

const EditWatch = () => {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl">
          Add detail information regarding your watch
        </h1>
        <Link to="watch_details">
          <Button className="hover:text-blue-600" variant="link">Go to watch_detailss page</Button>
        </Link>
      </div>
      <WatchTab />
    </div>
  );
};

export default EditWatch;
